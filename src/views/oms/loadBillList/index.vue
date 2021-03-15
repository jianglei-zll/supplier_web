<template>
  <div
    class="app-container"
    style="position: relative; height: calc(100vh - 117px)"
  >
    <div class="container">
      <!--<el-tabs v-model="status" type="card" @tab-click="handleOrder">
                <el-tab-pane name="0">
                    <span slot="label"><i class="el-icon-s-order"></i> 全部订单</span>
                </el-tab-pane>
                <el-tab-pane name="12">
                    <span slot="label"><i class="el-icon-bank-card"></i> 待付款</span>
                </el-tab-pane>
                <el-tab-pane name="2">
                    <span slot="label"><i class="el-icon-refrigerator"></i> 待发货</span>
                </el-tab-pane>
                <el-tab-pane name="3">
                    <span slot="label"><i class="el-icon-truck"></i> 待收货</span>
                </el-tab-pane>
                <el-tab-pane name="5">
          <span slot="label">
              <i class="el-icon-circle-check"></i> 交易完成</span>
                </el-tab-pane>
                <el-tab-pane name="15">
                    <span slot="label"><i class="el-icon-circle-close"></i> 已关闭</span>
                </el-tab-pane>
            </el-tabs>-->
      <!--工具栏-->
      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            type="primary"
            @click="handleSearchList()"
            size="small"
          >
            查询搜索
          </el-button>
          <el-button
            style="float: right; margin-right: 15px"
            @click="handleResetSearch()"
            size="small"
          >
            重置
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form
            :inline="true"
            :model="listQuery"
            size="small"
            label-width="140px"
          >
            <el-form-item label="输入搜索：">
              <el-input
                v-model="listQuery.entity"
                class="input-width"
                placeholder="编号"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <!-- 导出-->
      <div>
        <el-upload
          :action="action"
          :show-file-list="false"
          :on-success="onSuccess"
          style="margin-top: 20px"
        >
          <el-button type="primary" icon="el-icon-download">订单导入</el-button>
        </el-upload>
      </div>
      <!--订单数据统计-->
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>物流列表</span>
      </el-card>
      <div class="table-container">
        <el-table
          ref="orderTable"
          :data="list"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-loading="listLoading"
          border
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column label="编号" width="80" align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="订单编号" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.orderId }}</template>
          </el-table-column>
          <el-table-column label="来源" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.fromOrder }}</template>
          </el-table-column>
          <el-table-column label="商品" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.productName }}</template>
          </el-table-column>
          <el-table-column label="下单时间" width="180" align="center">
            <template slot-scope="scope">{{
              scope.row.orderCreateTime | formatCreateTime
            }}</template>
          </el-table-column>
          <el-table-column label="买家支付宝账号" align="center">
            <template slot-scope="scope">{{ scope.row.aliId }}</template>
          </el-table-column>
          <el-table-column label="订单金额" width="120" align="center">
            <template slot-scope="scope"
              >￥{{ scope.row.totalAmount }}</template
            >
          </el-table-column>
          <el-table-column label="支付金额" width="120" align="center">
            <template slot-scope="scope">￥{{ scope.row.realAmount }}</template>
          </el-table-column>
          <el-table-column label="支付方式" width="120" align="center">
            <template slot-scope="scope">{{
              scope.row.payDetails.split("，")[0]
            }}</template>
          </el-table-column>
          <!-- <el-table-column label="订单类型" width="120" align="center">
            <template slot-scope="scope">{{
              scope.row.orderType | formatOrderType
            }}</template>
          </el-table-column> -->
          <!-- <el-table-column label="订单状态" width="120" align="center">
            <template slot-scope="scope">{{
              scope.row.status | formatStatus
            }}</template>
          </el-table-column> -->
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
          :page-sizes="[10, 15, 50]"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import { formatTime } from "@/utils/index";
import {
  fetchList,
  closeOrder,
  deleteOrderById,
  orderData,
  updateOrderNote,
  foreignOrder,
} from "@/api/order";
import { formatDate } from "@/utils/date";
import LogisticsDialog from "@/views/oms/order/components/logisticsDialog";
import { getToken, get } from "@/utils/auth";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  orderSn: null,
  receiverKeyword: null,
  status: null,
  orderType: null,
  sourceType: null,
  createTime: null,
  entity: null,
};

