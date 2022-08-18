# 898 - Includes
by null (@kynefuk) #easy #array

## Question

Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

For example:

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', x'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```

### Test cases
```ts
type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]
```

> View on GitHub: https://tsch.js.org/898

---

## Solution

Implement the auxiliary type `IsEqual` first. 

```ts
// type IsEqual<A, B> = A extends B ? ( B extends A ? true : false) : false
// fail while readonly B or readonly A

export type IsEqual<T, U> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2)
    ? true
    : false;
```

### Iterate ver.

```ts
type Includes<T extends readonly any[], U> = T extends [T[0], ...infer Rest]
  ? IsEqual<T[0], U> extends true
    ? true
    : Includes<Rest, U>
  : false;
  // T[0] could replace with infer first
```

### Recursion ver.
```ts
type Includes<T extends ReadonlyArray<any>, U> = {
  [K in keyof T]: IsEqual<U, T[K]>
}[number] extends false ? false : true
```