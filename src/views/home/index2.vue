<template>
  <section class="data_section" ref="data_section">
    <a :href="github" target="_blank">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
              <svg-icon icon-class="order" class="total-icon"></svg-icon>
              <div class="total-title">今日下单</div>
              <div class="total-value">{{orderData.nowOrderCount}}</div>
          </div>
        </el-col>
        <el-col :span="6">
            <div class="total-frame">
                <svg-icon icon-class="total-today" class="total-icon">
                </svg-icon>
                <div class="total-title">今日销售总额</div>
                <div class="total-value">￥{{orderData.nowOrderPay}}</div>
            </div>
        </el-col>
                                <el-col :span="6">
                                    <div class="total-frame">
                                        <svg-icon icon-class="total-yesterday" class="total-icon">
                                        </svg-icon>
                                        <div class="total-title">今日商品</div>
                                        <div class="total-value">￥{{goods.nowCount}}</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="total-frame">
                                        <svg-icon icon-class="total-week" class="total-icon">
                                        </svg-icon>
                                        <div class="total-title">今日会员</div>
                                        <div class="total-value">￥{{user.nowCount}}</div>
                                    </div>
                                </el-col>
            </el-row>
        </a>
        <el-row :gutter="10" class="row_list order_list">
            <el-col :span="7">
                <log-list></log-list>
            </el-col>
            <el-col :span="17">
                <bar-chart type="barChart"></bar-chart>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="row_list order_list">
            <el-col :span="7">
                <pie-chart type="ordertype"></pie-chart>
            </el-col>
            <el-col :span="10">
                <line-chart></line-chart>
            </el-col>
            <el-col :span="7">
                <radar-chart></radar-chart>
            </el-col>
        </el-row>
 <el-row>
                <el-col :span="4">
                    <div style="padding: 20px">
                        <div>
                            <div style="color: #909399;font-size: 14px">本月订单总数</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderData.monthOrderCount}}
                            </div>
                            <div>
                                <span class="color-success" style="font-size: 14px">{{((orderData.monthOrderCount-orderData.lastMonthOrderCount)/orderData.monthOrderCount*100).toFixed(3)}}%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div style="color: #909399;font-size: 14px">本周订单总数</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderData.weekOrderCount}}
                            </div>
                            <div>
                                <span class="color-danger" style="font-size: 14px">{{((orderData.weekOrderCount-orderData.lastWeekOrderCount)/orderData.weekOrderCount*100).toFixed(3)}}%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div style="color: #909399;font-size: 14px">本月销售总额</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderData.monthOrderPay}}
                            </div>
                            <div>
                                <span class="color-success" style="font-size: 14px">{{((orderData.monthOrderPay-orderData.lastMonthOrderPay)/orderData.monthOrderPay*100).toFixed(3)}}%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <div style="color: #909399;font-size: 14px">本周销售总额</div>
                            <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderData.weekOrderPay}}
                            </div>
                            <div>
                                <span class="color-danger" style="font-size: 14px">{{((orderData.weekOrderPay-orderData.lastWeekOrderPay)/orderData.weekOrderPay*100).toFixed(3)}}%</span>
                                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div style="padding: 10px;border-left:1px solid #DCDFE6">
                        <el-date-picker
                                style="float: right;z-index: 1"
                                size="small"
                                v-model="orderCountDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="handleDateChange"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <div>
                            <ve-line
                                    :data="chartData"
                                    :legend-visible="false"
                                    :loading="loading"
                                    :data-empty="dataEmpty"
                                    :settings="chartSettings"></ve-line>
                        </div>
                    </div>
                </el-col>
            </el-row>
               <el-card class="operate-container" shadow="never">
                        <i class="el-icon-tickets"></i>
                        <span>待发货订单</span>
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
              <el-table-column label="商品" width="180" align="center">
                <template slot-scope="scope">{{scope.row.goodsName}}</template>
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

              <el-table-column label="订单类型" width="120" align="center">
                <template slot-scope="scope">{{scope.row.orderType | formatOrderType}}</template>
              </el-table-column>


              <el-table-column label="订单状态" width="120" align="center">
                <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
              </el-table-column>
              <el-table-column label="操作"  align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleViewOrder(scope.$index, scope.row)"
                  >查看订单</el-button>
                  <el-button v-if="scope.row.status ==13 || scope.row.status ==14 || scope.row.status ==19"
                                      size="mini"
                                      @click="handleApplyViewOrder(scope.$index, scope.row)"
                                    >售后列表</el-button>
                  <el-button
                    size="mini"
                    @click="handleCloseOrder(scope.$index, scope.row)"
                    v-show="scope.row.status===12">关闭订单</el-button>
                  <el-button
                    size="mini"
                    @click="handleDeliveryOrder(scope.$index, scope.row)"
                    v-show="scope.row.status===2">订单发货</el-button>
                  <el-button
                    size="mini"
                    @click="handleViewLogistics(scope.$index, scope.row)"
                    v-show="scope.row.status>0 && scope.row.status<9">订单跟踪</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeleteOrder(scope.$index, scope.row)"
                    v-show="scope.row.status===15">删除订单</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="total, sizes,prev, pager, next,jumper"
              :current-page.sync="listQuery.pageNum"
              :page-size="listQuery.pageSize"
              :page-sizes="[5,15,50]"
              :total="total">
            </el-pagination>
          </div>
          </div>
    </section>
