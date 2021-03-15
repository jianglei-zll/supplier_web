<template>
   
  <div class="app-container">
    <div>
      <div class="topBtns">
        <p @click="searchMemberList()">
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
          <el-form-item label="SKU编号">
            <el-input
              style="width: 250px"
              v-model="listQuery.skuPlatformCode"
              placeholder="请输入SKU编号"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tbtns">
      <p @click="dialogVisible = true">发行</p>
      <p @click="templateUpload">模板下载</p>
    </div>
    <div class="table-container">
      <el-table
        ref="brandTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column label="发行编号" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="发行数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.count }}
          </template>
        </el-table-column>
        <el-table-column label="实际发行数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.practicalCount }}
          </template>
        </el-table-column>
        <el-table-column label="发行平台SKU" align="center">
          <template slot-scope="scope">{{
            scope.row.skuPlatformCode
          }}</template>
        </el-table-column>
        <el-table-column label="发行人" align="center">
          <template slot-scope="scope">{{ scope.row.publisherName }}</template>
        </el-table-column>
        <el-table-column label="发行时间" align="center">
          <template slot-scope="scope">{{
            scope.row.createTime | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="upload(scope.row.id)">
                <img src="../../../assets/imgs/bianji.png" />
                <span>下载</span>
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
        :page-size="listQuery.pageSize"
        :page-sizes="[10, 15, 50]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="发行" :visible.sync="dialogVisible" width="30%">
      <div style="display: flex;margin-bottom:20px">
        <div>发行：</div>
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="action"
          :file-list="fileList"
          multiple
          :show-file-list="false"
          :limit="1"
          accept=".xlsx,.xls"
          :http-request="httpRequest"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <span>请上传10M以内的excel表格</span>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="handleCloseOrderConfirm"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getToken, get } from "@/utils/auth";
import { formatDate } from "@/utils/date";
import { fetchList, issueAssets } from "@/api/ums/issue";
import { getTokenWithAuthor } from "@/api/order";
export default {
  name: "issueList",
  data() {
    return {
      action: process.env.BASE_API + "/operate/liquor/issueAssets",
      fileList: [],
      dialogVisible: false,
      operateType: null,
      brandOptions: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        skuPlatformCode: "",
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
      if (state == 1) {
        return "已售出, 用户持有状态";
      } else if (state == 2) {
        return "已售出, 用户转让状态";
      } else if (state == 3) {
        return "已售出, 提货状态";
      } else if (state == 4) {
        return "已核销";
      } else if (state == 5) {
        return "异常";
      }
    },
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传excel表格大小不能超过 10MB!");
      }
      return isLt2M;
    },
    httpRequest(param) {
      let formData = new FormData();
      formData.append("file", param.file);
      issueAssets(formData).then((response) => {
        if (response.code == 200) {
          this.getList();
        this.$message.success(response.msg);
      } else {
        this.$message.error(response.msg);
      }
      });
    },
    handleResetSearch() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 10,
        skuPlatformCode: "",
      };
    },
    templateUpload() {
      let token = getToken();
      getTokenWithAuthor(token).then((response) => {
        if (response.code == 200) {
          this.downloadMethod(
            `/operate/liquor/getAssetTemplate?authorization=${response.data}`
          );
        } else {
          this.$message({
            message: "导出订单出错",
            type: "warning",
            duration: 1000,
          });
        }
      });
    },
    upload(id) {
      let token = getToken();
      getTokenWithAuthor(token).then((response) => {
        if (response.code == 200) {
          this.downloadMethod(
            `/operate/liquor/downloadAssetRecord?authorization=${response.data}&assetId=${id}`
          );
        } else {
          this.$message({
            message: "导出订单出错",
            type: "warning",
            duration: 1000,
          });
        }
      });
    },
    downloadMethod(url) {
      let openurl = `${process.env.BASE_API}${url}`;
      this.$message.success("请等待");
      window.location.href = openurl;
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.subBtns1{
  justify-content: center;
  padding:0;
  margin:0;
}
</style>

