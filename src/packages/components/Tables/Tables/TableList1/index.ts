import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'


export const TableList1Config: ConfigType = {
  key: 'TableList1',
  chartKey: 'VTableList1',
  conKey: 'VCTableList1',
  // // VCD开头
  // conDataKey: 'VCDTableList1',
  title: '列表',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'TableList1.png'
}
