import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const JumpBtnConfig: ConfigType = {
  key: 'JumpBtn',
  chartKey: 'VJumpBtn',
  conKey: 'VCJumpBtn',
  // VCD开头
  conDataKey: 'VCDJumpBtn',
  title: '跳转按钮',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'JumpBtn.png'
}
