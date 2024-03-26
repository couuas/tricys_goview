import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const SystemRuntimeConfig: ConfigType = {
  key: 'SystemRuntime',
  chartKey: 'VSystemRuntime',
  conKey: 'VCSystemRuntime',
  title: '系统运行时间',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'SystemRuntime.png'
}
