import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { QuizAnswer, QuizResultRecord } from '../types/trivia';

interface Props {
  result: QuizResultRecord;
  answers: QuizAnswer[];
  onRestart: () => void;
  onGoHome: () => void;
  onOpenLeaderboard: () => void;
}

export default function ResultScreen({
  result,
  answers,
  onRestart,
  onGoHome,
  onOpenLeaderboard,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Результаты</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.bigScore}>{result.score} / {result.totalQuestions}</Text>
          <Text style={styles.percent}>{result.percentage.toFixed(0)}%</Text>

          <View style={styles.statsBox}>
            <Text style={styles.stat}>Игрок: {result.playerName}</Text>
            <Text style={styles.stat}>Категория: {result.category}</Text>
            <Text style={styles.stat}>Сложность: {result.difficulty || 'any'}</Text>
            <Text style={styles.stat}>Правильных: {result.correctAnswers}</Text>
            <Text style={styles.stat}>Неправильных: {result.incorrectAnswers}</Text>
            <Text style={styles.stat}>Время: {result.durationSeconds} сек</Text>
            <Text style={styles.stat}>Дата: {new Date(result.finishedAt).toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ответы</Text>
        {answers.map((item, index) => (
          <View key={`${item.question}-${index}`} style={styles.answerCard}>
            <Text style={styles.answerQuestion}>{index + 1}. {item.question}</Text>
            <Text style={styles.answerLine}>Ваш ответ: {item.selectedAnswer}</Text>
            <Text style={styles.answerLine}>Правильный: {item.correctAnswer}</Text>
            <Text style={[styles.answerStatus, item.isCorrect ? styles.correct : styles.incorrect]}>
              {item.isCorrect ? 'Правильно' : 'Неправильно'}
            </Text>
          </View>
        ))}

        <Pressable style={styles.primaryButton} onPress={onRestart}>
          <Text style={styles.primaryButtonText}>Начать заново</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onOpenLeaderboard}>
          <Text style={styles.secondaryButtonText}>Таблица лидеров</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onGoHome}>
          <Text style={styles.secondaryButtonText}>Главное меню</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  bigScore: {
    fontSize: 34,
    fontWeight: '800',
    color: '#172033',
    textAlign: 'center',
  },
  percent: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E6BFF',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  statsBox: {
    gap: 6,
  },
  stat: {
    fontSize: 15,
    color: '#42526B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 12,
  },
  answerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  answerQuestion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 8,
  },
  answerLine: {
    fontSize: 14,
    color: '#42526B',
    marginBottom: 4,
  },
  answerStatus: {
    marginTop: 6,
    fontWeight: '700',
  },
  correct: {
    color: '#1D8F4E',
  },
  incorrect: {
    color: '#D64545',
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: '#2E6BFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7DFEA',
  },
  secondaryButtonText: {
    color: '#25324A',
    fontSize: 16,
    fontWeight: '700',
  },
});
