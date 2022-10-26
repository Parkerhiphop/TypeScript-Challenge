# 4471 - Zip
> by キリサメ qianxi (@qianxi0410) #medium #tuple

## Question

In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
```ts
type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
```

> View on GitHub: https://tsch.js.org/4471

---

## Solution: Type inference in conditional types Sparately
```ts
type Zip<T, U> = T extends [infer T1, ...infer T2]
  ? U extends [infer U1, ...infer U2]
    ? [[T1, U2],...Zip<T2, U2>]
    : []
  : []
```
