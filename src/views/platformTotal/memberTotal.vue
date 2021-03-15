<template> 
    <section class="data_section" ref="data_section">

          <el-row :gutter="20" class="row_list order_list">
              <el-col>
                <div :id="id" class="orderArea"></div>
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
      <el-table ref="brandTable"
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
        <el-table-column label="用户余额" width="80" align="center">
          <template slot-scope="scope">
            <p> {{scope.row.blance}}</p>

          </template>
        </el-table-column>
        <el-table-column label="用户积分" width="80" align="center">
                  <template slot-scope="scope">
                    <p> {{scope.row.integration}}</p>

                  </template>
                </el-table-column>

          <el-table-column label="购买订单" width="80" align="center">
              <template slot-scope="scope">{{scope.row.buyCount}}</template>
          </el-table-column>
          <el-table-column label="消费金额" width="80" align="center">
              <template slot-scope="scope">{{scope.row.buyMoney}}</template>
          </el-table-column>
           <el-table-column label="注册时间"  align="center">
                    <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
                  </el-table-column>

      </el-table>
    </div>


  </div>
     </section>
</template>
<script>
  import {formatDate} from '@/utils/date';
    import barChart from '@/components/echarts/barChart' // 用户投资类型 柱状图
  import {fetchList, updateShowStatus, updateFactoryStatus, deleteMember,updateMemberOrderInfo,handleEditIntegration,handleEditBlance} from '@/api/ums/member'

import {orderStatusStatics, memberMonthStatic, userStatic,goodsSort,goodsCollect} from '@/api/home'
    import echarts from 'echarts'
    import echartsTheme from "@/components/echarts/theme/westeros.json";
 import {fetchList as fetchOrderList} from '@/api/order'
  export default {
    name: 'memberList',
    data() {
      return {
     id:"lineChart",
     				datetime:[],
     				 series_data:[],
                      legend_data:[],
                      x_series_data:[],
                     myChart:null,
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
   				let data = {
   					title: {
   						text: ''
   					},
   					tooltip : {
   						trigger: 'axis',
   						axisPointer: {
   							type: 'cross',
   							label: {
   								backgroundColor: '#6a7985'
   							}
   						}
   					},
   					legend: {
   						data:this.legend_data
   					},
   					grid: {
   						left: '3%',
   						right: '4%',
   						bottom: '3%',
   						containLabel: true
   					},
   					xAxis : [
   						{
   							type : 'category',
   							boundaryGap : false,
   							data : this.x_series_data
   						}
   					],
   					yAxis : [
   						{
   							type : 'value'
   						}
   					],
   					series :this.series_data,
   					series1 : [
   						{
   							name:'股票',
   							type:'line',
   							stack: '总量',
   							areaStyle: {normal: {}},
   							data:[120, 132, 101, 134, 90, 230, 210]
   						},
   						{
   							name:'基金',
   							type:'line',
   							stack: '总量',
   							areaStyle: {normal: {}},
   							data:[220, 182, 191, 234, 290, 330, 310]
   						},

   					]
   				}
   				return data;
   			},

      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.records;
          this.total = response.data.total;
          this.totalPage = response.data.pages;
          this.pageSize = response.data.size;
           let text,legend_data=[],series_data=[],x_series_data=[];
           legend_data.push('订单数');
           legend_data.push('销售额');
             let data1=[];
           for (var key in this.list) {
                      x_series_data.push(this.list[key].username);


                 data1.push(this.list[key].buyCount);
            }
            series_data.push({name: '订单数',areaStyle: {normal: {}}, type:'line',stack: '总量',data: data1});
              let data2=[];
             for (var key in this.list) {

      data2.push(this.list[key].buyMoney);
                        }
                         series_data.push({name: '销售额',areaStyle: {normal: {}}, type:'line',stack: '总量',data: data2});
                                                                              console.log(x_series_data)
                                                                              console.log(legend_data)
                                                                              console.log(series_data)
                                                                              this.x_series_data=x_series_data;
                                                                               this.legend_data=legend_data;
                                                                                      this.series_data=series_data;
                                                                                     this.loadChart();
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


