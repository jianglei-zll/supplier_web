<template>
   
  <div class="app-container">
    <div>
      <div class="topBtns">
        <p @click="handleSearchList()">
          <img src="../../../assets/imgs/sousuo.png" />
          <span>查询</span>
        </p>
        <p class="reset">
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
          <el-form-item label="活动名称">
            <el-input
              style="width: 250px"
              placeholder="请输入活动名称"
              v-model="listQuery.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动编号">
            <el-input
              style="width: 250px"
              placeholder="请输入活动编号"
              v-model="listQuery.platformCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="time"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tbtns">
      <p @click="handleAdd">添加</p>
    </div>
    <div class="table-container">
      <el-table
        ref="SmsBasicGiftsTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column label="活动编号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.platformCode }}</template>
        </el-table-column>
        <el-table-column label="活动名称" width="250" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="活动时间" width="250" align="center">
          <template slot-scope="scope">
            <p>开始时间：{{ scope.row.startTime | formatTime }}</p>
            <p>到期时间：{{ scope.row.endTime | formatTime }}</p>
          </template>
        </el-table-column>
        <el-table-column label="活动状态" width="120" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 0">未开始</p>
            <p v-if="scope.row.status == 1">进行中</p>
            <p v-if="scope.row.status == 2">已结束</p>
            <p v-if="scope.row.status == 3">已作废</p>
          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">{{ scope.row.operatorName }}</template>
        </el-table-column>
        <el-table-column label="最近操作时间" align="center">
          <template slot-scope="scope">{{
            scope.row.operateTime | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{
            scope.row.createTime | formatTime
          }}</template>
        </el-table-column>
        <!-- <el-table-column label="详情" align="center">
          <template slot-scope="scope">
            <p>主体商品：{{ scope.row.mainProductName }}</p>
            <p>赠品：{{ scope.row.subsidiaryProductName }}</p>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="170">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleUpdate(scope.$index, scope.row)">
                <img src="../../../assets/imgs/bianji.png" />
                <span>编辑</span>
              </p>
              <p @click="handleVoid(scope.$index, scope.row)" v-if="scope.row.status!=3">
                <img src="../../../assets/imgs/zuofei.png" />
                <span>作废</span>
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div> -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10, 15, 50]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  fetchList,
  deleteSmsBasicGifts,
   blankOutActivity
} from "@/api/sms/smsBasicGifts";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
  platformCode: null,
  startTimeStamp: null,
  endTimeStamp: null,
};
const defaultTypeOptions = [
  {
    label: "PC首页轮播",
    value: 0,
  },
  {
    label: "APP首页轮播",
    value: 1,
  },
];
export default {
  name: "SmsBasicGiftsList",
  data() {
    return {
      time: "",
      listQuery: Object.assign({}, defaultListQuery),
      typeOptions: Object.assign({}, defaultTypeOptions),
      list: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      operates: [
        {
          label: "删除",
          value: 0,
        },
      ],
      operateType: null,
    };
  },
  created() {
    this.getList();
  },
  // computed: {
  //   getTime: function () {
  //     return this.listQuery.time;
  //   },
  // },
  watch: {
    time() {

      this.listQuery.startTimeStamp =this.formatTime(this.time[0]) ;
      this.listQuery.endTimeStamp =this.formatTime(this.time[1]);
      console.log(this.listQuery);
    },
  },
  filters: {
    filterRule(value) {
      console.log(value);

      let result = "";
      let attr = JSON.parse(value);
      console.log(attr);
      if (attr) {
        for (let i = 0; i < attr.length; i++) {
          if (attr[i].fullPrice > 0) {
            result += "满";
            result += attr[i].fullPrice;
            result += "元:减";
            result += attr[i].reducePrice;
            result += ";";
          }
        }
      }

      return result;
    },
    formatType(type) {
      if (type === 1) {
        return "APP首页轮播";
      } else {
        return "PC首页轮播";
      }
    },
    formatActiviType(useType) {
      if (useType === 1) {
        return "首购礼";
      } else if (useType === 2) {
        return "满购礼";
      } else {
        return "单品礼购";
      }
    },
    formatCouponType(useType) {
      if (useType === 1) {
        return "第一单获取";
      } else if (useType === 2) {
        return "所有订单获取";
      } else {
        return "消费金额";
      }
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "无";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    formatTime(time) {
      if (time == null || time === "") {
        return "无";
      }
      let date = new Date(time).getTime();
      return date
    },
    timeChange(e) {
      console.log(e);
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
    handleVoid(index, row) {
      this.$confirm("是否要作废?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("activityId", row.id);
          blankOutActivity(params).then((response) => {
            this.getList();
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消操作!",
          });
          this.getList();
        });
    },
    handleBatchOperate() {
      if (this.multipleSelection < 1) {
        this.$message({
          message: "请选择一条记录",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      if (this.operateType === 0) {
        //删除
        this.deleteHomeAdvertise(ids);
      } else {
        this.$message({
          message: "请选择批量操作类型",
          type: "warning",
          duration: 1000,
        });
      }
    },
    handleAdd() {
      this.$router.push({ path: "/sms/addSmsBasicGifts" });
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/sms/updateSmsBasicGifts",
        query: { id: row.id },
      });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        console.log(response);
        this.list = response.data.records;
        this.total = response.data.total;
      });
    },
    deleteHomeAdvertise(ids) {
      this.$confirm("是否要删除该广告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteHomeAdvertise(params).then((response) => {
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
    cursor: pointer;
  }
}
</style>


