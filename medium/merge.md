# 599 - Merge
> by ZYSzys (@ZYSzys) #medium #object

## Question

Merge two types into a new type. Keys of the second type overrides keys of the first type.

For example

```ts
type foo = {
  name: string;
  age: string;
}
type coo = {
  age: number;
  sex: string
}

type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
```

> View on GitHub: https://tsch.js.org/599


## Solution: Relevant to [Diff](Diff.md)
- Merged Key - The union of keyof T and keyof s
- Merged Value - Return the type in S first, then the type in F.

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never
}
```
