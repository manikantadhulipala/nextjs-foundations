"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";
import { SubmitButton } from "@/app/ui/submit-button";

const initialState: ContactFormState = {};

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 font-bold text-2xl">Contact Us</h1>

      {/* noValidate: let the server's Zod rules show the errors, not the browser's */}
      <form action={formAction} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block font-medium text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-md border px-3 py-2"
          />
          {state.errors?.name && (
            <p className="mt-1 text-red-600 text-sm" aria-live="polite">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block font-medium text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-md border px-3 py-2"
          />
          {state.errors?.email && (
            <p className="mt-1 text-red-600 text-sm" aria-live="polite">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block font-medium text-sm">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-md border px-3 py-2"
          />
          {state.errors?.message && (
            <p className="mt-1 text-red-600 text-sm" aria-live="polite">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        {state.success && (
          <p className="font-medium text-green-600" aria-live="polite">
            {state.message}
          </p>
        )}

        {state.message && !state.success && (
          <p className="text-red-600" aria-live="polite">
            {state.message}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
