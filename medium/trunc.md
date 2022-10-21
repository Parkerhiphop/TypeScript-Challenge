# 5140 - Trunc
> by jiangshan (@jiangshanmeta) #medium #template-literal

## Question

Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.

For example:

```typescript
type A = Trunc<12.34> // 12
```

> View on GitHub: https://tsch.js.org/5140

---

## Solution
- Generics
- Generic Constraints
- Template Literal Types
- Conditional Types
- Inferring within Conditional Types

```ts
type Trunc<T extends string | number> = `${T}` extends `${infer Int}.${string}`
  ? Int
  : `${T}`
```
