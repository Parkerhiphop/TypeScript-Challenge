
# 3057 - Push
by jiangshan (@jiangshanmeta) #easy #array

## Question

Implement the generic version of ```Array.push```

For example:

```typescript
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

### Test Cases
```ts
type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

```

> View on GitHub: https://tsch.js.org/3057

---

## Solution: the rest element type, a generic constraint

```ts
type Push<T extends unknown[], U> = [...T, U];
```

