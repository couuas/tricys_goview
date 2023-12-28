const bindEvent = (item:any) => {
    let obj = {}
    if(item?.customEvent?.click) {
        let {linkHead, link} = item.customEvent.click
        obj = {
            click: () => {
                console.log(1234, linkHead,link)
                if(link) window.open(`${linkHead}${link}`)
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
