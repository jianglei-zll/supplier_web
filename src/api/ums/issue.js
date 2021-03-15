import request from '@/utils/request'
export function fetchList(params) {
    return request({
      url:'/operate/liquor/showAsset',
      method:'get',
      params
    })
  }


  export function issueAssets(data) {
    return request({
      url:'/operate/liquor/issueAssets',
      method:'post',
      data
    })
  }