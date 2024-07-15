<template>
    <div class="floorBox">
        <div v-if="customData.jumpEnable" class="floor" :class="[errorClassName]" @click.stop="jump"><div class="rect"></div>{{ customData.label }}</div>
        <div v-else class="floor" :class="[errorClassName]"><div class="rect"></div>{{ customData.label }}</div>
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

const jump = () => {
    postMessageToParent({
        type: 'changeRouterV1',
        url: `/dynamicRing/schematicDiagram/${customData.value.id1}`,
        query: {
            expandKeys: [customData.value.id, customData.value.id1]
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
.floorBox{
    width: 100%;
    height: 100%;
    color: #fff;
    white-space: nowrap;
    position: relative;
    @keyframes alarmFlash1 {
        from {
            background: linear-gradient(to right, rgb(38, 84, 138), rgba(38, 84, 138, 0));
        }
        to {
            background: linear-gradient(to right, rgb(109, 27, 30), rgba(109, 27, 30, 0));
        }
    }
    @keyframes alarmFlash2 {
        from {
            background: linear-gradient(to right, rgb(67, 150, 253), rgba(67, 150, 253, 0));
        }
        to {
            background: linear-gradient(to right, rgb(243, 59, 65), rgba(243, 59, 65, 0));
        }
    }
    @keyframes alarmFlash3 {
        from {
            // background: rgb(67, 150, 253);
            background: linear-gradient(to right, rgb(67, 150, 253), rgb(67, 150, 253));
        }
        to {
            background: rgb(243, 59, 65);
            background: linear-gradient(to right, rgb(243, 59, 65), rgb(243, 59, 65));
        }
    }
    .floor {
        height: 100%;
        width: calc(100% - 10px);
        position: relative;
        cursor: pointer;
        background: linear-gradient(to right, rgb(38, 84, 138), rgba(38, 84, 138, 0));
        display: flex;
        margin-left: 10px;
        align-items: center;
        padding-left: 5px;
        .rect {
            position: absolute;
            top: 0;
            left: -6px;
            width: 3px;
            height: 100%;
            background: rgb(67, 150, 253);
            margin-right: 3px;
            visibility: hidden;
        }
        &:hover {
            //font-size: 17px;
            font-weight: bold;
            background: linear-gradient(to right, rgb(67, 150, 253), rgba(67, 150, 253, 0));
            .rect {
                visibility: visible;
            }
        }
    }
    .error {
        animation: alarmFlash1 1s ease-in-out infinite alternate;
        background: linear-gradient(to right, rgb(109, 27, 30), rgba(109, 27, 30, 0));
        &:hover {
            //font-size: 17px;
            font-weight: bold;
            animation: alarmFlash1 1s ease-in-out infinite alternate;
            background: linear-gradient(to right, rgb(243, 59, 65), rgba(243, 59, 65, 0));
            .rect {
                height: 100%;
                animation: alarmFlash3 1s ease-in-out infinite alternate;
                background: rgb(243, 59, 65);
                visibility: visible;
            }
        }
    }
}
</style>