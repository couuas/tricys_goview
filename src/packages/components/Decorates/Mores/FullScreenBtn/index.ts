import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const FullScreenBtnConfig: ConfigType = {
  key: 'FullScreenBtn',
  chartKey: 'VFullScreenBtn',
  conKey: 'VCFullScreenBtn',
  title: '全屏按钮',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'FullScreenBtn.png'
}
