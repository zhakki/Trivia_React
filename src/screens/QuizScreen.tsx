import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { QuizQuestion } from '../types/trivia';

interface Props {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswer: (answer: string) => void;
}

export default function QuizScreen({
  question,
  currentIndex,
  totalQuestions,
  timeLeft,
  onAnswer,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.progress}>
            Вопрос {currentIndex + 1} / {totalQuestions}
          </Text>
          <Text style={styles.timer}>⏱ {timeLeft} сек</Text>
        </View>

        <View style={styles.metaCard}>
          <Text style={styles.metaText}>Категория: {question.category}</Text>
          <Text style={styles.metaText}>Сложность: {question.difficulty}</Text>
          <Text style={styles.metaText}>Тип: {question.type}</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.answersBox}>
          {question.options.map(option => (
            <Pressable key={option} style={styles.answerButton} onPress={() => onAnswer(option)}>
              <Text style={styles.answerText}>{option}</Text>
            </Pressable>
          ))}
        </View>
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
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
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
  metaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#60708A',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    minHeight: 160,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: '#172033',
  },
  answersBox: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D7DFEA',
  },
  answerText: {
    fontSize: 16,
    color: '#25324A',
    fontWeight: '600',
  },
});
