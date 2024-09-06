import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'

export const useGlobalQueryParamsStore = defineStore({
    id: 'useGlobalQueryParamsStore',
    state: () => ({
        queryParams: {},
        areaDevCountQueryParams:{}
    }),
    getters: {
        getGlobalQueryParams():{[k:string]: any} {
            return this.queryParams
        },
        getAreaDevCountQueryParams():{[k:string]: any} {
            return this.areaDevCountQueryParams
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
        },
        setAreaDevCountQueryParams(areaDevCountQueryParams: {[k:string]: any}, merge: boolean = true) {
            if(merge) {
                this.areaDevCountQueryParams = cloneDeep(areaDevCountQueryParams)
            }
            else {
                Object.assign(this.areaDevCountQueryParams, areaDevCountQueryParams)
            }
        },
       
    }
})
