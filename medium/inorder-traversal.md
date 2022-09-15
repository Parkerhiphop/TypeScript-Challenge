# 3376 - InorderTraversal
> by jiangshan (@jiangshanmeta) #medium #object

## Question

Implement the type version of binary tree inorder traversal.

For example:

```typescript
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

type A = InorderTraversal<typeof tree1> // [1, 3, 2]
```

> View on GitHub: https://tsch.js.org/3376

---

## Solution: Recursion

```
      A
    /   \
   B     C
 /   \
D     E

In-order Traversal: D, B, E, A, C
```
[Iterate over Binary Tree](https://stackoverflow.com/questions/2942517/how-do-i-iterate-over-binary-tree)

Since the rule is left -> val -> right, we could just split the array to three parts: [...left, ...val, ...right].

Store `Left` and `Right` in Generic, like [Chainable](chainable.md)

### Simple
```ts
type Iterate<T extends TreeNode> = T['left'] extends null
    ? T['right'] extends null
      ? T['right']['val']
      : T['val']
    : [T['left']['val'], T['val']]

type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
  ? [...Traverse<T, "left">, T["val"], ...Traverse<T, "right">]
  : []
```

## Better
```ts
type InorderTraversal<
  T extends TreeNode | null,
  L extends TreeNode | null = T extends TreeNode ? T['left'] : null,
  R extends TreeNode | null = T extends TreeNode ? T['right'] : null,
> = T extends TreeNode
  ? [...InorderTraversal<L>, T['val'], ...InorderTraversal<R>]
  : []
```
