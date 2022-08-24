# 7 - Readonly
> by Anthony Fu (@antfu) #easy #built-in #readonly #object-keys

## Question

Implement the built-in `Readonly<T>` generic without using it.

Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

For example:

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

> View on GitHub: https://tsch.js.org/7

## Solution: Mapped Type and readonly flag

```ts
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
```

Iterate over all the properties and add a modifier to them.
- readonly should add in front of `readonly key: value` 
```ts
type obj = {
    readonly test: string;
    abc: number;
};
```

