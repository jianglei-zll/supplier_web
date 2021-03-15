import request from '@/utils/request'
export function fetchList(params) {
    return request({
      url:'/operate/liquor/showMemberAsset',
      method:'get',
      params
    })
  }

