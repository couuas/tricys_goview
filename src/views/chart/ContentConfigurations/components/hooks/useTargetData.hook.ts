import { computed, Ref } from 'vue'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

// 获取当前对象数据
export const useTargetData = () => {
  const chartEditStore = useChartEditStore()
  const targetData: Ref<CreateComponentType | CreateComponentGroupType> = computed(() => {
    const list = chartEditStore.getComponentList
    const targetIndex = chartEditStore.fetchTargetIndex()
    // 分组时 判断是不是分组里的组件
    const selectId = chartEditStore.getTargetChart.selectId[0]
    if(list[targetIndex].isGroup && list[targetIndex].id !== selectId) {
      return list[targetIndex].groupList!.find(_ => _.id === selectId)!
    }
    return list[targetIndex]
  })
  return { targetData, chartEditStore }
}
