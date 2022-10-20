# 3062 - Shift
> by jiangshan (@jiangshanmeta) #medium #array

## Question

Implement the type version of ```Array.shift```

For example

```typescript
type Result = Shift<[3, 2, 1]> // [2, 1]
```

> View on GitHub: https://tsch.js.org/3062

## Solution
```ts
type Shift<T extends unknown[]> = T extends [infer F, ...infer L] ? L : []
```
