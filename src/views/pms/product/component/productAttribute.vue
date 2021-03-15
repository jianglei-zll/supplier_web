<template>
    <div  class="modelDiv">
        <p class="modelTit">
            <span>商品属性</span>
            <span></span>
        </p>
        <div style="margin:0 20px;padding-bottom:20px">
             <el-form :model="value" :rules="rules" ref="productAttrForm" label-width="150px">
                <el-row class="elItem">
                    <el-col :span="12">
                        <el-form-item label="品牌" prop="pinpai">
                            <p>会稽山</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="口味">
                            <p>干型黄酒（总糖：10.0g/L以下）</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="包装方式">
                            <p>瓶装</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="特产品类">
                            <p>绍兴黄酒</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="单规格净含量※" prop="jhl">
                            <p>100ml</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否为有机食品">
                            <p>是</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="省份" >
                            <p>浙江省</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生产日期" prop="scrq">
                            <p>2020年12月12日</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="包装规格※" prop="bzgg" >
                            <p>瓶</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保质期" prop="bzq">
                            <p>2年</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="酒精度数">
                            <p>20%vol</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="黄酒种类" >
                            <p>糯米黄酒</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年份">
                            <p>2015年</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="食品生产许可证编号" >
                            <p>QS000000000000000001</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品标准号">
                            <p>SD00000001</p>
                        </el-form-item>
                    </el-col>
                </el-row>
             </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'productAttribute',
    data(){
        return{
            value:{},
            rules:{
                pinpai: [
                    { required: true, message: "请选择品牌" },
                ],
                jhl: [
                    { required: true, message: "请填写单规格净含量"},
                ],
                scrq: [
                    { required: true, message: "请选择生产日期"},
                ],
                bzgg:[
                    { required: true, message: "请填写包装规格" },
                ],
                bzq:[
                    { required: true, message: "请填写保质期" },
                ],
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.modelDiv{
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.01);
    margin:20px 30px;
}
.modelTit{
    font-size: 18px;
    font-weight: 600;
    height: 60px;
    line-height: 60px;
    padding-left: 40px;
    border-bottom: 1px solid #F7F7F7;
    span:last-child{
        color: #999999;
        font-size: 12px;
        padding-left:20px;
    }
}
.el-select,.el-date-editor{
    width: 100%;
}
.elItem{
    margin-top: 15px;
}
</style>