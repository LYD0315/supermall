<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isAllCheck"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">结算:({{ checkedLength }})</div>

  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
import Toast from "../../../components/common/toast/Toast";
import {mapGetters} from "vuex";


export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
    Toast
  },
  methods:{
    checkClick(){
      if(this.isAllCheck){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
      //简化后的代码为什么不行，在item.checked变化时 computed属性也会将isAllCheck进行改变
      // this.cartList.forEach(item => item.checked = !this.isAllCheck)
    },
    calcClick(){
      if(!this.isAllCheck){
        this.$toast.show("请选择您的商品")
      }
    }

  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return item.price * item.count + preValue
      }, 0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isAllCheck() {
      //1.性能不够高  需要全部遍历
      // return !(this.cartList.filter(item => !item.checked).length)

      //2.性能提高，只需要找到一个
      if (this.cartList.length !== 0) {
        return !this.cartList.find(item => !item.checked)
      } else {
        return false
      }

      //3.另一种方法
      //if (this.cartList.length === 0)return false
      // for (let item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //
      //   }
      // }
      // return true
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  align-items: center;

  height: 40px;

  background-color: #eeeeee;


  line-height: 40px;
}

.check-content {
  display: flex;
  align-items: center;
  width: 60px;
  margin-left: 5px;
}

.check-button {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: #ff630f;
  color: white;
  text-align: center;
}

</style>
