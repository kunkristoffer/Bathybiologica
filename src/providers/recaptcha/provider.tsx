// src/components/providers/recaptcha-provider.tsx
'use client';

import { RecaptchaContext } from '@/providers/recaptcha/context';
import Script from 'next/script';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

export function RecaptchaProvider({ children }: { children: ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [ready, setReady] = useState(false);

  const markReady = useCallback(() => {
    if (!window.grecaptcha) return;

    window.grecaptcha.ready(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    markReady();
  }, [markReady]);

  const executeRecaptcha = useCallback(
    async (action: string) => {
      if (!siteKey) {
        throw new Error('Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY');
      }

      const ACTION_PATTERN = /^[A-Za-z0-9/_]+$/;
      if (!ACTION_PATTERN.test(action)) {
        throw new Error('Invalid reCAPTCHA action. Use only letters, numbers, slashes, and underscores.');
      }

      const grecaptcha = window.grecaptcha;

      if (!grecaptcha) {
        throw new Error('reCAPTCHA has not loaded yet');
      }

      return await new Promise<string>((resolve, reject) => {
        grecaptcha.ready(() => {
          grecaptcha.execute(siteKey, { action }).then(resolve).catch(reject);
        });
      });
    },
    [siteKey]
  );

  const value = useMemo(
    () => ({
      ready,
      executeRecaptcha,
    }),
    [ready, executeRecaptcha]
  );

  return (
    <RecaptchaContext.Provider value={value}>
      {siteKey ? (
        <Script
          id='google-recaptcha'
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy='afterInteractive'
          onReady={markReady}
          onError={() => setReady(false)}
        />
      ) : null}

      {children}
    </RecaptchaContext.Provider>
  );
}
