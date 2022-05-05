/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRYPTO_ZOMBIES_ADDRESS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
