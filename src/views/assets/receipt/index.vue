<template>
  <div class="app-container">
    <div>
      <div class="topBtns">
        <p @click="searchList()">
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
          size="small"
          label-width="140px"
        >
          <el-form-item label="订单号">
            <el-input
              style="width: 250px"
              v-model="platformOrderId"
              placeholder="请输入订单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="发票类型">
            <el-select v-model="invoiceType" placeholder="请选择">
              <el-option
                v-for="item in typeLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="payType" placeholder="请选择">
              <el-option
                v-for="item in payTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员号">
            <el-input
              style="width: 250px"
              v-model="memberId"
              placeholder="请输入会员号"
            ></el-input>
          </el-form-item>
          <el-form-item label="抬头类型">
            <el-select v-model="titleType" placeholder="请选择">
              <el-option
                v-for="item in ttTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="timeDates"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="background: #fff; margin-top: 20px; height: 40px">
      <el-tabs v-model="tabPosition" type="card" @tab-click="tabChange">
        <el-tab-pane name="-1">
          <span slot="label">全部</span>
        </el-tab-pane>
        <el-tab-pane name="0">
          <span slot="label">待开票</span>
        </el-tab-pane>
        <el-tab-pane name="1">
          <span slot="label">开票中</span>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">开票成功</span>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label">开票失败</span>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label">取消开票</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tbtns">
      <p @click="exportData">导出</p>
    </div>
    <div style="margin-top: 15px">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        @selection-change="selectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="platformOrderId"
          label="平台订单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="businessOrderId"
          label="商家订单号"
          align="center"
        ></el-table-column>
        <el-table-column label="发票类型" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.invoiceType == 0">增值税电子普通发票</p>
            <p v-if="scope.row.invoiceType == 1">增值税纸质普通发票</p>
            <p v-if="scope.row.invoiceType == 2">增值税纸质专用发票</p>
          </template>
        </el-table-column>
        <el-table-column label="抬头类型" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.titleType == 0">个人或事业单位</p>
            <p v-if="scope.row.titleType == 1">企业</p>
          </template>
        </el-table-column>
        <el-table-column label="发票内容" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.invoiceContent == 0">明细</p>
            <p v-if="scope.row.invoiceContent == 1">大类</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="invoiceAmount"
          label="发票金额"
          align="center"
        ></el-table-column>
        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.payType == 0">线上支付</p>
            <p v-if="scope.row.payType == 1">企业转账</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.invoiceStatus == 0">待开票</p>
            <p v-if="scope.row.invoiceStatus == 1">开票中</p>
            <p v-if="scope.row.invoiceStatus == 2">已开票</p>
            <p v-if="scope.row.invoiceStatus == 3">开票失败</p>
            <p v-if="scope.row.invoiceStatus == 4">取消开票</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberId"
          label="会员号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="applyTime"
          label="提交时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="230">
          <template slot-scope="scope">
              <div class="tabBtns">
                <p @click="check(scope.row)">
                    <img src="../../../assets/imgs/chakan.png"/>
                    <span>查看</span>
                </p>
                <p @click="upload(scope.row)">
                    <img src="../../../assets/imgs/shangchuan.png"/>
                    <span>上传发票</span>
                </p>
                <p @click="redClick(scope.row)">
                    <img src="../../../assets/imgs/chonghong.png"/>
                    <span>冲红</span>
                </p>
                <p @click="cancelp(scope.row)">
                    <img src="../../../assets/imgs/qx.png"/>
                    <span>取消开票</span>
                </p>
            </div>
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
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 15, 50]"
        :total="total"
      >
      </el-pagination>
    </div>
    <uploadPage v-if="uploadShow" @func="closeUpload" :communicatdata="upData"></uploadPage>
  </div>
