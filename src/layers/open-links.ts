import { env } from 'node:process'
import { ToEvent } from 'karabiner.ts'
import { toSafari } from '../utils/to-safari'
import { toArc } from '../utils/to-arc'

const workGitHubOrg = env.WORK_GH_ORG! 
 
export const openLinks = {
  c: toArc('https://chat.openai.com/'),
  g: toLink('https://github.com'), 
  m: toLink('https://mail.google.com'),
  y: toArc('https://youtube.com'),
  ...workRepos(),
}

function toLink(link: string, check?: string) {
  return toSafari(env.SAFARI_SPACE!, link, check)
}

function toWorkLink(link: string, check?: string) {
  return toSafari(env.SAFARI_WORK_SPACE!, link, check)
}

function workRepos(i = 1, result: Record<string, ToEvent> = {}) {
  const repo = env[`WORK_GH_REPO_${i}`]
  if (!repo) return result

  result[i] = toWorkLink(`https://github.com/${workGitHubOrg}/${repo}`)
  return workRepos(i + 1, result)
}
