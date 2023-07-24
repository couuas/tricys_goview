import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { InputsCharactersConfig } from './index'
import { interactActions, ComponentInteractEventEnum } from './interact'
import cloneDeep from 'lodash/cloneDeep'
import {COMPONENT_INTERACT_EVENT_KET} from "@/enums/eventEnum";

export enum WritingModeEnum {
    HORIZONTAL = '水平',
    VERTICAL = '垂直'
}

export const WritingModeObject = {
    [WritingModeEnum.HORIZONTAL]: 'horizontal-tb',
    [WritingModeEnum.VERTICAL]: 'vertical-rl'
}

export enum FontWeightEnum {
    NORMAL = '常规',
    BOLD = '加粗',
}

export const FontWeightObject = {
    [FontWeightEnum.NORMAL]: 'normal',
    [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
    [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
    dataset: '我是展示文本',
    datasetValue:'我是联动值',
    fontSize: 20,
    fontColor: '#ffffff',
    paddingX: 10,
    paddingY: 10,
    textAlign: 'center', // 水平对齐方式
    fontWeight: 'normal',

    // 边框
    borderWidth: 0,
    borderColor: '#ffffff',
    borderRadius: 5,

    // 字间距
    letterSpacing: 5,
    writingMode: 'horizontal-tb',
    backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = InputsCharactersConfig.key
    public chartConfig = cloneDeep(InputsCharactersConfig)
    public interactActions = interactActions
    public option = cloneDeep(option)
}
