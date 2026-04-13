import React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Results</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.bigScore}>
            {result.score} / {result.totalQuestions}
          </Text>
          <Text style={styles.percent}>{result.percentage.toFixed(0)}%</Text>

          <View style={styles.statsBox}>
            <Text style={styles.stat}>Player: {result.playerName}</Text>
            <Text style={styles.stat}>Category: {result.category}</Text>
            <Text style={styles.stat}>
              Difficulty: {result.difficulty || 'any'}
            </Text>
            <Text style={styles.stat}>Correct: {result.correctAnswers}</Text>
            <Text style={styles.stat}>Incorrect: {result.incorrectAnswers}</Text>
            <Text style={styles.stat}>Time: {result.durationSeconds} sec</Text>
            <Text style={styles.stat}>
              Date: {new Date(result.finishedAt).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.actionsBox}>
          <Pressable style={styles.primaryButton} onPress={onRestart}>
            <Text style={styles.primaryButtonText}>Start over</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onGoHome}>
            <Text style={styles.secondaryButtonText}>Main Menu</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onOpenLeaderboard}>
            <Text style={styles.secondaryButtonText}>Leaderboard</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Answers</Text>

        {answers.map((item, index) => (
          <View key={`${item.question}-${index}`} style={styles.answerCard}>
            <Text style={styles.answerQuestion}>
              {index + 1}. {item.question}
            </Text>

            <Text style={styles.answerLine}>
              Your answer: {item.selectedAnswer}
            </Text>
            <Text style={styles.answerLine}>
              Correct: {item.correctAnswer}
            </Text>

            <View
              style={[
                styles.statusBadge,
                item.isCorrect ? styles.correctBadge : styles.incorrectBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.isCorrect ? styles.correctText : styles.incorrectText,
                ]}
              >
                {item.isCorrect ? 'Correct' : 'Incorrect'}
              </Text>
            </View>
          </View>
        ))}
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
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 18 : 18,
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
    marginBottom: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  bigScore: {
    fontSize: 36,
    fontWeight: '800',
    color: '#172033',
    textAlign: 'center',
  },
  percent: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E6BFF',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  statsBox: {
    gap: 8,
  },
  stat: {
    fontSize: 16,
    color: '#42526B',
  },
  actionsBox: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 12,
  },
  answerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  answerQuestion: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 10,
  },
  answerLine: {
    fontSize: 15,
    color: '#42526B',
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  correctBadge: {
    backgroundColor: '#E8F7EE',
  },
  incorrectBadge: {
    backgroundColor: '#FDECEC',
  },
  statusText: {
    fontWeight: '700',
    fontSize: 14,
  },
  correctText: {
    color: '#1D8F4E',
  },
  incorrectText: {
    color: '#D64545',
  },
  primaryButton: {
    backgroundColor: '#2E6BFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7DFEA',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#25324A',
    fontSize: 16,
    fontWeight: '700',
  },
});