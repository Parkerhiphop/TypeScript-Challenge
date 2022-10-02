# 4260 - AllCombinations
> by 蛭子屋双六 (@sugoroku-y) #medium 

## Question

Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

For example:

```ts
type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
```

> View on GitHub: https://tsch.js.org/4260

---

## Solution
Associated with [String To Union](string-to-union.md), [Exclude](../easy/exclude.md)

```ts
type StringToUnion<S extends string> = S extends `${infer F}${infer L}`
  ? F | StringToUnion<L>
  : never

type AllCombinations<S extends string, U extends string = StringToUnion<S>> = [U] extends [
  never
]
  ? ""
  : "" | { [C in U]: `${C}${AllCombinations<never, Exclude<U, C>>}` }[U];
```

### [Explanation](https://ghaiklor.github.io/type-challenges-solutions/en/medium-nomiwase.html)
```ts
type Test = AllCombinations<"AB">

/* { [C in U]: `${C}${AllCombinations<never, Exclude<U, C>>}` }[U] */
[A | B] -> { A: "A" + AllCombinations<never, 'B'>, B: "B" + AllCombinations<never, A> }[A | B]-> { A: "A" | "AB", B: "B" | "BA" }

AllCombinations<never, 'B'> = "" | { B: "B" }[B] = B -> "" | "B"
-> A: "A" + AllCombinations<never, 'B'> = A: "A" + "" | "A" + "B" = A: "A" | "AB"

AllCombinations<never, 'A'> = "" | { A: "A" }[A] = A -> "" | "A"
-> B: "B" + AllCombinations<never, 'A'> = B: "B" + "" | "B" + "A" = B: "B" | "BA"
```

## First Attempt: Only Implement the [String to Union](string-to-union.md) with empty string ahead.
```ts
type StringToUnion<S extends string, R extends string = ''> = S extends ''
  ? R
  : S extends `${infer F}${infer L}`
    ? L extends ''
      ? R | F
      : StringToUnion<L, R | F>
    : never

/* Cleaner Way */
type StringToUnion<S extends string> = S extends `${infer F}${infer L}`
  ? F | StringToUnion<L>
  : ''

type Test = StringToUnion<'ABCD'> // '' | 'A' | 'B' | 'C' |'D'
```


