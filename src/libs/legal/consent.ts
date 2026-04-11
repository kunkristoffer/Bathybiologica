import { getCookieConsent } from "@/actions/legal/cookieConsent";

export async function hasConsent() {
  const cookie = await getCookieConsent()

  if (!cookie) {
    return {
      showConsentDialog: true
    }
  }

  const cookieDate = new Date(cookie.updatedAt)
  const currDate = new Date()

  return {
    showConsentDialog: false
  }
}
