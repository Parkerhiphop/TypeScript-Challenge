# 8987 - Subsequence
> by jiangshan (@jiangshanmeta) #medium #union

## Question

Given an array of unique elements, return all possible subsequences.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

For example: 

```typescript
type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
```

> View on GitHub: https://tsch.js.org/8987

---

## Solution: Divid and Conquer
```ts
type Subsequence<T extends unknown[]> = T extends [infer F, ...infer R]
  ? [F, ...Subsequence<R>] | Subsequence<R>
  : []
```
### Explanation
- When T is an empty tuple, our conditional type will not work, resulting into empty tuple return.
- When T is a tuple with single element, our conditional type will match. However, the single element will be inferred into F type parameter,  while R will be an empty tuple. Calling the type recursively with the empty tuple will return an empty tuple, as discussed in the previous point.
- When T has more than one element, what it does, is, basically, splits the tuple into sub-tuples and passes them recursively until two basic cases above happens. The result will be stacked together within union type.
