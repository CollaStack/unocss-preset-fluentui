import { expect, test } from 'vitest'
import preset from '.'

test('init', () => {
  const p = preset()
  expect(p.name).toBe('fluentui')
  expect(p.prefix).toBeUndefined()
  expect(p.rules.length).toBeGreaterThan(0)
})

test('supports prefix option', () => {
  const p = preset({ prefix: 'fl-' })
  expect(p.prefix).toBe('fl-')
})
