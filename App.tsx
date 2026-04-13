import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { initDB, getTopResults, saveResult } from './src/database/db';
import HomeScreen from './src/screens/HomeScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import { fetchCategories, fetchQuestions } from './src/services/triviaApi';
import type {
  Difficulty,
  QuizAnswer,
  QuizQuestion,
  QuizResultRecord,
  QuizSettings,
  TriviaCategory,
} from './src/types/trivia';

type Screen = 'home' | 'quiz' | 'result' | 'leaderboard';

const defaultSettings: QuizSettings = {
  playerName: '',
  categoryId: null,
  categoryName: 'Any category',
  difficulty: '',
  amount: 10,
  timePerQuestion: 15,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [settings, setSettings] = useState<QuizSettings>(defaultSettings);
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [startingQuiz, setStartingQuiz] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(defaultSettings.timePerQuestion);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResultRecord | null>(null);
  const [leaderboard, setLeaderboard] = useState<QuizResultRecord[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);

  useEffect(() => {
    async function prepareApp() {
      try {
        await initDB();
        const loadedCategories = await fetchCategories();
        setCategories(loadedCategories);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to initialize the application');
      } finally {
        setCategoriesLoading(false);
        setAppReady(true);
      }
    }

    prepareApp();
  }, []);

  useEffect(() => {
    if (screen !== 'quiz' || !questions.length) {
      return;
    }

    setTimeLeft(settings.timePerQuestion);
  }, [screen, currentIndex, questions.length, settings.timePerQuestion]);

  useEffect(() => {
    if (screen !== 'quiz' || !questions.length) {
      return;
    }

    if (timeLeft <= 0) {
      handleAnswer('No answer');
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [screen, timeLeft, questions.length, currentIndex]);

  async function loadLeaderboard() {
    try {
      setLeaderboardLoading(true);
      const rows = await getTopResults(10);
      setLeaderboard(rows);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to load the leaderboard');
    } finally {
      setLeaderboardLoading(false);
    }
  }

  async function startQuiz() {
    if (!settings.playerName.trim()) {
      Alert.alert('Attention', 'Enter player name');
      return;
    }

    try {
      setStartingQuiz(true);
      const loadedQuestions = await fetchQuestions(settings);
      setQuestions(loadedQuestions);
      setCurrentIndex(0);
      setAnswers([]);
      setResult(null);
      setStartedAt(Date.now());
      setScreen('quiz');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Unable to start the quiz');
    } finally {
      setStartingQuiz(false);
    }
  }

  async function finishQuiz(finalAnswers: QuizAnswer[]) {
    const score = finalAnswers.filter(item => item.isCorrect).length;
    const totalQuestions = finalAnswers.length;
    const percentage = totalQuestions ? (score / totalQuestions) * 100 : 0;
    const durationSeconds = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0;

    const finalResult: QuizResultRecord = {
      playerName: settings.playerName.trim(),
      score,
      percentage,
      finishedAt: new Date().toISOString(),
      durationSeconds,
      totalQuestions,
      correctAnswers: score,
      incorrectAnswers: totalQuestions - score,
      category: settings.categoryName,
      difficulty: settings.difficulty || 'any',
      answersJson: JSON.stringify(finalAnswers),
    };

    try {
      await saveResult(finalResult);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save result');
    }

    setResult(finalResult);
    setAnswers(finalAnswers);
    setScreen('result');
  }

  function handleAnswer(selectedAnswer: string) {
    if (!currentQuestion) {
      return;
    }

    const answerRecord: QuizAnswer = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer,
    };

    const updatedAnswers = [...answers, answerRecord];

    if (currentIndex >= questions.length - 1) {
      finishQuiz(updatedAnswers);
      return;
    }

    setAnswers(updatedAnswers);
    setCurrentIndex(prev => prev + 1);
  }

  function restartWithSameSettings() {
    startQuiz();
  }

  async function openLeaderboard() {
    await loadLeaderboard();
    setScreen('leaderboard');
  }

  function goHome() {
    setScreen('home');
  }
  function quitQuiz() {
    Alert.alert(
      'End the game?',
      'Your progress will not be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            setQuestions([]);
            setCurrentIndex(0);
            setTimeLeft(settings.timePerQuestion);
            setAnswers([]);
            setStartedAt(null);
            setResult(null);
            setScreen('home');
          },
        },
      ]
    );
  }

  function updateDifficulty(value: Difficulty | '') {
    setSettings(prev => ({ ...prev, difficulty: value }));
  }

  function updateCategory(category: TriviaCategory | null) {
    setSettings(prev => ({
      ...prev,
      categoryId: category?.id ?? null,
      categoryName: category?.name ?? 'Any category',
    }));
  }


  if (!appReady) {
    return (
      <SafeAreaView style={styles.loadingArea}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        settings={settings}
        categories={categories}
        categoriesLoading={categoriesLoading}
        isStarting={startingQuiz}
        onChangePlayerName={value => setSettings(prev => ({ ...prev, playerName: value }))}
        onChangeCategory={updateCategory}
        onChangeDifficulty={updateDifficulty}
        onChangeAmount={value => setSettings(prev => ({ ...prev, amount: value }))}
        onChangeTimePerQuestion={value => setSettings(prev => ({ ...prev, timePerQuestion: value }))}
        onStart={startQuiz}
        onOpenLeaderboard={openLeaderboard}
      />
    );
  }

  if (screen === 'quiz' && currentQuestion) {
    return (
      <QuizScreen
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
        onAnswer={handleAnswer}
        onQuit={quitQuiz}
      />
    );
  }

  if (screen === 'result' && result) {
    return (
      <ResultScreen
        result={result}
        answers={answers}
        onRestart={restartWithSameSettings}
        onGoHome={goHome}
        onOpenLeaderboard={openLeaderboard}
      />
    );
  }

  if (screen === 'leaderboard') {
    return (
      <LeaderboardScreen
        results={leaderboard}
        loading={leaderboardLoading}
        onBack={goHome}
      />
    );
  }

  return <View />;
}

const styles = StyleSheet.create({
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FB',
  },
});
