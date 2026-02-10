import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ThreeTricys3DModelConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    dataset: 'http://localhost:8000/assets/models/placeholder.glb', // Default model URL
    modelConfig: {
        autoRotate: true,
        scale: 1.0,
        bgColor: '#00000000'
    }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = ThreeTricys3DModelConfig.key
    public attr = { w: 500, h: 400, x: 0, y: 0, zIndex: 1, offsetX: 0, offsetY: 0 }
    public chartConfig = cloneDeep(ThreeTricys3DModelConfig)
    public option = cloneDeep(option)
}
