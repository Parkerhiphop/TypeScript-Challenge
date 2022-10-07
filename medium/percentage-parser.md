# 1978 - Percentage Parser
> by SSShuai1999 (@SSShuai1999) #medium 

## Question

Implement PercentageParser<T extends string>.
According to the `/^(\+|\-)?(\d*)?(\%)?$/` regularity to match T and get three matches.

The structure should be: [`plus or minus`, `number`, `unit`]
If it is not captured, the default is an empty string.

For example:

```ts
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]
```

> View on GitHub: https://tsch.js.org/1978

---

## Solution: Parse sign, number and percentage separately.
- Conditional Types
- Inferring within Conditional Types
- Template Literal Types

```ts
type ParseSign<T extends string> = T extends `${infer S}${any}`
  ? S extends '+' | '-'
    ? S
    : ""
  : "";

type ParsePercent<T extends string> = T extends `${any}%` ? "%" : "";

type ParseNumber<T extends string> = T extends `${ParseSign<T>}${infer N}${ParsePercent<T>}`
  ? N
  : "";

type PercentageParser<A extends string> = [
  ParseSign<A>,
  ParseNumber<A>,
  ParsePercent<A>,
]
```
