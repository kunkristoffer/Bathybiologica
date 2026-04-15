import type { ConsentCookie, ConsentOptions } from '@/types/legal/consent.types'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { hasConsentCookie, setConsent, checkConsent, removeConsentCookie, } from '@/libs/legal/consent'

vi.mock('@/actions/legal/cookieConsent', () => ({
  deleteCookieConsent: vi.fn(),
  getCookieConsent: vi.fn(),
  setCookieConsent: vi.fn(),
}))

import {
  deleteCookieConsent,
  getCookieConsent,
  setCookieConsent,
} from '@/actions/legal/cookieConsent'

describe('cookie consent helper functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-15T12:00:00.000Z'))
  })

  describe('hasConsentCookie', () => {
    it('returns showConsentDialog: true when no cookie exists', async () => {
      vi.mocked(getCookieConsent).mockResolvedValue(null)

      const result = await hasConsentCookie()

      expect(result).toEqual({
        showConsentDialog: true,
      })
    })

    it('returns showConsentDialog: false and cookie when cookie exists', async () => {
      const cookie = {
        updatedAt: new Date().getTime(),
        version: 1,
        options: {
          locale: true,
          cookieConsent: true,
          reCAPTCHA: false,
          theme: true
        },
      } satisfies ConsentCookie

      vi.mocked(getCookieConsent).mockResolvedValue(cookie)

      const result = await hasConsentCookie()

      expect(result).toEqual({
        showConsentDialog: false,
        cookie,
      })
    })
  })

  describe('setConsent', () => {
    it('calls setCookieConsent with updatedAt, version and options', async () => {
      const options = {
        locale: true,
        cookieConsent: true,
        reCAPTCHA: false,
        theme: true
      } satisfies ConsentOptions

      await setConsent(options)

      expect(setCookieConsent).toHaveBeenCalledTimes(1)
      expect(setCookieConsent).toHaveBeenCalledWith({
        updatedAt: new Date().getTime(),
        version: 1,
        options,
      })
    })

    it('throws if options is missing', async () => {
      await expect(setConsent(undefined as never)).rejects.toThrow(
        'Custom consent requires categories.'
      )
    })

    it('logs error if setCookieConsent fails', async () => {
      const options = {
        locale: true,
        cookieConsent: true,
        reCAPTCHA: false,
        theme: true
      } satisfies ConsentOptions

      const error = new Error('set failed')
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

      vi.mocked(setCookieConsent).mockRejectedValue(error)

      await expect(setConsent(options)).resolves.toBeUndefined()
      expect(logSpy).toHaveBeenCalledWith(error)

      logSpy.mockRestore()
    })
  })

  describe('checkConsent', () => {
    it('returns false when cookie is missing', async () => {
      vi.mocked(getCookieConsent).mockResolvedValue(null)

      const result = await checkConsent('locale')

      expect(result).toBe(false)
    })

    it('returns false when cookie has no options', async () => {
      vi.mocked(getCookieConsent).mockResolvedValue({
        updatedAt: new Date().getTime(),
        version: 1,
      } as never)

      const result = await checkConsent('locale')

      expect(result).toBe(false)
    })

    it('returns true when the specific consent option is enabled', async () => {
      vi.mocked(getCookieConsent).mockResolvedValue({
        updatedAt: new Date().getTime(),
        version: 1,
        options: {
          locale: true,
          cookieConsent: false,
          reCAPTCHA: false,
          theme: false,
        },
      })

      const result = await checkConsent('locale')

      expect(result).toBe(true)
    })

    it('returns false when the specific consent option is disabled', async () => {
      vi.mocked(getCookieConsent).mockResolvedValue({
        updatedAt: new Date().getTime(),
        version: 1,
        options: {
          locale: true,
          cookieConsent: false,
          reCAPTCHA: false,
          theme: false,
        },
      })

      const result = await checkConsent('reCAPTCHA')

      expect(result).toBe(false)
    })

    it('returns false when the option is missing from the cookie', async () => {
      vi.mocked(getCookieConsent).mockResolvedValue({
        updatedAt: new Date().getTime(),
        version: 1,
        options: {
          locale: true,
        },
      } as never)

      const result = await checkConsent('reCAPTCHA')

      expect(result).toBe(false)
    })
  })

  describe('removeConsentCookie', () => {
    it('calls deleteCookieConsent', async () => {
      await removeConsentCookie()

      expect(deleteCookieConsent).toHaveBeenCalledTimes(1)
    })
  })
})
