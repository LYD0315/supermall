<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props:{
    //通过type来判断，0/1/2/3 0，1不进行监听，2手指滚动，3所有滚动
    proType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll : null,
    }
  },
  mounted() {
    //1.创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType:this.proType,
      pullUpLoad: this.pullUpLoad
    })
    console.log(this.scroll)
    //监听scroll对象
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })
    //是否滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() => {
        // 上拉加载更多
        // console.log(position);
        console.log('上拉加载更多');
        // this.$emit('scroll',position)
        this.$emit('pullingUp')
      })
    }

  },
  methods:{
    scrollTo(x,y,time = 1000){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      console.log('---刷新---');
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
