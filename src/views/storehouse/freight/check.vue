<template>
    <div  class="modelDiv">
        <p class="modelTit">
            <span>按重量</span>
            <span></span>
        </p>
        <div style="margin:0 20px;padding-bottom:20px;padding-left:20px">
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-row class="rowDiv">
                        <el-col :span="12" class="tit">运费模板名称*</el-col>
                        <el-col :span="12" class="content">江浙沪包邮</el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row class="rowDiv">
                        <el-col :span="12" class="tit">状态*</el-col>
                        <el-col :span="12" class="content">启用</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-row class="rowDiv">
                        <el-col :span="12" class="tit">是否包邮*</el-col>
                        <el-col :span="12" class="content">包邮</el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row class="rowDiv">
                        <el-col :span="12" class="tit">计费方式*</el-col>
                        <el-col :span="12" class="content">按重量</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-row class="rowDiv">
                        <el-col :span="12" class="tit">运费计费*</el-col>
                        <el-col :span="12" class="content"></el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                </el-col>
            </el-row>
            <el-table border style="margin-top:10px">
                <el-table-column label="配送地区"></el-table-column>
                <el-table-column label="首重(kg)"></el-table-column>
                <el-table-column label="首费(元)"></el-table-column>
                <el-table-column label="续重(kg)"></el-table-column>
                <el-table-column label="续费(元)"></el-table-column>
            </el-table>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-row class="rowDiv">
                        <el-col :span="12" class="tit">指定条件包邮*</el-col>
                        <el-col :span="12" class="content"></el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                </el-col>
            </el-row>
            <el-table border style="margin-top:10px" :data="[{value:'1'}]">
                <el-table-column label="配送地区"></el-table-column>
                <el-table-column label="设置包邮条件">
                    <template slot-scope="scope">
                        <div style="display:flex;align-items:center">
                            <el-select v-model="scope.row.value" style="width:150px" disabled>
                                <el-option 
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                ></el-option>
                            </el-select>
                            <span v-if="scope.row.value == 1 ||scope.row.value == 3" style="margin:0 10px">在</span>
                            <span v-if="scope.row.value == 2" style="margin:0 10px">满</span>
                            <el-input style="width:150px;margin-right:5px" disabled></el-input>
                            <span v-if="scope.row.value == 1">kg以内包邮</span>
                            <span v-if="scope.row.value == 2">元包邮</span>
                            <span v-if="scope.row.value == 3" style="margin:0 10px">kg以内包邮，且满</span>
                            <el-input style="width:150px;margin-right:5px" v-if="scope.row.value == 3" disabled></el-input>
                            <span v-if="scope.row.value == 3">元包邮</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>
        <div class="subBtns">
            <p>返回列表</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'checkFreight',
    data(){
        return{
            value:'1',
            options:[{label:'金额',value:'2'},{label:'重量(kg)',value:'1'},{label:'重量(kg) + 金额',value:'3'}]
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
.rowDiv{
    margin-top: 30px;
    .tit{
        color: #999;
        font-size: 14px;
    }
    .content{
        font-size: 14px;
        text-align: right;
    }
}

</style>