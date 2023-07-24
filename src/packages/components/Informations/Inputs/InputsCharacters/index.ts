import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const InputsCharactersConfig: ConfigType = {
    key: 'InputsCharacters',
    chartKey: 'VInputsCharacters',
    conKey: 'VCInputsCharacters',
    title: '联动文字',
    category: ChatCategoryEnum.INPUTS,
    categoryName: ChatCategoryEnumName.INPUTS,
    package: PackagesCategoryEnum.INFORMATIONS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'text_static.png'
}