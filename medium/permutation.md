# 296 - Permutation
> by Naoto Ikuno (@pandanoir) #medium #union

## Question

Implement permutation type that transforms union types into the array that includes permutations of unions.

```typescript
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

> View on GitHub: https://tsch.js.org/296

---

## Solution:  Divide and Conquer Algo

Associated with [My Exclude](../easy/exclude.md)

```ts
type Permutation<T, C = T> = [T] extends [never]
  ? []
  : C extends infer U
    ? [U, ...Permutation<Exclude<T, U>>]
    : [];
```

### Explanation
If you can’t find a solution to the task, try to find a solution for a subset of a task.
Instead of trying to find the permutations for all the elements, let us start with 0 and 1 elements.

#### Only 0 and 1 elements
```ts
type Permutation<T> =[T] extends [never] ? [] : [T];
```

How can we find a permutation over two elements? Still “divide and conquer”.

E.g. we want to find a Permutation<‘A’ | ‘B’>.

We need to take the first element A and find the permutation over the rest of the union, in our case, Permutation<‘B’>.

The same with the second element B. We take element B and are looking for Permutation<‘A’>. 

#### Recursive Process
```js
Permutation<'A' | 'B'> -> ['A', ...Permutation<'B'>] + ['B', ...Permutation<'A'>] -> ['A', 'B'] + ['B', 'A']

Permutation<'A' | 'B' | 'C'> -> ['A', ...Permutation<'B' | 'C'>] + ['B', ...Permutation<'A' | 'C'>] + ['C', ...Permutation<'A' | 'B'>] -> ['A', 'B', ...Permutation<'C'>] + ['A', 'C' ...Permutation<'B'>] + ...B + ..
```


#### Iterate over the union and get the element from there.
`T extends infer U ? U : never`


```ts
type Permutation<T> = [T] extends [never]
  ? []
  : T extends infer U
    ? [U, ...Permutation<Exclude<T, U>>]
    : [];
```

#### T extends infer U doesn't work well, so copy it by `C = T`
When working with the construct `T extends infer U`, in our case, it does not work as I was expecting to work.

I was utterly shocked, when just copying the type parameter T into another one solves the issue:
```ts
type Permutation<T, C = T> = [T] extends [never]
  ? []
  : C extends infer U
    ? [U, ...Permutation<Exclude<T, U>>]
    : [];
```
