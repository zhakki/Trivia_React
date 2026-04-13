import React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

        <View style={styles.content}>
          <View style={styles.metaCard}>
            <Text style={styles.metaText}>Категория: {question.category}</Text>
            <Text style={styles.metaText}>Сложность: {question.difficulty}</Text>
            <Text style={styles.metaText}>Тип: {question.type}</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
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
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  metaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    gap: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  metaText: {
    fontSize: 14,
    color: '#60708A',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
    marginBottom: 20,
    minHeight: 220,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  questionText: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    color: '#172033',
    textAlign: 'center',
  },
  answersBox: {
    gap: 14,
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
    fontSize: 17,
    color: '#25324A',
    fontWeight: '600',
    textAlign: 'center',
  },
});