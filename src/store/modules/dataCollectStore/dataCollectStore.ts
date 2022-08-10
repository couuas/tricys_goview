import { defineStore } from 'pinia'
import { DataCollectStoreType, DataCollectStoreEnums } from './dataCollectStore.d'

// 全局设置
export const useDataCollectStore = defineStore({
  id: 'useDataCollectStore',
  state: (): DataCollectStoreType => {
    return {
        mountedComponentSet: new Set(),
        model: {}
    }
  },
  getters: {

  },
  actions: {
    clearAll(){
      this.mountedComponentSet.clear()
    },
    recordMountedComponent(id: string){
      this.mountedComponentSet.add(id)
    }
  }
})
