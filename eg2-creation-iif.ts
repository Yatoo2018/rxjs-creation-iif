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
  next: (value) => console.log(value),
  complete: () => console.log('The end'),
});

// Logs:
// 'It seems you have an access...'
// 'The end'

// 设置条件返回值为false
accessGranted = false;

// 订阅的observable将选择参数3对应的observable 即 EMPTY
observableIfYouHaveAccess.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('The end'),
});

// Logs:
// 'The end'
