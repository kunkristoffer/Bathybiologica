"use server"

import { supabaseAdmin } from "@/libs/supabase/client"
import { Contact } from "@/validation/contactForm"

export async function dbPostContact(contact: Contact) {
  // Created a cleaned version of contact
  const contactCleaned: Omit<Contact, "hp" | "consent"> = {
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    subject: contact.subject,
    message: contact.message
  }

  // Attempt db insert, id and created_at will be filled automatically
  return await supabaseAdmin.from("contacts").insert(contactCleaned).select().single()
}
