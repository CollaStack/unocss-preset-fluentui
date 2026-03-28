import { test } from 'vitest'
import preset from '.'

test('init', () => {
  const p = preset()
  console.log(p)
})
