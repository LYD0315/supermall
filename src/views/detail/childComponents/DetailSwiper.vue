<template>

    <swiper class="swiper-father">
      <swiper-item  v-for="(item,index) in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>


</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>
.swiper-father{
  height: 300px;
  overflow: hidden;
}
</style>
