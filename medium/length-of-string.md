# 298 - Length of String
> by Pig Fang (@g-plane) #medium #template-literal

## Question

Compute the length of a string literal, which behaves like `String#length`.

```ts
LengthOfString<''>, // 0
LengthOfString<'kumiko'>, // 6
LengthOfString<'reina'>, // 5
LengthOfString<'Sound! Euphonium'>, // 16
```


> View on GitHub: https://tsch.js.org/298
---

## Solution: Mine - Transform string to array & Recursion
```ts
type LengthOfString<S extends string, A extends string[] = []> = S extends `${infer F}${infer R}`
  ? R extends ''
    ? [...A, F]['length']
    : LengthOfString<R, [...A, F]>
  : 0;
```

## Solution: Cleaner
```ts
type LengthOfString<S extends string, A extends string[] = []> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [F, ...A]>
  : A['length'];
```
