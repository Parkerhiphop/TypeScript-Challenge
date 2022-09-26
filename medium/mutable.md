# 2793 - Mutable
> by jiangshan (@jiangshanmeta) #medium #readonly #object-keys

Associated with [Readonly](../easy/readonly.md)

## Question

Implement the generic ```Mutable<T>``` which makes all properties in ```T``` mutable (not readonly).

For example

```typescript
interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }

```

### Test Case
```ts
interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]
```

> View on GitHub: https://tsch.js.org/2793

---

## Solution
```ts
type Mutable<T extends object | unknown[]> = { -readonly [ K in keyof T ]: T[K] }
```

### [Mapping modifiers](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers)
```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

Implicitly, TypeScript has added a `+` to the readonly keyword, meaning that we want to add the modifier to the property. But in our case, we want to discard it, so we can use `-` instead:


