import { Database } from "@/types/supabase.types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const supabaseUrl = process.env.TEST_SUPABASE_URL!
const supabasePublicKey = process.env.TEST_SUPABASE_PUBLISHABLE_KEY!
const supabaseServiceKey = process.env.TEST_SUPABASE_SERVICE_ROLE_KEY!

describe("Supabase initialization", () => {
  it("Public client", () => {
    expect(() => createClient(supabaseUrl, supabasePublicKey))
  })

  it("Admin client", () => {
    expect(() => createClient(supabaseUrl, supabaseServiceKey))
  })
})

describe("Supabase functionality", () => {
  // Generate unique IDs for this test suite to avoid conflicts with other tests
  const USER_1_ID = crypto.randomUUID()
  const USER_2_ID = crypto.randomUUID()

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  beforeAll(async () => {
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

  afterAll(async () => {
    await supabaseAdmin.rpc('clear_tests')

    await supabaseAdmin.auth.admin.deleteUser(USER_1_ID)
    await supabaseAdmin.auth.admin.deleteUser(USER_2_ID)
  })

  const client = createClient(supabaseUrl, supabasePublicKey)

  it('Does row level access work', async () => {
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
})
