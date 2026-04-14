# Trivia Quiz App

A cross-platform mobile quiz application built with **React Native**, **Expo**, **TypeScript**, **SQLite**, and the **Open Trivia DB API**.

## Project overview

This application allows the user to:

- enter a player name
- choose a quiz category
- choose a difficulty level
- choose the number of questions
- choose time per question
- answer questions one by one
- see the final result
- save results in a local SQLite database
- view saved results in the leaderboard

The app loads quiz questions from the Trivia API and stores the quiz results locally using SQLite.

---

## Main features

### Question loading
- Questions are loaded from the Trivia API
- The user can choose a question category
- The user can choose a difficulty level
- Questions may be multiple choice or true/false

### App screens
- Home screen
- Quiz screen
- Results screen
- Leaderboard screen

### Quiz flow
1. The user selects a category, difficulty, number of questions, and time limit
2. The user answers questions one by one
3. After the last question, the app shows the final result
4. The user can restart the quiz

### Additional functionality
- Timer for each question
- Leaderboard with saved results
- SQLite database for storing results

---

## Data stored in SQLite

The application stores the following result data:

- player name
- score
- percentage
- date and time
- duration in seconds
- total number of questions
- correct answers
- incorrect answers
- selected category
- selected difficulty
- answers in JSON format

Database file:
- `quiz-results.db`

Table:
- `results`

---

## Technologies used

- React Native
- Expo
- TypeScript
- SQLite
- Open Trivia DB API
- react-native-safe-area-context
- @react-native-picker/picker

---

## Project structure

```text
QuizApp/
├─ App.tsx
└─ src/
   ├─ database/
   │  └─ db.ts
   ├─ screens/
   │  ├─ HomeScreen.tsx
   │  ├─ QuizScreen.tsx
   │  ├─ ResultScreen.tsx
   │  └─ LeaderboardScreen.tsx
   ├─ services/
   │  └─ triviaApi.ts
   └─ types/
      └─ trivia.ts
