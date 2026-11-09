"use client";

import { useActionState, useEffect, useState } from "react";
import {
  type ContactFormState,
  submitContactForm,
} from "@/app/actions/contact";
import { SubmitButton } from "@/app/ui/submit-button";

const initialState: ContactFormState = {};
const DRAFT_KEY = "contact-form-draft";

type Draft = { name: string; email: string; message: string };
const emptyDraft: Draft = { name: "", email: "", message: "" };

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  // Server HTML and the first client render both use the empty draft,
  // so there is no hydration mismatch. The saved draft is loaded after mount.
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) setDraft({ ...emptyDraft, ...JSON.parse(saved) });
    } catch {
      // Ignore unreadable drafts and start empty
    }
    setRestored(true);
  }, []);

  // Save the draft on every change, once it has been restored
  useEffect(() => {
    if (!restored) return;
    const isEmpty = !draft.name && !draft.email && !draft.message;
    if (isEmpty) {
      sessionStorage.removeItem(DRAFT_KEY);
    } else {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }
  }, [draft, restored]);

  // A successful submit clears the saved draft
  useEffect(() => {
    if (state.success) {
      sessionStorage.removeItem(DRAFT_KEY);
      setDraft(emptyDraft);
    }
  }, [state.success]);

  const update = (field: keyof Draft, value: string) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

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
            value={draft.name}
            onChange={(e) => update("name", e.target.value)}
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
            value={draft.email}
            onChange={(e) => update("email", e.target.value)}
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
            value={draft.message}
            onChange={(e) => update("message", e.target.value)}
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
