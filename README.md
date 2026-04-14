# Trivia Quiz App

## Description

**Trivia Quiz App** is a cross-platform mobile quiz application built with **React Native**, **Expo**, **TypeScript**, **SQLite**, and the **Open Trivia DB API**.

The application allows the user to:
- enter a player name
- choose a quiz category
- choose a difficulty level
- choose the number of questions
- choose time per question
- answer questions one by one
- see the final result
- save quiz results in a local SQLite database
- open the leaderboard with saved records

The app loads quiz questions from the Trivia API and stores results locally using SQLite.

---

## Main functionality

### Quiz settings
The user can:
- enter a player name
- choose a category
- choose a difficulty level
- choose the number of questions
- choose the time limit for each question

### Quiz process
- questions are displayed one by one
- each question has answer options
- a timer is shown for every question
- after the last question, the app shows the result
- the user can restart the quiz

### Results
The application shows:
- score
- percentage
- total number of questions
- correct answers
- incorrect answers
- quiz duration
- date and time
- all selected answers

### Leaderboard
The leaderboard stores and displays saved quiz results.

---

## Screens

The application contains the following screens:

- **Home Screen**  
  Main menu with player name input, category selection, difficulty selection, number of questions, time per question, start button, and leaderboard button.

- **Quiz Screen**  
  Questions are shown one by one with answer buttons and a timer.

- **Result Screen**  
  Displays the final quiz result and detailed answers.

- **Leaderboard Screen**  
  Displays saved results from the SQLite database.

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

## Database

The application uses a local SQLite database.

### Database file
- `quiz-results.db`

### Table
- `results`

### Stored data
The application stores:
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
```
# Requirements

Before running the project, make sure the following tools are installed.

### Required for all users
-Node.js
-npm
-Git

### Required for Android testing
-Android Studio
-Android SDK
-Android Emulator
### Required for iOS testing on macOS
-Xcode
-Xcode Command Line Tools
-iOS Simulator

## Installation and setup
## 1. Install Node.js

Install the current LTS version of Node.js.

After installation, check:

```
node -v
npm -v
```
## 2. Install Git

Check if Git is installed:

```
git --version
```
## 3. Install Android Studio

Install Android Studio if you want to run the project on Android.

1. Open Android Studio
2. Install Android SDK if needed
3. Open Device Manager
4. Create an emulator
5. Start the Android emulator

## 4. Install Xcode (macOS only)

Install Xcode if you want to run the project on iOS.
1. Open Xcode
2. Accept the license if needed
3. Open:
```
Xcode > Settings > Locations
```
4. Select Command Line Tools
5. Open:
```
Xcode > Settings > Components
```
6. Install an iOS Simulator if needed

## 5. Clone the repository
```
git clone https://github.com/zhakki/Trivia_React.git
cd Trivia_React
```
## 6. Install project dependencies

Run:
```
npm install
```

This command installs all dependencies from package.json.

You do not need to install React Native, Expo SQLite, Picker, or Safe Area Context manually one by one if you are running the existing repository.

Main dependencies used in this project:

-expo
-react
-react-native
-expo-sqlite
-react-native-safe-area-context
-@react-native-picker/picker

## 7. Start the Expo development server

Run:
```
npx expo start
```
If needed, clear the cache:
```
npx expo start --clear
```
# Run the application on Android
1. Start the Android emulator in Android Studio
2. In the project folder run:
```
npx expo start
```
3. After Expo starts, press:
```
a
```
This opens the application on Android.

# Run the application on iOS

Only available on macOS.
1. Make sure Xcode and iOS Simulator are installed
2. In the project folder run:
 ```
npx expo start
```
3. After Expo starts, press:
```
i
```
This opens the application in the iOS Simulator.

# Useful commands
Start Expo
```
npx expo start
```
Start Expo and clear cache
```
npx expo start --clear
```
Install dependencies again
```
npm install
```
Check project status
```
git status
```
# How to use the application
## Step 1. Open the Home Screen

The user opens the application and sees the main menu.

## Step 2. Enter player name

The user enters a name in the input field.

## Step 3. Choose quiz settings

The user selects:
- category
- difficulty
- number of questions
- time per question

## Step 4. Start the quiz

The user presses Start the quiz.

## Step 5. Answer the questions

Questions are displayed one by one.
The user selects an answer for each question.

## Step 6. View the result

After the quiz ends, the application shows:
- score
- percentage
- total answers
- correct and incorrect answers
- quiz duration
- detailed answer list
  
## Step 7. Open the leaderboard

The user can open the leaderboard and see saved results.

# How the database works

The SQLite database logic is stored in:

```
src/database/db.ts
```

This file:
- opens the database
- creates the results table
- saves quiz results
- loads saved records for the leaderboard

# API
Questions are loaded from the Open Trivia DB API.

# Repository
https://github.com/zhakki/Trivia_React
Author
Name: zhakki
Project: Trivia Quiz App
