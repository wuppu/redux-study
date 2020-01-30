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
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// 디스패치
store.dispatch(increment(1));
store.dispatch(decrement(3));

unsubscribe();

store.dispatch(increment(2e6));
