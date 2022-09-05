# 4499 - Chunk
> by キリサメ qianxi (@qianxi0410) #medium #tuple

## Question

Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
`Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

```ts
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```

### Test Cases
```ts
type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]
```

> View on GitHub: https://tsch.js.org/4499

## Solution: Generics, General Constraints, Conditional Types, Inferring within Conditional Types, Variadic Tuple Types, Indexed Access Types

```ts
type Chunk<T, N, A extends unknown[] = []> = T extends [infer H, ...infer R]
  ? A["length"] extends N
    ? [A, ...Chunk<[H, ...R], N>]
    : Chunk<R, N, [...A, H]>
  : A[number] extends never ? [] : [A];
```

### General Constraints
```ts
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

### Variadic Tuple Types
With TypeScript 4.0, rest elements can occur anywhere in a tuple - not just at the end!
```ts
type Strings = [string, string];
type Numbers = number[];
type Unbounded = [...Strings, ...Numbers, boolean];
```
```ts
type Arr = readonly any[];
 
function concat<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U] {
  return [...arr1, ...arr2];
}
```

### Inferring within Conditional Types
```ts
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>; // number

type Str = GetReturnType<(x: string) => string>; // string

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // boolean[]
```
