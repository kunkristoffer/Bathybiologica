import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { verifyRecaptcha } from "@/libs/recaptcha/verify";

const googleVerifyUrl = "https://www.google.com/recaptcha/api/siteverify"

describe("Recaptcha validation", () => {
  const handlers = [
    http.post(googleVerifyUrl, async (res) => {
      // Base response
      const response = {
        success: true,
        score: 0.5,
        action: 'submit'
      }

      // Catch empty token
      const resText = await res.request.text()
      const variables = new URLSearchParams(resText)
      const token = variables.get("response")
      if (!token) {
        response.success = false
      }

      return HttpResponse.json(response)
    }),
  ]
  const server = setupServer(...handlers)

  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  // Reset handlers after each test for test isolation
  afterEach(() => server.resetHandlers())

  // Close server after all tests
  afterAll(() => server.close())

  it("Server side verification works", async () => {
    const result = await verifyRecaptcha({ token: "testToken", expectedAction: "submit", minScore: 0.5 })
    expect(result.ok).toBe(true)
  })

  it("Fails on too low score", async () => {
    const result = await verifyRecaptcha({ token: "testToken", expectedAction: "submit", minScore: 0.6 })
    expect(result.ok).toBe(false)
  })

  it("Fails on missing token", async () => {
    const result = await verifyRecaptcha({ token: "", expectedAction: "submit" })
    expect(result.ok).toBe(false)
  })
})
