import {
  duoLayer,
  hyperLayer,
  ifVar,
  layer,
  map,
  mapSimultaneous,
  rule,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard' 
import { ifMoonlander, mouseCursor } from './devices/moonlander'
import { digitsAndDelete } from './layers/digits-delete'
import { emoji, emojiHint } from './layers/emoji'
import { launchApp } from './layers/launch-app'
import { openLinks } from './layers/open-links'
import { symbols } from './layers/symbols'
import {
  toVimNormalMode,
  toVimVisualMode,
  vimModes,
  vimNormalMode,
} from './layers/vim'
import { appModifiers } from './rules/app-modifiers'
import { duoModifier } from './utils/duo-modifier'
import { appOverrides } from './rules/app-overrides'

const rules = [
  
  // rule(), layer(), simlayer(), hyperLayer(), duoLayer()
   rule('Hyper Key (⌃⌥⇧⌘)').manipulators([
    // Docs: https://evan-liu.github.io/karabiner.ts/ 
    map('caps_lock').toHyper().toIfAlone('escape'),
  ]),

  rule('Super Hyper Key (⌘⌥⌃⇧fn)').manipulators([ 
    map('right_option').toSuperHyper().toIfAlone('right_option'),
  ]),

  rule('Meh Key (⌥⌃⇧)').manipulators([ 
    map('tab').toMeh().toIfAlone('tab')                                         
  ]),
 
  // ']' + '\' and '[' + ']'
  rule('to vim modes', ifVar('vim').unless()).manipulators([
    mapSimultaneous(['close_bracket', 'backslash']).to(toVimNormalMode),
    mapSimultaneous(['open_bracket', 'close_bracket']).to(toVimVisualMode),
  ]),

  // ; can be released once layer is activated
  // ; + '
  duoLayer('semicolon', 'quote', 'vim')
    .condition(ifVar('vim-mode', 'visual').unless())
    .manipulators(vimNormalMode)
    .notification('vim - j ← k ↓ i ↑ l →'),
 
  //   duoLayer('s', ';')
  //   .manipulators(symbols)
  //   .notification('^ { [ ( $,    _ } ] ),\n% _ = - +'),

  // duoLayer('d', ';')
  //   .manipulators(digitsAndDelete)
  //   .notification('_ 4 5 6 ⌫,   _ 7 8 9,\n0 1 2 3'),

  // '=' + delete_or_backspace
  duoLayer('equal_sign', 'delete_or_backspace').manipulators(emoji).notification(emojiHint),
  
  // ./ 
  duoLayer('period', 'slash').manipulators(launchApp).notification('Launch App 🚀 📱'),
  
  //,.
  duoLayer('comma', 'period').manipulators(openLinks).notification('Open Link 🔗'),

  // layer('`', 'mouse').condition(ifMoonlander).manipulators(mouseCursor),

  rule('Homerow').manipulators([mapSimultaneous(['f', 'j']).to('␣', 'Hyper')]),

  vimModes,
  appleKeyboard,
  appModifiers,
  appOverrides,
]

writeToProfile('Default', rules, {
  "basic.simultaneous_threshold_milliseconds": 50,
  "basic.to_delayed_action_delay_milliseconds": 150,
  "basic.to_if_alone_timeout_milliseconds": 300,
  "basic.to_if_held_down_threshold_milliseconds": 150,                               
  'duo_layer.threshold_milliseconds': 50,
  'duo_layer.notification': true,
})
