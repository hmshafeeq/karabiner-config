import { ifDevice, map, rule } from 'karabiner.ts'

const ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 834 })

export const appleKeyboard = rule('Apple', ifAppleKeyboard).manipulators([
  map('fn').to('fn'),
  // map('⇪').to('⎋'),
  // map('›⌘', '⌥').toHyper(),
  // map('›⌥', '⇧').toMeh(),
])
