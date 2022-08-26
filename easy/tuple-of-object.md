# 11 - Tuple to Object
> by sinoon (@sinoon) #easy 

## Question

Give an array, transform into an object type and the key/value must in the given array.

For example:

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

### Test Cases
```ts
type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { 'tesla': 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>
```

> View on GitHub: https://tsch.js.org/11

---

## Solution: Mapped Types + array[number] and Indexed types
```ts
type TupleToObject<T extends readonly (string | number | symbol)[]> = { [V in T[number]]: V }
```

Take all the values from the array and make it as keys and values in our new object.
1. Indexed types: Get the values from an array by using `T[number]` construct
2. Mapped types: Iterate over those values in `T[number]` and return a new type where the key and value is the type from `T[number]`
3. Use (string | number | symbol)[] to prevent the error case: `[[1,2], {}]`


