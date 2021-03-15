<template> 
    <el-card class="form-container" shadow="never">
        <el-form :model="smsPreSale" :rules="rules" ref="SmsPreSaleFrom" label-width="150px">

                        <el-form-item
                            label="名称"
                            prop="name">
                        <el-input v-model="smsPreSale.name" style="width: 370px;"/>
                    </el-form-item>
                 <el-form-item label="图片：" prop="pic">
                        <single-upload v-model="smsPreSale.pic"></single-upload>
                      </el-form-item>
                    <el-form-item
                            label="定金百分比"
                            prop="percent">
                        <el-input v-model="smsPreSale.percent" style="width: 370px;"/>%
                    </el-form-item>


                    <el-form-item
                            label="尾款支付时间"
                            prop="endTime">
                             <el-date-picker type="datetime" placeholder="选择日期" v-model="smsPreSale.endTime" style="width: 150px"></el-date-picker>

                    </el-form-item>

            <el-form-item>
                     <el-button size="mini" class="btn-add" @click="handleSelectProduct()" style="margin-left: 20px">添加</el-button>
                     <el-table ref="productRelationTable"
                               :data="smsPreSale.productList"
                               style="width: 100%;margin-top: 20px"
                               border>
                       <el-table-column label="商品名称" align="center">
                         <template slot-scope="scope">{{scope.row.name}}</template>
                       </el-table-column>
                    <el-table-column label="价格" align="center">
                         <template slot-scope="scope">{{scope.row.price}}</template>
                       </el-table-column>
                       <el-table-column label="库存" align="center">
                                                <template slot-scope="scope">{{scope.row.stock}}</template>
                                              </el-table-column>
                       <el-table-column label="操作" align="center" width="100">
                         <template slot-scope="scope">
                           <el-button size="mini"
                                      type="text"
                                      @click="handleDeleteProductRelation(scope.$index, scope.row)">删除
                           </el-button>
                         </template>
                       </el-table-column>
                     </el-table>
                   </el-form-item>
                    <el-form-item
                            label="促销描述"
                            prop="demo">
                        <el-input v-model="smsPreSale.demo" style="width: 370px;"/>
                    </el-form-item>




            <el-form-item>
                <el-button type="primary" @click="onSubmit('SmsPreSaleFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('SmsPreSaleFrom')">重置</el-button>
            </el-form-item>
        </el-form>
         <el-dialog title="选择商品" :visible.sync="selectDialogVisible" width="50%">
                <el-input v-model="dialogData.listQuery.keyword"
                          style="width: 250px;margin-bottom: 20px"
                          size="small"
                          placeholder="商品名称搜索">
                  <el-button slot="append" icon="el-icon-search" @click="handleSelectSearch()"></el-button>
                </el-input>
                <el-table :data="dialogData.list"
                          @selection-change="handleDialogSelectionChange" border>
                  <el-table-column type="selection" width="60" align="center"></el-table-column>
                  <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                  </el-table-column>
                  <el-table-column label="货号" width="160" align="center">
                    <template slot-scope="scope">NO.{{scope.row.productSn}}</template>
                  </el-table-column>
                  <el-table-column label="价格" width="120" align="center">
                    <template slot-scope="scope">￥{{scope.row.price}}</template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container">
                  <el-pagination
                    background
                    @size-change="handleDialogSizeChange"
                    @current-change="handleDialogCurrentChange"
                    layout="prev, pager, next"
                    :current-page.sync="dialogData.listQuery.pageNum"
                    :page-size="dialogData.listQuery.pageSize"
                    :page-sizes="[10,15,50]"
                    :total="dialogData.total">
                  </el-pagination>
                </div>
                <div style="clear: both;"></div>
                <div slot="footer">
                  <el-button  size="small" @click="selectDialogVisible = false">取 消</el-button>
                  <el-button  size="small" type="primary" @click="handleSelectDialogConfirm()">确 定</el-button>
                </div>
              </el-dialog>
    </el-card>
