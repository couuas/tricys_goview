import { BaseConfig } from './Base/index'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

const topbarNames = [
    'Base1.png',
    'Base2.png',
    'Base3.png',
    'Base4.png',
    'Base5.png',
    'Base6.png',
    'Base7.png',
    'Base8.png',
]
const base = topbarNames.map((name, i) => ({
    ...BaseConfig,
    category: ChatCategoryEnum.BASE,
    categoryName: ChatCategoryEnumName.BASE,
    package: PackagesCategoryEnum.DECORATES,
    dataset: name,
    // 既是缩略图 又是背景图
    image: name,
    title: `底座${i + 1}`,
    redirectComponent: `${BaseConfig.package}/${BaseConfig.category}/${BaseConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
}))

export default base
