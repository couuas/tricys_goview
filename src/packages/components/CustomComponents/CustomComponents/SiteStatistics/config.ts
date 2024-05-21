import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { SiteStatisticsConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr.w = 150
    this.attr.h = 150
    this.request.requestInterval = 15
  }
  public key = SiteStatisticsConfig.key
  public chartConfig = cloneDeep(SiteStatisticsConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    showInterval: true,
    mapId: null
  })
}
