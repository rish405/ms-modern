export type Unit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'

const UNIT_MS: Record<Unit, number> = {
  ms: 1,
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
  w: 604_800_000,
  y: 31_536_000_000,
}

const TOKEN = /([+-]?\d+(?:\.\d+)?)\s*(ms|s|m|h|d|w|y)/gi

export function parse(input: string | number): number | undefined {
  if (typeof input === 'number') return Number.isFinite(input) ? input : undefined
  if (!input) return undefined
  const str = input.trim()
  if (!str) return undefined

  let total = 0
  let matched = false
  TOKEN.lastIndex = 0
  const residual = str.replace(TOKEN, (_: string, num: string, unit: Unit) => {
    matched = true
    const n = Number(num)
    if (!Number.isFinite(n)) return ''
    total += n * UNIT_MS[unit]
    return ''
  })
  if (matched) {
    if (residual.trim() === '') return total
    return undefined
  }
  const n = Number(str)
  return Number.isFinite(n) ? n : undefined
}

export function format(ms: number): string | undefined {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) return undefined
  const abs = Math.abs(ms)
  const sign = ms < 0 ? '-' : ''
  if (abs < UNIT_MS.s) return sign + abs + 'ms'
  const units: Unit[] = ['y', 'w', 'd', 'h', 'm', 's']
  for (const u of units) {
    const value = abs / UNIT_MS[u]
    if (value >= 1) {
      const rounded = Math.round(value)
      return sign + rounded + u
    }
  }
  return sign + abs + 'ms'
}

export default { parse, format }
