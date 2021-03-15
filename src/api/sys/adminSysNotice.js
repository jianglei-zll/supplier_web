import request from '@/utils/request'
export function fetchList(params) {
return request({
url: '/sys/adminSysNotice/list',
method: 'get',
params: params
})
}
export function createAdminSysNotice(data) {
return request({
url: '/sys/adminSysNotice/create',
method: 'post',
data: data
})
}

export function deleteAdminSysNotice(id) {
return request({
url: '/sys/adminSysNotice/delete/' + id,
method: 'get',
})
}

export function getAdminSysNotice(id) {
return request({
url: '/sys/adminSysNotice/' + id,
method: 'get',
})
}

export function updateAdminSysNotice(id, data) {
return request({
url: '/sys/adminSysNotice/update/' + id,
method: 'post',
data: data
})
}


export function updateShowStatus(params) {
  return request({
    url:'/sys/adminSysNotice/update/updateShowStatus',
    method:'post',
    params:params
  })
}