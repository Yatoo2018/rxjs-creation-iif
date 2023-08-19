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
firstOrSecond.subscribe((value) => console.log(value));

// Logs:
// 'first'

// 设置条件返回值为false
subscribeToFirst = false;

// 订阅的observable将选择参数3对应的observable
firstOrSecond.subscribe((value) => console.log(value));

// Logs:
// 'second'
