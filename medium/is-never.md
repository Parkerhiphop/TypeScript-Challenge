# 1042 - IsNever
> by hiroya iizuka (@hiroyaiizuka) #medium #union #utils

## Question

Implement a type IsNever, which takes input type `T`.
If the type of resolves to `never`, return `true`, otherwise `false`.

For example:

```ts
type A = IsNever<never>  // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

> View on GitHub: https://tsch.js.org/1042

---

## [Solution](https://ghaiklor.github.io/type-challenges-solutions/en/medium-isnever.html)
```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

### `never extends never` wouldn't return true
> `type IsNever<T> = T extends never ? never : true;` would fail.

Type `never` represents the type of values that never occur.

The never type is a **subtype** of any other type in TypeScript and thus you can assign never type to any type.

However, no type is a subtype of never, meaning **you can assign nothing to never, except never itself.**

### `[T] extends [never]` can stop it being distributive.
> Using [] syntax dismisses the distributivity on type.

