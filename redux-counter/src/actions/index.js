/**
 * 액션을 만들 때마다 만드는 액션 생성 함수들을 선언합니다.(action creators)
 * 여기에서 () => ({}) 는 function() {return{}}와 동일한 의미입니다.
 */

import * as types from "./ActionTypes";

export const increment= (index) => ({
    type: types.INCREMENT,
    index
});

export const decrement = (index) => ({
    type: types.DECREMENT,
    index
});

export const setColor = ({color, index}) => ({
    type: types.SET_COLOR,
    index,
    color
})

export const create = (color) => ({
    type: types.CREATE,
    color
});

export const remove = () => ({
    type: types.REMOVE
})