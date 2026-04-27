<template>
  <div class="go-project-items" :style="pageStyle">
    <div class="project-items-shell" :class="{ 'datahub-open': tricysMode && dataHubShow }">
      <div class="project-items-main">
        <div v-if="tricysMode" class="project-items-toolbar">
          <div class="project-items-toolbar-left">
            <project-layout-create :collapsed="false"></project-layout-create>
          </div>
          <div class="project-items-toolbar-right">
            <n-button ghost type="primary" @click="openDataHub">Data Hub</n-button>
          </div>
        </div>
        <project-items-list></project-items-list>
      </div>
    </div>
    <project-data-hub-drawer :show="dataHubShow" :width="dataHubWidth" @close="closeDataHub"></project-data-hub-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { isTricysProjectMode } from '@/utils'
import { ProjectLayoutCreate } from '../layout/components/ProjectLayoutCreate'
import ProjectDataHubDrawer from './components/ProjectDataHubDrawer/index.vue'
import { ProjectItemsList } from './components/ProjectItemsList'

const tricysMode = isTricysProjectMode()
const dataHubShow = ref(false)
const dataHubWidth = ref(720)

const updateDataHubWidth = () => {
  if (typeof window === 'undefined') return
  dataHubWidth.value = Math.max(560, Math.min(960, Math.floor(window.innerWidth * 0.5)))
}

const pageStyle = computed(() => ({
  '--datahub-width': `${dataHubWidth.value}px`
}))

const openDataHub = () => {
  dataHubShow.value = true
}

const closeDataHub = () => {
  dataHubShow.value = false
}

onMounted(() => {
  updateDataHubWidth()
  window.addEventListener('resize', updateDataHubWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDataHubWidth)
})
</script>

<style lang="scss" scoped>
@include go(project-items) {
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  box-sizing: border-box;
  min-height: 100vh;

  .project-items-shell {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    min-height: 0;
    transition: padding-right 0.28s ease;
  }

  .project-items-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    min-height: 0;
  }

  .project-items-shell.datahub-open {
    padding-right: calc(var(--datahub-width) + 16px);
  }

  .project-items-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .project-items-toolbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  @media screen and (max-width: 1200px) {
    .project-items-shell.datahub-open {
      padding-right: 0;
    }
  }
}
</style>
