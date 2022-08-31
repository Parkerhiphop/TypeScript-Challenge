# 191 - Append Argument
> by Maciej Sikora (@maciejsikora) #medium #arguments

## Question

For given function type `Fn`, and any type `A` (any in this context means we don't restrict the type, and I don't have in mind any type 😉) create a generic type which will take `Fn` as the first argument, `A` as the second, and will produce function type `G` which will be the same as `Fn` but with appended argument `A` as a last one.

For example,

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// expected be (a: number, b: string, x: boolean) => number
```

### Test Cases
```ts
type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
]
```

> This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c) by [@maciejsikora](https://github.com/maciejsikora)

> View on GitHub: https://tsch.js.org/191

---

## Solution
1. Conditional Types
2. Type Inference in conditional Types
3. Variadic Tuple Types
4. Rest Parameters in function type

```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer Input) => infer Output
  ? (...args: [...Input, A]) => Output
  : never;
```


## Solution: Using utility type Parameters and ReturnType
```ts
type AppendArgument<Fn, A> = Fn extends (...args: any) => any
  ? (...args: [...Parameters<Fn>, A]) => ReturnType<Fn>
  : never
```
