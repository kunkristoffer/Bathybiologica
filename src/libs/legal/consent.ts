import { getCookieConsent } from "@/actions/legal/cookieConsent";

export async function hasConsent() {
  const cookie = await getCookieConsent()

  // Cookie missing or malformed, show cookie consent
  if (!cookie) return {
    showConsentDialog: true
  }


  const cookieDate = new Date(cookie.updatedAt).getTime()
  const currDate = new Date().getTime()
  const cookieMaxDays = 60

  // Cookie died of old age, show cookie consent again sadge
  if (currDate - cookieDate > (1000 * 60 * 60 * 24 * cookieMaxDays)) return {
    showConsentDialog: true
  }

  // Cookie exist, expose details
  return {
    showConsentDialog: false,
    cookie
  }
}
