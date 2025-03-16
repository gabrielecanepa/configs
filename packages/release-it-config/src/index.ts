import { deepMerge } from '@repo/utils'
import { Config, Options } from './types'

const DEFAULT_OPTIONS: Options = {
  bump: true,
  changelog: false,
  config: {},
  git: true,
  github: true,
  npm: false,
  runBuild: true,
  runCheck: true,
}

const DEFAULT_CONFIG: Config = {
  git: {
    commitMessage: 'chore: release v${version}',
    push: true,
    pushArgs: ['--follow-tags', '--no-verify'],
    requireBranch: 'main',
    requireCleanWorkingDir: false,
    tagName: 'v${version}',
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    releaseNotes: context => context.changelog?.split('\n').slice(1).join('\n'),
  },
}

const DEFAULT_NPM_PUBLISH_CONFIG: Config['npm'] = {
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
    hooks: afterInit.length > 0 ? {
      'after:init': afterInit.join(' && '),
    } : {},
    git: opts.git ? DEFAULT_CONFIG.git : false,
    github: opts.github ? DEFAULT_CONFIG.github : {
      release: false,
    },
    npm: opts.npm ? DEFAULT_NPM_PUBLISH_CONFIG : {
      publish: false,
    },
    plugins: {
      ...(opts.bump ? {
        '@release-it/bumper': {},
      } : {}),
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
    }
  }

  return deepMerge(config, opts.config || {})
}

export default releaseItConfig
export type { Config, Options }
