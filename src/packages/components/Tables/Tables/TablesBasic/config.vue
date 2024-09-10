<template>
  <collapse-item name="表格设置" :expanded="true">
    <n-tag type="primary">若配置无响应，请在预览页面查看效果</n-tag>
    <setting-item-box name="表头" :alone="true">
      <div class="rows">
        <div class="columns">字段</div>
        <div class="columns ">标题 </div>
        
      </div>
      <div class="rows" v-for="(row, i) in optionData.header.options" :key="i">
        <div class="columns">{{ row }}</div>
        <div class="columns">   
          <n-input class="columns" style="width: 100px;" v-model:value="optionData.header.map[row]" size="small"/>  
          <n-button @click="handleDelete(i)" circle size="tiny">
          <template #icon>
            <n-icon><RemoveIcon /></n-icon>
          </template>
        </n-button>
        <n-button  @click="handleAdd(i)" circle size="tiny">
          <template #icon>
            <n-icon><AddIcon /></n-icon>
          </template>
        </n-button>
      </div>
         
       
      </div>
    </setting-item-box>
    <setting-item-box name="展示列" :alone="true">
      <n-select
        v-model:value="optionData.header.value"
        :options="optionData.header.options.map(_ => ({label: optionData.header.map[_], value: _}))"
        multiple
        size="small"
      />
    </setting-item-box>
    <setting-item-box :alone="true" name="对齐方式">
      <setting-item :alone="true">
        <n-select
          v-model:value="optionData.align"
          size="small"
          :options="[
            { label: '靠左', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '靠右', value: 'right' }
          ]"
        />
      </setting-item>
    </setting-item-box>
    <setting-item-box :alone="false" name="分页设置">
      <setting-item name="默认页码" :alone="true">
        <n-input-number v-model:value="optionData.pagination.page" :min="1" size="small" placeholder="字体大小"></n-input-number>
      </setting-item>
      <setting-item name="分页" :alone="true">
        <n-select v-model:value="optionData.pagination.pageSize" size="small" :options="page" />
      </setting-item>
    </setting-item-box>
<!--    <setting-item-box :alone="false" name="表格数据">-->
<!--      <SettingItem name="表头名称" class="form_name">-->
<!--        <div style="width: 260px">-->
<!--          <n-input v-model:value="header" size="small" placeholder="表头数据(英文','分割)"></n-input>-->
<!--        </div>-->
<!--      </SettingItem>-->
<!--    </setting-item-box>-->
    <setting-item-box :alone="false" name="表格样式">
      <SettingItem name="显示边框" :alone="true">
        <n-select v-model:value="(optionData as any).style.border" size="small" :options="borderFlag" />
      </SettingItem>
      <SettingItem name="显示分页" :alone="true">
        <n-select v-model:value="optionData.isPagination" size="small" :options="isPaginationFlag" />
      </SettingItem>
      <SettingItem name="显示背景色" :alone="true">
        <n-select v-model:value="optionData.isBackgroundColor" size="small" :options="isBackgroundColorFlag" />
      </SettingItem>
      <SettingItem name="底部边框" :alone="true">
        <n-select
          v-model:value="(optionData as any).style.bottomBordered"
          size="small"
          :options="bottom_borderedFlag"
        />
      </SettingItem>
      <SettingItem name="列分割线" :alone="true">
        <n-select v-model:value="(optionData as any).style.singleLine" size="small" :options="columnFlag" />
      </SettingItem>
      <SettingItem name="行分割线" :alone="true">
        <n-select v-model:value="(optionData as any).style.singleColumn" size="small" :options="lineFlag" />
      </SettingItem>
      <SettingItem name="斑马条纹" :alone="true">
        <n-select v-model:value="(optionData as any).style.striped" size="small" :options="stripedFlag" />
      </SettingItem>
      <setting-item name="字体大小" :alone="true">
        <n-input-number
          v-model:value="optionData.style.fontSize"
          :min="12"
          size="small"
          placeholder="字体大小"
        ></n-input-number>
      </setting-item>
      <setting-item name="边框宽度" :alone="true">
        <n-input-number
          v-model:value="optionData.style.borderWidth"
          :min="0"
          size="small"
          placeholder="字体大小"
        ></n-input-number>
      </setting-item>
      <setting-item name="边框颜色" :alone="true">
        <n-color-picker size="small" :modes="['rgb']" v-model:value="optionData.style.borderColor"></n-color-picker>
      </setting-item>
      
      <setting-item name="边框样式" :alone="true">
        <n-select v-model:value="optionData.style.borderStyle" size="small" :options="borderStyleFlag" />
      </setting-item>
      <SettingItem name="表格搜索（前端静态搜索）" :alone="true">
        <n-select v-model:value="optionData.inputShow" size="small" :options="inputSelect" />
      </SettingItem>
    
    </setting-item-box>
  </collapse-item>
 
  <n-modal
    :show="show"
    preset="dialog"
    title=""
    :show-icon="false"
    @close="close"
    @esc="close"
    style="width: 500px"
  >
  <!-- <n-input class="columns" style="width: 100px;" v-model:value="headerMap.key" size="small"/>  
  <n-input class="columns" style="width: 100px;" v-model:value="headerMap.value" size="small"/>   -->
  <n-list  class="go-system-setting">
      <template #header>
        <n-space justify="space-between">
          <n-h3 class="go-mb-0">添加标题</n-h3>
          <n-icon size="20" class="go-cursor-pointer" @click="close">
            <close-icon></close-icon>
          </n-icon>
        </n-space>
      </template>

      <n-list-item >
        <n-space  :size="40">
          <n-space>
            <n-text class="item-left">字段</n-text>
          </n-space>
          <n-space>
            <n-input class="columns" style="width: 100%;" v-model:value="headerMap.key" size="small"/>  
          </n-space>
        </n-space>
      </n-list-item>
      <n-list-item >
        <n-space  :size="40">
          <n-space>
            <n-text class="item-left">标题</n-text>
          </n-space>
          <n-space>
            <n-input class="columns" style="width: 100%;" v-model:value="headerMap.value" size="small"/>  
          </n-space>
        </n-space>
      </n-list-item>
    </n-list>
  <!-- <div class="footer">
      <div style="flex: 1;"></div>
      <n-button @click="submitCallback" type="info" size="small" style="margin-right: 5px;color: #fff;">确认</n-button>
      <n-button size="small" @click="close">取消</n-button>
    </div> -->
    <template #action>
      <n-button @click="submitCallback" type="info" size="small" style="margin-right: 5px;color: #fff;">确认</n-button>
      <n-button size="small" @click="close">取消</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
