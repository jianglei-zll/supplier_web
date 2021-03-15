<template>
  <div class="app-container">
    <div class="tbtns">
      <p @click="addProductAttr()">属性管理</p>
    </div>
    <div class="table-container">
      <el-table
        ref="productAttrTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="属性名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="属性别名" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0" class="memStatusDiv">
              <span></span>
              <span>正常</span>
            </div>
            <div v-if="scope.row.status == 1" class="memStatusDiv">
              <span class="ty"></span>
              <span>停用</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" align="center">
          <template> 酒水/黄酒/绍兴黄酒 </template>
        </el-table-column>
        <!-- <el-table-column label="默认加载"  align="center">
          <template>
           
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleSee(scope.row)">
                <img src="../../../assets/imgs/chakan.png" />
                <span>查看</span>
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="查看" :visible.sync="dialogVisible" width="30%">
      <el-form :model="vertyProduct" ref="brandFrom" label-width="150px">
        <el-form-item label="属性名称">
          <p class="suxClass">{{ vertyProduct.name }}</p>
        </el-form-item>
        <el-form-item label="属性别名">
          <p class="suxClass">
            {{ vertyProduct.rectName ? vertyProduct.rectName : "无" }}
          </p>
        </el-form-item>
        <el-form-item label="属性状态">
          <p class="suxClass">
            {{ vertyProduct.status == 0 ? "正常" : "停用" }}
          </p>
        </el-form-item>
        <!-- <el-form-item label="限制">
            <p  class="suxClass">必填</p>
        </el-form-item> -->
        <el-form-item label="属性说明">
          <p class="suxClass">
            {{ vertyProduct.note ? vertyProduct.note : "无" }}
          </p>
        </el-form-item>
        <!-- <el-form-item label="属性交互">
            <p  class="suxClass">下拉选择</p>
            <p  class="suxClass">1</p>
            <p  class="suxClass">2</p>
            <p  class="suxClass">3</p>
            <p  class="suxClass">4</p>
        </el-form-item> -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, deleteProductAttr, fetchAllList } from "@/api/productAttr";

export default {
  name: "productAttrList",
  data() {
    return {
      dialogVisible: false,
      vertyProduct: {},

      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        type: 1,
      },
      operateType: null,
      multipleSelection: [],
      operates: [
        {
          label: "删除",
          value: "deleteProductAttr",
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSee(row) {
      this.dialogVisible = true;
      this.vertyProduct = row;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.$route.query.cid, this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data;
      });
    },
    addProductAttr() {
      this.$router.push({
        path: "/pms/propManProductCate",
        query: { cid: this.$route.query.cid },
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      if (this.operateType !== "deleteProductAttr") {
        this.$message({
          message: "请选择批量操作类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      this.handleDeleteProductAttr(ids);
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/pms/updateProductAttr",
        query: { id: row.id },
      });
    },
    handleDeleteProductAttr(ids) {
      this.$confirm("是否要删除该属性", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = new URLSearchParams();
        data.append("ids", ids);
        deleteProductAttr(ids).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleDelete(index, row) {
      let ids = [];
      ids.push(row.id);
      this.handleDeleteProductAttr(ids);
    },
  },
  filters: {
    inputTypeFilter(value) {
      if (value === 1) {
        return "从列表中选取";
      } else {
        return "手工录入";
      }
    },
    typeFilter(value) {
      if (value === 1) {
        return "属性";
      } else {
        return "属性";
      }
    },

    selectTypeFilter(value) {
      if (value === 1) {
        return "单选";
      } else if (value === 2) {
        return "多选";
      } else {
        return "唯一";
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
    box-shadow: 0px 2px 4px 0px rgba(251, 69, 40, 0.14) !important ;
  }
}
.suxClass {
  margin-left: 30px;
  color: #333;
}
</style>



