import request from '@/utils/request'
import out from '@/utils/out'


export function updateDelivery(params) {
  return request({
    url:'/kl/delivery/updateDelivery',
    method:'post',
    params:params
  })
}

export function deliveryInfos(params) {
  return request({
    url:'/oms/OmsOrder/list',
    method:'get',
    params:params
  })
}

// 导入订单的展示列表接口
export function foreignOrder(params) {
  return request({
    url:'/oms/OmsOrder/listForeignOrder',
    method:'get',
    params:params
  })
}
//导出订单接口

export function outputOrder(params) {
  return out({
    url:'/oms/OmsOrder/outputOrder',
    method:'get',
    params:params
  })
}

// 根据token获取uuid
export function getTokenWithAuthor(params) {
  return request({
    url:'/oms/OmsOrder/getTokenWithAuthor',
    method:'get',
    params:params
  })
}

//标记接口
export function getSign(data) {
  return request({
    url:'/oms/OmsOrder/batch/saveMark',
    method:'post',
    data
  })
}


// export function fetchList(params) {
//   return request({
//     url:'/oms/OmsOrder/list',
//     method:'get',
//     params:params
//   })
// }

export function fetchList(data) {
  return request({
    url:'/oms/OmsOrder/order/list',
    method:'post',
    data
  })
}
export function fetchFenxiaoList(params) {
  return request({
    url:'/oms/OmsOrder/fenxiaolist',
    method:'get',
    params:params
  })
}
export function closeOrder(params) {
  return request({
    url:'/oms/OmsOrder/update/close',
    method:'post',
    params:params
  })
}

export function examineOrder(params) {
  return request({
    url:'/oms/OmsOrder/update/payStatus',
    method:'post',
    params:params
  })
}

export function deleteOrderById(id) {
  return request({
    url:'/oms/OmsOrder/delete/'+id,
    method:'get'
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/oms/OmsOrder/update/delivery',
    method:'post',
    data:data
  });
}

export function deliveryOrder1(data) {
  return request({
    url:'/oms/OmsOrder/delivery',
    method:'post',
    data:data
  });
}


export function getOrderDetail(id) {
  return request({
    url:'/oms/OmsOrder/'+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/oms/OmsOrder/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/oms/OmsOrder/update/moneyInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/oms/OmsOrder/update/note',
    method:'post',
    params:params
  })
}
export function orderData(params) {
  return request({
    url:'/oms/OmsOrder/data/count',
    method:'get',
    params:params
  })
}
export function orderPayList(params) {
  return request({
    url:'/oms/OmsOrder/orderPay/list',
    method:'get',
    params:params
  })
}