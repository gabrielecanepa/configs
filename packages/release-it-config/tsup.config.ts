import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  cjsInterop: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: true,
  splitting: false,
})
