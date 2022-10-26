# 5360 - Unique
> by Pineapple (@Pineapple0919) #medium #array

## Question

Implement the type version of Lodash.uniq, Unique<T> takes an Array T, returns the Array T without repeated values.

```ts
type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
```

> View on GitHub: https://tsch.js.org/5360

---

## Solution
```ts
// Deal with Literal types
type Unique<T> = T extends [...infer H, infer T]
  ? T extends H[number]
    ? [...Unique<H>]
    : [...Unique<H>, T]
  : never;


// Deal with primitive type
// Use `Include` to check.
type Include<T extends any[], D extends any> = T extends [infer F, ...infer R]
  ? F extends D
    ? true
    : Include<R, D>
  : false

type Unique<T, U extends any[] = []> = T extends [infer F, ...infer R]
  ? Include<U, F> extends true
    ? Unique<R, U>
    : Unique<R, [...U, F]>
  : U

// Deal with unknown and any as well
// Use `IsEqual` to check.
export type IsEqual<T, U> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2)
    ? true
    : false;


type Include<T extends unknown[], U> =
  T extends [infer F, ...infer R]
    ? Equal<F, U> extends true // We can use built-in Equal type as well
      ? true
      : Include<R, U>
    : false

type Unique<T, Res extends unknown[] = []> =
  T extends [infer F, ...infer R]
    ? Include<Res, F> extends true
      ? Unique<R, Res>
      : Unique<R, [...Res, F]>
    : Res
```
