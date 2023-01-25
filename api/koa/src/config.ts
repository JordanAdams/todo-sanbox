const env = (key: string): string | undefined => process.env[key];

const envWithFallback = (key: string, fallback: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    return fallback;
  }

  return value;
}

export default {
  storeEngine: envWithFallback('STORE_ENGINE', 'MEMORY'),
  authToken: env('AUTH_TOKEN')
}
