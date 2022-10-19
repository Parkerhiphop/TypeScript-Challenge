# 3192 - Reverse
> by jiangshan (@jiangshanmeta) #medium #tuple

## Question

Implement the type version of ```Array.reverse```

For example:

```typescript
type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

> View on GitHub: https://tsch.js.org/3192

---

## Solution: Mine
- Type inference in Conditional Types
- Store result `A` in Reverse itself
- Recursive

```js
type Reverse<T, A extends unknown[]> = T extends [...infer F, infer L]
  ? [L] extends never
    ? never
    : Reverse<F, [...A, L]>
  : A
```

## Solution: Cleaner

- We don't have to store the result additionally.
- Just recursive in the array.
- As long as `T` is an array, `T` would extends [...infer F, infer L]
  - If T is `['a']`, F would be '[]' and L would be 'a'

```js
type Reverse<T> = T extends [...infer F, infer L]
  ? [L, ...Reverse<F>]
  : []
```
