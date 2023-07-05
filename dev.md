## 二次开发

新增图表类型的组合图

1. 在`packages/components/Charts/`新建文件夹`COMBINATIONS`
2. 在文件夹新建`index.ts`,在文件夹下新建要添加的组合图表文件夹`BarLine`
3. 在`BarLine`下创建对应的文件`index.ts`、`index.vue`、`config.ts`、`config.vue`
index.ts内容如下
    ``` js
    // 公共类型声明
    import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
    // 当前[信息模块]分类声明
    import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

    export const BarLineConfig: ConfigType = {
    // 唯一key，注意！！！文件夹名称需要修改成与当前组件一致！！！
    key: 'BarLine',
    // 图表组件渲染 Components 格式: V + key
    chartKey: 'VBarLine',
    // 配置组件渲染 Components 格式: VC + key
    conKey: 'VCBarLine',
    // 名称
    title: '柱状加折线图',
    // 子分类目录
    category: ChatCategoryEnum.COMBINATION,
    // 子分类目录
    categoryName: ChatCategoryEnumName.COMBINATION,
    // 包分类
    package: PackagesCategoryEnum.CHARTS,
    // 组件框架类型 (注意！若此 Echarts 图表不支持 dataset 格式，则使用 ChartFrameEnum.COMMON)
    chartFrame: ChartFrameEnum.ECHARTS,
    // 图片 (注意！图片存放的路径必须在 src/assets/images/chart/包分类名称/*)
    // 文件夹名称需要和包分类名称一致: PackagesCategoryEnum.CHARTS
    image: 'bar_x.png'
    }

    ```
4. 在第二步创建的`index.ts`中进行组合图表的引入
    ``` js
    import { BarLineConfig } from './BarLine/index'

    export default [BarLineConfig]
    ```
5. 在`packages\components\Charts\index.d.ts`新增
    ``` js
    export enum ChatCategoryEnum {
        ...,
        COMBINATION = 'COMBINATIONS',
        ...,
    }

    export enum ChatCategoryEnumName {
        ...,
        COMBINATION='组合图'
        ...,
    }
    ```
6. 在`packages\components\Charts\index.ts`新增
    ``` js
    import COMBINATIONS from './COMBINATIONS'
    export const ChartList = [...Bars, ...Lines, ...Pies, ...Scatters, ...Maps, ...COMBINATIONS, ...Mores]
    ```