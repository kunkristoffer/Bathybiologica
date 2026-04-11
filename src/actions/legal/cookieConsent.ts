'use server'

import type { ConsentCookie } from '@/types/legal/consent.types'
import { cookies } from 'next/headers'

export async function setCookieConsent() {
  const cookieStore = await cookies()

  const cookieValue: ConsentCookie = {
    mode: "essential",
    updatedAt: Date.now(),
    version: 1
  }

  cookieStore.set({
    name: 'consent',
    value: JSON.stringify(cookieValue),
  })
}

export async function getCookieConsent() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('consent')

  if (cookie) {
    return JSON.parse(cookie.value) as ConsentCookie
  }

  return null
}
