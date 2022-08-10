// official: https://ghaiklor.github.io/type-challenges-solutions/en/easy-awaited.html 
type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T;

// Solution from issues: https://github.com/type-challenges/type-challenges/issues?q=label%3A189+label%3Aanswer s
// type MyAwaited<T extends Promise<unknown>> = MyAwaitedAux<T>;
// type MyAwaitedAux<T> = T extends Promise<infer V> ? MyAwaitedAux<V> : T;