</template>
<script>
import uploadPage from "./uploadPage";
import {assetsService} from "@/api/assets";
import {commonFun}from "@/utils/commonFun";
export default {
  name: "receipt",
  data() {
    return {
        components:{
            uploadPage
        },
      typeLists: [
        { value: -1, label: "全部" },
        { value: 0, label: "增值税电子普通发票" },
        { value: 1, label: "增值税纸质普通发票" },
        { value: 2, label: "增值税纸质专用发票" },
      ],
      payTypeList: [
        { value: -1, label: "全部" },
        { value: 1, label: "线上支付" },
        { value: 2, label: "企业转账" },
      ],
      ttTypeList: [
        { value: -1, label: "全部" },
        { value: 0, label: "个人或事业单位" },
        { value: 1, label: "企业" },
      ],
      tabPosition: -1,
      tabsList: [
        { name: "全部", num: "", val: -1 },
        { name: "待开票", num: "", val: 0 },
        { name: "开票中", num: "", val: 1 },
        { name: "开票成功", num: "", val: 2 },
        { name: "开票失败", num: "", val: 3 },
        { name: "取消开票", num: "", val: 4 },
      ],
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      uploadShow: false, //录入界面显示
      platformOrderId: "", //平台订单号
      invoiceType: -1, //发票类型
      titleType: -1, //发票抬头类型
      payType: -1, //支付方式
      memberId: "", //会员号
      timeDates: "", //申请时间
      upData: {}, //上传发票时数据
      idList: [], //导出数据
    };
  },
  mounted() {
    this.find();
    this.findStatusNum();
  },
  methods: {
    // 每页数改变
    handleSizeChange(data) {
      this.pageSize = data;
      this.find();
    },
    // 当前页改变
    handleCurrentChange: (data) => {
      this.currentPage = data;
      this.find();
    },
    //
    tabChange(vl) {
      console.log(vl);
      this.find();
    },
    // 重置
    reset() {
      this.invoiceType = -1;
      this.titleType = -1;
      this.payType = -1;
      this.currentPage = 1;
      this.timeDates = [];
      this.find();
    },
    // 查询tab状态数量
    findStatusNum() {
      let dt = {};
      if (this.platformOrderId) {
        dt.platformOrderId = this.platformOrderId;
      }
      if (this.businessOrderId) {
        dt.businessOrderId = this.businessOrderId;
      }
      if (this.memberId) {
        dt.memberId = this.memberId;
      }
      if (this.timeDates && this.timeDates.length > 0) {
        dt.applyTimeStart = commonFun.getTime(this.timeDates[0]);
        dt.applyTimeEnd = commonFun.getTime(this.timeDates[1]);
      }
      if (this.invoiceType != -1) {
        dt.invoiceType = this.invoiceType;
      }
      if (this.titleType != -1) {
        dt.titleType = this.titleType;
      }
      if (this.payType != -1) {
        dt.payType = this.payType;
      }
      assetsService.getReceiptStatusNum(dt).then((res) => {
        this.tabsList[1].num = res.data.openNot;
        this.tabsList[2].num = res.data.openIng;
        this.tabsList[3].num = res.data.openAlready;
        this.tabsList[4].num = res.data.openFail;
        this.tabsList[5].num = res.data.openCancel;
      });
    },
    // 获取列表
    find() {
      this.loading = true;
      let dt = {
        platformOrderId: this.platformOrderId,
        businessOrderId: this.businessOrderId,
        memberId: this.memberId,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      if (this.timeDates && this.timeDates.length > 0) {
        dt.applyTimeStart = commonFun.getTime(this.timeDates[0]);
        dt.applyTimeEnd = commonFun.getTime(this.timeDates[1]);
      }
      if (this.invoiceType != -1) {
        dt.invoiceType = this.invoiceType;
      }
      if (this.titleType != -1) {
        dt.titleType = this.titleType;
      }
      if (this.payType != -1) {
        dt.payType = this.payType;
      }
      if (this.tabPosition != -1) {
        dt.invoiceStatus = this.tabPosition;
      }
      assetsService.getReceiptList(dt).then((res) => {
        this.loading = false;
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    exportData() {
      console.log("走");
      assetsService
        .exportReceipt({ idList: this.idList.join(",") })
        .then((res) => {
          let blob = new Blob([res.data], { type: "application/x-xls" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          //配置下载的文件名
          link.download = "下载.xls";
          link.click();
        });
      console.log("cccccccc");
      // axios.get('/invoice/invoiceExport', {
      //     params: {
      //     "scheduleType": scheduleType
      //     },
      //     responseType: 'arraybuffer'
      //     }).then((response) => {
      //     //创建一个blob对象,file的一种
      //     let blob = new Blob([response.data], { type: 'application/x-xls' })
      //     let link = document.createElement('a')
      //     link.href = window.URL.createObjectURL(blob)
      //     //配置下载的文件名
      //     link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
      //     link.click()
      // })
    },
    // 选取
    selectionChange(data) {
      console.log(data);
      for (let x = 0; x < data.length; x++) {
        this.idList.push(data[x].invoiceId);
      }
    },
    //取消开票
    cancelp(dt) {
      this.$confirm("确定对当前选择数据进行关闭操作?", "取消开票", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          assetsService.getCancel({ id: dt.invoiceId }).then((res) => {
            if (res.msg == "操作成功") {
              this.$message.success("操作成功！");
              this.find();
            } else {
              this.$message.error("操作失败！");
            }
          });
        })
        .catch(() => {});
    },
    // 上传发票
    upload(dt) {
      this.uploadShow = true;
      this.upData = dt;
    },
    //关闭上传
    closeUpload(dt) {
      this.uploadShow = false;
      if (dt == "ok") {
        this.find();
        this.findStatusNum();
      }
    },
    // 冲红
    redClick(dt) {
      this.$confirm("确定对当前选择数据进行冲红操作?", "冲红", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          assetsService.getToRed({ id: dt.invoiceId }).then((res) => {
            console.log(res);
            if (res.msg == "操作成功") {
              this.$message.success("操作成功！");
              this.find();
            } else {
              this.$message.error("操作失败！");
            }
          });
        })
        .catch(() => {});
    },
    // 查看
    check(dt) {
      this.$router.push({
        name: "receiptDetail",
        params: { id: dt.invoiceId },
      });
    },
  },
};
</script>