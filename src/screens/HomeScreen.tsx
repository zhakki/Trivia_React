import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { Difficulty, QuizSettings, TriviaCategory } from '../types/trivia';

interface Props {
  settings: QuizSettings;
  categories: TriviaCategory[];
  categoriesLoading: boolean;
  isStarting: boolean;
  onChangePlayerName: (value: string) => void;
  onChangeCategory: (category: TriviaCategory | null) => void;
  onChangeDifficulty: (value: Difficulty | '') => void;
  onChangeAmount: (value: number) => void;
  onChangeTimePerQuestion: (value: number) => void;
  onStart: () => void;
  onOpenLeaderboard: () => void;
}

const questionCounts = [5, 10, 15];
const timeOptions = [10, 15, 20, 30];
const difficulties: Array<Difficulty | ''> = ['', 'easy', 'medium', 'hard'];

export default function HomeScreen({
  settings,
  categories,
  categoriesLoading,
  isStarting,
  onChangePlayerName,
  onChangeCategory,
  onChangeDifficulty,
  onChangeAmount,
  onChangeTimePerQuestion,
  onStart,
  onOpenLeaderboard,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trivia Quiz</Text>
        <Text style={styles.subtitle}>Кроссплатформенная викторина на React Native</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Имя игрока</Text>
          <TextInput
            value={settings.playerName}
            onChangeText={onChangePlayerName}
            placeholder="Введите имя"
            style={styles.input}
            maxLength={30}
          />

          <Text style={styles.label}>Категория</Text>
          {categoriesLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
              <Pressable
                style={[
                  styles.optionChip,
                  settings.categoryId === null && styles.optionChipActive,
                ]}
                onPress={() => onChangeCategory(null)}
              >
                <Text
                  style={[
                    styles.optionChipText,
                    settings.categoryId === null && styles.optionChipTextActive,
                  ]}
                >
                  Любая
                </Text>
              </Pressable>

              {categories.map(category => (
                <Pressable
                  key={category.id}
                  style={[
                    styles.optionChip,
                    settings.categoryId === category.id && styles.optionChipActive,
                  ]}
                  onPress={() => onChangeCategory(category)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      settings.categoryId === category.id && styles.optionChipTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}

          <Text style={styles.label}>Сложность</Text>
          <View style={styles.rowWrap}>
            {difficulties.map(item => {
              const label =
                item === '' ? 'Любая' : item === 'easy' ? 'Easy' : item === 'medium' ? 'Medium' : 'Hard';

              return (
                <Pressable
                  key={label}
                  style={[
                    styles.choiceButton,
                    settings.difficulty === item && styles.choiceButtonActive,
                  ]}
                  onPress={() => onChangeDifficulty(item)}
                >
                  <Text
                    style={[
                      styles.choiceButtonText,
                      settings.difficulty === item && styles.choiceButtonTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Количество вопросов</Text>
          <View style={styles.rowWrap}>
            {questionCounts.map(item => (
              <Pressable
                key={item}
                style={[
                  styles.choiceButton,
                  settings.amount === item && styles.choiceButtonActive,
                ]}
                onPress={() => onChangeAmount(item)}
              >
                <Text
                  style={[
                    styles.choiceButtonText,
                    settings.amount === item && styles.choiceButtonTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Время на вопрос</Text>
          <View style={styles.rowWrap}>
            {timeOptions.map(item => (
              <Pressable
                key={item}
                style={[
                  styles.choiceButton,
                  settings.timePerQuestion === item && styles.choiceButtonActive,
                ]}
                onPress={() => onChangeTimePerQuestion(item)}
              >
                <Text
                  style={[
                    styles.choiceButtonText,
                    settings.timePerQuestion === item && styles.choiceButtonTextActive,
                  ]}
                >
                  {item} сек
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={onStart} disabled={isStarting}>
          <Text style={styles.primaryButtonText}>
            {isStarting ? 'Загрузка...' : 'Начать викторину'}
          </Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onOpenLeaderboard}>
          <Text style={styles.secondaryButtonText}>Таблица лидеров</Text>
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
  },
  subtitle: {
    fontSize: 15,
    color: '#60708A',
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    gap: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#25324A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7DFEA',
    backgroundColor: '#FAFCFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  horizontalList: {
    marginTop: 4,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#E9EEF6',
    marginRight: 8,
  },
  optionChipActive: {
    backgroundColor: '#2E6BFF',
  },
  optionChipText: {
    color: '#25324A',
    fontWeight: '600',
  },
  optionChipTextActive: {
    color: '#FFFFFF',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  choiceButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#E9EEF6',
  },
  choiceButtonActive: {
    backgroundColor: '#2E6BFF',
  },
  choiceButtonText: {
    fontWeight: '600',
    color: '#25324A',
  },
  choiceButtonTextActive: {
    color: '#FFFFFF',
  },
  primaryButton: {
    marginTop: 20,
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
