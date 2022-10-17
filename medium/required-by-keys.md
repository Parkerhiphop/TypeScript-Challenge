# 2759 - RequiredByKeys
> by jiangshan (@jiangshanmeta) #medium #object

## Question

Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.

`K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.

For example

```typescript
interface User {
  name?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }

```

> View on GitHub: https://tsch.js.org/2759

## Solution: Similar with [Partial By Keys](partial-by-keys.md)

- Mapped Types
- Conditional Types
- Mapping Modifier

```ts
type MyMerge<T> = { [P in keyof T]: T[P] }

type MyOmit<T, K> = { [P in keyof T as P extends K ? never : P]: T[P] }

type MyRequired<T, K> = {
  [P in keyof T as P extends K ? P : never]-?: T[P]
}

type RequiredByKeys<T, K = keyof T> = MyMerge<
  MyRequired<T, K> & MyOmit<T, K>>
```