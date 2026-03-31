// @vitest-environment node

import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const supabaseUrl = process.env.TEST_SUPABASE_URL!
const supabasePublicKey = process.env.TEST_SUPABASE_PUBLISHABLE_KEY!
const supabaseServiceKey = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY!
const supabaseClientOptions: SupabaseClientOptions<"public">["auth"] = {
  autoRefreshToken: false,
  persistSession: false,
  detectSessionInUrl: false
}

describe("Supabase initialization", () => {
  it("Public client", () => {
    expect(() => createClient(supabaseUrl, supabasePublicKey)).not.toThrow()
  })

  it("Admin client", () => {
    expect(() => createClient(supabaseUrl, supabaseServiceKey, { auth: supabaseClientOptions })).not.toThrow()
  })
})

describe("Supabase functionality", () => {
  // Generate unique IDs for this test suite to avoid conflicts with other tests
  const USER_1_ID = crypto.randomUUID()
  const USER_2_ID = crypto.randomUUID()

  beforeAll(async () => {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, { auth: supabaseClientOptions })

    await supabaseAdmin.auth.admin.createUser({
      id: USER_1_ID,
      email: `user1-${USER_1_ID}@test.com`,
      password: 'password123',
      email_confirm: true,
    })
    await supabaseAdmin.auth.admin.createUser({
      id: USER_2_ID,
      email: `user2-${USER_2_ID}@test.com`,
      password: 'password123',
      email_confirm: true,
    })

    await supabaseAdmin.from('tests').insert([
      { task: 'User 1 Task 1', user_id: USER_1_ID },
      { task: 'User 1 Task 2', user_id: USER_1_ID },
      { task: 'User 2 Task 1', user_id: USER_2_ID },
    ])
  })

  it('Does row level access work', async () => {
    const client = createClient(supabaseUrl, supabasePublicKey)

    // Sign in as User 1
    await client.auth.signInWithPassword({
      email: `user1-${USER_1_ID}@test.com`,
      password: 'password123',
    })

    const { data: todos } = await client.from('tests').select('*')

    expect(todos).toHaveLength(2)
    todos?.forEach((todo) => {
      expect(todo.user_id).toBe(USER_1_ID)
    })
  })

  afterAll(async () => {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, { auth: supabaseClientOptions })

    await supabaseAdmin.rpc('clear_tests')

    await supabaseAdmin.auth.admin.deleteUser(USER_1_ID)
    await supabaseAdmin.auth.admin.deleteUser(USER_2_ID)
  })
})
