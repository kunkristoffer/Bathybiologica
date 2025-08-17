'use server';
import { ContactSchema, type ContactInput } from '@/validation/contactForm';

export type ContactActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
  values?: Partial<ContactInput>;
};

export async function submitContactForm(
  _prevState: ContactActionState | undefined,
  formData: FormData
): Promise<ContactActionState> {
  const values: ContactInput = {
    firstName: (formData.get('firstName') || '').toString().trim(),
    lastName: (formData.get('lastName') || '').toString().trim(),
    email: (formData.get('email') || '').toString().trim(),
    subject: (formData.get('subject') || '').toString().trim(),
    message: (formData.get('message') || '').toString().trim(),
    hp: (formData.get('hp') || '').toString(),
  };

  const parsed = ContactSchema.safeParse(values);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { ok: false, fieldErrors };
  }

  // TODO: (future) verify reCAPTCHA here:
  // const token = formData.get("g-recaptcha-response")?.toString();
  // if (!(await verifyCaptcha(token))) return { ok:false, message:"Captcha failed" };

  // TODO: (future) send email / enqueue job:
  // await sendEmail(parsed.data)

  return { ok: true, message: 'Thank you! We received your message.', values };
}
