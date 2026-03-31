// @vitest-environment node

import { dbPostContact } from "@/libs/supabase/contact/actions";
import { Contact } from "@/validation/contactForm";
import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseClientOptions: SupabaseClientOptions<"public">["auth"] = {
  autoRefreshToken: false,
  persistSession: false,
  detectSessionInUrl: false
}

describe("Supabase contact form submission", () => {
  let newContactID: number | undefined = undefined
  const newContact: Omit<Contact, "hp" | "consent"> = {
    first_name: "tester",
    last_name: "tests",
    email: "test@teste.com",
    subject: "test",
    message: "This is just a tester",
  }

  it('Stores contact successfully', async () => {
    const { data } = await dbPostContact(newContact as Contact)
    expect(data?.id).toBeGreaterThan(1)
    newContactID = data?.id
  })

  afterAll(async () => {
    if (newContact) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, { auth: supabaseClientOptions })
      const { data } = await supabaseAdmin.from("contacts").delete().eq("id", newContactID).select()
      expect(data?.length).toBe(1)
    }
  })
})
