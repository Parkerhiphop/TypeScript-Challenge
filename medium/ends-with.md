# 2693 - EndsWith
> by jiangshan (@jiangshanmeta) #medium #template-literal

## Question

Implement `EndsWith<T, U>` which takes two exact string types and returns whether `T` ends with `U`

For example:

```typescript
type a = EndsWith<'abc', 'bc'> // expected to be true
type b = EndsWith<'abc', 'abc'> // expected to be true
type c = EndsWith<'abc', 'd'> // expected to be false
```

> View on GitHub: https://tsch.js.org/2693

--- 

## Solution
```ts
type EndsWith<T extends string, U extends string> = T extends `${string}${U}`
  ? true
  : false
```

- `${string}` could be `${any}` or ${infer F}
- But I think `${string}` is the best.
