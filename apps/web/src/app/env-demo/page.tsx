import { ClientEnvDisplay } from '@/components/client-env-display';
import { Collapsible } from '@/components/collapsible';
import { ServerEnvDisplay } from '@/components/server-env-display';

// Render per request so the server reads INTERNAL_CONFIG at runtime, not at build time.
export const dynamic = 'force-dynamic';

export default function EnvDemoPage() {
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
