<template>
   
  <div class="app-container">
    <div>
      <div class="topBtns">
        <p @click="searchMemberList()">
          <img src="../../assets/imgs/sousuo.png"/>
          <span>查询</span>
        </p>
        <p class="reset" @click="handleResetSearch()">
          <img src="../../assets/imgs/zhongzhi.png"/>
          <span>重置</span>
        </p>
      </div>
      <div class="filterDiv">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px" >
          <el-form-item label="会员号">
            <el-input style="width: 250px" v-model="listQuery.userCode" placeholder="请输入会员号"></el-input>
          </el-form-item>
          <el-form-item label="酒证ID">
            <el-input style="width: 250px" v-model="listQuery.liquorId" placeholder="请输入酒证ID"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-container">
      <el-table ref="brandTable" :data="list"  style="width: 100%" v-loading="listLoading" border>
        <el-table-column label="会员号" width="250" align="center">
          <template slot-scope="scope">{{ scope.row.userCode?scope.row.userCode:"无" }}</template>
        </el-table-column>
        <el-table-column label="酒证ID" width="250" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="购入价格" width="250" align="center">
          <template slot-scope="scope">
            {{ scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column label="当前价格" width="250" align="center">
          <template slot-scope="scope">{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="状态" width="250" align="center">
          <template slot-scope="scope">{{ scope.row.status | formatState }}</template>
        </el-table-column>
        <el-table-column label="获取时间"  align="center">
          <template slot-scope="scope">{{
            scope.row.createdTime | formatTime
          }}</template>
        </el-table-column>
      
      </el-table>
    </div>
    <div class="batch-operate-container"></div>
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
import { formatDate } from "@/utils/date";
import {
  fetchList,
} from "@/api/ums/assets";
export default {
  name: "assetsList",
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      blanceList: null,
      integrationList: null,
      orderList: null,
      blance: {
        dialogVisible: false,
        id: null,
      },
      integration: {
        dialogVisible: false,
        id: null,
      },
      operateType: null,
      brandOptions: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        userCode:"",
        liquorId:""
      },
      list: null,
      total: null,
      listLoading: true,
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
     formatState(state) {
      if (state==1) {
        return "已售出, 用户持有状态";
      }else if (state==2) {
        return "已售出, 用户转让状态";
      }else if (state==3) {
        return "已售出, 提货状态";
      }else if (state==4) {
        return "已核销";
      }else if (state==5) {
        return "异常";
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 10,
        userCode:"",
        liquorId:""
      };
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
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
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

