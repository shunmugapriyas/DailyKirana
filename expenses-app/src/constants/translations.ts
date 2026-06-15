import type { Language, PaymentMode } from '../types/expense';

type TranslationKey =
  | 'appName'
  | 'tagline'
  | 'language'
  | 'tamil'
  | 'english'
  | 'monthlyIncome'
  | 'monthlyBudget'
  | 'savingsGoal'
  | 'start'
  | 'home'
  | 'history'
  | 'reports'
  | 'settings'
  | 'todayExpense'
  | 'monthlyExpense'
  | 'remainingBudget'
  | 'savingsProgress'
  | 'categorySummary'
  | 'addExpense'
  | 'amount'
  | 'category'
  | 'paymentMode'
  | 'cash'
  | 'upi'
  | 'card'
  | 'note'
  | 'date'
  | 'save'
  | 'cancel'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'search'
  | 'noExpenses'
  | 'delete'
  | 'monthlySpending'
  | 'highestCategory'
  | 'savingTip'
  | 'update'
  | 'pinLock'
  | 'pinPlaceholder'
  | 'spent'
  | 'left'
  | 'requiredFields'
  | 'loginTitle'
  | 'loginSubtitle'
  | 'phoneOrEmail'
  | 'sendOtp'
  | 'otp'
  | 'verifyOtp'
  | 'changeIdentifier'
  | 'devOtp'
  | 'logout';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  ta: {
    appName: 'Penn Selavu Tracker',
    tagline: 'பெண்களுக்கான எளிய செலவு கணக்கு',
    language: 'மொழி',
    tamil: 'தமிழ்',
    english: 'English',
    monthlyIncome: 'மாத வருமானம்',
    monthlyBudget: 'மாத பட்ஜெட்',
    savingsGoal: 'மாத சேமிப்பு இலக்கு',
    start: 'தொடங்கலாம்',
    home: 'முகப்பு',
    history: 'வரலாறு',
    reports: 'அறிக்கை',
    settings: 'அமைப்புகள்',
    todayExpense: 'இன்றைய செலவு',
    monthlyExpense: 'இந்த மாத செலவு',
    remainingBudget: 'மீதமுள்ள பட்ஜெட்',
    savingsProgress: 'சேமிப்பு முன்னேற்றம்',
    categorySummary: 'வகை சுருக்கம்',
    addExpense: 'செலவு சேர்க்க',
    amount: 'தொகை',
    category: 'வகை',
    paymentMode: 'செலுத்தும் முறை',
    cash: 'பணம்',
    upi: 'UPI',
    card: 'கார்டு',
    note: 'குறிப்பு',
    date: 'தேதி',
    save: 'சேமி',
    cancel: 'ரத்து',
    daily: 'தினசரி',
    weekly: 'வாராந்திர',
    monthly: 'மாதாந்திர',
    search: 'குறிப்பு / வகை தேடு',
    noExpenses: 'செலவுகள் இல்லை',
    delete: 'நீக்கு',
    monthlySpending: 'மாத வகை செலவு',
    highestCategory: 'அதிக செலவு வகை',
    savingTip: 'சேமிப்பு குறிப்பு',
    update: 'புதுப்பி',
    pinLock: 'PIN lock',
    pinPlaceholder: 'PIN lock விரைவில் வரும்',
    spent: 'செலவு',
    left: 'மீதம்',
    requiredFields: 'தொகை மற்றும் தேதியை சரியாக உள்ளிடவும்',
    loginTitle: 'உள்நுழையவும்',
    loginSubtitle: 'தொலைபேசி எண் அல்லது email மூலம் OTP பெறுங்கள்',
    phoneOrEmail: 'தொலைபேசி எண் / Email',
    sendOtp: 'OTP அனுப்பு',
    otp: 'OTP',
    verifyOtp: 'OTP சரிபார்க்க',
    changeIdentifier: 'மாற்று',
    devOtp: 'Dev OTP',
    logout: 'வெளியேறு',
  },
  en: {
    appName: 'Penn Selavu Tracker',
    tagline: 'Simple expense tracking for women',
    language: 'Language',
    tamil: 'Tamil',
    english: 'English',
    monthlyIncome: 'Monthly income',
    monthlyBudget: 'Monthly budget',
    savingsGoal: 'Monthly savings goal',
    start: 'Get started',
    home: 'Home',
    history: 'History',
    reports: 'Reports',
    settings: 'Settings',
    todayExpense: "Today's expense",
    monthlyExpense: 'Monthly expense',
    remainingBudget: 'Remaining budget',
    savingsProgress: 'Savings progress',
    categorySummary: 'Category summary',
    addExpense: 'Add expense',
    amount: 'Amount',
    category: 'Category',
    paymentMode: 'Payment mode',
    cash: 'Cash',
    upi: 'UPI',
    card: 'Card',
    note: 'Note',
    date: 'Date',
    save: 'Save',
    cancel: 'Cancel',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    search: 'Search note / category',
    noExpenses: 'No expenses yet',
    delete: 'Delete',
    monthlySpending: 'Monthly category spending',
    highestCategory: 'Highest spending category',
    savingTip: 'Saving tip',
    update: 'Update',
    pinLock: 'PIN lock',
    pinPlaceholder: 'PIN lock coming soon',
    spent: 'Spent',
    left: 'Left',
    requiredFields: 'Please enter a valid amount and date',
    loginTitle: 'Login',
    loginSubtitle: 'Get an OTP using your phone number or email',
    phoneOrEmail: 'Phone number / Email',
    sendOtp: 'Send OTP',
    otp: 'OTP',
    verifyOtp: 'Verify OTP',
    changeIdentifier: 'Change',
    devOtp: 'Dev OTP',
    logout: 'Logout',
  },
};

export const paymentModes: PaymentMode[] = ['cash', 'upi', 'card'];

export function t(language: Language, key: TranslationKey) {
  return translations[language][key];
}
