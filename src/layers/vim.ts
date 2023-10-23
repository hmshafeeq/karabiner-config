import {
  ifVar,
  map,
  rule,
  toKey,
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
  withCondition,
} from 'karabiner.ts'
import { toLocalSound } from '../utils/sounds'

export const vimNormalMode = {
  j: toKey('←'),
  k: toKey('↓'),
  i: toKey('↑'),
  l: toKey('→'),

  0: toKey('←', '⌘'),
  ';': toKey('→', '⌘'),

  b: toKey('←', '⌥'),
  e: toKey('→', '⌥'),

  y: toKey('c', '⌘'),
  p: toKey('v', '⌘'),
  x: toKey('x', '⌘'),
  u: toKey('z', '⌘'),
}

export const toVimNormalMode = [
  toNotificationMessage('vim', 'Vim - Normal Mode'),
  toSetVar('vim', 1),
  toSetVar('vim-mode', 'normal'),
  toLocalSound('pop'),
]

export const toVimVisualMode = [
  toNotificationMessage('vim', 'Vim - Visual Mode'),
  toSetVar('vim', 1),
  toSetVar('vim-mode', 'visual'),
  toLocalSound('pop'),
]

export const toDisableVim = [
  toRemoveNotificationMessage('vim'),
  toSetVar('vim', 0),
  toSetVar('vim-mode', ''),
]

export const vimModes = rule('vim-modes', ifVar('vim')).manipulators([
  withCondition(ifVar('vim-mode', 'normal'))([
    map('⎋').to(toDisableVim),
    map('l⇧').to(toDisableVim),
    map('v').to(toVimVisualMode),
  ]),

  withCondition(ifVar('vim-mode', 'visual'))([
    map('⎋').to(toVimNormalMode),
    map('l⇧').to(toDisableVim),

    map('y').to('c', '⌘').to(toVimNormalMode),
    map('x').to('x', '⌘').to(toVimNormalMode),
    map('d').to('x', '⌘').to(toVimNormalMode),

    {
      j: toKey('←', '⇧'),
      k: toKey('↓', '⇧'),
      i: toKey('↑', '⇧'),
      l: toKey('→', '⇧'),

      0: toKey('←', '⌘⇧'),
      ';': toKey('→', '⌘⇧'),

      b: toKey('←', '⌥⇧'),
      e: toKey('→', '⌥⇧'),
    },
  ]),
])
