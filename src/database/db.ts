import * as SQLite from 'expo-sqlite';
import type { QuizResultRecord } from '../types/trivia';

export const db = SQLite.openDatabaseSync('quiz-results.db');

export async function initDB(): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      percentage REAL NOT NULL,
      finished_at TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      incorrect_answers INTEGER NOT NULL,
      category TEXT,
      difficulty TEXT,
      answers_json TEXT
    );
  `);
}

export async function saveResult(result: QuizResultRecord): Promise<void> {
  await db.runAsync(
    `INSERT INTO results (
      player_name,
      score,
      percentage,
      finished_at,
      duration_seconds,
      total_questions,
      correct_answers,
      incorrect_answers,
      category,
      difficulty,
      answers_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    result.playerName,
    result.score,
    result.percentage,
    result.finishedAt,
    result.durationSeconds,
    result.totalQuestions,
    result.correctAnswers,
    result.incorrectAnswers,
    result.category,
    result.difficulty,
    result.answersJson
  );
}

export async function getTopResults(limit = 10): Promise<QuizResultRecord[]> {
  return db.getAllAsync<QuizResultRecord>(
    `SELECT
      id,
      player_name as playerName,
      score,
      percentage,
      finished_at as finishedAt,
      duration_seconds as durationSeconds,
      total_questions as totalQuestions,
      correct_answers as correctAnswers,
      incorrect_answers as incorrectAnswers,
      category,
      difficulty,
      answers_json as answersJson
    FROM results
    ORDER BY score DESC, percentage DESC, duration_seconds ASC, finished_at DESC
    LIMIT ?`,
    limit
  );
}

export async function clearResults(): Promise<void> {
  await db.runAsync('DELETE FROM results');
}
