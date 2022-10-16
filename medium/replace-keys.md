# 1130 - ReplaceKeys
> by 贱贱 (@lullabyjune) #medium 

## Question

Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
A type takes three arguments. 


For example:

```ts
type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}


type Nodes = NodeA | NodeB | NodeC

type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
```

> View on GitHub: https://tsch.js.org/1130

---

## Solution: Once we know mapped types are distributive, we could just check the condition of values.
- Mapped Types
- Conditional Types
- Indexed Access Types

```js
type ReplaceKeys<U, T extends string, Y> = { [P in keyof U]:
  P extends T ? (P extends keyof Y ? Y[P] : never) : U[P]
}
```

Conditional Types are distributive.
- ex: `U extends any ? U[] : never` 
  - what actually happens is U becomes an element from the union U in the truth branch on each iteration.

Mapped types in TypeScript are also distributive.
- It means we can start writing mapped type to iterate over the keys of the interface and have a distributivity over the union at the same time.  
- ex: `type ReplaceKeys<U, T, Y> = { [P in keyof U]: U[P] };`
  - If `U` is `objA | objB`, we would take all the elements from union U (thanks to distributivity) and on each element iterate over its keys and return a copy.

