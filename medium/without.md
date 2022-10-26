# 5117 - Without
> by Pineapple (@Pineapple0919) #medium #union #array

## Question

Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

```ts
type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
```

> View on GitHub: https://tsch.js.org/5117

---

## Solution: Make Array to Union and Recursively Check it.
```ts
type ToUnion<T> = T extends [infer F, ...infer R] ? F | ToUnion<R> : T

type Without<T, U> = T extends [infer F, ...infer R]
  ? F extends ToUnion<U>
    ? Without<R, U>
    : [F, ...Without<R, U>] // 沒有與 U 相同的 F 就一個個推進去
  : []
```

