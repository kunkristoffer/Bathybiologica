export type GoogleVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
};

export type VerifyRecaptchaOptions = {
  token: string;
  expectedAction: string;
  minScore?: number;
  expectedHostname?: string;
};

export type VerifyRecaptchaResult = {
  ok: boolean;
  score: number;
  action?: string;
  hostname?: string;
  errors: string[];
};
