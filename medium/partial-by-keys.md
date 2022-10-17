# 2757 - PartialByKeys
> by jiangshan (@jiangshanmeta) #medium #object

## Question

Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.

`K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.

For example

```typescript
interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
```

> View on GitHub: https://tsch.js.org/2757

---

## Solution: Mapped Types & Conditional Types

Associated with [My Omit](my-omit.md).

> Partial Optional = Merge of `Optional Keys(K)` and `Not Optional Keys(Omit those keys from K)`.

Pseudo code
- Merge = `MyMerge` + `Logical and: Obj & Obj`
- Optional = MyOptional<T, K>
- MyOmit = MyOmit<T, K>
- Partial = `MyMerge<Optional & MyOmit>`

```ts
type MyMerge<T> = { [P in keyof T]: T[P] };

type Optional<T, K> = { [P in keyof T as P extends K ? P : never]?: T[P] }

type MyOmit<T, K> = { [P in keyof T as P extends K ? never : P]: T[P] }

type PartialByKeys<T, K = keyof T> = MyMerge<Optional<T, K> & MyOmit<T, K>>;
```

