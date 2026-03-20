import { describe, expect, it, test } from 'vitest'
import { Contact, ContactSchema, ContactInput } from "./contactForm"



describe("Contact form validation", () => {
  const CONTACT_BASE: Contact = {
    first_name: "Ola",
    last_name: "Nordmann",
    email: "ola@nordman.no",
    subject: "Dette er et test emne",
    message: "Dette er en test melding",
    hp: ""
  }

  it("Valid contact parses", () => {
    const contact = { ...CONTACT_BASE }

    const parsed = ContactSchema.safeParse(contact);
    expect(parsed.data).toStrictEqual(contact)
  })

  it("Honeypot triggers error", () => {
    const contact = { ...CONTACT_BASE }
    contact.hp = "test"

    const parsed = ContactSchema.safeParse(contact);
    expect(parsed.success).toBe(false)
  })

  it("Missing name triggers error", ()=>{
    const contact = { ...CONTACT_BASE }
    contact.first_name = ""

    const parsed = ContactSchema.safeParse(contact);
    expect(parsed.success).toBe(false)
  })

  it("Too short message triggers error", ()=>{
    const contact = { ...CONTACT_BASE }
    contact.message = "123456789"

    const parsed = ContactSchema.safeParse(contact);
    expect(parsed.success).toBe(false)
  })
})