import type { Ref } from 'vue'
import { icon } from '@/plugins/icon'
const { RemoveIcon, AddIcon } = icon.ionicons5

import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { commonDataType, PointHistoryType } from '@/store/modules/chartEditStore/chartEditStore.d'

import {useTargetData} from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
const page = [
  { label: '2', value: 2 },
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '30', value: 30 }
]
const borderFlag = [
  { label: '显示', value: 'on' },
  { label: '不显示', value: 'off' }
]
const isPaginationFlag = [
  { label: '显示', value: true },
  { label: '不显示', value: false }
]
const isBackgroundColorFlag = [
  { label: '显示', value: true },
  { label: '不显示', value: false }
]
const columnFlag = [
  { label: '显示', value: 'off' },
  { label: '不显示', value: 'on' }
]
const lineFlag = [
  { label: '显示', value: 'off' },
  { label: '不显示', value: 'on' }
]
const bottom_borderedFlag = [
  { label: '显示', value: 'on' },
  { label: '不显示', value: 'off' }
]
const stripedFlag = [
  { label: '显示', value: 'on' },
  { label: '不显示', value: 'off' }
]
const borderStyleFlag = [
  { label: '实线边框', value: 'solid' },
  { label: '虚线边框', value: 'dashed' },
  { label: '点状边框', value: 'dotted' },
  { label: '双线边框', value: 'double' }
]
const inputSelect = [
  { label: '停用', value: 'none' },
  { label: '启用', value: 'flex' }
]
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }
const currentIndex = ref(0)
const handleAdd = (i:number) => {
  show.value = true
  currentIndex.value = i
  // targetData.value?.option.dataset.dimensions.push('')

}

const handleDelete = (i: number) => {
  // targetData.value.commonData.pointHistory.dems_device_points_uid.splice(i, 1)
  console.log(props.optionData.header,'targetData_delete')
  // targetData.value?.option.dataset.dimensions.push('')
  props.optionData.header.options.splice(i, 1,)


}

const show = ref(false)
const headerMap = ref<any>({
  key: '',
  value: ''
})
const emit = defineEmits(['close', 'update:show'])

const close = () => {
  emit('close')
  updateShow(false)
  show.value = false

}
const submitCallback = ()=>{
  console.log(headerMap.value,'headerMap')
  props.optionData.header.options.splice(currentIndex.value+1, 0, headerMap.value.key)
  props.optionData.header.map[headerMap.value.key] = headerMap.value.value
  console.log(props.optionData,'props.optionData.header')
  close()

  
}
const updateShow = (flag:boolean) => {
  emit('update:show', flag)
}
</script>

<style lang="scss" scoped>
.rows {
  margin-bottom: 10px;
  display: flex;
  height: 28px;
  line-height: 28px;
  .columns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &:nth-last-child(1){
    margin-bottom: 0;
  }
  .columns:nth-child(1) {
    flex: none;
    width: 40%;
  }
  .columns:nth-child(2) {
    flex: none;
    width: 60%;
  }
}
</style>