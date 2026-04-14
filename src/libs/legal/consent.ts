import type { ConsentOptions, ConsentFormOptions, ConsentCookie } from "@/types/legal/consent.types";
import { deleteCookieConsent, getCookieConsent, setCookieConsent } from "@/actions/legal/cookieConsent";

export async function hasConsentCookie() {
  const cookie = await getCookieConsent()

  // Cookie missing or malformed, show cookie consent
  if (!cookie) return {
    showConsentDialog: true
  }

  return {
    showConsentDialog: false,
    cookie
  }
}

export async function setConsent(options: ConsentOptions) {
  if (!options) {
    throw new Error("Custom consent requires categories.");
  }

  const updatedAt = new Date().getTime()
  const version = 1

  let cookie: ConsentCookie = {
    updatedAt,
    version,
    options,
  };

  try {
    await setCookieConsent(cookie)
  } catch (err) {
    console.log(err);
  }
}

export async function hasConsent(option: ConsentFormOptions) {
  const cookie = await getCookieConsent()

  if (!cookie || !cookie.options) return false
  return cookie.options[option] ?? false
}

export async function removeConsentCookie() {
  await deleteCookieConsent()
}
