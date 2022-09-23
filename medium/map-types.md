# 5821 - MapTypes
> by Krzysztof "Wokay" Łokaj (@wokayme) #medium #map #object #utils

## Question

Implement `MapTypes<T, R>` which will transform types in object T to different types defined by type R which has the following structure

```ts
type StringToNumber = {
  mapFrom: string; // value of key which value is string
  mapTo: number; // will be transformed for number
}
```

## Examples:

```ts
type StringToNumber = { mapFrom: string; mapTo: number;}
MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }
```

Be aware that user can provide a union of types:
```ts
type StringToNumber = { mapFrom: string; mapTo: number;}
type StringToDate = { mapFrom: string; mapTo: Date;}
MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
```

If the type doesn't exist in our map, leave it as it was:
```ts
type StringToNumber = { mapFrom: string; mapTo: number;}
MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
```

### Test cases
```ts
MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }> // { stringToArray: [] }
MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }> // { stringToNumber: number }
MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }> // { stringToNumber: number; skipParsingMe: boolean }
MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }> // { date: null | Date }
MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }> // { date: null | Date }
MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }> // { fields: string[] }
MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }> // { name: string }
MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }> // { name: boolean; date: string }

```

> View on GitHub: https://tsch.js.org/5821

---

## Solution: Mapped Types, Distributed Conditional Types

```ts
type MapTypes<T, R extends { mapFrom: any, mapTo: any }> = T extends {
  [K in keyof T]: T[K] extends R['mapFrom']
    ? R extends { mapFrom: T[K] } // highlight
      ? R['mapTo']
      : never
    : T[K]
}
```

How to enumerate an union?
- Conditional types in TypeScript are **distributive**, meaning they will enumerate over each item in union.
- `R extends { mapFrom: any, mapTo: any } === R extends { mapFrom: any, mapTo: any } | { mapFrom: any, mapTo: any } | ...`
- So we could simply check if `T[K]` matches any mapFrom by  `R extends { mapFrom: T[K] }` and return the corresponding `mapTo` by `R['mapTo']`
https://ghaiklor.github.io/type-challenges-solutions/en/medium-maptypes.html

