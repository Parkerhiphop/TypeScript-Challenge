# 10 - Tuple to Union
> by Anthony Fu (@antfu) #medium #infer #tuple #union

## Question

Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.

For example

```ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

> View on GitHub: https://tsch.js.org/10

---

## Solution: Recursive(Mine)
- I make it too complicated.
```ts
type TupleToUnion<T> = T extends [infer F, ...infer R]
  ? R extends []
    ? F
    : F | TupleToUnion<R>
  : T
```

## Solution: Use Lookup types aka indexed access types

- Use contruct number(`T[number]`) would automatically take all the elements from an array and convert it to the union.
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types
- https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

```ts
type TupleToUnion<T extends unknown[]> = T[number]
```
