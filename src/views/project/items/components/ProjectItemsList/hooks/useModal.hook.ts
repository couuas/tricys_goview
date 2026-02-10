import { ref } from 'vue'
import router from '@/router'
import { ChartEnum, PreviewEnum } from '@/enums/pageEnum'
import { Chartype } from '../../../index.d'

export const useModalDataInit = () => {
  const modalShow = ref<boolean>(false)
  const modalData = ref<Chartype | null>(null)

  // 关闭 modal
  const closeModal = () => {
    modalShow.value = false
    modalData.value = null
  }

  // 缩放处理
  const resizeHandle = (cardData: Chartype) => {
    if (!cardData) return
    modalShow.value = true
    modalData.value = cardData
  }

  // 编辑处理
  const editHandle = (cardData: Chartype) => {
    if (!cardData) return
    // Tricys Integration: Use named route for clean navigation within iframe
    router.push({
      name: ChartEnum.CHART_HOME_NAME,
      params: { id: cardData.id }
    })
  }

  // 预览处理
  const previewHandle = (cardData: Chartype) => {
    // Tricys Integration: Use named route for clean navigation within iframe
    router.push({
      name: PreviewEnum.CHART_PREVIEW_NAME,
      params: { id: cardData.id }
    })
  }

  return {
    modalData,
    modalShow,
    closeModal,
    resizeHandle,
    editHandle,
    previewHandle
  }
}
