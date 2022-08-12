# 533 - [Concat](https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md)
>by Andrey Krasovsky (@bre30kra69cs)

#easy #array
  
## Question
  
Implement the JavaScript `Array.concat` function in the type system. A type takes the two arguments. The output should be a new array that includes inputs in ltr order
  
For example:
  
```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```
## Solution: Spread Operator and Conditional Types

```ts
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];
```
- https://tsch.js.org/533/solutions
