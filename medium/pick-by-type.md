# 2595 - PickByType
> by jiangshan (@jiangshanmeta) #medium #object

### Question

From `T`, pick a set of properties whose type are assignable to `U`.

For Example

```typescript
type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }
```


### Test Case
```ts
PickByType<Model, boolean> // { isReadonly: boolean; isEnable: boolean }

PickByType<Model, string> // { name: string }

PickByType<Model, number> // { count: number }

```

> View on GitHub: https://tsch.js.org/2595

---

## Solution
1. Mapped Types
2. Key remapping via as
3. Conditional Types
4. keyof and Lookup Types

```ts
type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P]}

```
