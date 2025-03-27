import { Context } from './types'

/**
 * Generate release notes filtering by an optional package name.
 */
export const generateReleaseNotes = (packageName?: string) => (context: Context) => {
  const lines = context.changelog?.split('\n').slice(1)
  const chunks = packageName ? lines.filter(line => line.includes(packageName)) : lines
  return chunks.join('\n')
}
