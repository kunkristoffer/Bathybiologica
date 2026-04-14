import type { ConsentOptions, ConsentFormOptions, ConsentMode, ConsentCookie } from "@/types/legal/consent.types";
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

export async function setConsent(mode: ConsentMode, options?: ConsentOptions) {
  const updatedAt = new Date().getTime()
  const version = 1
  let cookie: ConsentCookie;

  if (mode === "custom") {
    if (!options) {
      throw new Error("Custom consent requires categories.");
    }

    cookie = {
      mode: "custom",
      updatedAt,
      version,
      categories: options,
    };
  } else {
    cookie = { mode, updatedAt, version, };
  }
  try {
    const test = await setCookieConsent(cookie)
    console.log(test);
  } catch (err) {
    console.log(err);
  }
}

export async function hasConsent(option: ConsentFormOptions) {
  const cookie = await getCookieConsent()

  if (!cookie) return false
  if (cookie.mode === "all") { return true }
  if (cookie.mode === "essential") {
    const allowed: Partial<ConsentFormOptions>[] = ["theme", "cookieConsent", "locale"]
    return allowed.includes(option) ? true : false
  }
  if (cookie.mode === "custom" && cookie.categories) {
    return cookie.categories[option]
  }

  return false
}

export async function removeConsentCookie() {
  await deleteCookieConsent()
}
