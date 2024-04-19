import {postMessageToParent} from "@/utils";

const bindEvent = (item:any) => {
    let obj = {}
    if(item?.customEvent?.click) {
        let {linkHead, link, isBlank} = item.customEvent.click
        obj = {
            click: () => {
                if(isBlank) postMessageToParent({
                    type: 'windowOpen',
                    url: `${linkHead}${link}`,
                    openNew: true
                })
                else postMessageToParent({
                    type: 'windowOpen',
                    url: `${linkHead}${link}`,
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
