import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'

export const TricysReadonlyTopologyConfig: ConfigType = {
  key: 'ReadonlyTopology',
  chartKey: 'VTricysReadonlyTopology',
  conKey: 'VCTricysReadonlyTopology',
  title: 'Tricys 3D Topology',
  category: 'Topology',
  categoryName: '三维拓扑',
  package: PackagesCategoryEnum.TRICYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tricys_topology.svg'
}