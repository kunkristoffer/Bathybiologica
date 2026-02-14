import { supabase } from "@/libs/supabase/client"
import { Contact } from "@/validation/contactForm"

export async function dbPostContact(contact: Contact) {
  try {
    // Remove honneypot if somehow supplied
    const { hp, ...contactCleaned } = contact

    // Attempt db insert, id and created_at will be filled automatically
    const { data, error } = await supabase.from("contacts").insert(contactCleaned).select()

    // Propigate errors to caller
    if (error) {
      throw error
    }

    // Return data in case we want to check id/timestamp
    return data.length ? data.at(0) : undefined
  } catch (err) {
    throw err
  }
}
