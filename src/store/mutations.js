import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
  //mutations的目的就是为了修改state的状态
  //设计原则：每一个方法尽可能完成的事情比较单一
  [ADD_COUNTER](state,payload){
    payload.count += 1
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}
