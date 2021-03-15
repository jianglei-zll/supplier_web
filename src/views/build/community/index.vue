<template> 
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                        style="float: right"
                        @click="searchCommunityList()"
                        type="primary"
                        size="small">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="品牌名称/关键字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <el-button v-if="cid>0"
                    class="btn-add" type="success"  icon="el-icon-download"
                    @click="addCommunity()"
                    size="mini">
                添加
            </el-button>

            <el-button @click="exportExcel" type="success" size="mini" icon="el-icon-download">导出</el-button>

            <el-upload
                    style="display: inline"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :before-upload="beforeUpload"
                    :action="importExcel">
                <el-button size="mini" type="success" :disabled="!enabledUploadBtn" :icon="uploadBtnIcon">导入</el-button>
            </el-upload>

        </el-card>
        <div class="table-container">
            <el-table ref="communityTable"
                      :data="list"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading"
                      border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>

                 <el-table-column prop="id"
                                                             label="编号">
                                                <template slot-scope="scope">
                                                    {{scope.row.id }}
                                                </template>
                                            </el-table-column>

                                            <el-table-column prop="name"
                                                             label="小区名称">
                                                <template slot-scope="scope">
                                                    {{scope.row.name }}
                                                </template>
                                            </el-table-column>

                                            <el-table-column label="图片" width="120" align="center">
                                                     <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
                                                   </el-table-column>
                                            <el-table-column prop="phone"
                                                             label="电话">
                                                <template slot-scope="scope">
                                                    {{scope.row.phone }}
                                                </template>
                                            </el-table-column>

                                            <el-table-column prop="price"
                                                             label="价格">
                                                <template slot-scope="scope">
                                                    {{scope.row.price }}
                                                </template>
                                            </el-table-column>
                                             <el-table-column prop="province"
                                                                                                         label="省份">
                                                                                            <template slot-scope="scope">
                                                                                                {{scope.row.province }}
                                                                                            </template>
                                                                                        </el-table-column>
                                                                                        <el-table-column prop="city"
                                                                                                         label="城市">
                                                                                            <template slot-scope="scope">
                                                                                                {{scope.row.city }}
                                                                                            </template>
                                                                                        </el-table-column>
                                            <el-table-column prop="onRegion"
                                                             label="所属区县">
                                                <template slot-scope="scope">
                                                    {{scope.row.onRegion }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="onShangquan"
                                                             label="所属商圈">
                                                <template slot-scope="scope">
                                                    {{scope.row.onShangquan }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="details"
                                                             label="小区地址">
                                                <template slot-scope="scope">
                                                    {{scope.row.details }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="jianzhuleixing"
                                                             label="建筑类型">
                                                <template slot-scope="scope">
                                                    {{scope.row.jianzhuleixing }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="wuyecompany"
                                                             label="物业公司">
                                                <template slot-scope="scope">
                                                    {{scope.row.wuyecompany }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="jianzhuniandai"
                                                             label="建筑年代">
                                                <template slot-scope="scope">
                                                    {{scope.row.jianzhuniandai }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="wuyefei"
                                                             label="物业费">
                                                <template slot-scope="scope">
                                                    {{scope.row.wuyefei }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="kaifashang"
                                                             label="开发商">
                                                <template slot-scope="scope">
                                                    {{scope.row.kaifashang }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="rongjilv"
                                                             label="容积率">
                                                <template slot-scope="scope">
                                                    {{scope.row.rongjilv }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="lvhualv"
                                                             label="绿化率">
                                                <template slot-scope="scope">
                                                    {{scope.row.lvhualv }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="zhuandimianj"
                                                             label="占地面积">
                                                <template slot-scope="scope">
                                                    {{scope.row.zhuandimianj }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="jianzhumianji"
                                                             label="建筑面积">
                                                <template slot-scope="scope">
                                                    {{scope.row.jianzhumianji }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="cheweiinfo"
                                                             label="车位信息">
                                                <template slot-scope="scope">
                                                    {{scope.row.cheweiinfo }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="shangchao"
                                                             label="综合商超">
                                                <template slot-scope="scope">
                                                    {{scope.row.shangchao }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="hosptory"
                                                             label="医院">
                                                <template slot-scope="scope">
                                                    {{scope.row.hosptory }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="postbank"
                                                             label="邮局">
                                                <template slot-scope="scope">
                                                    {{scope.row.postbank }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="bank"
                                                             label="银行">
                                                <template slot-scope="scope">
                                                    {{scope.row.bank }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="others"
                                                             label="其他">
                                                <template slot-scope="scope">
                                                    {{scope.row.others }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="xiaoxue"
                                                             label="幼儿园">
                                                <template slot-scope="scope">
                                                    {{scope.row.xiaoxue }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="highschool"
                                                             label="中小学">
                                                <template slot-scope="scope">
                                                    {{scope.row.highschool }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="daxue"
                                                             label="大学">
                                                <template slot-scope="scope">
                                                    {{scope.row.daxue }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="gongjiao"
                                                             label="公交">
                                                <template slot-scope="scope">
                                                    {{scope.row.gongjiao }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="subway"
                                                             label="地铁">
                                                <template slot-scope="scope">
                                                    {{scope.row.subway }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="latitude"
                                                             label="纬度">
                                                <template slot-scope="scope">
                                                    {{scope.row.latitude }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="longitude"
                                                             label="经度">
                                                <template slot-scope="scope">
                                                    {{scope.row.longitude }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="createTime"
                                                             label="创建时间">
                                                <template slot-scope="scope">
                                                    {{scope.row.createTime |formatCreateTime}}
                                                </template>
                                            </el-table-column>




                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="getAttrList(scope.$index, scope.row)">添加楼
                        </el-button>
                        <el-button
                                size="mini"
                                @click="getAttrList1(scope.$index, scope.row)">添加缴费规则
                        </el-button>
                        <el-button
                                size="mini"
                                @click="getAttrList2(scope.$index, scope.row)">添加缴费记录
                        </el-button>
                        <el-button
                                size="mini"
                                @click="getAttrList3(scope.$index, scope.row)">添加通知
                        </el-button>
                        <el-button
                                size="mini"
                                @click="getAttrList4(scope.$index, scope.row)">添加轮播图
                        </el-button>
                        <el-button
                                size="mini"
                                @click="handleUpdate(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="batch-operate-container">

        </div>
        <div class="pagination-container">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-size="listQuery.pageSize"
                    :page-sizes="[10,15,50]"
                    :current-page.sync="listQuery.pageNum"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {fetchList, deleteCommunity,exportExcel} from '@/api/build/community'
    import {formatDate} from '@/utils/date';
    export default {
        name: 'communityList',
        data() {

            return {
                importExcel: process.env.BASE_API+'/building/community/importExcel',
                uploadBtnIcon:'el-icon-upload2',
                enabledUploadBtn:true,
                dialogVisible:false,
                btnText:'数据导入',

                   cid:0,
                operates: [
                    {
                        label: "显示品牌",
                        value: "showCommunity"
                    },
                    {
                        label: "隐藏品牌",
                        value: "hideCommunity"
                    }
                ],
                operateType: null,
                listQuery: {
                    keyword: null,
                    pageNum: 1,
                    pageSize: 10
                },
                list: null,
                total: null,
                listLoading: true,
                multipleSelection: []
            }
        },
        created() {
            this.getList();
        },
        filters: {
            formatCreateTime(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },

            formatStatus(value) {
                if (value === 1) {
                    return '申请';
                } else if (value === 2) {
                    return '审核失败';
                } else if (value === 3) {
                    return '审核成功';
                }
            },
        },
        methods: {
            onSuccess(response,file,fileList){
                this.enabledUploadBtn=true;
                this.uploadBtnIcon="el-icon-upload2";
                this.btnText='数据导入';
                alert("数据导入成功！");

            },

            onError(err,file,fileList){
                this.enabledUploadBtn=true;
                this.uploadBtnIcon="el-icon-upload2";
                this.btnText='数据导入';
                alert("数据导入失败！请检查是否有重复数据,和网络连接状况！");
            },
            beforeUpload(file){
                this.enabledUploadBtn=false;
                this.uploadBtnIcon="el-icon-loading";
                this.btnText='正在导入';
            },
            exportExcel(){
                window.open(process.env.BASE_API+'/building/community/exportExcel')
            },



            getAttrList(index, row) {
                this.$router.push({path: '/build/floor',query:{cid:row.id,cname:row.name}})
            },
            getAttrList1(index, row) {
                this.$router.push({path: '/build/typePrice',query:{cid:row.id,cname:row.name}})
            },
            getAttrList2(index, row) {
                this.$router.push({path: '/build/wuyePrice',query:{cid:row.id,cname:row.name}})
            },
            getAttrList3(index, row) {
                this.$router.push({path: '/build/notice',query:{cid:row.id,cname:row.name}})
            },
            getAttrList4(index, row) {
                this.$router.push({path: '/build/adv',query:{cid:row.id,cname:row.name}})
            },
            getList() {
                this.listLoading = true;
                this.cid=this.$route.query.cid;

                if (this.cid) {
                    this.listQuery.companyId=this.cid;
                }
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.records;
                    this.total = response.data.total;
                    this.totalPage = response.data.pages;
                    this.pageSize = response.data.size;
            });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleUpdate(index, row) {
                this.$router.push({path: '/build/updateCommunity', query: {id: row.id}})
            },
            handleDelete(index, row) {
                this.$confirm('是否要删除该品牌', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCommunity(row.id).then(response => {
                    this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1000
                });
                this.getList();
            });
            });
            },
            getProductList(index, row) {
                console.log(index, row);
            },
            getProductCommentList(index, row) {
                console.log(index, row);
            },


            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            searchCommunityList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },


            handleBatchOperate() {
                console.log(this.multipleSelection);
                if (this.multipleSelection < 1) {
                    this.$message({
                        message: '请选择一条记录',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                let showStatus = 0;
                if (this.operateType === 'showCommunity') {
                    showStatus = 1;
                } else if (this.operateType === 'hideCommunity') {
                    showStatus = 0;
                } else {
                    this.$message({
                        message: '请选择批量操作类型',
                        type: 'warning',
                        duration: 1000
                    });
                    return;
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    ids.push(this.multipleSelection[i].id);
                }
                let data = new URLSearchParams();
                data.append("ids", ids);
                data.append("showStatus", showStatus);
                updateShowStatus(data).then(response => {
                    this.getList();
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            });
            },
            addCommunity() {
                this.$router.push({path: '/build/addCommunity',query:{cid:this.$route.query.cid,cname:this.$route.query.cname}});
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


