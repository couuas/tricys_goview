<template>
  <div class="go-custom-calendar" :style="sizeStyle">
    <el-card shadow="hover" class="item-background">
      <div class="custome-canlendar">
        <el-config-provider :locale="zhCn">
          <el-calendar ref="calendar" v-model="value" :key="updateKey">
            <template #header>
              <span>{{ currentYear }}年{{ ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][currentMonth - 1] }}</span>
              <el-button-group>
                <el-button size="small" @click="selectDate('prev-month')">上个月</el-button>
                <el-button size="small" @click="selectDate('today')">今天</el-button>
                <el-button size="small" @click="selectDate('next-month')">下个月</el-button>
              </el-button-group>
            </template>
            <!-- 自定义日期单元格模板 -->
            <template #date-cell="{ data }">
              <div class="date-cell" :class="{ 
                'is-today': data.day === new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().split('T')[0],  // 今天的日期（东八区）
                'is-selected': data.isSelected,  // 当前选中的日期
                'is-other-month': data.type === 'prev-month' || data.type === 'next-month'  // 其他月份的日期
              }">
                <div class="spandate">{{ data.day.split('-').slice(2).join('-') }}</div>  <!-- 显示日期（仅日部分） -->
                <div style="font-size: 10px">
                  {{ solarDate2lunar(data.day) }}  <!-- 显示农历日期 -->
                </div>
              </div>
            </template>
          </el-calendar>
        </el-config-provider>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, watch, ref, shallowReactive, onMounted } from 'vue'
import type { PropType, Ref } from 'vue'
import { ElCalendar, ElCard, ElButtonGroup, ElButton, ElConfigProvider } from 'element-plus'
import type { CalendarInstance, CalendarDateType } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useSizeStyle } from '@/views/chart/ContentEdit/hooks/useStyle.hook'
import { useChartDataFetch } from '@/hooks/useChartDataFetch.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { CreateComponentType } from '@/packages/index.d'
// @ts-ignore
import calendarCom from '@/utils/calendar.js'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const calendar = ref<CalendarInstance>()
// 默认选中当天日期（东八区）
const value = ref(new Date(Date.now() + 8 * 60 * 60 * 1000))
// 维护当前显示的年月
const currentYear = ref(value.value.getFullYear())
const currentMonth = ref(value.value.getMonth() + 1)

// 计算日历样式
const calendarStyle = computed(() => ({
  width: `${w.value}px`,
  height: `${h.value}px`
}))

// 监听尺寸变化，使用key更新触发重绘
const updateKey = ref(0)
watch([w, h], () => {
  updateKey.value++
}, { deep: true })

// 监听value变化，更新当前年月
watch(value, (newVal) => {
  currentYear.value = newVal.getFullYear()
  currentMonth.value = newVal.getMonth() + 1
}, { deep: true })

// 使用useSizeStyle绑定尺寸
const sizeStyle = computed(() => {
  return useSizeStyle(props.chartConfig.attr)
})

// 切换日期
const selectDate = async (val: CalendarDateType | 'prev-month' | 'today' | 'next-month') => {
  if (!calendar.value) return;
  
  if (val === 'today') {
      // 切换到今天（东八区）
      value.value = new Date(Date.now() + 8 * 60 * 60 * 1000);
      currentYear.value = value.value.getFullYear();
      currentMonth.value = value.value.getMonth() + 1;
    } else if (val === 'prev-month') {
    // 切换到上个月
    const newDate = new Date(currentYear.value, currentMonth.value - 2, 1);
    value.value = newDate;
    currentYear.value = newDate.getFullYear();
    currentMonth.value = newDate.getMonth() + 1;
  } else if (val === 'next-month') {
    // 切换到下个月
    const newDate = new Date(currentYear.value, currentMonth.value, 1);
    value.value = newDate;
    currentYear.value = newDate.getFullYear();
    currentMonth.value = newDate.getMonth() + 1;
  } else {
    // 处理选择日期的情况
    value.value = new Date(val);
    currentYear.value = value.value.getFullYear();
    currentMonth.value = value.value.getMonth() + 1;
  }
  
  // 在Element Plus 2.x中，通过更新v-model的值即可切换月份
  // 不再需要调用selectDate方法
};