</template>
<script>
import {fetchList as fetchProductList} from '@/api/product';
    import {createSmsPreSale, getSmsPreSale, updateSmsPreSale} from '@/api/sms/smsPreSale'
    import SingleUpload from '@/components/Upload/singleUpload'

    const defaultSmsPreSale = {
        name: ''
    };
    export default {
        name: 'SmsPreSaleDetail',
        components: {SingleUpload},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            smsPreSale:
            Object.assign({},
        defaultSmsPreSale),
         selectDialogVisible:false,
                dialogData:{
                          list: null,
                          total: null,
                          multipleSelection:[],
                          listQuery:{
                            keyword: null,
                            pageNum: 1,
                            pageSize: 10
                          }
                        },
            rules: {
                name: [
                    {required: true, message: '请输入预售名称', trigger: 'blur'},
                    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
                ],
                    percent:
                [
                    {required: true,message: '面值只能是数值，1-100，限2位小数',trigger: 'blur'}
                ],
                    sort
            :
                [
                    {type: 'number', message: '排序必须为数字'}
                ],
            }
        }
        },
        created() {
            if (this.isEdit) {
                getSmsPreSale(this.$route.query.id).then(response => {
                    this.smsPreSale = response.data;
            })
                ;
            } else {
                this.smsPreSale = Object.assign({},
            defaultSmsPreSale)
                ;
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if(this.isEdit
                    )
                        {
                            updateSmsPreSale(this.$route.query.id, this.smsPreSale).then(response => {
                                if(response.code == 200
                        )
                            {
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }
                        else
                            {
                                this.$message({
                                    message: response.msg,
                                    type: 'error',
                                    duration: 1000
                                });
                            }

                        })
                            ;
                        }
                    else
                        {
                            createSmsPreSale(this.smsPreSale).then(response => {
                                if(response.code == 200
                        )
                            {
                                this.$refs[formName].resetFields();
                                this.smsPreSale = Object.assign({},
                            defaultSmsPreSale)
                                ;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }
                        else
                            {
                                this.$message({
                                    message: response.msg,
                                    type: 'error',
                                    duration: 1000
                                });
                            }

                        })
                            ;
                        }
                    })
                        ;

                    } else {
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration: 1000
                        });
                return false;
            }
            })
                ;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.smsPreSale = Object.assign({},
            defaultSmsPreSale)
                ;
            },
                     handleSelectProduct(){
                           this.selectDialogVisible=true;
                           this.getDialogList();
                         },
                          handleSelectSearch(){
                                 this.getDialogList();
                               },
                               handleDialogSizeChange(val) {
                                 this.dialogData.listQuery.pageNum = 1;
                                 this.dialogData.listQuery.pageSize = val;
                                 this.getDialogList();
                               },
                               handleDialogCurrentChange(val) {
                                 this.dialogData.listQuery.pageNum = val;
                                 this.getDialogList();
                               },
                               handleDialogSelectionChange(val){
                                 this.dialogData.multipleSelection = val;

                               },
                                  getList() {
                                       this.listLoading = true;
                                       fetchList(this.listQuery).then(response => {
                                         this.listLoading = false;
                                         this.list = response.data.data;
                                         this.total = response.data.total;
                                       });
                                     },
                                     getDialogList(){
                                       fetchProductList(this.dialogData.listQuery).then(response=>{
                                         this.dialogData.list=response.data.records;
                                         this.dialogData.total=response.data.total;
                                       })
                                     },
                               handleSelectDialogConfirm(){
                                 if (this.dialogData.multipleSelection < 1) {
                                   this.$message({
                                     message: '请选择一条记录',
                                     type: 'warning',
                                     duration: 1000
                                   });
                                   return;
                                 }
                                 let selectProducts = [];
                                 let totalPrice =0;
                                 for (let i = 0; i < this.dialogData.multipleSelection.length; i++) {
                                 totalPrice =totalPrice+this.dialogData.multipleSelection[i].price;
                                   selectProducts.push({
                                     id:this.dialogData.multipleSelection[i].id,
                                     name:this.dialogData.multipleSelection[i].name,
                                     price:this.dialogData.multipleSelection[i].price,
                                     stock:this.dialogData.multipleSelection[i].stock
                                   });
                                 }
                                 this.$confirm('使用要进行添加操作?', '提示', {
                                   confirmButtonText: '确定',
                                   cancelButtonText: '取消',
                                   type: 'warning'
                                 }).then(() => {
                                   this.selectDialogVisible=false;
                                 this.smsPreSale.productList= selectProducts;

                                 });
                               },
                                 handleDeleteProductRelation(index,row){
                                           this.smsPreSale.productList.splice(index,1);
                                         },
                               handleEditDialogConfirm(){
                                 this.$confirm('是否要确认?', '提示', {
                                   confirmButtonText: '确定',
                                   cancelButtonText: '取消',
                                   type: 'warning'
                                 }).then(() => {
                                      this.editDialogVisible =false;
                                 })
                               },
                 }
               }
</script>
<style>
</style>


