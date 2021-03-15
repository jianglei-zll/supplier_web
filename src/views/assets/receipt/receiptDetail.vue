<template>
    <div>
        <div class="topTit">
            <p>位置：</p>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>资产</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/assets/receipt' }">发票管理</el-breadcrumb-item>
                <el-breadcrumb-item>发票详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="padding: 15px 20px; font-size: 14px; background: #fff">
            <el-row>
                <el-col :span="8">
                    <p class="subTit">基础信息</p>
                    <el-row :gutter="15">
                        <el-col :span="8">商家订单号</el-col>
                        <el-col :span="16">{{invoiceBasics.businessOrderId}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">平台订单号</el-col> 
                        <el-col :span="16">{{invoiceBasics.platformOrderId}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">开票金额</el-col>
                        <el-col :span="16">￥{{invoiceBasics.invoiceAmount}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">状态</el-col>
                        <el-col :span="16" v-if="invoiceBasics.invoiceStatus == 0">待开票</el-col>
                        <el-col :span="16" v-if="invoiceBasics.invoiceStatus == 1">开票中</el-col>
                        <el-col :span="16" v-if="invoiceBasics.invoiceStatus == 2">已开票</el-col>
                        <el-col :span="16" v-if="invoiceBasics.invoiceStatus == 3">开票失败</el-col>
                        <el-col :span="16" v-if="invoiceBasics.invoiceStatus == 4">取消开票</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">种类</el-col>
                        <el-col :span="16">蓝票</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">申请时间</el-col>
                        <el-col :span="16">{{conversionTime(invoiceBasics.applyTime)}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">开票时间</el-col>
                        <el-col :span="16">{{conversionTime(invoiceBasics.invoiceDate)}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">开票次数</el-col>
                        <el-col :span="16">{{invoiceFrequency}}次</el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <p class="subTit">订单发票信息</p>
                    <el-row :gutter="15">
                        <el-col :span="8">开具发票</el-col>
                        <el-col :span="16">是</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">发票类型</el-col>
                        <el-col :span="16" v-if="invoiceSupplement.invoiceType == 0">增值税电子普通发票</el-col>
                        <el-col :span="16" v-if="invoiceSupplement.invoiceType == 1">增值税纸质普通发票</el-col>
                        <el-col :span="16" v-if="invoiceSupplement.invoiceType == 2">增值税纸质专用发票</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">单位名称</el-col>
                        <el-col :span="16">{{invoiceSupplement.invoiceTitle}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">纳税人识别号</el-col>
                        <el-col :span="16">{{invoiceSupplement.dutyParagraph}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">注册地址</el-col>
                        <el-col :span="16">{{invoiceSupplement.businessAddress}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">注册电话</el-col>
                        <el-col :span="16">{{invoiceSupplement.businessTelephone}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">开户银行</el-col>
                        <el-col :span="16">{{invoiceSupplement.bankOfDeposit}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">银行账户</el-col>
                        <el-col :span="16">{{invoiceSupplement.bankAccount}}</el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <p class="subTit">发票收货信息</p>
                    <el-row :gutter="15">
                        <el-col :span="8">收货人姓名</el-col>
                        <el-col :span="16">{{invoiceReceiving.contacts}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">收货人联系方式</el-col>
                        <el-col :span="16">{{invoiceReceiving.contactsPhone}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">收货省市区</el-col>
                        <el-col :span="16">{{invoiceReceiving.mailProvince}}{{invoiceReceiving.mailCity}}{{invoiceReceiving.mailArea}}</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="8">收货详细地址</el-col>
                        <el-col :span="16">{{invoiceReceiving.mailAddress}}</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div style="padding: 15px 20px; background: #fff;font-size: 14px;" >
            <el-row>
                <el-col :span="8">
                    <p class="subTit">操作记录</p>
                    <el-row :gutter="15">
                        <el-col :span="8">用户申请开票</el-col>
                        <el-col :span="16">{{conversionTime(invoiceBasics.applyTime)}}</el-col>
                    </el-row>
                    <el-row :gutter="15" v-if="invoiceBasics.failureTime">
                        <el-col :span="8">平台取消</el-col> 
                        <el-col :span="16">{{conversionTime(invoiceBasics.failureTime)}}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-button @click="backList" >返回列表</el-button>
        </div>
    </div>
</template>
<script>
import {assetsService} from"../../../../api/assets";
import {commonFun} from "../../../../utils/commonFun";
export default {
    name:'receiptDetail',
    data(){
        return{
            invoiceBasics:{},// 基础信息
            invoiceReceiving:{},//收货信息
            invoiceSupplement:{},//发票信息
            invoiceFrequency:'',//开票次数
        }
    },
    mounted(){
        assetsService.getReceiptDetail({id:this.$route.params.id}).then((res)=>{
            this.invoiceBasics = res.invoiceBasics;
            this.invoiceReceiving = res.invoiceReceiving;
            this.invoiceSupplement = res.invoiceSupplement;
            this.invoiceFrequency = res.invoiceFrequency;
        })
    },
    methods:{
        // 时间转化
        conversionTime(t){
            let tt = commonFun.getTime(t);
            return tt;
        },
        // 返回列表
        backList(){
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.topTit {
    display: flex;
    align-items: center;
    height: 50px;
}
.el-row {
    margin: 10px 0;
}
.subTit {
    font-size: 15px;
    font-weight: 600;
}
.subTits {
    margin-bottom: 15px;
}
.subTitt {
    margin-top: 15px;
}
.clickBlue {
    color: #169bd5;
    text-decoration: underline;
}
</style>