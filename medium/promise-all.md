# 20 - Promise.all
> by Anthony Fu (@antfu) #medium #array #built-in

## Question

Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)
```

### Test Cases
```ts
const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
// Promise<[1, 2, 3]>
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
// Promise<[1, 2, number]>
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
// Promise<[number, number, number]>
```

> View on GitHub: https://tsch.js.org/20

---
<!-- TODO: Review Again -->
```ts
/** Origin */
declare function PromiseAll(values: any): any
```

## Solution
```ts
declare function PromiseAll(values: any): any
```

### First: Return the `Promise<T>`
```ts
declare function PromiseAll<T>(values: T): Promise<T>
```

### Second: Since values are an array, we use variadic tuple types.
```ts
declare function PromiseAll<T extends unknown[]>(values: [...T]): Promise<T>
```

Fail Cases: `PromiseAll([1, 2, 3] as const)` and more.
- The compilation error "Argument of type `readonly [1, 2, 3]` is not assignable to parameter of `type '[1, 2, 3]`."

### Third: We do not expect to have a readonly modifier in our values parameter.
```ts
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<T>
```

Fail Case: `PromiseAll([1, 2, Promise.resolve(3)] as const)`

We got: `Promise<[1, 2, Promise<number>]>`

Instead of `Promise<[1, 2, number]>`

### Forth: Unwrap the Promise
```ts
/** Failed because T is not an union, is a Tuple(Promise Tuple). */
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<T extends Promise<infer R> ? R : T>;

/** Use Mapped Types and Index Types to iterate a tuple. */
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{ [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P] }>
```
