import request from '@/utils/request'
// export function fetchList(params) {
//     return request({
//         url:'/sms/SmsBasicGifts/list',
//         method:'get',
//         params:params
//     })
// }

// export function createSmsBasicGifts(data) {
//     return request({
//         url:'/sms/SmsBasicGifts/create',
//         method:'post',
//         data:data
//     })
// }

// export function getSmsBasicGifts(id) {
//     return request({
//         url:'/sms/SmsBasicGifts/'+id,
//         method:'get',
//     })
// }

// export function updateSmsBasicGifts(id,data) {
//     return request({
//         url:'/sms/SmsBasicGifts/update/'+id,
//         method:'post',
//         data:data
//     })
// }

// 重写营销列表接口
export function fetchList(params) {
    return request({
        url:'pms/marketing/activity/show',
        method:'get',
        params:params
    })
}

// 重写添加营销接口
export function createSmsBasicGifts(data) {
    return request({
        url:'/pms/marketing/activity/add',
        method:'post',
        data:data
    })
}

// 重写单个营销详情
export function getSmsBasicGifts(id) {
    return request({
        url:'/pms/marketing/activity/showDetail?activityId='+id,
        method:'get',
    })
}

// 重写单个营销编辑
export function updateSmsBasicGifts(data) {
    return request({
        url:'/pms/marketing/activity/update',
        method:'post',
        data:data
    })
}

//活动查询商品接口
export function chooseProduct(params) {
    return request({
        url:'pms/marketing/activity/chooseProduct',
        method:'get',
        params:params
    })
}

//活动作废
export function blankOutActivity(data) {
    return request({
        url:'/pms/marketing/activity/blankOutActivity',
        method:'post',
        data:data
    })
}



export function deleteSmsBasicGifts(id) {
    return request({
        url:'/pms/PmsProduct/delGiveaway?id='+id,
        method:'get',
    })
}

export function updateStatus(params) {
  return request({
    url:'/sms/SmsBasicGifts/publishStatus',
    method:'post',
    params:params
  })
}