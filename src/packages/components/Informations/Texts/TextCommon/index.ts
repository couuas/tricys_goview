import { getComponentConfig } from '@/utils';
import image from '@/assets/images/chart/informations/text_static.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'
import { TextConfig, eventList } from './enum'

export const TextCommonConfig: ConfigType = getComponentConfig({
  key: TextConfig.key,
  title: TextConfig.title,
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  eventList,
  image
})