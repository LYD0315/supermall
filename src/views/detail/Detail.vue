<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>

import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";

import Scroll from "components/common/scroll/Scroll";

import {getDetail, Goods, Shop} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,

  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{}
    }
  },
  created() {
    console.log(this.$route);
    //1。保存传入的iid
    this.iid = this.$route.params.iid
    //  2.根据传入的iid，将详情页的数据请求到
    getDetail(this.iid).then(res => {
      //  1 获取顶部轮播图
      const data = res.data.result
      this.topImages = res.data.result.itemInfo.topImages
      console.log(res)
      //2 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //  4 获取商品的详情数据
      this.detailInfo = data.detailInfo

    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px)
}

.detail-nav {
  z-index: 9;
  position: relative;
  background-color: #fff;
}
</style>
