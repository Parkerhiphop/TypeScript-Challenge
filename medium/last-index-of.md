# 5317 - LastIndexOf
> by jiangshan (@jiangshanmeta) #medium #array

## Question

Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

For example:

```typescript
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
```

### Test Cases
```ts
type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]
```

> View on GitHub: https://tsch.js.org/5317

## Solution: Mine (Partially Accepted)

- Check the item from the right.
- If array has primitive type(like the case 4, 5), this would fail.

```ts
type LastIndexOf<T, U> = T extends [...infer F, infer R]
  ? R extends U
    ? F['length']
    : LastIndexOf<F, U>
  : -1
```

## Solution: Fully Accepted

- Use built-in type `Equal`.

```ts
type LastIndexOf<T, U> = T extends [...infer F, infer R]
  ? Equal<R, U> extends true
    ? F['length']
    : LastIndexOf<F, U>
  : -1
```
