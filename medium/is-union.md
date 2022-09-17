# 1097 - IsUnion
> by null (@bencor) #medium 

## Question

Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

For example:
  
  ```ts
  type case1 = IsUnion<string>  // false
  type case2 = IsUnion<string|number>  // true
  type case3 = IsUnion<[string|number]>  // false
  ```

> View on GitHub: https://tsch.js.org/1097

### Test Cases
```ts
type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]
```
---

## Solution: Distributed Conditional Types & Tuple Types

```ts
type IsUnion<T, U extends T = T> =
    (T extends U ? ([U] extends [T] ? false : true) : never) extends false
    ? false
    : true
```

### 1. Using Distributive conditional types
```ts
type IsString<T> = T extends string ? true : false;

// For example, we provide type T = string | number
// It is the same as below
type IsStringDistributive = string extends string
  ? true
  : false | number extends string
    ? true
    : false;
```

So, we could detect if `T` is union in the `true` branch as below.
```ts
type IsUnion<T, C = T> = T extends C ? ([C] extends [T] ? false : true) : never;

// T = string | number
type Distributive = string extends string | number // T[0] extends C
  ? ([string | number] extends [string] ? false : **true** // [C] extends [T[0]]
  : never | number extends string | number // T[1] extends C
    ? ([string | number] extends [number] ? false : true // [C] extends [T[1]]
    : never;
// ->  return true

// T = string
type Distributive = string extends string // T[0] extends C
  ? ([string] extends [string] ? **false** : true // [C] extends [T]
  : never
// -> return false
```

### 2. Deal with never type.
Since `never` is equal to `false` on condition.
- `never extends false ? false : true; // return false`

We could add the condition at the end.
```ts
type IsUnion<T, C = T> = (T extends C ? ([C] extends [T] ? false : true) : never) **extends false ? false : never;**
```

