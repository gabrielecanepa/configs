import { type Config as ReleaseItConfig } from 'release-it'

export interface Context {
  changelog?: string
  version: string
}

export interface Config extends Omit<ReleaseItConfig, 'git' | 'github'> {
  git?: ReleaseItConfig['git'] | boolean
  github?: ReleaseItConfig['github'] & {
    releaseNotes?: (context: Context) => string | undefined
  }
}

export interface Options {
  /**
   * Whether to bump the version.
   * @default true
   */
  bump?: boolean
  /**
   * Whether to generate a changelog file.
   * @default false
   */
  changelog?: boolean
  /**
   * Configuration overrides.
   * @default true
   */
  config?: Config
  /**
   * Whether to use git.
   * @default true
   */
  git?: boolean
  /**
   * Whether to release to GitHub.
   * @default true
   */
  github?: boolean
  /**
   * Name of the package used in the release title and notes.
   */
  name?: string
  /**
   * Whether to publish the package to npm.
   * @default false
   */
  npm?: boolean
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
