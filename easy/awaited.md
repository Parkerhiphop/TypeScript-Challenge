# 189 - [Awaited](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md)
> by Maciej Sikora (@maciejsikora)

#easy #promise #built-in
  
## Question
  
  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?
  
  For example: if we have `Promise<ExampleType>` how to get ExampleType?
  
  ```ts
  type ExampleType = Promise<string>
  
  type Result = MyAwaited<ExampleType> // string
  ```

> This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

---

## Solution: Conditional Types , Infer & Recursive
```ts
type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T;
```
- https://ghaiklor.github.io/type-challenges-solutions/en/easy-awaited.html
- https://tsch.js.org/189/solutions

### [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
> 使用 extends 關鍵字的這個看起來像是三元運算子的寫法
- 目的在於創造分支，增加了型別的表達能力
- 不存在 if/else if/else 或是 switch/case 
- 多重判斷只能自己一直寫
```
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

```

###  [Infer ](https://chentsulin.medium.com/typescript-infer-%25E7%259A%2584%25E5%25BC%25B7%25E5%25A4%25A7%25E5%258A%259F%25E7%2594%25A8-9b43c4eac6fb)￼
> 必須使用在「條件類型的子句」
- 也就是 extends 後面、? 前面的位置。
- 可用於：
	1. 推斷 Object 值的型別
	2. 推斷 Function 參數的型別
	3. 推斷 Function 回傳值的型別
	4. 推斷 Generice 參數的型別
	5. 推斷 String 的一部分
```
type MyAwaited<T> = T extends Promise<infer V> ? V : T
```


## Additional
 `ts-expect-error` 
> 強制下一行的 TS 要 Compile 失敗
```
type error = MyAwaited<number>
```
- 在這邊用來嚴格規定 MyAwait 只能接受 Promise<T>
	- 接收一般型別就要報錯
- 若是 MyAwaited<number> 則不能通過
- → 暫時性的 work around 可以用
	- 當下一行的 ts error 被修好後，ts-expect-error 會報錯來提示你將這一行拔掉。

`ts-ignore` 
> 忽略下一行的 TS Error
- 痛點： 把  typing 修好後會忘記拔掉這行
- 但若需要永久性的忽略 ts 則可以使用
