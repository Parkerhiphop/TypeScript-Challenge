# 8 - Readonly 2 aka Partial Readonly
> by Anthony Fu (@antfu) #medium #readonly #object-keys

### Question

Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

`K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

For example

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```

> View on GitHub: https://tsch.js.org/8

---

## [[Solution](https://ghaiklor.github.io/type-challenges-solutions/en/medium-readonly-2.html)
- Intersection
- Omit
- Readonly
- Using type parameters in generic constraints

Associated with [Readonly](../easy/readonly.md) and [MyOmit](my-omit.md).

```ts
// We also can use the built-in `Omit<T, K>`.
type MyOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] }

type MyReadonly2<T, K extends keyof T = keyof T> = MyOmit<T, K> & { readonly [P in K]: T[P] }
```
