import type { ConsentFormOptions, ConsentFormOptionsNames, ConsentMode, ConsentCookie } from "@/types/legal/consent.types";
import { getCookieConsent, setCookieConsent } from "@/actions/legal/cookieConsent";

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

export async function setConsent(mode: ConsentMode, options?: ConsentFormOptions) {
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
