import { ifApp, toKey } from 'karabiner.ts'

export const ifSpark = ifApp('^com.readdle.SparkDesktop')

export const spark = {
  actions: toKey('k', '⌘'),
  openSidebar: toKey('/'),
  fetch: toKey('r', '⌘'),
}