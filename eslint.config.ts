import guelloConfig from '@guello/eslint-config'

export default guelloConfig({
  ignores: ['apps', 'packages'],
  overrides: [
    {
      rules: {
        'no-template-curly-in-string': 0,
      },
    },
  ],
})
