<template>
  <div class="SelectItem">
    <video :src="props.imageUrl" autoplay loop muted playsinline type="video/mp4" style="height: 100%;width: 100%"></video>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['imageUrl'])
</script>

<style lang="scss" scoped>
.SelectItem{
  display: inline-block;
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  margin: 5px;
  background: #000;
  border: 1px solid transparent;
  &:nth-last-child(1) {
    margin-bottom: 0;
  }
  &:nth-last-child(2) {
    margin-bottom: 0;
  }
}
.active{
  border: 1px solid #51d6a9;
}
</style>