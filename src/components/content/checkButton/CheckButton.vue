<template>
  <div class="check-button" :class="{check: isChecked}" >
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.check-button{

  border:2px solid #c8c8c8;
  border-radius: 3px;
}
.check{
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
</style>
