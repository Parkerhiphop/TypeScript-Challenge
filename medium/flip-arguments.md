# 3196 - Flip Arguments
> by jiangshan (@jiangshanmeta) #medium #arguments

## Question

Implement the type version of lodash's ```_.flip```.

Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

For example:

```typescript
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
// (arg0: boolean, arg1: number, arg2: string) => void
```

> View on GitHub: https://tsch.js.org/3196

---

## Solution: Recursive, Type Inference in Conditional Type and Mapping type with spread operator.

```ts
type MyReverse<T extends unknown[]> = T extends [...infer F, infer R]
  ? [R, ...MyReverse<F>]
  : T

type FlipArguments<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer R
  ? (...args: MyReverse<P>) => R
  : never
```

- Function Constraint: (...args: any[]) => any || Function

As [Flatten](flatten.md), I knew I should use infer F and infer R to separate infer argument type and then reverse them.
However, I lost my way in mapping the argument key and type.
After checking the solution, I found that I could just spread the arguments with the reversed type. The type would automatically map to the argument with the spread operator.
