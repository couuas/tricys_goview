import { ref, watch, computed } from 'vue'
import { icon } from '@/plugins'
import { renderLang, renderIcon } from '@/utils'
import { themeColor, setItem, getCharts } from './useLayout.hook'
import { PackagesCategoryEnum, PackagesCategoryName, ConfigType } from '@/packages/index.d'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
// 图标
const { AirPlaneOutlineIcon, ImageIcon, BarChartIcon, ConstructIcon } = icon.ionicons5
const { TableSplitIcon, RoadmapIcon, ChartPieIcon, SpellCheckIcon, GraphicalDataFlowIcon } = icon.carbon

// 图表
export type MenuOptionsType = {
  key: string
  icon: ReturnType<typeof renderIcon>
  label: ReturnType<typeof renderLang>
  list: ConfigType[]
}

const packagesListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    icon: renderIcon(RoadmapIcon),
    label: PackagesCategoryName.CHARTS
  },
  [PackagesCategoryEnum.INFORMATIONS]: {
    icon: renderIcon(SpellCheckIcon),
    label: PackagesCategoryName.INFORMATIONS
  },
  [PackagesCategoryEnum.TRICYS]: {
    icon: renderIcon(ConstructIcon),
    label: PackagesCategoryName.TRICYS
  },
  [PackagesCategoryEnum.TABLES]: {
    icon: renderIcon(TableSplitIcon),
    label: PackagesCategoryName.TABLES
  },
  [PackagesCategoryEnum.DECORATES]: {
    icon: renderIcon(GraphicalDataFlowIcon),
    label: PackagesCategoryName.DECORATES
  },
  [PackagesCategoryEnum.PHOTOS]: {
    icon: renderIcon(ImageIcon),
    label: PackagesCategoryName.PHOTOS
  },
  [PackagesCategoryEnum.ICONS]: {
    icon: renderIcon(AirPlaneOutlineIcon),
    label: PackagesCategoryName.ICONS
  }
}

export const useAsideHook = () => {
  const packagesStore = usePackagesStore()
  const menuOptions: MenuOptionsType[] = []

  // 处理列表
  const handlePackagesList = () => {
    const packagesList = packagesStore.getPackagesList

    menuOptions.push({
      key: PackagesCategoryEnum.TRICYS,
      icon: renderIcon(ConstructIcon),
      label: PackagesCategoryName.TRICYS,
      list: packagesList[PackagesCategoryEnum.TRICYS]
    })

    menuOptions.push({
      key: PackagesCategoryEnum.CHARTS,
      icon: renderIcon(ChartPieIcon),
      label: '图表',
      list: [...packagesList[PackagesCategoryEnum.CHARTS], ...packagesList[PackagesCategoryEnum.VCHART]]
    })

    const orderedKeys = [
      PackagesCategoryEnum.INFORMATIONS,
      PackagesCategoryEnum.TABLES,
      PackagesCategoryEnum.DECORATES,
      PackagesCategoryEnum.PHOTOS,
      PackagesCategoryEnum.ICONS
    ]

    orderedKeys.forEach((val) => {
      menuOptions.push({
        key: val,
        // @ts-ignore
        icon: packagesListObj[val].icon,
        // @ts-ignore
        label: packagesListObj[val].label,
        list: packagesList[val]
      })
    })
  }
  handlePackagesList()

  // 记录选中值
  let beforeSelect: string = menuOptions[0]['key']
  const selectValue = ref<string>(menuOptions[0]['key'])

  // 选中的对象值
  const selectOptions = ref(menuOptions[0])

  // 点击 item
  const clickItemHandle = (key: string, item: any) => {
    selectOptions.value = item
    // 处理折叠
    if (beforeSelect === key) {
      setItem(ChartLayoutStoreEnum.CHARTS, !getCharts.value, false)
    } else {
      setItem(ChartLayoutStoreEnum.CHARTS, true, false)
    }
    beforeSelect = key
  }

  return {
    getCharts,
    BarChartIcon,
    themeColor,
    selectOptions,
    selectValue,
    clickItemHandle,
    menuOptions
  }
}
