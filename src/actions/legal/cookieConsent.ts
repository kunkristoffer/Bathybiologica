'use server'

import type { ConsentCookie } from '@/types/legal/consent.types'
import { cookies } from 'next/headers'

export async function setCookieConsent(cookie: ConsentCookie) {
  const cookieStore = await cookies()

  try {
    cookieStore.set({
      name: 'consent',
      value: JSON.stringify(cookie),
    })
  } catch (error) {
    console.error(error)
  }
}

export async function getCookieConsent() {
  const cookieStore = await cookies()

  try {
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

export async function deleteCookieConsent() {
  const cookieStore = await cookies()

  try {
    cookieStore.delete("consent")
  } catch (err) {
    console.error(err)
  }
}
