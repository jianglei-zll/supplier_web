<template>
    <div class="modelDiv">
        <p class="modelTit">服务与承诺</p>
        <div style="margin:0 20px;padding-bottom:20px">
            <el-form :model="value" :rules="rules" ref="productAttrForm" label-width="150px">
                <el-form-item label="运费结算模板" prop="yfmb">
                    <div style="display:flex">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <p class="blueF">查看详情</p>
                    </div>
                </el-form-item>
                <el-form-item label="运费销售模板" prop="yfxsmb">
                    <div style="display:flex">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <p class="blueF">添加销售运费模板</p>
                        <p class="blueF">刷新</p>
                        <p class="blueF">查看详情</p>
                    </div>
                </el-form-item>
                <el-form-item label="不配送区域模板">
                    <div style="display:flex">
                        <el-select v-model="value1" placeholder="请选择">
                            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <p class="blueF">查看详情</p>
                    </div>
                </el-form-item>
                <el-form-item label="商品限制">
                    <el-checkbox v-model="checked">提供发票</el-checkbox>
                    <div>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="增值税电子普通发票"></el-checkbox>
                            <el-checkbox label="增值税纸质普通发票"></el-checkbox>
                            <el-checkbox label="增值税纸质专用发票"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item label="自动下架" prop="zdxj">
                    <div class="zdClass">
                        <el-radio v-model="radio" label="1">否</el-radio>
                        <el-radio v-model="radio" label="2">是</el-radio>
                        <p class="ft1">当上架后库存为0时自动下架</p>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'productSla',
    data(){
        return{
            value1:'',
            options1:[{label:'运费结算模板一',value:''}],
            options2:[{label:'运费销售模板一',value:''}],
            options3:[{label:'不配送区域模板一',value:''}],
            rules:{
                yfmb:[{ required: true, message: "请选择运费结算模板", trigger: "blur" }],
                yfxsmb:[{ required: true, message: "请选择运费销售模板", trigger: "blur" }],
                zdxj:[{ required: true, message: "请选择是否自动下架", trigger: "blur" }]
            },
            checked:true,
            checkList: ['增值税电子普通发票','增值税纸质普通发票'],
            radio:'1',
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
    margin-bottom: 0;
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
.blueF{
    font-size: 14px;
    color:#0C7EEC;
    cursor: pointer;
    margin-left:30px;
}
.zdClass{
    display: flex;
    align-items: center;
}
.ft1{
    color:#999;
    font-size:12px;
}
</style>