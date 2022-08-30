# 949 - AnyOf
> by null (@kynefuk) #medium #array

## Question

Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

For example:

```ts
type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
```

### Test Cases
```ts
type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]
```

> View on GitHub: https://tsch.js.org/949

---

## Solution: Recursively check the first element of array.
```ts
type Falsy = 0 | '' | false | [] | {[P in any]: never};

type AnyOf<T extends readonly any[]> = T extends [infer F,...infer R]
  ? F extends Falsy // recursively check the element of array is true or false
    ? AnyOf<R> // If current element is false, keep check the rest.
    : true // If any elements is true, return true.
  : false // All elements of array are false && []
```

### Stack
1. Union Types
2. Conditional Types
3. Inferring within Conditional Types
4. Generics
5. Variadic Tuple Types
