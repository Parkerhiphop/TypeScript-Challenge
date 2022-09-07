# 9 - Deep Readonly
> by Anthony Fu (@antfu) #medium #readonly #object-keys #deep

## Question

Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

For example:

```ts
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

> View on GitHub: https://tsch.js.org/9

## [Solution](https://github.com/type-challenges/type-challenges/issues/187)

1. set up of the base case: recursion stops if T is no longer an object
2. definition of the recursive cases: the value T[k] is always define recursively.
```ts
type DeepReadonly<T> = keyof T extends never
  ? readonly T
  : { readonly [P in keyof T]: DeepReadonly<T[P]> }
```

### My solution: Wonder how the recursive isn't work. 

```ts
type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }

// if I don't use recursive, the second deep would return as I want, why?
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object
      ? { readonly [ K in keyof T[P]]: T[P][K]}
      : T[P]
  }
```
```ts
type test = DeepReadonly<{ a: 1, b: { c: 1 } }>

type test = {
    readonly a: 1;
    readonly b: DeepReadonly<{ // Why the DeepReadonly don't return `{ readonly c: 1 }` ?
        c: 1;
    }>;
}
```
