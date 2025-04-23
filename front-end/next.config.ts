import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // middleware: true, // Removido porque não é uma propriedade válida no tipo 'ExperimentalConfig'
  },
  /* config options here */
};
