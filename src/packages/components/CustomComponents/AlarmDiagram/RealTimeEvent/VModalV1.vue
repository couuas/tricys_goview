<template>
  <n-modal
    :show="show"
    preset="dialog"
    class="modal"
    title=""
    :show-icon="false"
    @close="close"
    @esc="close"
    style="width: 500px"
  >
    <div class="header">
      <div>批量确认</div>
    </div>
    <div class="content">
      <n-form
        ref="formRef"
        :model="data"
        :rules="rules"
        label-placement="left"
        label-width="110px"
        label-align="left"
        require-mark-placement="right-hanging"
        size="small"
        :style="{
          maxWidth: '640px'
        }"
      >
        <n-form-item label="确认人" path="confirm_people">
          <n-input v-model:value="data.confirm_people" readonly placeholder="请输入确认人" />
        </n-form-item>
        <n-form-item label="是否误报" path="is_misreport">
          <n-radio-group v-model:value="data.is_misreport">
            <n-radio :value="true">是</n-radio>
            <n-radio :value="false">否</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="data.remark"
            type="textarea"
            maxlength="120"
            :autosize="{
              minRows: 3,
              maxRows: 3
            }"
            placeholder="请输入备注"
          />
        </n-form-item>
        <n-form-item label="重新确认" path="reconfirmation_time_str">
          <n-date-picker v-model:formatted-value="data.reconfirmation_time_str" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%" type="datetime" clearable />
        </n-form-item>
      </n-form>
    </div>
    <div class="footer">
      <div style="flex: 1;"></div>
      <n-button @click="submitCallback" type="warning" size="small" style="margin-right: 5px;color: #fff;">确认</n-button>
      <n-button size="small" @click="close">取消</n-button>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { defineEmits, ref, reactive, watch } from 'vue'

const props = defineProps(['show', 'data'])
const emit = defineEmits(['confirm', 'update:show'])

const submitCallback = () => {
  formRef.value.validate((errors:string) => {
    if (!errors) {
      emit('confirm')
      updateShow(false)
    }
  })
}

const close = () => {
  updateShow(false)
}
const formRef:any = ref(null)
const updateShow = (flag:boolean) => {
  emit('update:show', flag)
}
console.log(props.data)

const rules = {
  confirm_people: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入确认人'
  },
  is_misreport: {
    type: 'boolean',
    required: true,
    trigger: 'change',
    message: '请选择'
  }
}

</script>

<style>
.modal{
  padding: 0;
  background: #121922;
  box-sizing: border-box;
}
.modal .n-dialog__content{
  margin-top: 0;
}
.modal .n-dialog__close{
  margin-top: 7px;
  margin-right: 10px;
}
</style>
<style lang="scss" scoped>
.header{
  display: flex;
  align-items: center;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;;
  box-sizing: border-box;
  border-left: 1px solid #2f3a49;
  border-top: 1px solid #2f3a49;
  border-right: 1px solid #2f3a49;
}
.content{
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #2f3a49;
}
.footer{
  display: flex;
  align-items: center;
  padding: 5px 10px;
  box-sizing: border-box;
  border-left: 1px solid #2f3a49;
  border-bottom: 1px solid #2f3a49;
  border-right: 1px solid #2f3a49;
}
</style>
