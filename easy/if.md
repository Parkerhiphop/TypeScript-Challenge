# 268 - If
by Pavel Glushkov (@pashutk) #easy #utils

## Question

Implement a utils `If` which accepts condition `C`, a truthy return type `T`, and a falsy return type `F`. `C` is expected to be either `true` or `false` while `T` and `F` can be any type.

For example:

```ts
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

> View on GitHub: https://tsch.js.org/268

---

## Solution: Conditional Types

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

My first thought was `type If<C, T, F> = C extends true ? T : F;`.
But C can only be either `true` or `false`, so I have to extend C with boolean at generic.

