# 3060 - Unshift
> by jiangshan (@jiangshanmeta) #easy #array

## Question

Implement the type version of ```Array.unshift```

For example:

```typescript
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

### Test Cases
```ts
type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]
```

> View on GitHub: https://tsch.js.org/3060

---

## Solution: Type Constraint and Spread Operator
```ts
type Unshift<T extends unknown[], U> = [U, ...T];
```

- T extends unknown[]: Constraint T be a array of unknown.
- Use Spread Operator to reorganize the result array and add U in front of new array: `[U, ...T]`
