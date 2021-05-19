
import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context, payload) {
    //  添加新商品
    //数据常用的方法 push pop unshift shift sort reverse map filter reduce join
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    let oldProduct = context.state.cartList.find(function (item) {
      return item.iid === payload.iid
    })

    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }


  }
}
