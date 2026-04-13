'use server'

import type { ConsentCookie } from '@/types/legal/consent.types'
import { cookies } from 'next/headers'

export async function setCookieConsent(cookie: ConsentCookie) {
  try {
    const cookieStore = await cookies()

    cookieStore.set({
      name: 'consent',
      value: JSON.stringify(cookie),
    })
  } catch (error) {
    console.error(error)
  }
}

export async function getCookieConsent() {
  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('consent')

    if (cookie && cookie.value) {
      const consentValue = JSON.parse(cookie.value) as ConsentCookie

      const currDate = new Date().getTime()
      const cookieMaxDays = 60
      if (currDate - consentValue.updatedAt > (1000 * 60 * 60 * 24 * cookieMaxDays)) return null

      return consentValue
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
