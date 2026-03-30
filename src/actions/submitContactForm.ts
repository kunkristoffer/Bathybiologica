'use server';

import { discordNewError, discordNewMessage } from '@/libs/discord/actions';
// import { verifyRecaptcha } from '@/libs/recaptcha/verify';
import { dbPostContact } from '@/libs/supabase/actions';
import { ContactSchema, type ContactInput } from '@/validation/contactForm';

export type ContactActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
  values?: Partial<ContactInput>;
};

export async function submitContactForm(
  _prevState: ContactActionState | undefined,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    // Extract form bindings and convert to database schema naming
    const values: ContactInput = {
      first_name: (formData.get('firstName') || '').toString().trim(),
      last_name: (formData.get('lastName') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      subject: (formData.get('subject') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim(),
      hp: (formData.get('hp') || '').toString(),
    };

    // Validate inputs
    const parsed = ContactSchema.safeParse(values);
    if (!parsed.success) {
      const { fieldErrors } = parsed.error.flatten();

      // HP triggered indicating a bot
      if (fieldErrors.hp) {
        return { ok: true, message: "We will contact you soon!" }
      }

      return { ok: false, fieldErrors };
    }

    // Extract reCAPTCHA
    /* const recaptchaToken = (formData.get('recaptchaToken') || '').toString().trim();
    const recaptcha = await verifyRecaptcha({
      token: recaptchaToken,
      expectedAction: 'submit',
      minScore: 0.5,
    }); */

    /* if (!recaptcha.ok) {
      // Recaptcha failed, but for now we'll let them through cause the messages are funny
      await discordNewMessage(parsed.data)
      return { ok: false, message: "We will contact you soon!" }
    } */

    // Pass contact details to db handler
    const dbResult = await dbPostContact(parsed.data)
    if (!dbResult) {
      await discordNewMessage(parsed.data)
      return { ok: false, message: "Unable to store your request, an admin has been notified" }
    }

    // Form was successfully submitted
    await discordNewMessage(parsed.data)
    return { ok: true, message: `We will get in touch as soon as possible ${dbResult?.first_name}!`, values };
  } catch {
    await discordNewError("An unknown error occurred")
    return { ok: false, message: "An unknown error occurred and an admin has been notified" }
  }
}
