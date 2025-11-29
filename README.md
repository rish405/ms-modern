# ms-modern

Modern, zero-dependency time utility to convert human durations to milliseconds and back.

- Supports `ms`, `s`, `m`, `h`, `d`, `w`, `y`
- Safe parsing: invalid input returns `undefined`
- Tiny: <1KB minified
- TypeScript first, ESM + CJS outputs

## Install

```bash
npm i ms-modern
```

## Usage

```ts
import { parse, format } from 'ms-modern'

parse('1h') // 3600000
parse('1h30m') // 5400000
parse('2.5h') // 9000000
parse('100') // 100
parse('invalid') // undefined

format(1500) // '2s'
format(5400000) // '2h'
format(0) // '0ms'
```

## Real-world examples

```ts
// Read TTL from env and fallback
type Millis = number
const SESSION_TTL: Millis = parse(process.env.SESSION_TTL || '') ?? 3600000

// Log task duration
const start = Date.now()
// ... work
console.log(`done in ${format(Date.now() - start)}`)

// Timers
setTimeout(() => {}, parse('2s') || 0)
```

## API

- `parse(input: string | number): number | undefined`
  - Accepts chained units: `1h30m`, `2s500ms`
  - Accepts decimals and negatives: `2.5h`, `-2s`
  - Accepts plain numbers as milliseconds: `'100'`
- `format(ms: number): string | undefined`
  - Returns the largest unit with rounded value: `5400000 → '2h'`
  - Keeps millisecond precision under 1000ms: `500 → '500ms'`

## Build & Test

```bash
npm run build
npm test
```

## License

MIT