export default {
  name: "logisticsList",
  components: { LogisticsDialog },
  data() {
    return {
       action:process.env.BASE_API+'/oms/OmsOrder/insertForeignOrder',
      fileList: [],
      delLoading: false,
      status: "-9",
      orderType: "0",
      createTime: "",
      checkList: [],
      printChecked: false,
      batchHandle: "",
      batchExport: "",
      listContent: [],
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      isAdmin: false,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: [],
      },
      payOrder: {
        dialogVisible: false,
        content: null,
        orderIds: [],
      },

      statusOptions: [
        {
          label: "待付款",
          value: 12,
        },
        {
          label: "待发货",
          value: 2,
        },
        {
          label: "已发货",
          value: 3,
        },
        {
          label: "已完成",
          value: 5,
        },
        {
          label: "申请退款",
          value: 13,
        },
        {
          label: "已退款",
          value: 14,
        },
        {
          label: "已关闭",
          value: 15,
        },
      ],
      orderTypeOptions: [
        {
          label: "正常订单",
          value: 1,
        },
        {
          label: "秒杀订单",
          value: 6,
        },
        {
          value: 7,
          label: "门店自取订单",
        },
        {
          label: " 拼团订单",
          value: 2,
        },
        {
          label: "团购订单",
          value: 3,
        },
        {
          label: "砍价订单",
          value: 4,
        },
        {
          label: "积分订单",
          value: 5,
        },
      ],
      sourceTypeOptions: [
        {
          label: "小程序订单",
          value: 1,
        },
        {
          label: "APP订单",
          value: 4,
        },
        {
          label: "h5订单",
          value: 2,
        },
        {
          label: "pc订单",
          value: 3,
        },
      ],
      operateOptions: [
        {
          label: "批量发货",
          value: 1,
        },
        {
          label: "关闭订单",
          value: 2,
        },
        {
          label: "删除订单",
          value: 3,
        },
      ],
      logisticsDialogVisible: false,

      handleOptions: [
        { value: "", label: "批量操作" },
        { value: "0", label: "批量打印" },
      ],
      exportOptions: [
        { value: "", label: "批量导出" },
        { value: "0", label: "导出全部" },
        { value: "1", label: "导出选中" },
      ],
      caculateInfo: {
        orderCount: 0,
        orderPay: 0,
        memberCount: 0,
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.getList();
      this.orderDatas(0);
      this.isAdmin = get("storeId") == 0;
    });
  },
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
      } else if (value === 4) {
        return "线下支付";
      } else {
        return "无";
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
      } else if (value === 10) {
        return "提货订单";
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
    formatTime,
    checkPermission,
    onSuccess(response) {
      console.log(response)
      if (response.code == 200) {
        this.$message.success(response.msg);
        this.getList();
      } else {
        this.$message.error(response.msg);
      }
    },
    handleOrder(tab, event) {
      this.listQuery.status = tab.name;
      if (this.listQuery.status == 0) {
        this.listQuery.status = "";
      }
      this.getList();
      this.orderDatas(tab.name);
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    getList() {
      this.listLoading = true;
      foreignOrder(this.listQuery).then((response) => {
        this.listLoading = false;
        console.log(response.data.records);
        this.list = response.data.records;
        this.total = response.data.total;
      });
    },
    orderDatas(status) {
      orderData({ status: status }).then((response) => {
        this.caculateInfo = response.data;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  height: calc(100% - 80px);
  position: absolute;
  overflow: auto;
  width: calc(100% - 20px);
  .order-caculate {
    font-size: 14px;
    color: #909399;
    border-top: 1px solid #f0f0f0;
    padding: 20px 10px;
    .caculate-title {
      display: inline-block;
      margin-right: 50px;
    }
    .caculate-num {
      font-size: 20px;
      color: #ff4949;
    }
  }

  .el-table th {
    background-color: #fafafa;
  }
}

.footer-contains {
  position: absolute;
  display: -ms-flexbox;
  display: flex;
  background-color: #f6f6f6;
  bottom: 0;
  flex-align: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 999;
  padding: 0 20px 0 13px;
}

/*打印单样式编辑*/
.order-list {
  /*  height: 297mm;*/
  margin: 0 auto;
  width: 210mm;

  .order-title {
    height: 16mm;
    line-height: 16mm;
    font-size: 8mm;
    font-weight: bolder;
    text-align: center;
  }
  .order-info {
    span {
      display: inline-block;
      padding: 0 0 10px 0;
      font-size: 3mm;
    }
    span.info {
      width: 60mm;
    }
  }
  .el-table--small th,
  .el-table--small td {
    padding: 4px 0;
  }
}
</style>
