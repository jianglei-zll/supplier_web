<template> 
    <section class="data_section" ref="data_section">

          <el-row :gutter="10" class="row_list order_list">
              <el-col :span="7">

              </el-col>
              <el-col :span="17">
                 <div :id="id" class="orderArea orderbarArea"></div>
              </el-col>
          </el-row>


     <el-card class="operate-container" shadow="never">
         <i class="el-icon-tickets"></i>
         <span>订单明细</span>
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
          <el-table ref="orderTable"
                         :data="list"
                         style="width: 100%;"
                         @selection-change="handleSelectionChange"
                         v-loading="listLoading" border>
                 <el-table-column type="selection" width="60" align="center"></el-table-column>
                 <el-table-column label="编号" width="80" align="center">
                   <template slot-scope="scope">{{scope.row.id}}</template>
                 </el-table-column>
                 <el-table-column label="订单编号" width="180" align="center">
                   <template slot-scope="scope">{{scope.row.orderSn}}</template>
                 </el-table-column>

                 <el-table-column label="下单时间" width="180" align="center">
                   <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
                 </el-table-column>
                 <el-table-column label="用户账号" align="center">
                   <template slot-scope="scope">{{scope.row.memberUsername}}</template>
                 </el-table-column>
                 <el-table-column label="订单金额" width="120" align="center">
                   <template slot-scope="scope">￥{{scope.row.totalAmount}}</template>
                 </el-table-column>
                 <el-table-column label="支付金额" width="120" align="center">
                   <template slot-scope="scope">￥{{scope.row.payAmount}}</template>
                 </el-table-column>
                 <el-table-column label="支付方式" width="120" align="center">
                   <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
                 </el-table-column>
                 <el-table-column label="订单来源" width="120" align="center">
                   <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
                 </el-table-column>
                 <el-table-column label="订单类型" width="120" align="center">
                   <template slot-scope="scope">{{scope.row.orderType | formatOrderType}}</template>
                 </el-table-column>


                 <el-table-column label="订单状态" width="120" align="center">
                   <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
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
           memberMonthStatic({}).then(res => {
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
    formatCreateTime(time) {
           let date = new Date(time);
           return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
         },
          formatPayType(value) {
                if (value === 2) {
                  return '支付宝';
                } else if (value === 1) {
                  return '微信小程序';
                } else  if (value === 3){
                  return '余额支付';
                } else  if (value === 5){
                           return '积分兑换';
                         }
              },
              formatSourceType(value) {
                if (value === 1) {
                  return '小程序';
                } else if (value === 2){
                  return 'h5订单';
                }else if (value === 3){
                  return 'PC订单';
                }else if (value === 4){
                  return 'android订单';
                }else if (value === 5){
                  return 'ios订单';
                }
              },
              formatOrderType(value) {
                if (value === 2) {
                  return '拼团订单';
                } else if (value === 3) {
                  return '团购订单';
                } else  if (value === 6){
                  return '秒杀订单';
                }else if (value === 1) {
                  return '普通订单';
                }else if (value === 4) {
                           return '砍价订单';
                         } else if (value === 5) {
                                return '积分订单';
                            }
              },
              formatStatus(value) {
         if (value === 12) {
                  return '待付款';
                }if (value === 1) {
                  return '支付成功，没有回掉';
                }else if (value === 2) {
                  return '待发货';
                } else if (value === 3) {
                  return '待收货';
                } else if (value === 4) {
                  return '待评价';
                } else if (value === 5) {
                  return '已完成';
                } else if (value === 19) {
                  return '申请售后';
                } else if (value === 20) {
                  return ' 售后已完成';
                } else if (value === 8) {
                  return '待分享';
                } else if (value === 13) {
                  return '申请退款';
                } else if (value === 14) {
                  return '已退款';
                }  else if (value === 15) {
                  return '已关闭';
                } else if (value === 16) {
                  return '无效订单';
                } else if (value === 17) {
                      return '已删除';
                }else if (value === 18) {
                               return '拼团下单成功';
                  }
       },
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

      getList() {
        this.listLoading = true;
        fetchOrderList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.records;
          this.total = response.data.total;
          this.totalPage = response.data.pages;
          this.pageSize = response.data.size;
        });
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


