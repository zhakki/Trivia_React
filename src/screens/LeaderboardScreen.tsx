import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { QuizResultRecord } from '../types/trivia';

interface Props {
  results: QuizResultRecord[];
  loading: boolean;
  onBack: () => void;
}

export default function LeaderboardScreen({ results, loading, onBack }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Sorting by: score ↓, percentage ↓, duration ↑</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : results.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No results saved yet</Text>
          </View>
        ) : (
          results.map((item, index) => (
            <View key={item.id ?? `${item.playerName}-${index}`} style={styles.rowCard}>
              <View style={styles.rankBox}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.playerName}>{item.playerName}</Text>
                <Text style={styles.metaText}>
                  {item.score}/{item.totalQuestions} • {item.percentage.toFixed(0)}% • {item.durationSeconds} сек
                </Text>
                <Text style={styles.metaText}>
                  {item.category} • {item.difficulty || 'any'}
                </Text>
                <Text style={styles.metaText}>{new Date(item.finishedAt).toLocaleString()}</Text>
              </View>
            </View>
          ))
        )}

        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
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
    fontSize: 14,
    color: '#60708A',
    marginTop: 6,
    marginBottom: 20,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#42526B',
  },
  rowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  rankBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#2E6BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  infoBox: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 4,
  },
  metaText: {
    color: '#60708A',
    fontSize: 14,
    marginBottom: 2,
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7DFEA',
  },
  backButtonText: {
    color: '#25324A',
    fontSize: 16,
    fontWeight: '700',
  },
});
