# 459 - Flatten
> by zhouyiming (@chbro) #medium #array

## Question

In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

For example:

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

### Test Cases
```ts
type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]
```

> View on GitHub: https://tsch.js.org/459

---

## Solution
```ts
type Flatten<T> = T extends []
  ? []
  : T extends [infer F, ...infer R]
    ? [...Flatten<F>, ...Flatten<R>]
    : [T]
```

I tried to solve it by myself.
I was so close! I know I should use recursive and infer First and Rest Type.
However, I use the wrong condition.

I should check the `[]` first, then use the infer of F and R to do recursive.
- With knowing the array's First and Rest
- We can recursively call Flatten again and again and **pass there these inferred items**
- Flatten the item **until it is not an array** and **return the item itself `[T]`**:

My wrong but close approach.
```ts
type Flatten<T extends unknown[]> = T extends [infer F, ...infer R]
    ? [...Flatten<F>, ...Flatten<R>]
    : [T]
  : [];
```
