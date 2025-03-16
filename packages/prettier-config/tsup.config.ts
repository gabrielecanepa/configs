import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  cjsInterop: true,
  dts: true,
  entry: ['src/*.ts'],
  format: ['cjs', 'esm'],
  minify: true,
  splitting: false,
  esbuildOptions: options => {
    options.footer = {
      js: 'module.exports = module.exports.default;',
    }
  },
})
