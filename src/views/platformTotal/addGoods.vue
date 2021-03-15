<template> 
    <section class="data_section" ref="data_section">

          <el-row :gutter="20" class="row_list order_list">

              <el-col :span="24">
                 <div :id="id" class="orderArea orderbarArea"></div>
              </el-col>
          </el-row>


    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
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
    </el-card>
    <div class="table-container">
     <el-table ref="productTable"
                     :data="list"
                     style="width: 100%"
                     @selection-change="handleSelectionChange"
                     v-loading="listLoading"
                     border>
             <el-table-column type="selection" width="60" align="center"></el-table-column>
             <el-table-column label="编号" width="100" align="center">
               <template slot-scope="scope">{{scope.row.id}}</template>
             </el-table-column>
             <el-table-column label="商品图片" width="120" align="center">
               <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
             </el-table-column>
             <el-table-column label="商品名称" align="center" >
               <template slot-scope="scope">
                 <p>{{scope.row.name}}</p>
                 <p>品牌：{{scope.row.brandName}}</p>
               </template>
             </el-table-column>
              <el-table-column label="创建时间" width="180" align="center">
                             <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
                           </el-table-column>
             <el-table-column label="价格/货号" width="180" align="center">
               <template slot-scope="scope">
                 <p>价格：￥{{scope.row.price}}</p>
                 <p>货号：{{scope.row.productSn}}</p>
               </template>
             </el-table-column>

             <el-table-column label="排序" width="100" align="center">
               <template slot-scope="scope">{{scope.row.sort}}</template>
             </el-table-column>
             <el-table-column label="SKU库存" width="100" align="center">
               <template slot-scope="scope">
                <p>{{scope.row.stock }}</p>
               </template>
             </el-table-column>
             <el-table-column label="销量" width="100" align="center">
               <template slot-scope="scope">{{scope.row.sale}}</template>
             </el-table-column>


           </el-table>
    </div>



  </div>
     </section>
</template>
<script>
  import {formatDate} from '@/utils/date';
    import barChart from '@/components/echarts/barChart' // 用户投资类型 柱状图
  import {
     fetchList,
     updateDeleteStatus,
     updateNewStatus,
     updateRecommendStatus,
     updatePaiMai,
     updateFenxiao,
     updateVip,
     deleteProduct,
     updatePublishStatus,
     updateVerifyStatus,fetchVList
   } from '@/api/product'
