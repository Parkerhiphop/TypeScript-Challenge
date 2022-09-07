# 645 - Diff
> by ZYSzys (@ZYSzys) #medium #object

## Question

Get an `Object` that is the difference between `O` & `O1`

> View on GitHub: https://tsch.js.org/645

### Test Cases
```ts
type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]
```

---

## Solution

```ts
type MyExclude<T, U> = T extends U ? never : T;

type Diff<O, O1> = {
  // Step 1
  [K in MyExclude<keyof O & keyof O1, keyof O | keyof O1>]: K extends keyof O
    // Step 2
    ? O[K]
    : K extends keyof O1
      ? O1[K]
      : never;
}
```

Steps
1. Get the intersection of O and O1's key, use `intersection &`, `union |` and [Exclude](../easy/exclude.md),
2. Return it from O or O1
