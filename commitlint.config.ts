import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'

import { workspaces } from './package.json'

const SCOPES = ['deps', 'deps-dev', 'infra', 'security']
const packages = workspaces.map(workspace => workspace.replace('packages/', ''))

export default {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [RuleConfigSeverity.Disabled],
    'scope-enum': [RuleConfigSeverity.Error, 'always', [...SCOPES, ...packages]],
  },
} satisfies UserConfig
