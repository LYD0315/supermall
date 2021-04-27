<template>
  <swiper>
    <swiper-item v-for="(imgitem,index) in banners" :key="index">
      <a :href="imgitem.link">
        <img :src="imgitem.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

</style>
