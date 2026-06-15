declare const process: {
  env?: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

export const API_BASE_URL = process.env?.EXPO_PUBLIC_API_URL ?? (__DEV__ ? 'http://localhost:8080/api' : 'https://api.pennselavu.com/api');
