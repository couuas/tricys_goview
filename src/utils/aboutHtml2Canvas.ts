import { throttle } from 'lodash'

// 监听元素的宽高变化
export const ResizeObserverELE = (callback = (w:number, h:number) => {}) => {
    return new ResizeObserver(throttle((entries) => {
        for (let entry of entries) {
            const { width:w, height:h } = entry.contentRect;
            callback(w, h)
        }
    }, 200));
}
