import { TopBarsConfig } from './TopBars/index'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

const topbarNames = [
    'TopBar1.png',
    'TopBar2.png',
    'TopBar3.png',
    'TopBar4.png',
    'TopBar5.png',
    'TopBar6.png',
    'TopBar7.png',
    'TopBar8.png',
]
const topbars = topbarNames.map((name, i) => ({
    ...TopBarsConfig,
    category: ChatCategoryEnum.TOPBARS,
    categoryName: ChatCategoryEnumName.TOPBARS,
    package: PackagesCategoryEnum.DECORATES,
    dataset: name,
    // 既是缩略图 又是背景图
    image: name,
    title: `顶栏${i + 1}`,
    redirectComponent: `${TopBarsConfig.package}/${TopBarsConfig.category}/${TopBarsConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
}))

export default topbars
