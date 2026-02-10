import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ThreeTricys3DModelConfig: ConfigType = {
    key: 'ThreeTricys3DModel',
    chartKey: 'VThreeTricys3DModel',
    conKey: 'VCThreeTricys3DModel',
    title: 'Tricys 3D Model',
    category: ChatCategoryEnum.THREE,
    categoryName: ChatCategoryEnumName.THREE,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'three_earth.png' // Use placeholder image for now
}
