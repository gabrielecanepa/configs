import { type Config as PrettierConfig } from 'prettier'
import { type PluginOptions } from 'prettier-plugin-tailwindcss'

import prettierConfig from '.'

const { plugins = [], ...options } = prettierConfig

const tailwindOptions: PluginOptions = {
  tailwindFunctions: ['cn', 'cva', 'tw'],
  tailwindStylesheet: './src/app/globals.css',
}

const tailwindConfig = {
  ...options,
  plugins: [...plugins, 'prettier-plugin-tailwindcss'],
  ...tailwindOptions,
} satisfies PrettierConfig

export default tailwindConfig
export type Config = typeof tailwindConfig
