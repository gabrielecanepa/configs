import tsupConfig from '@guello/tsup-config'

export default tsupConfig({
  dts: {
    entry: ['src/index.ts'],
    compilerOptions: {
      removeComments: false,
    },
  },
})