// 农历转换
const solarDate2lunar = (solarDate: any) => {
  var solar = solarDate.split('-');
  var lunar = calendarCom.solar2lunar(solar[0], solar[1], solar[2]);
  return lunar.IMonthCn + lunar.IDayCn;
};

// 格式化日期，将月份转换为中文
const formatDate = (date: any) => {
  // 确保 date 是 Date 对象
  const dateObj = date instanceof Date ? date : new Date(date);
  // 检查是否是有效日期
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return `${year}年${monthNames[month - 1]}`;
};

// 组件挂载后默认选中当天日期
onMounted(() => {
  // 在Element Plus 2.x中，通过v-model绑定即可设置默认日期
});

// 数据更新逻辑
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  // 处理数据更新
})
</script>

<style lang="scss" scoped>
.go-custom-calendar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  :deep(.el-card) {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    
    .el-card__header {
      padding: 10px 20px;
      background-color: #f5f7fa;
      border-bottom: 1px solid #e4e7ed;
    }
    
    .el-card__body {
      padding: 10px;
      height: calc(100% - 60px);
    }
  }
  
  .custome-canlendar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  :deep(.el-calendar) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .el-calendar__header {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      
      .el-button-group {
        .el-button {
          background-color: transparent;
          border: 1px solid #dcdfe6;
          color: #333;
          padding: 4px 12px;
          margin: 0 -1px 0 0;
          font-size: 14px;
          
          &:first-child {
            border-radius: 4px 0 0 4px;
          }
          
          &:last-child {
            border-radius: 0 4px 4px 0;
            margin-right: 0;
          }
          
          &:hover {
            background-color: #f5f7fa;
            color: #ff4d4f;
          }
        }
      }
    }
    
    .el-calendar__body {
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .el-calendar-table {
      width: 100%;
      min-height: 200px;
      table-layout: fixed;
      border-spacing: 0;
      border-collapse: collapse;
      
      tr {
        height: 50px;
        display: table-row;
      }
      
      td {
        display: table-cell;
        vertical-align: middle;
        padding: 0;
        border: 1px solid #e8e8e8;
      }
      
      .el-calendar-day {
        padding: 0;
        height: 50px;
        
        .date-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 50px;
          padding: 5px;
          box-sizing: border-box;
          
          &:hover {
            background-color: #fff1f0;
            cursor: pointer;
          }
          
          &.is-today {
            background-color: #fff1f0;
            color: #333;
            
            .spandate {
              background-color: #ff4d4f;
              color: white;
              border-radius: 50%;
              width: 28px;
              height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            }
            
            > div:last-child {
              color: #ff4d4f;
            }
          }
          
          &.is-other-month {
            color: #c0c4cc;
            
            .spandate {
              color: #c0c4cc;
            }
            
            > div:last-child {
              color: #c0c4cc;
            }
          }
          
          &.is-selected {
            background-color: #fff1f0;
            color: #333;
            
            .spandate {
              color: #ff4d4f;
              font-weight: bold;
            }
            
            > div:last-child {
              color: #333;
            }
          }
          
          // 当选中的日期同时是今天时，保留今天的红色圆形样式
          &.is-today.is-selected {
            background-color: #fff1f0;
            
            .spandate {
              background-color: #ff4d4f;
              color: white;
              border-radius: 50%;
              width: 28px;
              height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            }
            
            > div:last-child {
              color: #ff4d4f;
            }
          }
        }
        
        .spandate {
          font-size: 14px;
          margin-bottom: 5px;
        }
      }
    }
    
    // 星期表头中英文翻译
    .el-calendar__weekdays {
      .el-calendar__weekday:nth-child(1)::after {
        content: '日';
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
      .el-calendar__weekday:nth-child(2)::after {
        content: '一';
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
      .el-calendar__weekday:nth-child(3)::after {
        content: '二';
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
      .el-calendar__weekday:nth-child(4)::after {
        content: '三';
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
      .el-calendar__weekday:nth-child(5)::after {
        content: '四';
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
      .el-calendar__weekday:nth-child(6)::after {
        content: '五';
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
      .el-calendar__weekday:nth-child(7)::after {
        content: '六';
        visibility: visible;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
      .el-calendar__weekday {
        visibility: hidden;
        position: relative;
      }
    }
  }
}
</style>