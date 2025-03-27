import eslintConfig from './dist'

export default eslintConfig({
  importGroups: [
    ['side-effect', 'side-effect-style'],
    'builtin',
    ['@eslint', 'eslint'],
    'external',
    'internal',
    ['parent', 'index', 'sibling'],
  ],
  maxLines: -1,
  newlineAfterImport: true,
  sortObjectKeys: false,
  typeCheck: false,
})
