"use server";

import { z } from "zod";

// Validation schema: runs on the server, so the rules can't be bypassed
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Typed state returned to the client (errors are returned, not thrown)
export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // In production: await db.contacts.create(validatedFields.data)
    // In production: await sendEmail(validatedFields.data)
    console.log("Contact form submitted:", validatedFields.data.email);

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    // Log the real error on the server; show users a generic message only
    console.error("Contact form error:", error);
    return {
      message: "Failed to send message. Please try again.",
    };
  }
}
