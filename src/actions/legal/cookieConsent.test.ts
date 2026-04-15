import { type ConsentCookie } from '@/types/legal/consent.types'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setCookieConsent, getCookieConsent, deleteCookieConsent, } from '@/actions/legal/cookieConsent'

const mockCookieStore = {
  set: vi.fn(),
  get: vi.fn(),
  getAll: vi.fn(),
  delete: vi.fn(),
}

vi.mock('next/headers', () => {
  return {
    cookies: vi.fn(async () => mockCookieStore),
  }
})

describe('cookie consent server actions', () => {
  const now = new Date('2026-04-15T12:00:00.000Z').getTime()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(now)

    mockCookieStore.get.mockReturnValue(undefined)
    mockCookieStore.getAll.mockReturnValue([])
  })

  it('setCookieConsent stores the consent cookie', async () => {
    const cookie = {
      updatedAt: now,
      version: 1,
      options: {
        cookieConsent: true
      }
    } satisfies ConsentCookie

    await setCookieConsent(cookie)

    expect(mockCookieStore.set).toHaveBeenCalledTimes(1)
    expect(mockCookieStore.set).toHaveBeenCalledWith({
      name: 'consent',
      maxAge: 60 * 60 * 24 * 60,
      value: JSON.stringify(cookie),
    })
  })

  it('getCookieConsent returns null when cookie is missing', async () => {
    mockCookieStore.get.mockReturnValue(undefined)

    const result = await getCookieConsent()

    expect(result).toBeNull()
  })

  it('getCookieConsent returns parsed cookie when valid', async () => {
    const cookie = {
      mode: 'all',
      updatedAt: now,
      version: 1,
    }

    mockCookieStore.get.mockReturnValue({
      name: 'consent',
      value: JSON.stringify(cookie),
    })

    const result = await getCookieConsent()

    expect(result).toEqual(cookie)
  })

  it('getCookieConsent returns null when cookie is expired', async () => {
    const sixtyDaysMs = 1000 * 60 * 60 * 24 * 60

    const expiredCookie = {
      mode: 'all',
      updatedAt: now - sixtyDaysMs - 1,
      version: 1,
    }

    mockCookieStore.get.mockReturnValue({
      name: 'consent',
      value: JSON.stringify(expiredCookie),
    })

    const result = await getCookieConsent()

    expect(result).toBeNull()
  })

  it('getCookieConsent returns null when JSON is invalid', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    mockCookieStore.get.mockReturnValue({
      name: 'consent',
      value: '{bad json}',
    })

    const result = await getCookieConsent()

    expect(result).toBeNull()
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })

  it('getCookieConsent returns null when cookieStore.get throws', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    mockCookieStore.get.mockImplementation(() => {
      throw new Error('get failed')
    })

    const result = await getCookieConsent()

    expect(result).toBeNull()
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })

  it('deleteCookieConsent deletes every cookie returned by getAll', async () => {
    mockCookieStore.getAll.mockReturnValue([
      { name: 'consent', value: 'x' },
      { name: 'theme', value: 'dark' },
      { name: 'locale', value: 'no' },
    ])

    await deleteCookieConsent()

    expect(mockCookieStore.delete).toHaveBeenCalledTimes(3)
    expect(mockCookieStore.delete).toHaveBeenNthCalledWith(1, 'consent')
    expect(mockCookieStore.delete).toHaveBeenNthCalledWith(2, 'theme')
    expect(mockCookieStore.delete).toHaveBeenNthCalledWith(3, 'locale')
  })

  it('deleteCookieConsent logs when getAll throws', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    mockCookieStore.getAll.mockImplementation(() => {
      throw new Error('getAll failed')
    })

    await deleteCookieConsent()

    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })
})
