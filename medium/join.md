# 5310 - Join
> by Pineapple (@Pineapple0919) #medium #array

## Question

Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.

```ts
type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
type Res3 = Join<["o"], "u">; // expected to be 'o'
```

### Test Cases
```ts
type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]
```

> View on GitHub: https://tsch.js.org/5310

---

## Solution: By Myself!
- Store the result at `Join` itself.
- `Rest extends []` could be `Rest['length'] extends 0`
- And U should be in the middle to prevent confuse.

```ts
type Join<T extends any[], U extends string | number, Result extends string = ''> = T extends [T[0], ...infer Rest]
    ? T[0] extends string
      ? Rest extends []
        ? Join<Rest, U, `${Result}${T[0]}`>
        : Join<Rest, U, `${Result}${T[0]}${U}`>
      : never
    : Result
```

## [Solution: Better, Cleaner, Shorter](https://ghaiklor.github.io/type-challenges-solutions/en/medium-join.html)

- Store the value at the true branch. (Instead of adding a new param)
- Use array['length'] to check if this is the last element.
- But the first condition is same.
- I fail to figure out infer + extend.
  - `infer F extends string`

```ts
type Join<T extends string[], U extends string | number> =
  T extends [infer F extends string, ...infer R extends string[]]
    ? `${F}${R['length'] extends 0 ? '' : U}${Join<R, U>}`
    : ''
```

## Solution: A better way to store the Result at Join itself, better.
- Tail-Recursion
- The first V is the last aka ''.
- So while V is '', we don't add U.

```ts
type Join<T extends string[], U extends string | number, V extends string = ''> =
  T extends [infer F extends string, ...infer R extends string[]]
    ? Join<R, U, `${V}${V extends '' ? '' : U}${F}`>
    : V
```

## Tech Stack
- Generics
- Generic Constraints
- Conditional Types
- Inferring within Conditional Types
- Variadic Tuple Types
- Template Literal Types
- Indexed Access Types
- Recursive Conditional Types
