import { createContext } from 'react';

export type RecaptchaContextValue = {
  ready: boolean;
  executeRecaptcha: (action: string) => Promise<string>;
};

export const RecaptchaContext = createContext<RecaptchaContextValue | null>(null);
