<template>
  <CollapseItem name="列表" :expanded="true">
    <SettingItemBox name="基础">
      <SettingItem name="轮播时间(ms)">
        <n-input-number
          v-model:value="optionData.timeout"
          :min="1"
          size="small"
          placeholder="请输入轮播时间"
        ></n-input-number>
      </SettingItem>
      
    </SettingItemBox>
   
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType,Ref ,computed} from "vue";
import { option,AlignEnum } from './config'


const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
  

</script>

<style lang="scss" scoped>

</style>