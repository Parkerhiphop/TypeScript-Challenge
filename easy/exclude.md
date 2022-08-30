# 43 - Exclude
> by Zheeeng (@zheeeng)

#easy #built-in
  
## Question

Implement the built-in Exclude<T, U>

> Exclude from T those types that are assignable to U

For example:

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

> View on GitHub: https://tsch.js.org/43

---

## Solution: Conditional types in TypeScript are [distributive](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types).

```ts
type MyExclude<T, U> = T extends U ? never : T;
```
- https://ghaiklor.github.io/type-challenges-solutions/en/easy-concat.html

While T is a union, TypeScript would iterate over the union T and applied the condition to each elements. (Check every type of T is extending U)
  
For example:
```ts
type Test = MyExclude<'a' | 'b' | 'c', 'a'>;
```
The distributive process would be:
1. Is `'a'` extends `'a'` ? -> Yes. return `'a'` in DisType.
    - `type DisType = 'a'`
2. Is `'b'` extends `'a'` ? -> No. return `never` in DisType.
    - `type DisType = 'a' | never`
3. Is `'c'` extends `'a'` ? -> No. return `never` in DisType.
    - `type DisType = 'a' | never | never = 'a'`

- Union Type
- A type formed from two or more other types, representing values that may be any one of those types.
