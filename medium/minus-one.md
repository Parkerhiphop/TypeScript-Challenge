# 2257 - MinusOne
> by Mustafo Faiz (@fayzzzm) #medium #math

## Question

Given a number (always positive) as a type. Your type should return the number decreased by one.

For example:

```ts
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54
```

> View on GitHub: https://tsch.js.org/2257

---

## Solution

### [Works up to 999](https://ghaiklor.github.io/type-challenges-solutions/en/medium-minusone.html)
```ts
type NumberToTuple<N extends number, T extends unknown[] = []> = T['length'] extends N
  ? T
  : NumberToTuple<N, [...T, unknown]>

type MinusOne<T extends number> = NumberToTuple<T> extends [...infer F, unknown]
  ? F['length']
  : never

type Test = MinusOne<1000> // Type instantiation is excessively deep and possibly infinite.
```

### [Works up to 1998](https://github.com/type-challenges/type-challenges/issues/12962)
```ts
interface InitialLengths {
    '2': [0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    '3': [...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2],
         ...InitialLengths[2],...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2]],
    '4': [...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3], 
        ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3],  ...InitialLengths[3]],
}

// Accepts an array T, returns an array without the first element
type PopArray<T extends any[]> = T extends [infer First, ...infer Rest] ? [...Rest] : [];


// Convert string to array of characters
type StringToArray<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...StringToArray<B>]
  : []
// Returns the number of digits in a number
type LengthOfNumber<T extends number> = StringToArray<`${T}`>['length'];


// Accepts a number T, and returns the number T-minus-one by increasing the
// size of the array by 1 until it T == U['length'], 
// followed by applying PopArray<U>
type MinusOne<T extends number, U extends any[] = []> =
  // Is T == U['length']
  T extends U['length'] ?
    // If yes, then remove the first element and return the length 
    PopArray<U>['length'] :
  // (This is an optimization) 
  // Otherwise, check the length of the number. Do they match?
  LengthOfNumber<T> extends LengthOfNumber<U['length']> ?
    // If yes, increment the size of the array by one and recurse
    MinusOne<T, [T, ...U]> : 
    // Otherwise, initialize the counting array to the closest of 10 / 100 / 1000
  `${LengthOfNumber<T>}` extends infer L extends keyof InitialLengths ? 
    MinusOne<T, InitialLengths[L]> :
  // Fail if higher than 9999 (It fails for other reasons anyways)
  never;


type Test = MinusOne<1999>; // Type instantiation is excessively deep and possibly infinite.
```

### [Works up to 9999](https://github.com/type-challenges/type-challenges/issues/5382)
```ts
type ZeroToTen = 0| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type ZeroToTenStringNumberMap = {
  [N in ZeroToTen as `${N}`]: N
}
type ZeroToTenString = keyof ZeroToTenStringNumberMap

type MakeOneToTenLengthTuple<N extends ZeroToTen, L extends any[] = []> = L['length'] extends N
  ? L
  : MakeOneToTenLengthTuple<N, [...L, 0]>
type Fill<T, Tuple extends any[]> = Tuple extends [infer H, ...infer R]
  ? [T, ...Fill<T, R>]
  : []
type FlatOnce<T extends any[], L extends any[] = []> = T extends [infer H, ...infer R]
  ? H extends any[] 
    ? FlatOnce<R, [...L, ...H]>
    : never
  : L
type MakeTenLengthTuple = MakeOneToTenLengthTuple<10>
type MakeTenTimeNLengthTuple<N extends ZeroToTen> = FlatOnce<Fill<MakeTenLengthTuple, MakeOneToTenLengthTuple<N>>>
type MakeHundredLengthTuple = FlatOnce<Fill<MakeTenLengthTuple, MakeTenLengthTuple>>
type MakeHundredTimeNLengthTuple<N extends ZeroToTen> = FlatOnce<Fill<MakeHundredLengthTuple, MakeOneToTenLengthTuple<N>>>
type MakeThousandLengthTuple = FlatOnce<Fill<MakeHundredLengthTuple, MakeTenLengthTuple>>
type MakeThousandTimeNLengthTuple<N extends ZeroToTen> = FlatOnce<Fill<MakeThousandLengthTuple, MakeOneToTenLengthTuple<N>>>

type Positions = 0 | 1 | 2 | 3
type PositionToTuple<P extends Positions, V extends ZeroToTen> = {
  0: MakeOneToTenLengthTuple<V>;
  1: MakeTenTimeNLengthTuple<V>;
  2: MakeHundredTimeNLengthTuple<V>;
  3: MakeThousandTimeNLengthTuple<V>;
}[P]
type SplitString<S extends string, L extends any[] = []> = S extends `${infer H}${infer R}`
  ? SplitString<R, [...L, H]>
  : L
type Numbers<T extends any[], L extends any[] = []> = T extends [infer H, ...infer R]
  ? H extends ZeroToTenString ? Numbers<R, [...L, ZeroToTenStringNumberMap[H]]> : never
  : L

type MakeTuple<NT extends ZeroToTen[], L extends any[] = []> = NT extends [...infer R, infer T]
  ? L['length'] extends Positions
    ? R extends ZeroToTen[]
      ? T extends ZeroToTen
        ? MakeTuple<R, [PositionToTuple<L['length'], T>, ...L]> 
        : never
      : never
    : never
  : FlatOnce<L>

type MinusOne<T extends number> = MakeTuple<Numbers<SplitString<`${T}`>>> extends [any, ...infer R]
  ? R['length']
  : never

type Test = MinusOne<10000> // Only return 'number'
```

