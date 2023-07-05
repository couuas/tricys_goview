// 公共类型声明
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BarLineConfig: ConfigType = {
  // 唯一key，注意！！！文件夹名称需要修改成与当前组件一致！！！
  key: 'BarLine',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VBarLine',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCBarLine',
  // 名称
  title: '柱状加折线图',
  // 子分类目录
  category: ChatCategoryEnum.COMBINATION,
  // 子分类目录
  categoryName: ChatCategoryEnumName.COMBINATION,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 组件框架类型 (注意！若此 Echarts 图表不支持 dataset 格式，则使用 ChartFrameEnum.COMMON)
  chartFrame: ChartFrameEnum.ECHARTS,
  // 图片 (注意！图片存放的路径必须在 src/assets/images/chart/包分类名称/*)
  // 文件夹名称需要和包分类名称一致: PackagesCategoryEnum.CHARTS
  image: 'bar_x.png'
}
