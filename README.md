# REDUX study

## 1. 사용 이유

- 리덕스는 리액트에서 상태를 더 효율적으로 관리하는 데 사용하는 상태 관리 라이브러리입니다.
-  App 컴포넌트를 업데이트하면 App 하위의 컴포넌트들이 모두 리렌더링되는 현상이 있습니다.
- 하지만 이러한 문제들이 컴포넌트들이 많아지면 불필요한 렌더링이 발생하게 됩니다.



## 2. 리덕스에 대해서

- 리덕스는 쉽게 살명하면 상태 관리의 로직을 컴포넌트 밖에서 처리하는 것입니다.
- 리덕스를 사용하면 **스토어(store)**라는 객체 내부에 상태를 담게 됩니다.
- 상태에 어떤 변화를 이으켜야 할 때는 **액션(action)**이라는 것을 스토어에 전달합니다.
- 액션은 객체 형태로 되어 있으며, 상태를 변화시킬 때 이 객체를 참조하여 변화를 일으킵니다.
- 이러한 액션을 전달하는 과정을 **디스패치(dispatch)**라고 합니다.
- 스토어가 액션을 받으면 **리듀서(reducer)**가 전달받은 액션을 기반으로 상태를 어떻게 변경시켜야 할지 결정합니다.
- 액션을 처리하면 새 상태를 스토어에 저장합니다.
- 스토어 안에 있는 상태가 바뀌면 스토어를 **구독(subscribe)**하고 있는 컴포넌트에 바로 전달합니다.
- 부모 컴포넌트로 `props`를 전달하는 작업은 생략하며, 리덕스에 연결하는 함수를 사용하여 컴포넌트를 스토어에 구독시킵니다.



## 3. 용어 정리

- 스토어: 애플리케이션의 상태 값드을 내장하고 있습니다.
- 액션: 상태 변화를 일으킬 때 참조하는 객체입니다.
- 디스패치: 액션을 스토어에 전달하는 것을 의미합니다.
- 리듀서: 상태를 변화시키는 로직이 있는 함수입니다.
- 구독: 스토어 값이 필요한 컴포넌트는 스토어를 구독합니다.



## 4. 리덕스의 세 가지 규칙

- 리덕스 공식 메뉴얼에서 알려 주는 규칙

### 4-1. 스토어는 단 한 개

- 스토어는 언제나 단 한 개입니다. 스토어를 여러 개 생성해서 상태를 관리하면 안 됩니다.
- 리듀서를 여러 개 만들어서 관리할 수 있습니다.

### 4-2. state는 읽기 전용

- 리덕스의 상태, `state` 값은 읽기 전용입니다. 절대 직접 수정하면 안 됩니다.
- 이를 지키지 않을 경우, 리덕스의 구독 함수를 제대로 실행하지 않거나 컴포넌트의 리렌더링이 되지 않을 수 있습니다.
- 업데이트할 경우, 항상 새로운 상태를 넣어줘야 합니다. (새로운 객체를 만든다고 해서 메모리 누수가 일어나지 않는다. 레퍼런스가 사라지면 자동으로 메모리 관리를 해주기 때문입니다.)

### 4-3. 변화는 순수 함수로 구성

- 모든 변화는 순수 함수로 구성해야 합니다. 여기에서 함수란 바로 리듀서 함수를 말합니다.
- 순수 함수에서 결과 값을 출력할 때는 파라미터 값에만 의존해야 하며, 같은 파라미터는 언제나 같은 결과를 출력해야 합니다.

> 리듀서 함수 내부에서는 외부 네트워크와 데이터베이스에 직접 접근하면 안 됩니다. 요청이 실패할 수도 있고, 외부 서버의 반환 값이 변할 수 있기 때문입니다.
>
> 리듀서 함수 내부에서는 현재 날짜를 반환하는 `new Date()` 함수나 `Math.random()` 함수 등도 사용하면 안 됩니다.



## 5. 사용

### 5-1. 액션과 액션 생성 함수

- 액션은 스토어에서 상태 변화를 일으킬 때 참조하는 객체입니다.
- 이 객체는 `type`값을 **반드시 가지고 있어야** 합니다.
- 액션 타입은 해당 액션이 어떤 작업을 하는 액션인지 정의하며, **대문자와 밑줄**을 조합하여 만듭니다.

```js
{
    type: "CHECK",
    text: "리덕스 배우기~~"
}
```

- 위와 같이 액션을 새로 만들 때마다 직접 객체를 만들어 준다면 액션 형식을 모두 알고 있어야 하므로 불편합니다.
- 보통 액션을 만들어 주는 함수를 사용하고 이를 **액션 생성 함수(action creator)**라고 합니다.

```js
// type은 대문자
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// 액션 생성 합수
// diff는 유동적인 값이 있을 경우 추가하며, 필요없다면 제거해도 된다.
const increment = (diff) => ({
  type: INCREMENT,
  diff: diff
});

const decrement = (diff) => ({
  type: DECREMENT,
  diff: diff
});

// 확인용
console.log(increment(1));
console.log(decrement(1));
```



### 5-2. 변화를 일으키는 함수, 리듀서

