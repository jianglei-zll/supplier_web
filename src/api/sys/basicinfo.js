import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/sys/sysSystemSetting/list',
    method: 'get',
    params: params
  })
}
export function createSysSystemSetting(data) {
  return request({
    url: '/sys/sysSystemSetting/create',
    method: 'post',
    data: data
  })
}

export function deleteSysSystemSetting(id) {
  return request({
    url: '/sys/sysSystemSetting/delete/' + id,
    method: 'get',
  })
}

export function getSysSystemSetting(id) {
  return request({
    url: '/sys/sysSystemSetting/' + id,
    method: 'get',
  })
}

export function updateSysSystemSetting(id, data) {
  return request({
    url: '/sys/sysSystemSetting/update/' + id,
    method: 'post',
    data: data
  })
}

export function getSysSysQiniuConfig(id) {
  return request({
    url: '/sys/sysQiniuConfig/' + id,
    method: 'get',
  })
}

export function updateSysSysQiniuConfig( data) {
  return request({
    url: '/sys/sysQiniuConfig/config',
    method: 'post',
    data: data
  })
}