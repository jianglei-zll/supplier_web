<template>
  <div class="app-container">
    <div class="tbtns">
      <p @click="handleAddProductCate()">添加</p>
    </div>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="分类图片" width="120" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.icon"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="分类别名" align="center">
          <template slot-scope="scope">{{
            scope.row.restName ? scope.row.restName : "无"
          }}</template>
        </el-table-column>
        <el-table-column label="级别" align="center">
          <template slot-scope="scope">{{
            scope.row.level | levelFilter
          }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.isClosed" class="memStatusDiv">
              <span class="ty"></span>
              <span>停用</span>
            </div>
            <div v-else class="memStatusDiv">
              <span></span>
              <span>正常</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="商品数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productCount }}</template>
        </el-table-column>
        <el-table-column label="数量单位" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productUnit }}</template>
        </el-table-column>
        <el-table-column label="导航栏" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleNavStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.navStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否首页显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleIndexStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.indexStatus">
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="排序" width="100" align="center">
          <!-- <template slot-scope="scope">{{scope.row.sort }}</template> -->
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <!-- <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>

          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="450">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleUpdate(scope.$index, scope.row)">
                <img src="../../../assets/imgs/bianji.png" />
                <span>编辑</span>
              </p>
              <p
                style="width: 100px"
                @click="handleShowNextLevel(scope.$index, scope.row)"
                v-if="scope.row.level<2"
              >
                <img src="../../../assets/imgs/xq.png" />
                <span>{{ scope.row.level | nextlevelFilter }}分类</span>
              </p>
              <p v-if="scope.row.isClosed" @click="switchButton(scope.row)">
                <img src="../../../assets/imgs/qiyong.png" />
                <span>启用</span>
              </p>
              <p v-else @click="switchButton(scope.row)">
                <img src="../../../assets/imgs/tingyong.png" />
                <span>停用</span>
              </p>
              <p @click="getAttrList(scope.$index, scope.row)" style="width:84px" v-if="scope.row.level==2">
                <img src="../../../assets/imgs/shuxing.png" />
                <span>规格管理</span>
              </p>
              <p @click="getParamList(scope.$index, scope.row)" style="width:84px" v-if="scope.row.level==2">
                <img src="../../../assets/imgs/guige.png" />
                <span>属性管理</span>
              </p>
            </div>
            <!-- <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button> -->
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
  fetchListAll,
  fetchList,
  deleteProductCate,
  updateShowStatus,
  updateNavStatus,
  updateIndexStatus,
  updateProductCate,
} from "@/api/productCate";

export default {
  name: "productCateList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },

      parentId: 0,
    };
  },
  created() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    },
  },
  methods: {
     getAttrList(index, row) {
      this.$router.push({
        path: "/pms/attrProductCate",
        query: { cid: row.id},
      });
    },
    getParamList(index, row) {
      this.$router.push({
        path: "/pms/propProductCate",
        query: { cid: row.id},
      });
    },
    switchButton(row) {
      this.$confirm("是否进行此操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        row.isClosed = !row.isClosed;
        updateProductCate(row.id, row).then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
      console.log(row);
    },
    resetParentId() {
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddProductCate() {
      console.log(this.parentId)
      if (this.parentId == 0) {
        this.$router.push("/pms/addProductCate");
      } else {
        this.$router.push({
          path: "/pms/addProductCate",
          query: { parentId: this.parentId },
        });
      }
    },
    getList() {
      this.listLoading = true;
      fetchList(this.parentId, this.entity).then((response) => {
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
    handleNavStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      data.append("ids", ids);
      data.append("navStatus", row.navStatus);
      updateNavStatus(data).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      data.append("ids", ids);
      data.append("showStatus", row.showStatus);
      updateShowStatus(data).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    handleIndexStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      data.append("ids", ids);
      data.append("indexStatus", row.indexStatus);
      updateIndexStatus(data).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    handleShowNextLevel(index, row) {
      this.$router.push({
        path: "/pms/productCate",
        query: { parentId: row.id },
      });
    },
    handleTransferProduct(index, row) {
      console.log("handleAddProductCate");
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/pms/updateProductCate",
        query: { id: row.id },
      });
    },
     handleAttr(index, row) {
      this.$router.push({
        path: "/pms/updateProductCate",
        query: { id: row.id },
      });
    },
     handleProp(index, row) {
      this.$router.push({
        path: "/pms/updateProductCate",
        query: { id: row.id },
      });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该品牌", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteProductCate(row.id).then((response) => {
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
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      }else if (value === 2) {
        return "三级";
      }
    },
    nextlevelFilter(value) {
      if (value === 0) {
        return "二级";
      } else if (value === 1) {
        return "三级";
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tbtns {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
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
.memStatusDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  span:first-child {
    width: 8px;
    height: 8px;
    background: #12b726;
    box-shadow: 0px 2px 4px 0px rgba(18, 183, 38, 0.14);
    border-radius: 50%;
    margin-right: 8px;
  }
  .zx {
    background: #565656;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
  }
  .ty {
    background: #fb4528 !important;
    box-shadow: 0px 2px 4px 0px rgba(251, 69, 40, 0.14) !important;
  }
}
</style>
