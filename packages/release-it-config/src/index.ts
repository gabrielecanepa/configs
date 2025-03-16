import { type Config as ReleaseItConfig } from 'release-it'

import { deepMerge } from '@repo/utils'

interface Context {
  changelog?: string
  version: string
}

interface Config extends ReleaseItConfig {
  github?: ReleaseItConfig['github'] & {
    releaseNotes?: (context: Context) => string | undefined
  }
}

interface Options {
  /**
   * Whether to generate a changelog file.
   * @default false
   */
  changelog?: boolean
  /**
   * Whether to release to GitHub.
   * @default true
   */
  github?: boolean
  /**
   * Whether to release to npm.
   * @default false
   */
  npm?: boolean
  /**
   * Configuration overrides.
   * @default true
   */
  overrides?: Config
  /**
   * Whether to run the build command before initializing release-it.
   * @default true
   */
  runBuild?: boolean
  /**
   * Whether to run the check command before initializing release-it.
   * @default true
   */
  runCheck?: boolean
}

const DEFAULT_OPTIONS: Options = {
  changelog: false,
  github: true,
  npm: false,
  overrides: {},
  runBuild: true,
  runCheck: true,
}

const releaseItConfig = (options: Options = {}) => {
  const { changelog, github: githubOption, npm: npmOption, overrides, runBuild, runCheck } = { ...DEFAULT_OPTIONS, ...options }

  const initCommands = []
  if (runBuild) initCommands.push('pnpm build')
  if (runCheck) initCommands.push('pnpm check')

  const hooks =
    initCommands.length > 0
      ? {
          'after:init': initCommands.join(' && '),
        }
      : {}

  const github = !!githubOption
    ? {
        release: true,
        releaseName: 'v${version}',
        releaseNotes: (context: Context) => context.changelog?.split('\n').slice(1).join('\n'),
      }
    : {
        release: false,
      }

  return deepMerge(
    {
      hooks,
      git: {
        commitMessage: 'chore: release v${version}',
        push: true,
        pushArgs: ['--follow-tags', '--no-verify'],
        requireBranch: 'main',
        tagName: 'v${version}',
      },
      github,
      npm: {
        publish: !!npmOption,
      },
      plugins: {
        '@release-it/bumper': {},
        ...(changelog
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
    },
    overrides || {},
  )
}

export default releaseItConfig
export type { Config, Options }
