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



## Requirements

Before running the project, make sure the following tools are installed.

Required
Node.js
npm
Git
For Android testing
Android Studio
Android SDK
Android Emulator
For iOS testing on macOS
Xcode
Xcode Command Line Tools
iOS Simulator
Installation from scratch

'''This section is written for a user who has nothing installed yet.

## 1. Install Node.js

Install the current LTS version of Node.js from the official Node.js website.
''' 
After installation, check:
node -v
npm -v

## 2. Install Git

Install Git and check:

--version

## 3. Install Android Studio

Install Android Studio.

Then:

Open Android Studio
Install Android SDK if prompted
Open Device Manager
Create an Android virtual device
Start the emulator
## 4. Install Xcode (macOS only)

Install Xcode from the App Store.

Then:

Open Xcode once
Accept the license if needed
Go to:
Xcode > Settings > Locations
Select Command Line Tools
Go to:
Xcode > Settings > Components
Download an iOS Simulator if needed

## 5. Clone the repository

Replace the repository link with your own GitHub link:

git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY

Example:

git clone https://github.com/zhakki/Trivia_React.git
cd Trivia_React
## 6. Install project dependencies

Run:

npm install

This installs all dependencies listed in package.json.

## 7. Start the Expo development server

Run:

npx expo start

If you need to clear the cache:

npx expo start --clear
Run the project on Android
Start the Android emulator in Android Studio
In the project folder run:
npx expo start
After Expo starts, press:
a

This opens the application on Android.

Run the project on iOS

Only available on macOS.

Make sure Xcode and iOS Simulator are installed
In the project folder run:
npx expo start
After Expo starts, press:
i

This opens the application in the iOS Simulator.

Useful commands

Start Expo:

npx expo start

Start Expo and clear cache:

npx expo start --clear

Install dependencies again:

npm install

Check git status:

git status
How the application works
### Home screen

The user can:

enter a player name
choose a category
choose a difficulty level
choose the number of questions
choose time per question
start the quiz
open the leaderboard

### Quiz screen
Questions are shown one by one
The user selects an answer
A timer is shown for each question
The app moves through all questions

### Results screen

After the quiz ends, the app shows:

total score
percentage
player name
category
difficulty
correct answers
incorrect answers
duration
date and time
all selected answers

### Leaderboard screen

The leaderboard displays saved results from SQLite.

## Database logic

The SQLite database is handled in:

src/database/db.ts

This file:

opens the database
creates the results table
inserts quiz results
loads leaderboard records
## API

Questions are loaded from the Open Trivia DB API.
