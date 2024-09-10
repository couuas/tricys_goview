<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <collapse-item name="视频" expanded>
    <setting-item-box name="上传视频" alone>
      <setting-item :name="`视频需小于 ${videoSize}M ，格式为 mp4/webm 的文件`">
        <n-upload
          v-model:file-list="uploadFileListRef"
          :show-file-list="false"
          :customRequest="customRequest"
          :onBeforeUpload="beforeUploadHandle"
        >
          <n-button :loading="loading" size="small">上传视频</n-button>
        </n-upload>
      </setting-item>
    </setting-item-box>
<!--    <setting-item-box name="源" alone>-->
<!--      <setting-item name="">-->
<!--        <n-select v-model:value="optionData.dataset" :options="datasetList" :render-option="renderOption" size="small"></n-select>-->
<!--      </setting-item>-->
<!--    </setting-item-box>-->
        <setting-item-box name="源" alone>
          <setting-item name="">
            <n-input v-model:value="optionData.dataset" size="small"></n-input>
          </setting-item>
        </setting-item-box>
<!--    <setting-item-box name="自定义源" alone>-->
<!--      <setting-item name="将会覆盖源选项">-->
<!--        <n-input v-model:value="optionData.datasetCustom" size="small"></n-input>-->
<!--      </setting-item>-->
<!--    </setting-item-box>-->
    <setting-item-box name="控制">
      <setting-item>
        <n-checkbox v-model:checked="optionData.loop" size="small">循环播放</n-checkbox>
      </setting-item>
      <setting-item>
        <n-checkbox v-model:checked="optionData.muted" size="small">静音</n-checkbox>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="样式">
      <setting-item name="类型">
        <n-select v-model:value="optionData.fit" size="small" :options="fitList"></n-select>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import {PropType, ref, h, VNodeChild, nextTick} from 'vue'
import type { Ref } from 'vue'
import {SelectOption, SelectGroupOption, UploadCustomRequestOptions} from 'naive-ui'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import SelectItem from './SelectItem.vue'
import { PickCreateComponentType, BlendModeEnumList } from '@/packages/index.d'
import {videoSize} from '@/settings/designSetting'
import {fetchRouteParamsLocation} from "@/utils";
import {uploadFile} from "@/api/path";
import {FileTypeEnum} from "@/enums/fileTypeEnum";

// 适应类型
const fitList = [
  {
    value: 'fill',
    label: 'fill'
  },
  {
    value: 'contain',
    label: 'contain'
  },
  {
    value: 'cover',
    label: 'cover'
  },
  {
    value: 'scale-down',
    label: 'scale-down'
  },
  {
    value: 'none',
    label: 'none'
  }
]

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  },
  chartStyles: {
    type: Object as PropType<Omit<PickCreateComponentType<'styles'>, 'animations'>>,
    required: true
  }
})

type ItemType = { label: string, value: string }
const datasetList: Ref<ItemType[]> = ref([].map(_ => ({ label: _, value: _ })))

const renderOption = (info: {option: SelectOption}): VNodeChild => {
  return [
    h(
      SelectItem,
      {
        imageUrl: info.option.value,
        onClick: () => handleClick(info.option.value as string),
        class: {
          active: info.option.value === props.optionData.dataset,
        },
        style: {
          width: 'calc(50% - 10px)'
        }
      }
    )
  ]
}

const handleClick = (v: string) => {
  props.optionData.dataset = v
}

// 拿接口数据
const uploadFileListRef = ref()
const loading = ref(false)

// 自定义上传操作
const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options
  nextTick(async () => {
    if (file.file) {
      // 修改名称
      const newNameFile = new File([file.file], `${fetchRouteParamsLocation()}_index_video.mp4`, {
        type: file.file.type
      })
      let uploadParams = new FormData()
      uploadParams.append('files', newNameFile)
      loading.value = true
      const uploadRes = await uploadFile(uploadParams)

      if (uploadRes && uploadRes.errcode === '00000') {
        if (uploadRes.data[0]) {
          datasetList.value.push({
            label: uploadRes.data[0],
            value: uploadRes.data[0]
          })
          props.optionData.dataset = uploadRes.data[0]
          window['$message'].success('添加视频成功!')
        } else {
          window['$message'].error('添加视频失败，请稍后重试！')
        }
        loading.value = false
        return
      }
      loading.value = false
      window['$message'].error('添加视频失败，请稍后重试！')
    } else {
      loading.value = false
      window['$message'].error('添加视频失败，请稍后重试！')
    }
  })
}

// 上传视频前置处理
//@ts-ignore
const beforeUploadHandle = async ({ file }) => {
  uploadFileListRef.value = []
  const type = file.file.type
  const size = file.file.size

  if (size > 1024 * 1024 * videoSize) {
    window['$message'].warning(`视频超出 ${videoSize}M 限制，请重新上传！`)
    return false
  }
  if (type !== FileTypeEnum.MP4 && type !== FileTypeEnum.WEBM) {
    window['$message'].warning('文件格式不符合，请重新上传！')
    return false
  }
  return true
}
</script>