- 리듀서는 상태에 변화를 일으키는 함수이다.
- 리듀서는 파라미터를 두 개 받습니다. (첫 번째는 현재 상태, 두 번째는 액션 객체)
- 함수 내부에서는 `switch`문을 사용하여 `action.type`에 따라 새로운 상태를 만들어서 반환해야 합니다.
- 리듀서가 초기에 사용할 초기 상태 `initialState` 값부터 먼저 설정해야 리듀서를 만들 수 있습니다.

```js
const initialState = {
  number: 0,
  foo: "bar",
  baz: "qux"
};

// state = initialState
// state 값이 undefined라면 initialState를 기본값으로 사용한다는 의미이다.
function counter(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return Object.assign({}, state, {
          number: state.number + action.diff
      });
    case DECREMENT:
      return Object.assign({}, state, {
          number: state.number - action.diff
      });
    default:
      return state;
  }
}
```

- `state = initialState`은 state 값이 undefined라면 initialState를 기본값으로 사용한다는 의미이다.
- 만약 `initialState`의 값이 여러개일 경우, `state`와 같이 직접 수정하면 안되고, 새로운 객체를 만들어서 상태를 재정의 해야합니다.
- `Object.assign`함수를 실행하면 파라미터로 전달된 객체들을 순서대로 합쳐줍니다.
  - 첫 빈 객체에 기존의 `state`객체를 넣고, `number`를 바꿔 넣는 순서입니다.

```js
function counter(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {...state, 
              number: state.number + action.diff};
    case DECREMENT:
      return {...state,
             number: state.number - action.diff};
    default:
      return state;
  }
}
```

- `...`연산자를 사용하면 보다 깔끔하게 정리할 수 있습니다.



### 5-3. 리덕스 스토어 생성

- 액션과 리듀서가 준비되면 리덕스 스토어를 만들 수 있습니다.
- 파라미터로는 리듀서 함수가 들어가고, 두 번째 파라미터를 설정하면 해당 값을 시토어의 기본 값으로 사용합니다.
- 이 값을 생갹하면 리듀서 초기값을 스토어 기본 값으로 사용합니다.

```js
const {createStore} = Redux;
/* 
 나중에 실제로 사용할 때는,
 import {createStore} from "redux";
 */
const store = createStore(counter);
```



### 5-4. 구독

- 리액트 컴포넌트에서 리덕스 스토어를 **구독(subscribe)**하는 작업은 나중에 `react-redux`의 `connect`함수가 대신합니다.
- 따라서 리덕스 내장 함수 `subscribe`를 직접적으로 사용할 일은 많지 않습니다.
- 리덕스 스토어를 구독한다는 것은 리덕스 스토어의 상태가 바뀔 때마다 특정 함수를 실행시킨다는 의미입니다.

```js
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
```

- 스토어를 구독할 때에는 `subscribe`함수를 사용합니다.
- 이 함수는 함수 형태의 파라미터를 받고, 파라미터로 전달된 함수는 스토어 상태에 변화가 일어날 때마다 호출됩니다.
- `subscribe`함수가 호출되면 반환 값으로 구독을 취소하는 `unsubscribe`함수를 반환합니다.
- 나중에 구독 취소를 할 경우는 `unsubscribe()`를 입력하여 호출하면 됩니다.



### 5-5. dispatch로 액션 전달

- `store.dispatch`함수를 사용하여 스토어에 액션을 넣습니다.

```js
const {createStore} = Redux;
const store = createStore(counter);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment(1));
store.dispatch(decrement(3));

// 구독 해제
unsubscribe();

store.dispatch(increment(2e6));
```

```js
[object Object] {
  baz: "qux",
  foo: "bar",
  number: 1
}

[object Object] {
  baz: "qux",
  foo: "bar",
  number: -2
}
```



## 6. 예제 코드

```js
// 이름 정의
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// 액션 정의
const increment = (diff) => ({
  type: INCREMENT,
  diff: diff
});

const decrement = (diff) => ({
  type: DECREMENT,
  diff: diff
});

// 리듀서 초기값 정의
const initialState = {
  number: 0,
  foo: "bar",
  baz: "qux"
};

// 리듀서 함수
// state = initialState
// state 값이 undefined라면 initialState를 기본값으로 사용한다는 의미이다.
function counter(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {...state, 
              number: state.number + action.diff};
    case DECREMENT:
      return {...state,
             number: state.number - action.diff};
    default:
      return state;
  }
}

/* 
 나중에 실제로 사용할 때는,
 import {createStore} from "redux";
 */
// 스토어 정의
const {createStore} = Redux;
const store = createStore(counter);

// 구독
// 스토어 내부 상태가 변화할 때, 스토어에 구독된 함수를 실행시킨다.
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// 디스패치
store.dispatch(increment(1));
store.dispatch(decrement(3));

unsubscribe();

store.dispatch(increment(2e6));
```



## 7. 정리

- 스토어에 상태 정보를 가진 객체를 넣어 두고, 액션이 디스패치되었을 때 리듀서 함수를 이용하여 상태를 변화시키는 것이 주요 역할입니다.
- 또한 상태가 변화될 때마다 스토어에 구독된 함수를 실행시킵니다.