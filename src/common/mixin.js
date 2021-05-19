import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

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
    // console.log('混入内容')
    this.$bus.$on('itemImageLoad', this.itemImgListencer)
  }
}

export const backTopMixin ={
  components:{
    BackTop
  },
  data(){
    return{
      backTopShow: false,
    }
  },
  methods:{
    backClick() {
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0)
    },

  }
}
