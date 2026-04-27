<template>
  <div class="go-items-list" :class="{ 'tricys-mode': tricysMode }">
    <!-- 加载 -->
    <div v-show="loading">
      <go-loading></go-loading>
    </div>
    <!-- 列表 -->
    <div v-if="!loading && hasItems" class="list-stage">
      <div class="list-stage-body">
        <n-grid :x-gap="20" :y-gap="20" cols="2 s:2 m:3 l:4 xl:4 xxl:4" responsive="screen">
          <n-grid-item v-for="(item, index) in list" :key="item.id">
            <project-items-card
              :cardData="item"
              @preview="previewHandle"
              @resize="resizeHandle"
              @delete="deleteHandle(item)"
              @release="releaseHandle(item, index)"
              @edit="editHandle"
            ></project-items-card>
          </n-grid-item>
        </n-grid>
      </div>

      <div v-if="paginat.count > 0" class="list-pagination">
        <n-pagination
          :page="paginat.page"
          :page-size="paginat.limit"
          :item-count="paginat.count"
          :page-sizes="[12, 24, 36, 48]"
          @update:page="changePage"
          @update:page-size="changeSize"
          show-size-picker
        />
      </div>
    </div>

    <div v-else-if="!loading" class="empty-state">
      <div class="empty-badge">PROJECT PAGE SPACE</div>
      <div class="empty-icon">◌</div>
      <h3>暂无 GoView 页面</h3>
      <p>
        当前 TRICYS 项目还没有创建任何页面布局。你可以先新建一个页面，用来承载模型、参数、数据和分析结果的可视化展示。
      </p>
      <div class="empty-hint">
        使用左上角的“{{ $t('project.create_btn') }}”开始初始化页面，右上角的“Data Hub”可随时展开查看组件与数据能力。
      </div>
    </div>
  </div>

  <!-- model -->
  <project-items-modal-card
    v-if="modalData"
    :modalShow="modalShow"
    :cardData="modalData"
    @close="closeModal"
    @edit="editHandle"
  ></project-items-modal-card>
</template>

<script setup lang="ts">
import { computed, onActivated } from 'vue'
import { ProjectItemsCard } from '../ProjectItemsCard/index'
import { ProjectItemsModalCard } from '../ProjectItemsModalCard/index'
import { icon } from '@/plugins'
import { isTricysProjectMode } from '@/utils'
import { useModalDataInit } from './hooks/useModal.hook'
import { useDataListInit } from './hooks/useData.hook'

const { CopyIcon, EllipsisHorizontalCircleSharpIcon } = icon.ionicons5
const { modalData, modalShow, closeModal, previewHandle, resizeHandle, editHandle } = useModalDataInit()
const { loading, paginat, list, fetchList, changeSize, changePage, releaseHandle, deleteHandle } = useDataListInit()
const tricysMode = isTricysProjectMode()
const hasItems = computed(() => list.value.length > 0)

onActivated(() => {
  fetchList()
})
</script>

<style lang="scss" scoped>
$contentHeight: 250px;
@include go('items-list') {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - #{$--header-height} - 40px - 2px);
  min-width: 0;

  &.tricys-mode {
    flex: 1;
    min-height: 0;
  }

  .list-stage,
  .empty-state {
    border: 1px solid #30363d;
    border-radius: 18px;
    background: radial-gradient(circle at top, rgba(0, 210, 255, 0.08), transparent 42%), linear-gradient(180deg, rgba(13, 17, 23, 0.98), rgba(9, 13, 18, 0.94));
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.28);
  }

  .list-stage {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .list-stage-body {
    flex: 1;
    min-height: 0;
  }

  .empty-state {
    flex: 1;
    min-height: clamp(320px, 58vh, 560px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 40px 32px;
    text-align: center;
  }

  .empty-badge {
    padding: 6px 12px;
    border: 1px solid rgba(0, 210, 255, 0.24);
    border-radius: 999px;
    color: #7dd3fc;
    font-size: 11px;
    letter-spacing: 1.4px;
  }

  .empty-icon {
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(0, 210, 255, 0.18);
    background: rgba(0, 210, 255, 0.08);
    color: #9be7ff;
    font-size: 30px;
    line-height: 1;
    box-shadow: inset 0 0 24px rgba(0, 210, 255, 0.08);
  }

  h3 {
    margin: 0;
    color: #f3f7fb;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  p {
    max-width: 620px;
    margin: 0;
    color: #8b949e;
    font-size: 14px;
    line-height: 1.7;
  }

  .empty-hint {
    margin-top: 6px;
    padding: 12px 16px;
    border: 1px dashed #334155;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.02);
    color: #c6d4df;
    font-size: 12px;
    letter-spacing: 0.04em;
  }

  .list-content {
    position: relative;
    height: $contentHeight;
  }
  .list-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
