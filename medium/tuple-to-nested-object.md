# 3188 - Tuple to Nested Object
> by jiangshan (@jiangshanmeta) #medium #object

## Question

Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

```typescript
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
```

> View on GitHub: https://tsch.js.org/3188

---

## [Solution](https://ghaiklor.github.io/type-challenges-solutions/en/medium-tuple-to-nested-object.html)

- Conditional Types
- Inferring within Conditional Types
- Recursive Conditional Types

At first, I directly use `infer F` as the value of the tuple key, but it's a type, not a value.
ERROR: `'F' only refers to a type, but is being used as a value here.`
- How to use infer F as a value?
  -  use `[P in F]`

ERROR: `Type 'F' is not assignable to type 'string | number | symbol'`
- TypeScript 4.7 allows "extends Constraints on infer Type Variables": `infer F extends string`

```ts
type TupleToNestedObject<T, U> = T extends [infer F extends string, ...infer R]
    ? { [P in F]: TupleToNestedObject<R, U>}
    : U
```
