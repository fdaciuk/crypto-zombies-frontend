const env = {
  CRYPTO_ZOMBIES_ADDRESS: import.meta.env.VITE_CRYPTO_ZOMBIES_ADDRESS,
}

export const getEnv = (envVar: keyof typeof env) => {
  const internalEnvVar = env[envVar]
  if (typeof internalEnvVar === 'undefined') {
    throw new Error(`You must define ${envVar} environment varible before using it`)
  }

  return internalEnvVar
}
