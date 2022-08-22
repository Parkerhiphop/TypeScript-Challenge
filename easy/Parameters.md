# 3312 - Parameters
by midorizemi (@midorizemi) #easy #infer #tuple #built-in

## Question

Implement the built-in [Parameters<T>](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype) generic without using it.

For example:

```ts
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

### Test Cases
```ts
const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]
```

> View on GitHub: https://tsch.js.org/3312

---

## Solution: Generic, Conditional Types and Infer

```ts
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
```

This challenge requires us to get part of the information from the function.

What is the proper way of “getting the type we don’t know about yet”? By using inferring! 

1. Start with a simple conditional type to match the function
```ts
type MyParameters<T> = T extends (...args: any[]) => any ? never : never;
```

2. Check if the type T matches the function with any arguments and any return type
```ts
type MyParameters<T> = T extends (...args: infer P[]) => any ? never : never;
```

3. The TypeScript compiler infers the parameters list of the function and will assign it to the type P
```ts
type MyParameters<T> = T extends (...args: infer P[]) => any ? P : never;
```
