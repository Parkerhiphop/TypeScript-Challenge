#

## 108 - Trim
```ts
type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

> View on GitHub: https://tsch.js.org/108

## 4803 - Trim Right
```ts
type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'
```

> View on GitHub: https://tsch.js.org/4803

---

## Solution: Recursively remove whitspace, '\n', '\t' in the template literal types.
- Union Types
- Conditional Types
- Type inference in conditional types
- Recursive conditional types
- Template Literal Types

```ts
type Whitespace = ' ' | '\n' | '\t';

type TrimRight<S extends string> = S extends `${infer T}${Whitespace}`
  ? TrimRight<T>
  : S

type TrimLeft<S extends string> = S extends `${Whitespace}${infer T}`
  ? TrimLeft<T>
  : S

type Trim<S extends string> = S extends `${infer L}${Whitespace}`
  ? Trim<L>
  : S extends `${Whitespace}${infer R}`
    ? Trim<R>
    : S
```