import {postMessageToParent} from "@/utils";

const bindEvent = (item:any) => {
    let obj = {}
    if(item?.customEvent?.click) {
        let {linkHead, link, isBlank} = item.customEvent.click
        obj = {
            click: () => {
                if(!link) return
                let isRelativePath = linkHead === '/'
                if(isBlank) postMessageToParent({
                    type: 'windowOpen',
                    url: `${linkHead}${link}`,
                    openNew: true,
                    isRelativePath
                })
                else postMessageToParent({
                    type: 'windowOpen',
                    url: `${linkHead}${link}`,
                    isRelativePath
                })
            }
        }
    }
    return obj
}

export const useCustomEvent = () => {
    return {
        bindEvent
    }
}
