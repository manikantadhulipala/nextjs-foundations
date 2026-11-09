'use client';

import { useEffect, useState } from 'react';

export function ClientEnvDisplay() {
  const [clicks, setClicks] = useState(0);
  // Client Components are also rendered on the server, where INTERNAL_CONFIG exists.
  // Read it only after mount so server HTML and the first client render match.
  const [internalConfig, setInternalConfig] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setInternalConfig(process.env.INTERNAL_CONFIG);
  }, []);

  return (
    <div className="border p-4 rounded">
      <h3 className="font-bold">Client Component Env Access</h3>
      <p>Public: {process.env.NEXT_PUBLIC_APP_NAME}</p>
      <p>Server-only: {internalConfig || 'undefined'}</p>
      <button
        type="button"
        onClick={() => setClicks(clicks + 1)}
        className="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
      >
        Clicked {clicks} times
      </button>
    </div>
  );
}
