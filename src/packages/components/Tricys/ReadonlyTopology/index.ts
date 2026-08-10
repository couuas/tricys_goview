import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'

export const TricysReadonlyTopologyConfig: ConfigType = {
  key: 'ReadonlyTopology',
  chartKey: 'VTricysReadonlyTopology',
  conKey: 'VCTricysReadonlyTopology',
  title: 'Tricys 3D Scene Asset',
  category: 'Topology',
  categoryName: '拓扑图',
  package: PackagesCategoryEnum.TRICYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tricys_topology.svg'
}