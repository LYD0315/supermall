import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListencer:null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)

    this.itemImgListencer = () => {
      // this.$refs.scroll.refresh();
      newRefresh(20, 30, 'abc');
    }
    console.log('混入内容')
    this.$bus.$on('itemImageLoad', this.itemImgListencer)
  }
}
