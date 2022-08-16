# 14 - First of Array
> by Anthony Fu (@antfu)

#easy #array

## Question

Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.

For example:

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]
```

> View on GitHub: https://tsch.js.org/14

---

## Solution: Use T[0] and Conditional Types to solve the edge case([]).
```ts
type First<T extends any[]> = T extends [] ? never : T[0];

// `T extends []` represents `if T is []`
```
- https://ghaiklor.github.io/type-challenges-solutions/en/easy-first.html

其實就照一般的思路下去寫 T[0] 就好，但是因為有 空陣列[] 而沒有 T[0] 的可能，多用 Conditional Types 來做一層判斷
