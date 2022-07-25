import { getComponentConfig } from './../../../../../utils/componets';
import image from '@/assets/images/chart/charts/funnel.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const FunnelConfig: ConfigType = getComponentConfig({
  key: 'Funnel',
  title: '漏斗图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  image
})

