<template>
   
  <div class="app-container">
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :file-list="fileList"
      multiple
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      style="margin: 20px 0"
    >
      <el-button type="primary" icon="el-icon-download">SPU导入</el-button>
    </el-upload>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productAttrCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号"  align="center">
          <template slot-scope="scope">{{ scope.row.spuPlatformCode }}</template>
        </el-table-column>
        <el-table-column label="spu名称" align="center">
          <template slot-scope="scope">{{ scope.row.spuName }}</template>
        </el-table-column>
        <el-table-column label="导入时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatTime }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
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
  </div>
</template>
<script>
import {
  showSpu,
  delSpu,
} from "@/api/product";
import { formatDate } from "@/utils/date";
import SingleUpload from "@/components/Upload/singleUpload";
export default {
  name: "productAttrCateList",
  components: { SingleUpload },
  data() {
    return {
      fileList:[],
      action: process.env.BASE_API + "/pms/spuAsset/addSpu",
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      dialogVisible: false,
      dialogTitle: "",
      productAttrCate: {
        name: "",
        id: null,
      },
      rules: {
        name: [{ required: true, message: "请输入类型名称", trigger: "blur" }],
        style: [{ required: true, message: "请选择列表样式", trigger: "blur" }],
        showIndex: [
          { required: true, message: "请选择是否展示首页", trigger: "blur" },
        ],
      },
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
  },
  methods: {
     handleAvatarSuccess(response) {
      if ((response.code == 200)) {
        this.$message.success("导入成功");
        this.getList();
      } else {
        this.$message.error("导入失败");
      }
    },
    getList() {
      this.listLoading = true;
      showSpu(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.records;
        this.total = response.data.total;
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
    handleDelete(index, row) {
      this.$confirm("是否要删除该SPU", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delSpu(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


