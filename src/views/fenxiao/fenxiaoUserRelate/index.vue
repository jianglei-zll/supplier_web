<template> 
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                        style="float: right"
                        @click="searchFenxiaoUserRelateList()"
                        type="primary"
                        size="small">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="类型名称/关键字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
           
        </el-card>
        <div class="table-container">
            <el-table ref="fenxiaoUserRelateTable"
                      :data="list"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading"
                      border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>


 <el-table-column label="编号" width="60" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
         <el-table-column label="推荐人" width="140" align="center">
                  <template slot-scope="scope">
                  <p> {{scope.row.invitecode}}</p>
                  <p> {{scope.row.job}}</p>
                  </template>
          </el-table-column>

        <el-table-column label="用户账号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
         <el-table-column label="头像" width="120" align="center">
                                       <template slot-scope="scope"><img style="height: 80px" :src="scope.row.icon"></template>
                                   </el-table-column>
        <el-table-column label="电话号码" width="140" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
         <el-table-column label="会员等级" width="140" align="center">
                  <template slot-scope="scope">{{scope.row.memberLevelName}}</template>
                </el-table-column>

        <el-table-column label="下级会员" width="80" align="center">
                  <template slot-scope="scope">
                    <p> {{scope.row.childList.length}}</p>
                    <p>
                      <el-button
                        type="text"
                        @click="handleShowIntegrationDialog(scope.$index, scope.row.childList)">下级会员
                      </el-button>
                    </p>
                  </template>
                </el-table-column>
        <el-table-column label="是否显示" width="70" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
          <el-table-column label="购买订单" width="80" align="center">
              <template slot-scope="scope">{{scope.row.buyCount}}</template>
          </el-table-column>
          <el-table-column label="消费金额" width="80" align="center">
              <template slot-scope="scope">{{scope.row.buyMoney}}</template>
          </el-table-column>
           <el-table-column label="注册时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
                  </el-table-column>

            </el-table>
        </div>
 <el-dialog
      title="下级会员"
      :visible.sync="dialogVisible1"
      width="40%">
      <el-table style="width: 100%;margin-top: 20px"
                :data="integrationList"
                border>

         <el-table-column label="推荐人" width="140" align="center">
                          <template slot-scope="scope">
                          <p> {{scope.row.invitecode}}</p>
                          <p> {{scope.row.job}}</p>
                          </template>
                  </el-table-column>

                <el-table-column label="用户账号" width="140" align="center">
                  <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                 <el-table-column label="头像" width="120" align="center">
                                               <template slot-scope="scope"><img style="height: 80px" :src="scope.row.icon"></template>
                                           </el-table-column>
                <el-table-column label="电话号码" width="140" align="center">
                  <template slot-scope="scope">{{scope.row.phone}}</template>
                </el-table-column>
                 <el-table-column label="会员等级" width="140" align="center">
                          <template slot-scope="scope">{{scope.row.memberLevelName}}</template>
                        </el-table-column>


                <el-table-column label="是否显示" width="70" align="center">
                  <template slot-scope="scope">
                    <el-switch
                      @change="handleShowChange(scope.$index, scope.row)"
                      :active-value="1"
                      :inactive-value="0"
                      v-model="scope.row.status">
                    </el-switch>
                  </template>
                </el-table-column>
                  <el-table-column label="购买订单" width="80" align="center">
                      <template slot-scope="scope">{{scope.row.buyCount}}</template>
                  </el-table-column>
                  <el-table-column label="消费金额" width="80" align="center">
                      <template slot-scope="scope">{{scope.row.buyMoney}}</template>
                  </el-table-column>
                   <el-table-column label="注册时间" width="160" align="center">
                            <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
                          </el-table-column>
      </el-table>
    </el-dialog>
    </div>
</template>
<script>
    //将$都替换为$
    import {fetchList, deleteFenxiaoUserRelate} from '@/api/fenxiao/fenxiaoUserRelate'
    import {formatDate} from '@/utils/date';

    export default {
        name: 'fenxiaoUserRelateList',
        data() {
            return {
              integrationList:null,
             dialogVisible1:false,
                operates: [],
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
 formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
            formatStatus(value) {
                if (value === 1) {
                    return '未开始';
                } else if (value === 2) {
                    return '活动中';
                } else if (value === 3) {
                    return '已结束';
                } else if (value === 4) {
                    return '已失效';
                }
            },
        },
        methods: {
          handleShowIntegrationDialog(index,row){
                      this.dialogVisible1=true;
console.log(row)
                        this.integrationList=row;

                    },
            getList() {
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                this.list = response.data;

            })
                ;

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleUpdate(index, row) {
                this.$router.push(
                    {path: '/fenxiao/updateFenxiaoUserRelate', query: {id: row.id}})
            },
            handleDelete(index, row) {
                this.$confirm('是否要删除该类型', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteFenxiaoUserRelate(row.id
            ).
                then(response => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    });
                this.getList();
            })
                ;

            })
                ;

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
            searchFenxiaoUserRelateList() {
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
                if (this.operateType === 'showFenxiaoUserRelate') {
                    showStatus = 1;
                } else if (this.operateType === 'hideFenxiaoUserRelate') {
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
            })
                ;
            },
            addFenxiaoUserRelate() {
                //手动将router,改成$router
                this.$router.push({path: '/fenxiao/addFenxiaoUserRelate'})
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


