<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :pro-type="3" @scroll="contentScroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','精选','好物']"
                   class="tab-control"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="backTopShow"></back-top>
  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";


export default {
  name: "Home",
  components: {
    GoodsList,
    TabControl,
    Scroll,
    RecommendView,
    HomeSwiper,
    NavBar,
    HomeFeatureView,
    BackTop

  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      backTopShow:false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    //请求multidata
    this.getHomeMultidata()
    //请求data
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关代码
     */
    tabClick(index) {
      console.log(index);
      //条件两个以上时尽量使用switch
      // if(index == 0){
      //   this.currentType = 'pop'
      // }else if(index == 1){
      //   this.currentType = 'new'
      // }else if(index == 2){
      //   this.currentType ='sell'
      // }
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break

        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    /**
     * 网络请求相关代码*/
    //请求multidata
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //console.log(res);
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
      });
      console.log(this.goods)
    }
    ,
    backClick(){
      console.log('回到顶部');
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      console.log(position);
      if(position.y < -1000){
        this.backTopShow = true
      }else {
        this.backTopShow = false
      }
    }

  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;

}

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  /*height: 300px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.backtop{

}
/*.content {*/
/*  height: calc(100% - 49px);*/
/*  overflow: hidden;*/
/*}*/
</style>
