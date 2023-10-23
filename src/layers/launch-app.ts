import { to$, toApp } from 'karabiner.ts'

export const launchApp = {
  a: toApp('Arc'),
  b: toApp('Safari'), // Browser
  c: toApp('Calendar'),
  d: toIDE('DataGrip'),
  f: toApp('Finder'),
  i: toApp('WeChat'), // IM
  k: toApp('Lens'), // K8s

  j: toApp('Sequel Ace'), // SequelAce
  h: toApp('Herd'), // Herd
  g: toApp('DBngin'), // DBngin

  n: toApp('Obsidian'), // Notes
  r: toIDE('Rider'),
  s: toApp('Slack'),                     
  t: toApp('Warp'), // Terminal
  p: toIDE('PhpStorm'),
  x: toApp('Xcode'),
  z: toApp('zoom.us'),
  ',': toApp('System Settings'),
}

// `open -a` sometimes gets confused by the non-standard path
function toIDE(name: string) {
  return to$(`open ~/Applications/${name}.app`)
}
