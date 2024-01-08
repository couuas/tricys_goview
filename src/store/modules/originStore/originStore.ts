import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'

export const useOriginStore = defineStore({
    id: 'useOriginStore',
    state: () => ({
        originStore: {}
    }),
    getters: {
        getOriginStore():{[k:string]: any} {
            return this.originStore
        }
    },
    actions: {
        setOriginStore(originStore: {[k:string]: any}, merge: boolean = true) {
            if(merge) {
                this.originStore = cloneDeep(originStore)
            }
            else {
                Object.assign(this.originStore, originStore)
            }
        }
    }
})
