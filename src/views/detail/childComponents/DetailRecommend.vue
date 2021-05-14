<template>
<div class="detail-recommend">
  <goods-list :goods="recommendList"></goods-list>
</div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "DetailRecommend",
  components:{
    GoodsList,
    GoodsListItem
  },
  data (){
    return{
      goods:[]
    }
  },
  props: {
    recommendList:{
      type:Array,
      default(){
        return {}
      }
    }
  },
  mounted() {
    this.goods = this.recommendList
    console.log(this.goods);
  }
}
</script>

<style scoped>

</style>
