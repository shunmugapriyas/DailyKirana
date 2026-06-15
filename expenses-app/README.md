# Penn Selavu Tracker

A Tamil-first React Native Expo expense tracker for women in Tamil Nadu.

## Features

- Onboarding with Tamil / English language selection
- Monthly income, monthly budget, and savings goal setup
- Home dashboard with today expense, monthly expense, remaining budget, and savings progress
- Add expenses with amount, category, payment mode, note, and date
- Expense history grouped by date with daily / weekly / monthly filters
- Search by note or category and delete expense locally
- Reports with monthly category-wise progress bars, highest spending category, and saving tips
- Settings for language, income, budget, savings goal, and PIN lock placeholder
- OTP login through the Java backend
- Backend-backed expenses and settings
- Auth token cache using AsyncStorage

## Tech Stack

- Expo
- React Native
- TypeScript
- React Navigation
- AsyncStorage

## Project Structure

```txt
src/
  components/      Reusable Header, Button, InputField, ExpenseCard, CategoryCard
  constants/       Theme, categories, Tamil/English translations
  context/         App state and local persistence wiring
  navigation/      React Navigation stack and tabs
  screens/         Onboarding, Home, Add Expense, History, Reports, Settings
  storage/         AsyncStorage helpers
  types/           Shared TypeScript types
  utils/           Date, money, and expense calculations
```

## Run Locally

```sh
npm install
cp .env.example .env
nvm exec 20.19.4 npm run start -- --localhost --port 8081
```

Set `EXPO_PUBLIC_API_URL` in `.env` for dev/prod API targets. Use `http://10.0.2.2:8080/api` for Android emulator and your computer LAN IP for a physical device.
