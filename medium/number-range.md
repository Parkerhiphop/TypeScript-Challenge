# 8640 - Number Range
-------
by AaronGuo (@HongxuanG) #medium 

## Question

Sometimes we want to limit the range of numbers...
For examples.
```
type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
```

> View on GitHub: https://tsch.js.org/8640

---

## Solution
Associated with [Minus One](minus-one.md)
- Use the `NumberToTuple` Generic, but switch the element to `never`

```ts
type NumberToTuple<N extends number, T extends never[] = []> = T['length'] extends N
  ? T
  : NumberToTuple<N, [...T, never]>

type NumberRange<
  L extends number,
  H extends number,
  A extends number[] = NumberToTuple<L>
> = A['length'] extends H
  ? [...A, A['length']][number]
  : NumberRange<L, H, [...A, A['length']]>

/** Explanation */
type Test = NumberRange<0,2>
// 0 -> <0, 2, [...[], 0]> = <0, 2, [...[0], 1]> -> A['length]' extends 2 = [...[0,1], 2][number] = 0 | 1 | 2
```

### Get the union of numbers: [the index access type or lookup type](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html#handbook-content)
```ts
type R0 = [0, 1, 2, 3, 4, 5][number];
// R0 is 0 | 1 | 2 | 3 | 4 | 5
```