</template>

<script>
import { str2Date } from "@/utils/date";
import echarts from "echarts";
import { formatDate } from "@/utils/date";
import salesTable from "./components/salesTable"; // 销售数据表格
import commentList from "./components/commentList"; // 用户评论列表
import cardList from "./components/cardList"; // card列表
import logList from "./components/logList"; // 日志列表
import barChart from "@/components/echarts/barChart"; // 用户投资类型 柱状图
import pieChart from "@/components/echarts/pieChart"; // 用户投资类型 饼状图
import radarChart from "@/components/echarts/radarChart"; // 用户投资类型 雷达图
import lineChart from "@/components/echarts/lineChart"; // 用户投资类型 折线图
import { goodsStatic, orderStatic, userStatic } from "@/api/home";
import { fetchList, closeOrder, deleteOrderById, orderData } from "@/api/order";
import { github } from "@/utils/env";
const DATA_FROM_BACKEND = {
  columns: ["time", "totalCount", "totalPayAmount"],
  rows: [],
};
export default {
  data() {
    return {
      github: github,
      listQuery: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一月",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      orderData: "",
      goods: "",
      user: "",
      orderStatusCount: "",
      orderCountDate: "",
      chartSettings: {
        xAxisType: "time",
        area: true,
        axisSite: { right: ["totalPayAmount"] },
        labelMap: { totalCount: "订单数量", totalPayAmount: "订单金额" },
      },
      chartData: {
        columns: [],
        rows: [],
      },
      loading: false,
      dataEmpty: false,
    };
  },
  components: {
    salesTable,
    commentList,
    cardList,
    logList,
    barChart,
    pieChart,
    radarChart,
    lineChart,
  },
  created() {
    this.initOrderCountDate();
    this.getData();
    this.getList();
  },
  mounted() {},
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatPayType(value) {
      if (value === 2) {
        return "支付宝";
      } else if (value === 1) {
        return "微信小程序";
      } else if (value === 3) {
        return "余额支付";
      } else if (value === 5) {
        return "积分兑换";
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return "小程序";
      } else if (value === 2) {
        return "h5订单";
      } else if (value === 3) {
        return "PC订单";
      } else if (value === 4) {
        return "android订单";
      } else if (value === 5) {
        return "ios订单";
      }
    },
    formatOrderType(value) {
      if (value === 2) {
        return "拼团订单";
      } else if (value === 3) {
        return "团购订单";
      } else if (value === 6) {
        return "秒杀订单";
      } else if (value === 1) {
        return "普通订单";
      } else if (value === 4) {
        return "砍价订单";
      } else if (value === 5) {
        return "积分订单";
      }
    },
    formatStatus(value) {
      if (value === 12) {
        return "待付款";
      }
      if (value === 1) {
        return "支付成功，没有回掉";
      } else if (value === 2) {
        return "待发货";
      } else if (value === 3) {
        return "待收货";
      } else if (value === 4) {
        return "待评价";
      } else if (value === 5) {
        return "已完成";
      } else if (value === 19) {
        return "申请售后";
      } else if (value === 20) {
        return " 售后已完成";
      } else if (value === 8) {
        return "待分享";
      } else if (value === 13) {
        return "申请退款";
      } else if (value === 14) {
        return "已退款";
      } else if (value === 15) {
        return "已关闭";
      } else if (value === 16) {
        return "无效订单";
      } else if (value === 17) {
        return "已删除";
      } else if (value === 18) {
        return "拼团下单成功";
      }
    },
  },
  methods: {
    covertOrder(order) {
      let address =
        order.receiverProvince +
        order.receiverCity +
        order.receiverRegion +
        order.receiverDetailAddress;
      let listItem = {
        orderId: order.id,
        orderSn: order.orderSn,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverPostCode: order.receiverPostCode,
        address: address,
        deliveryCompany: null,
        deliverySn: null,
      };
      return listItem;
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: "/oms/orderDetail", query: { id: row.id } });
    },

    handleApplyViewOrder(index, row) {
      this.$router.push({
        path: "/oms/returnApply",
        query: { orderId: row.id },
      });
    },
    handleCloseOrder(index, row) {
      console.log("handleCloseOrder");
      this.closeOrder.dialogVisible = true;
      this.closeOrder.orderIds = [row.id];
    },
    handleDeliveryOrder(index, row) {
      let listItem = this.covertOrder(row);
      this.$router.push({
        path: "/oms/deliverOrderList",
        query: { list: [listItem] },
      });
    },
    handleViewLogistics(index, row) {
      this.logisticsDialogVisible = true;
    },
    getList() {
      this.listQuery.pageSize = 5;
      this.listQuery.status = 2;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
      });
    },
    handleDateChange() {
      //       this.getData();
    },
    initOrderCountDate() {
      this.getData();

      goodsStatic().then((res) => {
        if (res.code == 200) {
          this.goods = res.data;
        }
      });
      userStatic().then((res) => {
        if (res.code == 200) {
          this.user = res.data;
        }
      });

      let start = new Date();

      const end = new Date();
      start.setTime(start.getTime() - 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [start, end];
    },
    getData() {
      orderStatic().then((res) => {
        if (res.code == 200) {
          this.orderData = res.data;
          this.orderStatusCount = res.data.orderStatusCount;
          this.rows = res.data.orderStsticList;
          this.chartData = {
            columns: ["time", "totalCount", "totalPayAmount"],
            rows: [],
          };
          for (let i = 0; i < this.rows.length; i++) {
            let item = this.rows[i];
            let currDate = str2Date(item.time);
            let start = this.orderCountDate[0];
            let end = this.orderCountDate[1];

            if (
              currDate.getTime() >= start.getTime() &&
              currDate.getTime() <= end.getTime()
            ) {
              this.chartData.rows.push(item);
            }
          }
          this.dataEmpty = false;
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
    .total-frame {
        border: 1px solid #DCDFE6;
        padding: 20px;
        height: 100px;
    }

    .total-icon {
        //background:#913656;
        color: #409EFF;
        width: 60px !important;
        height: 60px !important;
    }

    .total-title {
        position: relative;
        font-size: 16px;
        color: #909399;
        left: 70px;
        top: -35px;
    }

    .total-value {
        position: relative;
        font-size: 18px;
        color: #606266;
        left: 70px;
        top: -25px;
    }
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
