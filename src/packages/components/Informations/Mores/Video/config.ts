import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { VideoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import video from '@/assets/videos/earth.mp4'

export const option = {
  // 视频路径
  dataset: 'https://goviewpro.tos-cn-beijing.volces.com/charts-img-db/charts-img-db_id_17bwi76fzta800.mp4',
  datasetCustom: '',
  // 视频列表
  datasetList: [],
  // 循环播放
  loop: true,
  // 静音
  muted: true,
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.styles.filterShow = true
    this.styles.blendMode = 'screen'
  }
  public key = VideoConfig.key
  public chartConfig = cloneDeep(VideoConfig)
  public option = cloneDeep(option)
}
