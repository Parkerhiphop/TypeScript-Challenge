# 4179 - Flip
> by Farhan Kathawala (@kathawala) #medium #object

## Question

Implement the type of `just-flip-object`. Examples:

```typescript
Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
```

No need to support nested objects and values which cannot be object keys such as arrays

> View on GitHub: https://tsch.js.org/4179

---

## Solution: [Key remapping in mapped types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)

```ts
type AllowedKeyTypes = string | boolean | number;

type Flip<T> = {
  [K in keyof T as T[K] extends AllowedKeyTypes ? `${T[K]}` : never]: K
}
```
1. Write a Mapped Types
2. Use `as` to remap the type of object key in mapped types
   - [Key remapping in mapped types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)
3. The keys of an object can only be of the type string.
   - So we need to stringify our keys.
