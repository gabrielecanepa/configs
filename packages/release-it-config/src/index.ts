import { deepMerge } from '@repo/utils'

import { Config, Context, Options } from './types'
import { generateReleaseNotes } from './utils'

const DEFAULT_OPTIONS: Options = {
  bump: true,
  changelog: false,
  config: {},
  git: true,
  github: true,
  name: undefined,
  npm: false,
  runBuild: true,
  runCheck: true,
}

const DEFAULT_GIT_CONFIG: Config['git'] = {
  commitMessage: 'chore: release v${version}',
  push: true,
  pushArgs: ['--follow-tags', '--no-verify'],
  requireBranch: 'main',
  requireCleanWorkingDir: false,
  tagName: 'v${version}',
}

const DEFAULT_NPM_CONFIG: Config['npm'] = {
  publish: true,
  publishPath: 'dist',
  skipChecks: true,
}

const releaseItConfig = (options: Options = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  const afterInit = []
  if (opts.runBuild) afterInit.push('pnpm build')
  if (opts.runCheck) afterInit.push('pnpm check')

  const config: Config = {
    hooks:
      afterInit.length > 0
        ? {
            'after:init': afterInit.join(' && '),
          }
        : {},
    git: opts.git ? DEFAULT_GIT_CONFIG : false,
    github: opts.github
      ? opts.name
        ? {
            releaseName: '${name}@${version}',
            releaseNotes: generateReleaseNotes(opts.name),
          }
        : {
            releaseName: 'v${version}',
            releaseNotes: generateReleaseNotes(),
          }
      : {
          release: false,
        },
    npm: opts.npm
      ? DEFAULT_NPM_CONFIG
      : {
          publish: false,
        },
    plugins: {
      ...(opts.bump
        ? {
            '@release-it/bumper': {},
          }
        : {}),
      ...(opts.changelog
        ? {
            '@release-it/conventional-changelog': {
              header: '# Changelog',
              infile: 'CHANGELOG.md',
              preset: {
                name: 'conventionalcommits',
              },
            },
          }
        : {}),
    },
  }

  return deepMerge(config, opts.config || {})
}

export default releaseItConfig
export type { Config, Context, Options }
