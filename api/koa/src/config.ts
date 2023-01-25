function env(key: string, fallback: string): string;

function env(key: string, fallback?: string): string | undefined {
  const value = process.env[key];
  if (value === undefined) {
    return fallback;
  }

  return value;
}

export default {
  storeEngine: env('STORE_ENGINE', 'MEMORY')
}
