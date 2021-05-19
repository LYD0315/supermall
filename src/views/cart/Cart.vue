<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--  商品列表-->
    <cart-list></cart-list>
    <!--  底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    //两种用法
    //用法1
    // ...mapGetters(['cartLength'])
    //用法2 对象可以起别名
    ...mapGetters({cartLength: 'cartLength'})
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 500;
}
</style>
