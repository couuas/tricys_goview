import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'

export const TricysReadonlyTwin2DConfig: ConfigType = {
  key: 'ReadonlyTwin2D',
  chartKey: 'VTricysReadonlyTwin2D',
  conKey: 'VCTricysReadonlyTwin2D',
  title: 'Tricys 2D Twin Asset',
  category: 'Topology',
  categoryName: '拓扑图',
  package: PackagesCategoryEnum.TRICYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tricys_topology.svg'
}