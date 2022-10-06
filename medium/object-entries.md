# 2946 - ObjectEntries
> by jiangshan (@jiangshanmeta) #medium #object

## Question

Implement the type version of ```Object.entries```

For example 

```typescript
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
```

> View on GitHub: https://tsch.js.org/2946

---

## Solution
```ts
type HandleUndefined<F, S extends keyof F> = F[S] extends infer R | undefined
  ? R
  : F[S];
type ObjectEntries<T> = {
  [P in keyof T]-?: [P, HandleUndefined<T, P>];
}[keyof T];
```

1. Use Mapped Types to iterate over each key in the object and reassign their value to `[key, typeof key]`.
```ts
type ObjectEntries<T> = { [P in keyof T]: [P, T[P]] };
// { key: [key, typeof key], ... }

/** type ObjectEntries<Model> */
// {
//     name: ["name", string];
//     age: ["age", number];
//     locations: ["locations", string[] | null];
// }
```

2. Return the union of values by `{ key: value }[key]`
```ts
type ObjectEntries<T> = { [P in keyof T]: [P, T[P]] }[keyof T];
// [key, typeof key] | ...

/** type ObjectEntries<Model> */
// ["name", string] | ["age", number] | ["locations", string[] | null]
```

3. Deal with `{ key?: value }` by `{ key-?: value }`
```ts
type ObjectEntries<T> = { [P in keyof T]-?: [P, T[P]] }[keyof T];
```

4. Deal with `value | undefined` aka `Partial<T>` by `HandleUndefined<V, K>`
```ts
type HandleUndefined<V, K extends keyof V> = V[K] extends infer R | undefined
  ? R
  : V[K]
```

While implementing it, I am thinking of how to get the key of T ?
- `type K1 = keyof Person; // "name" | "age" | "location"`
But while using the generic, we should...
- Using Step1 & Step 2
- And Only Return the P while Step 2.
```ts
type GetObjectKey<T> = { [K in keyof T]: K }[keyof T]

type K1 = GetObjectKey<Model>
// type K1 = "name" | "age" | "locations"
```
