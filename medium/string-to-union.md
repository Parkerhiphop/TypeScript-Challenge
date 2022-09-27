# 531 - String to Union
> by Andrey Krasovsky (@bre30kra69cs) #medium #union #string

## Question

Implement the String to Union type. Type take string argument. The output should be a union of input letters

For example

```ts
type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

> View on GitHub: https://tsch.js.org/531

---

## Solution: Mine
```ts
type StringToUnion<S extends string, R extends string = ''> = S extends ''
  ? never
  : S extends `${infer F}${infer L}`
    ? L extends ''
      ? R extends ''
        ? F
        : R | F
      : StringToUnion<L, R | F>
    : never
```

## Solution: Cleaner
```ts
type StringToUnion<S extends string> = S extends `${infer F}${infer L}`
  ? F | StringToUnion<L>
  : never
```