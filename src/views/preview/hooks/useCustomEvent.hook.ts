const bindEvent = (item:any) => {
    console.log(item)
    let obj = {}
    if(item?.customEvent?.click) {
        let {linkHead, link} = item.customEvent.click
        console.log(linkHead, link)
        obj = {
            click: () => {
                console.log(1234, linkHead,link)
                if(link) window.open(`${linkHead}${link}`)
            }
        }
    }
    console.log(obj)
    return obj
}

export const useCustomEvent = () => {
    return {
        bindEvent
    }
}
