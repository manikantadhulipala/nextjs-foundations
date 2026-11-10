import { ClientEnvDisplay } from '@/components/client-env-display';
import { Collapsible } from '@/components/collapsible';
import { ServerEnvDisplay } from '@/components/server-env-display';

import { Suspense } from 'react';
import { connection } from 'next/server';

// Request-time content: connection() must sit inside Suspense so the shell can prerender
async function EnvContent() {
  // Render per request so the server reads INTERNAL_CONFIG at runtime, not at build time.
  await connection();

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Environment Variable Demo</h1>
      <Collapsible title="Server-Rendered Content">
        <ServerEnvDisplay />
      </Collapsible>
      <ClientEnvDisplay />
    </main>
  );
}

export default function EnvDemoPage() {
  return (
    <Suspense fallback={<p className="p-4">Loading environment values...</p>}>
      <EnvContent />
    </Suspense>
  );
}
