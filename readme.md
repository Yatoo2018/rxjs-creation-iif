# Rxjs 创建型操作符 iif

在订阅时检查一个 boolean 值, 用来选择俩个 obervable 中的一个流数据源。

## type

`iif<T, F>(condition: () => boolean, trueResult: ObservableInput<T>, falseResult: ObservableInput<F>): Observable<T | F>`

### 参数：

condition () => boolean
条件函数，决定哪一个 observable 将被选择订阅.

trueResult ObservableInput<T>
条件为 true 时，这个 observable 将被订阅。

falseResult ObservableInput<F>
条件为 false 时，这个 observable 将被订阅。

### Returns

`Observable<T | F>`: 一个 observable, 依据条件函数的结果.

## 例子 1

```typescript
import { iif, of } from 'rxjs';

let subscribeToFirst;
const firstOrSecond = iif(
  // 条件函数
  () => subscribeToFirst,

  // 参数2： 一个observable，条件函数结果为真时被选择
  of('first'),

  // 参数3： 一个observable，条件函数结果为假时被选择
  of('second')
);

// 设置条件返回值为true
subscribeToFirst = true;

// 订阅的observable将选择参数2对应的observable
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// 'first'

// 设置条件返回值为false
subscribeToFirst = false;

// 订阅的observable将选择参数3对应的observable
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// 'second'
```

## 例子 2

```typescript
import { iif, of, EMPTY } from 'rxjs';

let accessGranted;
const observableIfYouHaveAccess = iif(
  () => accessGranted,
  // 使用of生成一个observable作为参数2
  of('It seems you have an access...'),
  // 使用 rxjs内部对象 EMPTY 生成一个空 observable.
  EMPTY
);

// 设置条件返回值为true
accessGranted = true;

// 订阅的observable将选择参数2对应的observable, 即 of('It seems you have an access...')
observableIfYouHaveAccess.subscribe({
  next: value => console.log(value),
  complete: () => console.log('The end')
});

// Logs:
// 'It seems you have an access...'
// 'The end'

// 设置条件返回值为false
accessGranted = false;

// 订阅的observable将选择参数3对应的observable 即 EMPTY
observableIfYouHaveAccess.subscribe({
  next: value => console.log(value),
  complete: () => console.log('The end')
});

// Logs:
// 'The end'
```
