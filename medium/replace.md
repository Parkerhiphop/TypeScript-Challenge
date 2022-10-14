# 116 - Replace
> by Anthony Fu (@antfu) #medium #template-literal

## Question

Implement `Replace<S, From, To>` which replace the string `From` with `To` once in the given string `S`

For example

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'

type A = Replace<'foobar', 'bar', 'foo'> // 'foofoo'
type B = Replace<'foobarbar', 'bar', 'foo'> // 'foofoobar'
type C = Replace<'foobarbar', '', 'foo'> // 'foobarbar'
type D = Replace<'foobarbar', 'bar', ''> // 'foobar'
type E = Replace<'foobarbar', 'bra', 'foo'> // 'foobarbar'
type F = Replace<'', '', ''> // ''

```

> View on GitHub: https://tsch.js.org/116

---

## Solution: Template Literal, Type Inference in Conditional Types
```ts
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer L}`
    ? `${F}${To}${L}`
    : S 
```
