import request from '@/utils/request'
export function fetchList(params) {
return request({
url: '/sys/sysStoreSettleRecords/list',
method: 'get',
params: params
})
}
export function createSysStoreSettleRecords(data) {
return request({
url: '/sys/sysStoreSettleRecords/create',
method: 'post',
data: data
})
}

export function deleteSysStoreSettleRecords(id) {
return request({
url: '/sys/sysStoreSettleRecords/delete/' + id,
method: 'get',
})
}

export function getSysStoreSettleRecords(id) {
return request({
url: '/sys/sysStoreSettleRecords/' + id,
method: 'get',
})
}

export function updateSysStoreSettleRecords(id, data) {
return request({
url: '/sys/sysStoreSettleRecords/update/' + id,
method: 'post',
data: data
})
}
export function updateShowStatus(params) {
    return request({
        url:'/sys/sysStoreSettleRecords/update/updateShowStatus',
        method:'post',
        params:params
    })
}
