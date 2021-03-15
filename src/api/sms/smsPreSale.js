import request from '@/utils/request'
export function fetchList(params) {
return request({
url: '/sms/smsPreSale/list',
method: 'get',
params: params
})
}
export function createSmsPreSale(data) {
return request({
url: '/sms/smsPreSale/create',
method: 'post',
data: data
})
}

export function deleteSmsPreSale(id) {
return request({
url: '/sms/smsPreSale/delete/' + id,
method: 'get',
})
}

export function getSmsPreSale(id) {
return request({
url: '/sms/smsPreSale/' + id,
method: 'get',
})
}

export function updateSmsPreSale(id, data) {
return request({
url: '/sms/smsPreSale/update/' + id,
method: 'post',
data: data
})
}

