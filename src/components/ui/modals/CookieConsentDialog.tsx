import { CookieConsentForm } from '@/components/forms/CookieConsent';

export function CookieConsentDialog() {
  return (
    <dialog
      aria-labelledby='cookie-consent-title'
      closedby='none'
      className='
        appearance-none z-50 fixed size-full flex justify-center items-end-safe
        bg-transparent backdrop-blur-xs backdrop-brightness-50
        stop-scroll
      '
      open
    >
      <CookieConsentForm />
    </dialog>
  );
}
