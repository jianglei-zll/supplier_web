<template>
  <div class="app-container">
    <div>
      <div class="topBtns">
        <p @click="handleSearchList()">
          <img src="../../../assets/imgs/sousuo.png" />
          <span>查询</span>
        </p>
        <p class="reset" @click="handleResetSearch()">
          <img src="../../../assets/imgs/zhongzhi.png" />
          <span>重置</span>
        </p>
      </div>
      <div class="filterDiv">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="平台订单号" >
            <el-input
              style="width: 250px"
              placeholder="请输入平台订单号"
              v-model="listQuery.platformCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付单号">
            <el-input
              style="width: 250px"
              placeholder="请输入支付单号"
              v-model="listQuery.payCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单来源">
            <el-select v-model="listQuery.source" placeholder="请选择">
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单预警">
            <el-select v-model="listQuery.nodConsignmentHour" placeholder="请选择">
              <el-option
                v-for="(item,index) in options2"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型">
            <el-select v-model="listQuery.orderType" placeholder="请选择">
              <el-option
                v-for="(item,index) in options3"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商家订单号">
            <el-input
              style="width: 250px"
              placeholder="请输入商家订单号"
              v-model="listQuery.merchantPlatformCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              style="width: 250px"
              placeholder="请输入商品名称"
              v-model="listQuery.productName"
            ></el-input>
          </el-form-item>
          <el-form-item label="商家ID">
            <el-input
              style="width: 250px"
              placeholder="请输入商家ID"
              v-model="listQuery.storeId"
            ></el-input>
          </el-form-item>
          <el-form-item label="外部订单号">
            <el-input
              style="width: 250px"
              placeholder="请输入外部订单号"
              v-model="listQuery.foreignOrderSn"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户会员号">
            <el-input
              style="width: 250px"
              placeholder="请输入用户会员号"
              v-model="listQuery.userCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="物流单号">
            <el-input
              style="width: 250px"
              placeholder="请输入物流单号"
              v-model="listQuery.expressNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="time"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="汇付识别码">
            <el-input
              style="width: 250px"
              placeholder="请输入识别码"
              v-model="listQuery.identificationNum"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tbtns">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        :file-list="fileList"
        multiple
        :show-file-list="false"
        :on-success="SYhandleAvatarSuccess"
        style="margin-right: 20px"
      >
        <p>物流导入</p>
      </el-upload>
      <p @click="out">提货单导出</p>
      <p @click="signClick">标记</p>
    </div>
    <div style="background: #fff; margin-top: 20px; height: 40px">
      <el-tabs v-model="status" type="card" @tab-click="handleOrder">
        <el-tab-pane name="0">
          <span slot="label">全部</span>
        </el-tab-pane>
        <el-tab-pane name="12">
          <span slot="label">待付款</span>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">待发货</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">部分发货</span>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label">已发货</span>
        </el-tab-pane>
        <el-tab-pane name="5">
          <span slot="label">交易完成</span>
        </el-tab-pane>
        <el-tab-pane name="15">
          <span slot="label">交易关闭</span>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="table-container">
      <el-table
        ref="orderTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column type="selection" width="60" align="center" ></el-table-column>
        <el-table-column label="商品信息" width="300">
          <template slot-scope="scope">
            <div class="flex">
              <img :src="scope.row.pic" class="goodImg"/>
              <div style="flex:1">
                <p class="fnt1">{{ scope.row.goodsName }}</p>
                <p class="fnt2">锚定商品：会稽山10年份黄酒</p>
                <p class="fnt2">规格：礼盒2瓶装</p>
                <div class="flex goodBtns">
                  <p v-if="scope.row.war1">{{scope.row.war1}}</p>
                  <p v-if="scope.row.war2">{{scope.row.war2}}</p>
                  <p v-if="scope.row.war3">{{scope.row.war3}}</p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="平台订单编号" align="center" width="180" >
          <template slot-scope="scope">{{ scope.row.orderSn }}</template>
        </el-table-column>
        <el-table-column label="支付单号" align="center"></el-table-column>
        <el-table-column label="单价" align="center"></el-table-column>
        <el-table-column label="数量" align="center"></el-table-column>
        <el-table-column label="订单金额" width="180" >
          <template slot-scope="scope">
            <div>应付金额:￥{{ scope.row.totalAmount }}</div>
            <div>实付金额:￥{{ scope.row.payAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column label="收货信息" width="180" >
          <template slot-scope="scope">
            <div>用户账号:{{ scope.row.memberUsername }}</div>
            <div>收货人:{{ scope.row.receiverName }}</div>
            <div>用户留言:{{ scope.row.note ? scope.row.note : "空" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="商家信息">
          <template slot-scope="scope">{{ scope.row.storeName }}</template>
        </el-table-column>
        <el-table-column label="订单信息" width="180">
          <template slot-scope="scope"  >
              <!-- <p>开具发票：是</p> -->
              <p>订单来源：{{
            scope.row.sourceType | formatSourceType
          }}</p>
              <p>订单类型：{{
              scope.row.orderType | formatOrderType
            }}</p>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="180" >
          <template slot-scope="scope">
            {{scope.row.createTime | formatCreateTime}}
          </template>
        </el-table-column>
        <el-table-column label="标记" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.mark">
              <div>{{ scope.row.mark }}</div>
              <div>{{ scope.row.markTime | formatCreateTime }}</div>
              <div>{{ scope.row.markPerson }}</div>
            </div>
            <div v-else>空</div>
          </template>
        </el-table-column>
        
        
        <!-- <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.payType | formatPayType
          }}</template>
        </el-table-column> -->
        <!-- <el-table-column label="订单类型" width="120" align="center">
            <template slot-scope="scope">{{
              scope.row.orderType | formatOrderType
            }}</template>
          </el-table-column> 
        <el-table-column label="订单来源" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.sourceType | formatSourceType
          }}</template>
        </el-table-column>-->
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.status | formatStatus
          }}</template>
        </el-table-column>
        
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleCloseOrder(scope.$index, scope.row)"  v-show="scope.row.status === 12">
                <img src="../../../assets/imgs/qx.png"/>
                <span>关闭订单</span>
              </p>
              <p @click="handleViewOrder(scope.$index, scope.row)">
                <img src="../../../assets/imgs/xq.png"/>
                <span>订单详情</span>
              </p>
              <p @click="handleExamineOrderConfirm(scope.$index, scope.row)"  v-show="scope.row.payType == 4 && scope.row.status == 12">
                <img src="../../../assets/imgs/sh.png"/>
                <span>审核</span>
              </p>
              
            </div>
           <!-- <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
              >查看订单</el-button
            >
             <el-button
                v-if="
                  scope.row.status == 13 ||
                  scope.row.status == 14 ||
                  scope.row.status == 19
                "
                size="mini"
                @click="handleApplyViewOrder(scope.$index, scope.row)"
                >售后列表</el-button
              >

              <el-button
                v-if="scope.row.status == 12 && isAdmin"
                size="mini"
                @click="handlePayOrder(scope.$index, scope.row)"
                >付款</el-button
              > 
            <el-button
              style="margin: 0; margin-top: 10px"
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 12"
              >关闭订单</el-button
            >
            <el-button
              size="mini"
              @click="handleExamineOrderConfirm(scope.row.id)"
              style="margin: 0; margin-top: 10px"
              v-show="scope.row.payType == 4 && scope.row.status == 12"
              >审核订单</el-button
            >
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 2"
              >订单发货</el-button
            >-->
            <!-- <el-button
                size="mini"
                @click="handleViewLogistics(scope.$index, scope.row)"
                v-show="
                  scope.row.status > 0 &&
                  scope.row.status < 9 &&
                  scope.row.payType != 4
                "
                >订单跟踪</el-button
              > 
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 15"
              >删除订单</el-button
            >-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
        <el-select
          v-model="batchExport"
          @change="handleExportOption"
          clearable
          placeholder="导出操作"
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in exportOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div> -->
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
    <el-dialog title="关闭订单" :visible.sync="closeOrder.dialogVisible">
      <div style="display: flex">
        <div><span class="cao" style="color: red">* </span>操作备注：</div>

        <el-input
          style="width: 80%"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="closeOrder.content"
        >
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="标记内容" :visible.sync="sign.dialogVisible">
      <div style="display: flex">
        <div><span class="cao" style="color: red">* </span>操作备注：</div>
        <el-input
          style="width: 80%"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="sign.content"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sign.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSignConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="付款" :visible.sync="payOrder.dialogVisible">
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="payOrder.content"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePayOrderConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import { formatTime } from "@/utils/index";
import {
  getSign,
  fetchList,
  closeOrder,
  deleteOrderById,
  orderData,
  updateOrderNote,
  outputOrder,
  getTokenWithAuthor,
  examineOrder,
} from "@/api/order";
import { formatDate } from "@/utils/date";
import LogisticsDialog from "@/views/oms/order/components/logisticsDialog";
import { getToken, get } from "@/utils/auth";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
   orderSource: 0,
  platformCode: null,
  payCode: null,
  orderStatus: null,
  nodConsignmentHour: null,
  orderType: null,
  productName: null,
  storeId: null,
  storeName: null,
  foreignOrderSn: null,
  userCode: null,
  expressNum: null,
  startTimeStamp:null,
  endTimeStamp:null,
  identificationNum:null,
  source:null,
  status:null
};

