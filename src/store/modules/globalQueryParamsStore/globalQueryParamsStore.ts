import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'

export const useGlobalQueryParamsStore = defineStore({
    id: 'useGlobalQueryParamsStore',
    state: () => ({
        queryParams: {}
    }),
    getters: {
        getGlobalQueryParams():{[k:string]: any} {
            return this.queryParams
        }
    },
    actions: {
        setGlobalQueryParams(queryParams: {[k:string]: any}, merge: boolean = true) {
            if(merge) {
                this.queryParams = cloneDeep(queryParams)
            }
            else {
                Object.assign(this.queryParams, queryParams)
            }
        }
    }
})
