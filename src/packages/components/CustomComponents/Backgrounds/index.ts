import { BackgroundsConfig } from './Backgrounds/index'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

const backgroundNames = [
    'Background1.jpg',
    'Background2.jpg',
    'Background3.jpg',
    'Background4.jpg',
    'Background5.jpg',
    'Background6.jpg',
]
const backgrounds = backgroundNames.map((name, i) => ({
    ...BackgroundsConfig,
    category: ChatCategoryEnum.BACKGROUNDS,
    categoryName: ChatCategoryEnumName.BACKGROUNDS,
    package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
    dataset: name,
    // 既是缩略图 又是背景图
    image: name,
    title: `背景${i + 1}`,
    redirectComponent: `${BackgroundsConfig.package}/${BackgroundsConfig.category}/${BackgroundsConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
}))

export default backgrounds
