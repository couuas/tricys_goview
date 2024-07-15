<template>
    <div class="box" style="overflow: visible;">
        <div class="label">{{customData.label}}</div>
        <div class="position" :class="[errorClassName]"></div>
    </div>
</template>

<script setup lang="ts">
import {computed, PropType, Ref, onMounted, ref, watch, onUnmounted} from "vue";
import { customData as customDataConfig } from './config'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import {isPreview, postMessageToParent} from '@/utils'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {useOriginStore} from "@/store/modules/originStore/originStore";

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true
    }
})

const customData: Ref<typeof customDataConfig> = computed(() => {
    return props.chartConfig.customData as typeof customDataConfig
})

const originStore = useOriginStore()
const systemConfig = originStore.getOriginStore.user.systemConfig
let alarmLevels: number[] = []

if (systemConfig) {
    if (systemConfig['active_alarm_level']) {
        for (let i = 0; i < Number(systemConfig['active_alarm_level']); i++) {
            alarmLevels.push(i + 1)
        }
    }
}

let errorClassName = ref('')

const getData = () => {
    errorClassName.value = ''
    const ids = [customData.value.id]
    const param = {
        confirm_statuses: ['not'],
        ids,
        levels: alarmLevels
    }
    publicInterface('/dcim/dems/device', 'get_space_tree_with_status_v3', param).then(res => {
        if (res && res.data) {
            errorClassName.value = res.data[0].node_status !== 0 ? 'error' : ''
        }
    })
}

watch(() => customData.value.id, getData)

let timer:unknown
watch(() => [props.chartConfig.request.requestInterval, props.chartConfig.request.requestIntervalUnit].join('&&'), v => {
    if(!isPreview()) return
    if(props.chartConfig.request.requestInterval) {
        if(timer) clearInterval(timer as number)
        const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
        const unit = obj.unit
        const number = unit * props.chartConfig.request.requestInterval
        timer = setInterval(() => {
            getData()
        }, number)
    }
})

onMounted(() => {
    getData()
    if(!isPreview()) return
    const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
    const unit = obj.unit
    const number = unit * props.chartConfig.request.requestInterval!
    timer = setInterval(() => {
        getData()
    }, number)
})

onUnmounted(() => {
    if(timer) clearInterval(timer as number)
})

</script>

<style lang="scss" scoped>
@keyframes buildingFlash {
    from {
        background-image: url('~@/assets/images/common/普通定位.svg');
    }
    to {
        background-image: url('~@/assets/images/common/告警定位.svg');
    }
}
.box{
    width: 100%;
    height: 100%;
    position: relative;
    .label{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: #fff;
        white-space: nowrap;
    }

    .position{
        margin-top: 29px;
        width: 100%;
        height: calc(100% - 29px);
        background-image: url('~@/assets/images/common/普通定位.svg');
        background-size: 100% 100%;
        &.error{
            animation: buildingFlash 1s ease-in-out infinite alternate;
            background-image: url('~@/assets/images/common/告警定位.svg');
        }
    }
}
</style>