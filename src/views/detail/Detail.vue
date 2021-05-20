<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :pro-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramI"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentI"></detail-comment-info>
      <detail-recommend :recommend-list="recommendList" ref="recommendI"></detail-recommend>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" class="detail-bottom"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="backTopShow"></back-top>

  </div>
</template>

<script>

import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailRecommend from "./childComponents/DetailRecommend";
import DetailBottomBar from "./childComponents/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";
// import Toast from "components/common/toast/Toast";

import Scroll from "components/common/scroll/Scroll";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {itemListenerMixin} from "common/mixin";
import {debounce} from "common/utils";
import {mapActions} from 'vuex'


export default {
  name: "Detail",
  components: {
    DetailRecommend,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    BackTop,

  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      saveY: [],
      currentIndex: 0,
      backTopShow: false,
    }
  },
  created() {
    //console.log(this.$route);
    //1。保存传入的iid
    this.iid = this.$route.params.iid
    //  2.根据传入的iid，将详情页的数据请求到
    getDetail(this.iid).then(res => {
      //  1 获取顶部轮播图
      const data = res.data.result
      this.topImages = res.data.result.itemInfo.topImages
      // console.log(res)
      //2 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //  4 获取商品的详情数据
      this.detailInfo = data.detailInfo
      //  5 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  6 获取评论信息
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0]
      }
      // //第一次获取$el还没有渲染，取到的值为undefined
      // this.saveY = []
      // this.saveY.push(0)
      // this.saveY.push(this.$refs.paramI.$el.offsetTop)
      // this.saveY.push(this.$refs.commentI.$el.offsetTop)
      // this.saveY.push(this.$refs.recommendI.$el.offsetTop)
      // console.log(this.saveY);
      //
      // //根据最新的数据，DOM加载完成，但是图片依然没有加载完
      // //取到的值不正确
      // this.$nextTick(() => {
      //
      //   this.saveY = []
      //   this.saveY.push(0)
      //   this.saveY.push(this.$refs.paramI.$el.offsetTop)
      //   this.saveY.push(this.$refs.commentI.$el.offsetTop)
      //   this.saveY.push(this.$refs.recommendI.$el.offsetTop)
      //   console.log(this.saveY);
      // })


    })
    getRecommend().then(res => {
      this.recommendList = res.data.data.list
    })
  },
  mounted() {
    // let newRefresh = debounce(this.$refs.scroll.refresh,100)
    //
    // this.itemImgListencer = () => {
    //   // this.$refs.scroll.refresh();
    //   newRefresh(20,30,'abc');
    // }
    // this.$bus.$on('itemImageLoad', this.itemImgListencer)


  },
  destroyed() {
    console.log('detail destroyed');
    this.$bus.$off('itemImageLoad', this.itemImgListencer)
  },
  updated() {
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()

      this.saveY = []
      this.saveY.push(0)
      this.saveY.push(this.$refs.paramI.$el.offsetTop - 44)
      this.saveY.push(this.$refs.commentI.$el.offsetTop - 44)
      this.saveY.push(this.$refs.recommendI.$el.offsetTop - 44)
      this.saveY.push(Number.MAX_VALUE)
      console.log(this.saveY);

    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.saveY[index], 100)
    },
    backClick() {
      console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart() {
      //  1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //  2.将商品添加到购物车中
      //   this.$store.commit("addCart",product)
      //  添加成功之后异步的将添加消息展示给用户
      //  可以直接通过vuex中的mapActions 将actions里面的函数映射到methods中 直接使用
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res)
      })
      //
      // this.$store.dispatch('addCart',product ).then(res => {
      //
      // })

      // console.log(this.$store.state);
    },
    contentScroll(position) {
      // console.log(position)
      // 1.获取Y值
      const positionY = -position.y
      const length = this.saveY.length
      //  2.positonY与主题中的y进行对比
      //  0, 9289, 10031, 10216,Number.MAX_VALUE
      for (let i = 0; i < length; i++) {
        // if(this.currentIndex !== i && ((i < length -1 && positionY >= this.saveY[i] && positionY < this.saveY[i+1]) || ( i === length -1 &&
        //   positionY >= this.saveY[i]))){
        //   this.currentIndex = i
        //   this.$refs.navbar.currentIndex =this.currentIndex
        // }
        if (this.currentIndex !== i && (positionY >= this.saveY[i] && positionY < this.saveY[i + 1])) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }
      // 3.是否显示回到顶部
      this.backTopShow = positionY > 1000;

    }
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
  height: calc(100% - 44px - 58px)
}

.detail-nav {
  z-index: 9;
  position: relative;
  background-color: #fff;

}

.detail-bottom {
  width: 100%;
}
</style>
