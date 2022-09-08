# 2070 - Drop Char
> by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer

## Question

Drop a specified char from a string.

For example:

```ts
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```

### Test Cases
```ts
type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]
```

> View on GitHub: https://tsch.js.org/2070

---

## Solution: Split String to Left, C, Right and Recursive it. (A bit like sliding window)
```ts
type DropChar<S, C extends string> = S extends `${L}${C}${R}`
  ? DropChar<`${L}${R}`, C>
  : S
```
