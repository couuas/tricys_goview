import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const RoomTemperature: ConfigType = {
  key: 'RoomTemperature',
  chartKey: 'VRoomTemperature',
  conKey: 'VCRoomTemperature',
  // VCD开头
  conDataKey: 'VCDRoomTemperature',
  title: '机房温度',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'RoomTemperature.png'
}
