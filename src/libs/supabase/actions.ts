"use server"

import { supabaseAdmin } from "@/libs/supabase/client"
import { Contact } from "@/validation/contactForm"

export async function dbPostContact(contact: Contact) {
  try {
    // Remove honeypot if somehow supplied and strip consent
    const { hp, consent, ...contactCleaned } = contact

    // Attempt db insert, id and created_at will be filled automatically
    const { data, error } = await supabaseAdmin.from("contacts").insert(contactCleaned).select()

    // Propagate errors to caller
    if (error) {
      throw error
    }

    // Return data in case we want to check id/timestamp
    return data.length ? data.at(0) : undefined
  } catch (err) {
    throw err
  }
}
