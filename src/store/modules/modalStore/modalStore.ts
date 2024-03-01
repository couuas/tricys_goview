import { defineStore } from 'pinia'

export const useModalStore = defineStore({
    id: 'useModalStore',
    state: () => ({
        showModal: false,
        title: '',
        content: '',
        positiveText: '',
        negativeText: '',
        positiveClick: () => {},
        negativeClick: () => {},
    }) as Record<string, any>,
    actions: {
        setModalStore(obj: Record<string, any>) {
            for(let k in obj) {
                this[k] = obj[k]
            }
        },
        clear() {
            this.showModal = false
            this.title = ''
            this.content = ''
            this.positiveText = ''
            this.negativeText = ''
            this.positiveClick = () => {}
            this.negativeClick = () => {}
        }
    }
})
