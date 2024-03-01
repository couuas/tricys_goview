import { defineStore } from 'pinia'

export const useRouterStore = defineStore({
    id: 'useRouterStore',
    state: () => ({
        // 为true是router交给parent调用自身不跳转 为false使用自身路由
        callByParent: false,
        token: null as null | string,
    }),
    getters: {
        getCallByParent():boolean {
            return this.callByParent
        }
    },
    actions: {
        setCallByParent(callByParent: boolean) {
            this.callByParent = callByParent
        },
        setToken(v: string | null) {
            this.token = v
        }
    }
})
