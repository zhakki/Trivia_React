import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { QuizQuestion } from '../types/trivia';

interface Props {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswer: (answer: string) => void;
  onQuit: () => void;
}

export default function QuizScreen({
  question,
  currentIndex,
  totalQuestions,
  timeLeft,
  onAnswer,
  onQuit,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.progress}>
            Question {currentIndex + 1} / {totalQuestions}
          </Text>
          <Text style={styles.timer}>⏱ {timeLeft} sec</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.metaCard}>
            <Text style={styles.metaText}>Category: {question.category}</Text>
            <Text style={styles.metaText}>Difficulty: {question.difficulty}</Text>
            <Text style={styles.metaText}>Type: {question.type}</Text>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          <View style={styles.answersBox}>
            {question.options.map((option) => (
              <Pressable
                key={option}
                style={styles.answerButton}
                onPress={() => onAnswer(option)}
              >
                <Text style={styles.answerText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <Pressable style={styles.quitButton} onPress={onQuit}>
          <Text style={styles.quitButtonText}>End the game</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 44,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progress: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172033',
  },
  timer: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D64545',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  metaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  metaText: {
    fontSize: 14,
    color: '#60708A',
    marginBottom: 6,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 26,
    marginBottom: 18,
    minHeight: 180,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  questionText: {
    fontSize: 22,
    lineHeight: 34,
    fontWeight: '700',
    color: '#172033',
    textAlign: 'center',
  },
  answersBox: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#D7DFEA',
  },
  answerText: {
    fontSize: 18,
    color: '#25324A',
    fontWeight: '600',
    textAlign: 'center',
  },
  quitButton: {
    marginTop: 12,
    backgroundColor: '#2E6BFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  quitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});