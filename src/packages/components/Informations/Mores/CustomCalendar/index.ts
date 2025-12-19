// 公共类型声明
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const CustomCalendarConfig: ConfigType = {
  // 唯一key，注意！！！文件夹名称需要修改成与当前组件一致！！！
  key: 'CustomCalendar',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VCustomCalendar',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCCustomCalendar',
  // 名称
  title: '自定义日历',
  // 子分类目录
  category: ChatCategoryEnum.MORE,
  // 子分类目录
  categoryName: ChatCategoryEnumName.MORE,
  // 包分类
  package: PackagesCategoryEnum.INFORMATIONS,
  // 图表类型
  chartFrame: ChartFrameEnum.COMMON,
  // 图片 (注意！图片存放的路径必须在 src/assets/images/chart/包分类名称/*)
  // 文件夹名称需要和包分类名称一致: PackagesCategoryEnum.INFORMATIONS
  image: 'photo.png'
}