import {orderStatusStatics, goodsMonthStatic, userStatic,goodsSort,goodsCollect} from '@/api/home'
    import echarts from 'echarts'
    import echartsTheme from "@/components/echarts/theme/westeros.json";
 import {fetchList as fetchOrderList} from '@/api/order'
  export default {
    name: 'memberList',
    data() {
      return {
      id:'barChart',
                        series_data:[],
                         legend_data:[],
                       myChart:null,
        dialogVisible:false,
         dialogVisible1:false,
              dialogVisible2:false,
        blanceList:null,
        integrationList:null,
        orderList:null,
          blance:{
              dialogVisible:false,
              id:null,
          },
          integration:{
              dialogVisible:false,
              id:null,
          },
        operates: [
          {
            label: "显示会员",
            value: "showMember"
          },
          {
            label: "隐藏会员",
            value: "hideMember"
          }
        ],
        operateType: null,
        brandOptions: [],
        listQuery: {
          phone: null,
          pageNum: 1,
          pageSize: 10
        },
        list: null,
        total: null,
        listLoading: true,
        multipleSelection: []
      }
    },
     components: {

                barChart,

            },
    created() {
      this.getList();
           goodsMonthStatic({}).then(res => {
                                                                     if (res.code == 200) {
                                                                         let map = res.data;
                                                                        for (var key in map) {
                                                                         let data=[];
                                                                         if(map[key] && map[key]!=null){
            data.push(map[key]['a1']);data.push(map[key]['a2']);data.push(map[key]['a3']);data.push(map[key]['a4']);data.push(map[key]['a5']);data.push(map[key]['a6']);
            data.push(map[key]['a7']);data.push(map[key]['a8']);data.push(map[key]['a9']);data.push(map[key]['a10']);data.push(map[key]['a11']);data.push(map[key]['a12']);

                                                                         }

      this.legend_data=data;


                                                                         }



                                                                            this.loadChart();
                                                                     }

                                                                 });
    },
     beforeDestroy() {
    			if (!this.myChart) {
    				return
    			}
    			this.myChart.dispose();
    			this.myChart = null;
            },
    filters:{

      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      verifyStatusFilter(value) {
        if (value === 1) {
          return '消费';
        } else {
          return '收入';
        }
      },
      formatchangeType(value) {
              if (value === 1) {
                return '增加';
              } else {
                return '减少';
              }
            },
            formatsourceType(value) {
                    if (value === 1) {
                      return '下单';
                    } if (value === 2) {
                                            return '登录';
                                          }else {
                      return '注册';
                    }
                  },
      formatStatus(value){
        if (value === 1) {
                    return '消费';
                  } if (value === 2) {
                                return '退款';
                              }
                              if (value === 3) {
                                          return '充值';
                                        }
                                        if (value === 4) {
                                                    return '提现';
                                                  }
                                                  if (value === 5) {
                                                              return '佣金';
                                                            }
                                                            if (value === 6) {
                                                                        return '平台调整';
                                                                      }else {
                    return '收入';
                  }
      },
      formatReturnAmount(row){
        return row.productRealPrice*row.productCount;
      }
    },
    methods: {
    loadChart(){
                    this.$nextTick(() => {
                        echarts.registerTheme('westeros', echartsTheme)
                        this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                        this.myChart.setOption(this.initOption());
                    })
                },
             	initOption(){
                    let option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['访问量','下载量']
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'会员统计',
                                type:'bar',
                                data:this.legend_data,
                                markPoint : {
                                    data : [
                                        {type : 'max', name: '最大值'},
                                        {type : 'min', name: '最小值'}
                                    ]
                                }
                            }

                        ]
                    };
    				return option;
    			},
        addBlacne(index,row){
            this.blance.dialogVisible=true;
            this.blance.id=row.id;

        },
        addIntegration(index,row){
            this.integration.dialogVisible=true;
            this.integration.id=row.id;

        },
        handleEditBlance(){
            if(this.blance.blance==null){
                this.$message({
                    message: '请输入余额',
                    type: 'warning',
                    duration: 1000
                });
                return
            }
            this.$confirm('是否要进行余额充值', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let params = new URLSearchParams();
                params.append('id', this.blance.id);
                params.append('blance', this.blance.blance);


                handleEditBlance(params).then(response => {
                    this.$message({
                        message: '余额充值成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                });
                this.blance.dialogVisible=false;

            });
        },
        handleEditIntegration(){
            if(this.integration.integration==null){
                this.$message({
                    message: '请输入积分',
                    type: 'warning',
                    duration: 1000
                });
                return
            }
            this.$confirm('是否要进行积分充值', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let params = new URLSearchParams();
                params.append('id', this.integration.id);
                params.append('integration', this.integration.integration);


                handleEditIntegration(params).then(response => {
                    this.$message({
                        message: '积分充值成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                });
                this.integration.dialogVisible=false;

            });
        },
      handleShowVeriyEditDialog(index,row){
        this.dialogVisible=true;
        fetchBlanceList({memberId:row.id,pageSize:1000}).then(response=>{
          this.blanceList=response.data.records;
       });
      },
       handleShowIntegrationDialog(index,row){
              this.dialogVisible1=true;
              fetchIntegrationList({memberId:row.id,pageSize:1000}).then(response=>{
                this.integrationList=response.data.records;
             });
            },
            userOrder(index,row){
                       this.dialogVisible2=true;
                       fetchOrderList({memberId:row.id,pageSize:1000}).then(response=>{
                         this.orderList=response.data.records;
                      });
                     },

      handleShowChange(index, row) {
        let params = new URLSearchParams();
        params.append('ids', row.id);
        params.append('showStatus', row.showStatus);
        updateShowStatus(params).then(response => {
          this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
      },
      getList() {
        this.listLoading = true;
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
        this.$router.push({path: '/ums/updateMember', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该会员', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMember(row.id).then(response => {
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
      handleFactoryStatusChange(index, row) {
        var data = new URLSearchParams();
        data.append("ids", row.id);
        data.append("factoryStatus", row.factoryStatus);
        updateFactoryStatus(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.factoryStatus === 0) {
            row.factoryStatus = 1;
          } else {
            row.factoryStatus = 0;
          }
        });
      },
      handleShowStatusChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("showStatus", row.showStatus);
        updateShowStatus(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.showStatus === 0) {
            row.showStatus = 1;
          } else {
            row.showStatus = 0;
          }
        });
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
      searchMemberList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      updateOrderInfo(){
       updateMemberOrderInfo().then(response => {
                this.getList();
                this.$message({
                  message: '同步成功',
                  type: 'success',
                  duration: 1000
                });
              });
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
        if (this.operateType === 'showMember') {
          showStatus = 1;
        } else if (this.operateType === 'hideMember') {
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
      addMember() {
        this.$router.push({path: '/pms/addMember'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .data_section{
        margin: 20px;
        border-radius: 2px;
        .row_list{
            margin-bottom: 20px;
            .row_base{
                padding: 10px;
                box-sizing: border-box;
                background: #fff;
                border-radius: 6px;
                height: 120px;
            }
        }
        .order_list{
            .orderArea{
                width: 100%;
                height: 300px;
                background: #fff !important;
                border-radius: 6px;
                box-sizing: border-box;
                padding: 10px;
                padding-top: 40px;
                overflow: hidden;
            }
            .orderbarArea{
                height: 370px;
            }
        }
        .data_list{
            text-align: center;
            font-size: 14px;
            border-radius: 6px;
            padding: 10px;
            color:#fff;
            height: 80px;
            .leftItem{
                align-items: start;
                justify-content: space-between;
                text-align: left;
            }
            .rightItem{
                width:62px;

                align-items: center;
                justify-content: center;
                .svg-icon{
                    font-size: 30px;
                }
            }
            .number{
                font-size: 22px;
                font-weight: bold;
                .perTitle{
                    font-size: 13px;
                    margin-left: 5px;
                }
            }
        }
        .pay{
            .leftItem{
                justify-content: space-around;
            }
        }

    }

</style>


