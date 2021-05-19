<template>

  <div>
    <h2>
      <back-top @click.native="backClick" v-show="backTopShow"></back-top>
    </h2>
  </div>
</template>

<script>
import {backTopMixin} from "common/mixin"

export default {
  name: "Category",
  mixins:[backTopMixin],
}
</script>

<style scoped>
</style>
