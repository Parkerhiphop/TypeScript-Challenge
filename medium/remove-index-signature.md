# 1367 - Remove Index Signature
> by hiroya iizuka (@hiroyaiizuka) #medium 

## Question

Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

For example:

```

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type A = RemoveIndexSignature<Foo> //  { foo(): void }
type B = RemoveIndexSignature<Bar> //  { bar(): void; 0: string }
type C = RemoveIndexSignature<FooBar> //  { [foobar](): void }
type D = RemoveIndexSignature<Baz> //  { bar(): void; baz: string }
```

> View on GitHub: https://tsch.js.org/1367

---

## Solution: Check the keyof T reversely.
- Conditional Types
- Mapped Types
- Key remapping via as

```ts
type TypeLiteralOnly<T> = string extends T
  ? never
    : number extends T
      ? never
      : symbol extends T
        ? never
        : T
type RemoveIndexSignature<T> = { [P in keyof T as TypeLiteralOnly<P>]: T[P] };
```

### Steps
1. TS represent any key on the object as a string type literal.
  - the index signature has just a type like `number`, `string` or `symbol.
```ts
type Bar = { [key: number]: any; bar(): void }; // keyof Bar = number | "bar"
```
2. check if the type is a type literal, filter index signature.
```ts
"foo" extends string // true
string extends "foo" // false
```
3. Use `TypeLiteralOnly` and Key Remapping.

---

# Index Signature
<!-- TODO: File it in note file. -->
## JS
- An Object in JavaScript (and hence TypeScript) can be accessed with a string to hold a reference to `any other JavaScript object`.

```js
/** refer to a string */
let foo:any = {};
foo['Hello'] = 'World'; // access the foo with 'Hello', then hold the reference to 'World'.
console.log(foo['Hello']); // World

/** refer to a class */
class Foo {
  constructor(public message: string){};
  log(){
    console.log(this.message)
  }
}

let foo:any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World
```

- Object Props can be assessed with a string.
- And If you pass an object as index signature, JS runtime actually calls .toString on it before getting the result.  
- (Array use `number` as a valid object accessor)
```js
let obj = {
  toString(){
    console.log('toString called')
    return 'Hello'
  }
}


let foo:any = {};
foo[obj] = 'World'; // toString called
console.log(foo[obj]); // toString called, World
console.log(foo['Hello']); // World
```

## TS
```ts
let obj = {
  toString(){
    return 'Hello'
  }
}

let foo:any = {};

// ERROR: the index signature must be string, number ...
foo[obj] = 'World';

// FIX: TypeScript forces you to be explicit
foo[obj.toString()] = 'World';
```

> The reason for forcing the user to be explicit is because the default toString implementation on an object is pretty awful.
```ts
/** env: V8 */
let obj = {message:'Hello'}
let foo:any = {};

// ERROR: the index signature must be string, number ...
foo[obj] = 'World';

// Here is what you actually stored!
console.log(foo["[object Object]"]); // World
```

`number` is supported because

its needed for excellent Array / Tuple support.
even if you use it for an obj its default toString implementation is nice (not [object Object]).

## Brief Summary

TypeScript index signatures must be either string or number.

Quick note: symbols are also valid and supported by TypeScript. But lets not go there just yet. Baby steps.

## Declaring an index signature
```ts
let foo:{ [index:string] : {message: string} } = {};

/**
 * Must store stuff that conforms the structure
 */
/** Ok */
foo['a'] = { message: 'some message' };
/** Error: must contain a `message` or type string. You have a typo in `message` */
foo['a'] = { messages: 'some message' };

/**
 * Stuff that is read is also type checked
 */
/** Ok */
foo['a'].message;
/** Error: messages does not exist. You have a typo in `message` */
foo['a'].messages;
```

### All members must conform to the string index signature
```ts
/** Okay */
interface Foo {
  [key:string]: number
  x: number;
  y: number;
}
/** Error */
interface Bar {
  [key:string]: number
  x: number;
  y: string; // Property `y` must of of type number
}
```


ex: `[propName: string]`
```ts
interface IPerson {
    name: string;
    age?: number;
    [propName: string]: string | number | undefined;
}

const iris: IPerson = {
    name: 'Iris',
    gender: 'female'  
};
```

- https://rexdainiel.gitbooks.io/typescript/content/docs/types/index-signatures.html
- https://ithelp.ithome.com.tw/articles/10275784