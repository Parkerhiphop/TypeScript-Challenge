# 119 - ReplaceAll
> by Anthony Fu (@antfu) #medium #template-literal

## Question

Implement `ReplaceAll<S, From, To>` which replace the all the substring `From` with `To` in the given string `S`

### Test Cases

```ts
type A = ReplaceAll<'foobar', 'bar', 'foo'> // 'foofoo';
type B = ReplaceAll<'foobar', 'bag', 'foo'> // 'foobar';
type C = ReplaceAll<'foobarbar', 'bar', 'foo'> // 'foofoofoo';
type D = ReplaceAll<'t y p e s', ' ', ''> // 'types';
type E = ReplaceAll<'foobarbar', '', 'foo'> // 'foobarbar';
type F = ReplaceAll<'barfoo', 'bar', 'foo'> // 'foofoo';
type G = ReplaceAll<'foobarfoobar', 'ob', 'b'> // 'fobarfobar';
type H = ReplaceAll<'foboorfoboar', 'bo', 'b'> // 'foborfobar';
type I = ReplaceAll<'', '', ''> // '';
```

> View on GitHub: https://tsch.js.org/119

---

## Solution
```ts
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer B}${From}${infer A}`
    ? `${B}${To}${ReplaceAll<A, From, To>}`
    : S
```
- Original, I replace F as well. But the `F` doesn't need to replace, it would be the character before the first `To` string.
- We only need to replace string after the first `From`.
