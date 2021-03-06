import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/pms/PmsBrand/list',
    method:'get',
    params:params
  })
}
export function createBrand(data) {
  return request({
    url:'/pms/PmsBrand/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/pms/PmsBrand/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/pms/PmsBrand/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deleteBrand(id) {
  return request({
    url:'/pms/PmsBrand/delete/'+id,
    method:'get',
  })
}

export function getBrand(id) {
  return request({
    url:'/pms/PmsBrand/'+id,
    method:'get',
  })
}

export function updateBrand(id,data) {
  return request({
    url:'/pms/PmsBrand/update/'+id,
    method:'post',
    data:data
  })
}


//获取没有关闭的品牌信息
export function getBrandON() {
  return request({
    url:'/pms/PmsBrand/BrandON',
    method:'get',
  })
}