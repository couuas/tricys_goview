import {publicInterface} from './business.api'
import {http} from "@/api/http";
import {ContentTypeEnum, RequestHttpEnum} from "@/enums/httpEnum";
import {httpErrorHandle} from "@/utils";

// * 项目列表
export const projectListApi = async (data: object) => {
    let res:any = await publicInterface('/dcim/system/custom_large_screen', 'get_page', data)
    return {
        data: res.data.item,
        errcode: res.errcode,
        count: res.data.page.total
    }
    // return publicInterface('/dcim/system/custom_large_screen', 'get_page', data)
}

// * 新增项目
export const createProjectApi = async (data: object) => {
    return publicInterface('/dcim/system/custom_large_screen', 'add', data)
}

// * 获取项目
export const fetchProjectApi = async (data: object) => {
    return publicInterface('/dcim/system/custom_large_screen', 'get_one', data)
}

// * 保存项目
export const saveProjectApi = async (data: object) => {
    return publicInterface('/dcim/system/custom_large_screen', 'mod', data)
}

// * 修改项目基础信息
export const updateProjectApi = async (data: object) => {
    return publicInterface('/dcim/system/custom_large_screen', 'mod', data)
}

// * 删除项目
export const deleteProjectApi = async (data: object) => {
    return publicInterface('/dcim/system/custom_large_screen', 'del', data)
}

// * 修改发布状态 [-1未发布,1发布]
export const changeProjectReleaseApi = async (data: object) => {
    return publicInterface('/dcim/system/custom_large_screen', 'mod', data)
}

// * 上传文件
export const uploadFile = async (data: object) => {
    try {
        const res = await http(RequestHttpEnum.POST)<any>('/dcim/system/custom_large_screen/upload_file', data, ContentTypeEnum.FORM_DATA)
        return res
    } catch {
        httpErrorHandle()
    }
    // return publicInterface('/dcim/system/custom_large_screen/upload_file', 'get', data)
}
