# 3 - Omit
> by Anthony Fu (@antfu) #medium #union #built-in

TODO: Check the [TS：理解 Omit 的實作](https://pjchender.dev/ironman-2021/ironman-2021-day18/)

## Question

Implement the built-in `Omit<T, K>` generic without using it.

Constructs a type by picking all properties from `T` and then removing `K`

For example

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>
```

> View on GitHub: https://tsch.js.org/3

---

## Solution: [Key remapping in mapped types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)

Associated with [Flip](flip.md)

```ts
type MyOmit<T, K extends keyof T> = {[
  P in keyof T as P extends K ? never : P
]: T[P]}
```

