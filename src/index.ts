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
import { appOverrides } from './rules/app-overrides'
import { duoModifier } from './utils/duo-modifier'

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
 
  rule('to vim modes', ifVar('vim').unless()).manipulators([
    mapSimultaneous(['a', ';']).to(toVimNormalMode),
    mapSimultaneous(['v', ';']).to(toVimVisualMode),
  ]),

  // ; can be released once layer is activated
  duoLayer('f', ';', 'vim')
    .condition(ifVar('vim-mode', 'visual').unless())
    .manipulators(vimNormalMode)
    .notification('vim - j ← k ↓ i ↑ l →'),
 
    duoLayer('s', ';')
    .manipulators(symbols)
    .notification('^ { [ ( $,    _ } ] ),\n% _ = - +'),

  duoLayer('d', ';')
    .manipulators(digitsAndDelete)
    .notification('_ 4 5 6 ⌫,   _ 7 8 9,\n0 1 2 3'),

  duoLayer('z', 'x').manipulators(emoji).notification(emojiHint),
   
  duoLayer('l', ';').manipulators(launchApp).notification('Launch App 🚀 📱'),
  
  duoLayer('.', '/').manipulators(openLinks).notification('Open Link 🔗'),

  layer('`', 'mouse').condition(ifMoonlander).manipulators(mouseCursor),

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
  'duo_layer.threshold_milliseconds': 200,
  'duo_layer.notification': true,
})
