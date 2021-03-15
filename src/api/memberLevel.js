import request from '@/utils/request'
// export function fetchList(params) {
//     return request({
//         url:'/ums/UmsMemberLevel/list',
//         method:'get',
//         params:params
//     })
// }

//重写会员等级 
export function fetchList() {
    return request({
        url:'/sys/memberLevel/selectMemberLevel',
        method:'post'
    })
}
//  添加会员
export function addMemberLevel(data) {
    return request({
        url:'/sys/memberLevel/addMemberLevel',
        method:'post',
        data
    })
}

//  编辑会员
export function setLevelUp(data) {
    return request({
        url:'/sys/memberLevel/setLevelUp',
        method:'post',
        data
    })
}
export function createMemberLevel(data) {
    return request({
        url:'/ums/UmsMemberLevel/create',
        method:'post',
        data:data
    })
}

export function deleteMemberLevel(id) {
    return request({
        url:'/ums/UmsMemberLevel/delete/'+id,
        method:'get',
    })
}

export function getMemberLevel(id) {
    return request({
        url:'/ums/UmsMemberLevel/'+id,
        method:'get',
    })
}

export function updateMemberLevel(id,data) {
    return request({
        url:'/ums/UmsMemberLevel/update/'+id,
        method:'post',
        data:data
    })
}

