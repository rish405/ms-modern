import { describe, it, expect } from 'vitest'
import { parse, format } from '../src/index'

describe('parse', () => {
  it('parses simple units', () => {
    expect(parse('1ms')).toBe(1)
    expect(parse('1s')).toBe(1000)
    expect(parse('1m')).toBe(60000)
    expect(parse('1h')).toBe(3600000)
    expect(parse('1d')).toBe(86400000)
    expect(parse('1w')).toBe(604800000)
    expect(parse('1y')).toBe(31536000000)
  })

  it('parses chained units', () => {
    expect(parse('1h30m')).toBe(5400000)
    expect(parse('1m30s')).toBe(90000)
    expect(parse('2s500ms')).toBe(2500)
  })

  it('parses decimals and negatives', () => {
    expect(parse('2.5h')).toBe(9000000)
    expect(parse('-2s')).toBe(-2000)
  })

  it('parses numeric string and number', () => {
    expect(parse('100')).toBe(100)
    expect(parse(250)).toBe(250)
  })

  it('returns undefined on invalid', () => {
    expect(parse('')).toBeUndefined()
    expect(parse('foo')).toBeUndefined()
    expect(parse('1h foo')).toBeUndefined()
  })
})

describe('format', () => {
  it('formats ms to largest unit', () => {
    expect(format(0)).toBe('0ms')
    expect(format(500)).toBe('500ms')
    expect(format(1500)).toBe('2s')
    expect(format(60000)).toBe('1m')
    expect(format(5400000)).toBe('2h')
    expect(format(86400000)).toBe('1d')
    expect(format(604800000)).toBe('1w')
    expect(format(31536000000)).toBe('1y')
  })

  it('formats negatives', () => {
    expect(format(-2000)).toBe('-2s')
  })

  it('returns undefined on invalid number', () => {
    expect(format(Number.NaN)).toBeUndefined()
  })
})