export default {
  name: "orderList",
  components: { LogisticsDialog },
  data() {
    return {
      time:"",
      options1: [
        { label: "全部", value: "" },
        { label: "微信公众号", value: 1 },
        { label: "支付宝小程序", value: 2 },
        { label: "淘宝", value: 3 },
      ],
      options2: [
        { label: "全部", value: "" },
        { label: "付款后超48小时未发货", value: 48 },
        { label: "付款后超72小时未发货", value: 72 },
      ],
      options3: [
        { label: "全部", value: "" },
        { label: "个人订单", value: "0" },
        { label: "企业订单", value: "1" },
      ],
      action: process.env.BASE_API + "/oms/OmsOrder/insertLogisticsInfo",
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
      sign: {
        dialogVisible: false,
        content: null,
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
          label: "微信公众号",
          value: 1,
        },
        {
          label: "支付宝小程序订单",
          value: 2,
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
      // this.orderDatas(0);
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
        return "微信公众号";
      } else if (value === 2) {
        return "支付宝小程序";
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
  watch:{
   time(){
    this.listQuery.startTimeStamp=new Date(this.time[0]).getTime() 
     this.listQuery.endTimeStamp=new Date(this.time[1]).getTime() 
   }
  },
  methods: {
    signClick() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择订单",
          type: "error",
        });
        return;
      }
      this.sign.content = "";
      this.sign.dialogVisible = true;
    },
    handleSignConfirm() {
      if (!this.sign.content) {
        this.$message({
          message: "请输入标记内容",
          type: "error",
        });
        return;
      }
      let List = this.multipleSelection.map((item) => {
        return item.id;
      });
      let params = {
        orderIds: List,
        mark: this.sign.content,
      };
      getSign(params).then((res) => {
        if (res.code == 200) {
          this.sign.dialogVisible = false;
          this.$message({
            message: "标记成功",
            type: "success",
          });
          this.getList();
        }
      });
    },
    // 审核订单
    handleExamineOrderConfirm(id) {
      let params = new URLSearchParams();
      params.append("id", id);
      examineOrder(params).then((response) => {
        this.isExamine = false;
        this.getList();
        this.$message({
          message: "审核成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    out() {
      let token = getToken();
      getTokenWithAuthor(token).then((response) => {
        if (response.code == 200) {
          this.downloadMethod(
            `/oms/OmsOrder/outputOrder?authorization=${response.data}&type=10`
          );
        } else {
          this.$message({
            message: "导出订单出错",
            type: "warning",
            duration: 1000,
          });
        }
      });
      return;
    },
    SYhandleAvatarSuccess(response) {
      if (response.code == 200) {
        this.$message.success(response.msg);
      } else {
        this.$message.error(response.msg);
      }
    },
    formatTime,
    checkPermission,
    handleOrder(tab, event) {
      this.listQuery.status = tab.name;
      if (this.listQuery.status == 0) {
        this.listQuery.status = "";
      }
      this.getList();
      // this.orderDatas(tab.name);
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
      this.closeOrder.dialogVisible = true;
      this.closeOrder.orderIds = [row.id];
    },
    handlePayOrder(index, row) {
      this.payOrder.dialogVisible = true;
      this.payOrder.orderIds = [row.id];
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
    handleDeleteOrder(index, row) {
      console.log("handleDeleteOrder=" + row.id);
      this.$confirm("是否要删除订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteOrderById(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择要操作的订单",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.operateType === 1) {
        //批量发货
        let list = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 1) {
            list.push(this.covertOrder(this.multipleSelection[i]));
          }
        }
        if (list.length === 0) {
          this.$message({
            message: "选中订单中没有可以发货的订单",
            type: "warning",
            duration: 1000,
          });
          return;
        }
        this.$router.push({
          path: "/oms/deliverOrderList",
          query: { list: list },
        });
      } else if (this.operateType === 2) {
        //关闭订单
        this.closeOrder.orderIds = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(this.multipleSelection[i].id);
        }
        this.closeOrder.dialogVisible = true;
      } else if (this.operateType === 3) {
        //删除订单
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder1(ids);
      }
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
    // 付款
    handlePayOrderConfirm() {
      if (this.payOrder.content == null || this.payOrder.content === "") {
        this.$message({
          message: "操作备注不能为空",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let params = new URLSearchParams();
      params.append("id", this.payOrder.orderIds);
      params.append("note", this.payOrder.content);
      params.append("status", 2);
      updateOrderNote(params).then((response) => {
        this.payOrder.orderIds = [];
        this.payOrder.dialogVisible = false;
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },

    //关闭订单
    handleCloseOrderConfirm() {
      if (this.closeOrder.content == null || this.closeOrder.content === "") {
        this.$message({
          message: "操作备注不能为空",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let params = new URLSearchParams();
      params.append("ids", this.closeOrder.orderIds);
      params.append("note", this.closeOrder.content);
      closeOrder(params).then((response) => {
        this.closeOrder.orderIds = [];
        this.closeOrder.dialogVisible = false;
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    getList() {
      this.listLoading = true;
      let data=this.listQuery
      fetchList(data).then((response) => {
        this.listLoading = false;
        // 过滤赠送订单
        this.list = response.data.records.filter((item) => {
          return item.payType != 5;
        });
        console.log(this.list, "list");
        this.total = response.data.total;
      });
    },
    orderDatas(status) {
      orderData({ status: status }).then((response) => {
        this.caculateInfo = response.data;
      });
    },

    deleteOrder1(ids) {
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteOrder1(params).then((response) => {
          this.$message({
            message: "删除成功！",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
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
    beforeInit() {
      this.url = "api/yxStoreOrder";
      const sort = "id,desc";
      this.params = {
        page: this.page,
        size: this.size,
        sort: sort,
        orderStatus: this.status,
        orderType: this.orderType,
        addTime: this.createTime,
        listContent: this.listContent,
      };
      const query = this.query;
      console.log(query, "query");
      const type = query.type;

      return true;
    },

    getCaculateInfo() {},
    clearCaculateInfo() {
      this.caculateInfo = {
        orderCount: 0,
        orderPay: 0,
        memberCount: 0,
      };
    },

    batchSelection(val) {
      let rows = this.data;
      if (val) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handlePrintOption(val) {
      switch (val) {
        case "0":
          this.getPrintList();
          this.batchHandle = "";
          break;
        default:
          break;
      }
    },
    async handleExportOption(val) {
      let params;
      switch (val) {
        case "0":
          let token = getToken();
          getTokenWithAuthor(token).then((response) => {
            if (response.code == 200) {
              this.downloadMethod(
                `/oms/OmsOrder/outputOrder?authorization=${response.data}`
              );
            } else {
              this.$message({
                message: "导出订单出错",
                type: "warning",
                duration: 1000,
              });
            }
          });

          break;
        case "1":
          if (
            this.multipleSelection == null ||
            this.multipleSelection.length < 1
          ) {
            this.$message({
              message: "请选择要操作的订单",
              type: "warning",
              duration: 1000,
            });
          } else {
            let orderIds = [];
            this.multipleSelection.forEach((item) => {
              orderIds.push(item.id);
            });
            orderIds = orderIds.join(",");
            let params = {
              orderIds,
            };
            let token = getToken();
            getTokenWithAuthor(token).then((response) => {
              if (response.code == 200) {
                let url = `/oms/OmsOrder/outputOrder?authorization=${response.data}&orderIds=${orderIds}`;
                this.downloadMethod(url);
              } else {
                this.$message({
                  message: "导出订单出错",
                  type: "warning",
                  duration: 1000,
                });
              }
            });
          }
          break;
        // case "2":
        //   params = {
        //     status: 0,
        //   };
        //   this.downloadMethod("/oms/OmsOrder/outputOrder?status=0");
        //   break;
        // case "3":
        //   params = {
        //     status: 1,
        //   };
        //     this.downloadMethod("/oms/OmsOrder/outputOrder?status=1");
        //   break;
      }
    },
    downloadMethod(url) {
      let openurl = `${process.env.BASE_API}${url}`;
      console.log(openurl);
      this.$message.success("请等待");
      window.location.href = openurl;
    },
    // 下载文件
    downloadFile(obj, name, suffix) {
      const url = window.URL.createObjectURL(new Blob([obj]));
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      const fileName = parseTime(new Date()) + "-" + name + "." + suffix;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getPrintList() {
      let list = this.checkList;
      if (list.length == 0) {
        this.$message({
          message: "请选择订单",
          type: "warning",
        });
      } else {
        const _this = this.$refs.form5;
        _this.dialog = true;
      }
    },
    checkboxT(row, rowIndex) {
      return row.id !== 1;
    },
  },
};
</script>

<style scoped lang="scss">
.tbtns {
  display: flex;
  margin-top: 10px;
  p {
    width: 100px;
    height: 36px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #fc6602;
    font-size: 16px;
    color: #fc6602;
    text-align: center;
    line-height: 36px;
    margin-right: 20px;
  }
}
.goodImg{
  width:70px;
  height:70px;
  margin-right:15px;
  display: block;
}

.fnt1{
  font-size:14px;
  color: #333;
}
.fnt2{
  font-size:12px;
  color: #999;
}
.goodBtns{
  p{
    font-size: 12px;
    color:#CE5200;
    width: 64px;
    height: 20px;
    background: #FFF6F4;
    border-radius: 13px;
    border: 1px solid #FF6D0D;
    text-align: center;
    line-height: 20px;
    margin-right: 5px;
  }
}
.tabBtns{
  display: block;
  p{
    width: 100px;
    margin-top: 5px;
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
.flex{
  display: flex;
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
