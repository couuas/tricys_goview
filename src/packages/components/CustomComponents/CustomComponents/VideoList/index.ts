import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const VideoListConfig: ConfigType = {
  key: 'VideoList',
  chartKey: 'VVideoList',
  conKey: 'VCVideoList',
  conDataKey: 'VCDVideoList',
  title: '视频列表',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'VideoList.png'
}
