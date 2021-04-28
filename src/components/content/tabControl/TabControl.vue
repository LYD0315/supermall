<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-item"
         :class="{active: index=== currentIndex}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  },
  data(){
    return{
      currentIndex : 0
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
  background-color: white;
}
.tab-control span{
  padding:3px;
  left: 3px;
  right: 3px;
}

.tab-item {
  flex: 1;
}
/*.active{*/
/*  color: var(--color-high-text);*/
/*  border-bottom: 3px solid var(--color-tint);*/
/*}*/
.active span{
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>
