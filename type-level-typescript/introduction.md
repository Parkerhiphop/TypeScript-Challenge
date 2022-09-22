# [0. Introduction](https://type-level-typescript.com/?fbclid=IwAR0ODQoeFHB3ccMCGSdpbY1drpddchqMClrWWGRxb2EQTCLua7RLijXBBh4)

> The type system of TypeScript has grown from basic type annotations to a large and complex programming language. 

> This course helps you build a good mental model of the fundamentals is more empowering because it will help you solve problems we haven't covered.

## Chapter GuideLine
1. [Types & Values]
2. [Types are just data]
3. [Objects and Records]
4. [Array and Tuples]
5. [Conditional Types]
6. [Assignability In Depth]
7. [Template Literal Types]
8. [Advanced Union Types]
9. [Loop with Mapped Types]
10. [Loops with Recursive Types]
11. [Debugging Types]

## Learn Advanced TypeScript features
1. Generics
2. Conditional Types
3. Mapped Types
4. Recursive Types
5. Compile time performance
6. Type errors
7. Type-level debugging
8. ...

Recommend Resource: [TS-Pattern](https://github.com/gvergnaud/ts-pattern)

## Why use Types?
1. They document the code.
2. They make developers more proficient by providing them with smart suggestions.
3. They catch mistakes and typos.
4. ...

## Show the correspondence between programming concepts you already know.
1. code branching
2. variable assignment
3. loops and data structures
4. their type-level equivalent


## Example: Check if your route parameters are passed correctly.

```ts
// ✅ this is correct 👌
navigate("user/:userId", { userId: "2" });

// ✅ Looks good! `dashboardId` is optional.
navigate("user/:userId/dashboard(/:dashboardId)", { userId: "2" });

// ❌ `userId` is missing. Add one to fix the error!
navigate("user/:userId/dashboard(/:dashboardId)", { dashboardId: "2" });

// ❌ `oops` isn't a parameter. Remove it to fix the error!
navigate("user/:userId/dashboard(/:dashboardId)", { userId: "2", oops: ":(" });

// 👇 Scroll to see how this works!

// 🤫 Here are the kind of things you will soon be able to do!
type ParseUrlParams<url> =
  url extends `${infer path}(${infer optionalPath})`
    ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
    : url extends `${infer start}/${infer rest}`
    ? ParseUrlParams<start> & ParseUrlParams<rest>
    : url extends `:${infer param}`
    ? { [k in param]: string }
    : {};

// navigate to a different route
function navigate<T extends string>(
  path: T,
  params: ParseUrlParams<T>
) {
  // interpolate params
  let url = Object.entries<string>(params).reduce<string>(
    (path, [key, value]) => path.replace(`:${key}`, value),
    path
  );

  // clean url
  url = url.replace(/(\(|\)|\/?:[^\/]+)/g, '')

  // update url
  history.pushState({}, '', url);
}

```
