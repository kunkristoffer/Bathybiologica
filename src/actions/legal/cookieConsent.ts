'use server'

import type { ConsentCookie } from '@/types/legal/consent.types'
import { cookies } from 'next/headers'

export async function setCookieConsent() {
  try {
    const cookieStore = await cookies()

    const cookieValue: ConsentCookie = {
      mode: "all",
      updatedAt: Date.now(),
      version: 1
    }

    cookieStore.set({
      name: 'consent',
      value: JSON.stringify(cookieValue),
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
      return consentValue
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
