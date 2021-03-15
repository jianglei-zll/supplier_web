import request from '../utils/request';

export const assetsService = {
    // 仓库商品列表
    getReceiptList(data) {
        return request({
            url:'/invoice/list',
            method:'post',
            data:data
        })
    },
    
    // 发票状态的数量
    getReceiptStatusNum(data){
        return request({
            url:'/invoice/queryNumByInvoiceStatus',
            method:'post',
            data:data
        })
    },
    //发票详情
    getReceiptDetail(data){
        return request({
            url:'/invoice/queryById',
            method:'get',
            data:data
        })
    },
    // 冲红
    getToRed(data){
        return request({
            url:'/invoice/fail',
            method:'get',
            data:data
        })
    },
    // 取消开票
    getCancel(data){
        return request({
            url:'/invoice/cancel',
            method:'get',
            data:data
        })
    },
    // 导出发票
    exportReceipt(data){
        return request({
            url:'/invoice/invoiceExport',
            method:'get',
            data:data
        })
    }
}