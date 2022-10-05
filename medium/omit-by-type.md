# 2852 - OmitByType
> by jiangshan (@jiangshanmeta) #medium #object

## Question

From ```T```, pick a set of properties whose type are not assignable to ```U```.

For Example

```typescript
type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }
```

> View on GitHub: https://tsch.js.org/2852

---

## Solution: Key remapping in mapped types

Associate with [My Omit](my-omit.md)

```ts
type OmitByType<T, U> = { [P in keyof T as T[P] extends U ? never : P]: T[P] }
```

