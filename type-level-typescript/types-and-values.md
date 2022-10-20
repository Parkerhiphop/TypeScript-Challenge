# [1. Types & values](https://type-level-typescript.com/01-types-and-values)

1. The difference of value-level and type-level code.
   ```ts
    // This is a type-level function:
    type DoSomething<A, B> = ...

    // This is a value-level function:
    const doSomething = (a, b) => ...
   ```
2. TS Feature: Generic & Type annotations
    > Define type parameters in angle brackets <A, B, ...> and assign them to value parameters with a: A.
    ```ts
    // Using type annotations:
    function sum(a: number, b: number): number {
      return a + b;
    }

    // Using type level programming:
    function genericFunction<A, B>(a: A, b: B): DoSomething<A, B> {
      return doSomething(a, b);
    }
    ```
3. The languages of types.
   1. What it can do?
      1. Code Branching
      2. Variable Assignment
      3. Functions
      4. Loops
      5. Equality checks
      6. ...
   2. What it can't do?
      1. NO Mutable State
      2. NO Input/Output
         1. Side Effects
         2. Reading a file
         3. Making a request
      3. NO High Order Functions
         1. map, filter, reduce, ...
4. Challenge about generic and function's type
   1. generic function
   2. safehead
   3. map
   4. pipe
