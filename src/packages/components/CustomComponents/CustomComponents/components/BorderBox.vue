<template>
  <div class="box">
    <div class="title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps(['title'])
const { title } = toRefs(props)
</script>

<style lang="scss" scoped>
.box{
  height: 100%;
  width: 100%;
  background: rgba(65,150,255,.04);
  .title{
    position: relative;
    padding: 0 20px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    border-top: 1px solid rgba(65,150,255,.5);
    border-bottom: 1px solid rgba(65,150,255,.2);
    background: linear-gradient(90deg,rgba(65,150,255,.1) 0,rgba(65,150,255,0));
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:after{
      content: '';
      height: 1px;
      width: 20px;
      background: linear-gradient(90deg,rgba(65,150,255,0) 0,#4196ff);
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .content{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: calc(100% - 40px);
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
  }
}
</style>
