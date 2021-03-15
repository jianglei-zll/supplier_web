<template>
  <div class="app-container">
    <div class="tbtns">
      <p @click="addProductAttr()">添加</p>
    </div>
    <!-- <el-card class="filter-container" shadow="never">
          <div>
              <i class="el-icon-search"></i>
              <span>筛选搜索</span>
              <el-button
                      style="float: right"
                      @click="searchAdminDayStaticsList()"
                      type="primary"
                      size="small">
                  查询结果
              </el-button>
          </div>
          <div style="margin-top: 15px">
              <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                  <el-form-item label="输入搜索：">
                      <el-input style="width: 203px" v-model="listQuery.name" placeholder="类型名称"></el-input>
                  </el-form-item>
              </el-form>
          </div>
      </el-card>
      <el-button
        class="btn-add"
        @click="addProductAttr()"
        size="mini">
        添加
      </el-button>
    </el-card> -->
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
        <el-table-column label="规格名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="规格别名" align="center">
          <template slot-scope="scope">{{
            scope.row.rectName ? scope.row.rectName : "无"
          }}</template>
        </el-table-column>
        <!-- <el-table-column label="所属类型" width="140" align="center">
          <template slot-scope="scope">{{
            scope.row.productAttributeCategoryId
          }}</template>
        </el-table-column> 
        <el-table-column label="类别" width="140" align="center">
          <template slot-scope="scope">{{
            scope.row.type | typeFilter
          }}</template>
        </el-table-column>-->
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status" class="memStatusDiv">
              <span class="ty"></span>
              <span>停用</span>
            </div>
            <div v-else class="memStatusDiv">
              <span></span>
              <span>正常</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="320">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleUpdate(scope.$index, scope.row)">
                <img src="../../../assets/imgs/bianji.png" />
                <span>编辑</span>
              </p>
              <p v-if="scope.row.status" @click="switchButton(scope.row)">
                <img src="../../../assets/imgs/qiyong.png" />
                <span>启用</span>
              </p>
              <p v-else @click="switchButton(scope.row)">
                <img src="../../../assets/imgs/tingyong.png" />
                <span>停用</span>
              </p>
              <p @click="handleSee(scope.row)">
                <img src="../../../assets/imgs/chakan.png" />
                <span>查看</span>
              </p>
            </div>
            <!-- <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >
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
    <el-dialog title="查看" :visible.sync="dialogVisible" width="30%">
      <el-form :model="vertyProduct" ref="brandFrom" label-width="150px">
        <el-form-item label="属性名称">
          <p class="suxClass">{{ vertyProduct.name | nodataFilter}}</p>
        </el-form-item>
        <el-form-item label="属性别名">
          <p class="suxClass">{{ vertyProduct.rectName | nodataFilter}}</p>
        </el-form-item>
        <!-- <el-form-item label="限制">
          <p class="suxClass">必填</p>
        </el-form-item>
        <el-form-item label="重要提醒">
          <p class="suxClass">无提醒</p>
        </el-form-item> -->
        <el-form-item label="属性说明">
          <p class="suxClass">{{ vertyProduct.note | nodataFilter}}</p>
        </el-form-item>
        <!-- <el-form-item label="属性交互">
          <p class="suxClass">下拉选择</p>
        </el-form-item>
        <el-form-item label="属性值">
          <p class="suxClass">干型黄酒(总糖：10.0g/L以下)</p>
        </el-form-item> -->
        <el-form-item label="单位">
          <p class="suxClass">{{ vertyProduct.unit | nodataFilter}}</p>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  deleteProductAttr,
  fetchAllList,
  updateProductAttr,
} from "@/api/productAttr";

export default {
  name: "productAttrList",

  data() {
    return {
      list: null,

      total: null,

      listLoading: true,

      listQuery: {
        pageNum: 1,

        pageSize: 10,

        type: this.$route.query.type || 1,
      },

      operateType: null,

      multipleSelection: [],

      operates: [
        {
          label: "删除",

          value: "deleteProductAttr",
        },
      ],
      vertyProduct:{},
      dialogVisible:false 
    };
  },

  created() {
    this.getList();
  },

  methods: {
    handleSee(row){
      this.dialogVisible=true
      this.vertyProduct=row
    },
    switchButton(row) {
      this.$confirm("是否进行此操作", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning",
      }).then(() => {
        console.log(row.status);

        if (row.status == 1) {
          row.status = 0;
        } else {
          row.status = 1;
        }

        console.log(row);

        updateProductAttr(row.id, row).then((response) => {
          this.$message({
            message: "修改成功",

            type: "success",

            duration: 1000,
          });

          this.getList();
        });
      });
    },

    getList() {
      this.listLoading = true;

      if (this.$route.query.cid) {
        fetchList(this.$route.query.cid, this.listQuery).then((response) => {
          this.listLoading = false;

          this.list = response.data.records;

          this.total = response.data.total;
        });
      } else {
        fetchAllList(this.listQuery).then((response) => {
          this.listLoading = false;

          this.list = response.data.records;

          this.total = response.data.total;
        });
      }
    },

    searchAdminDayStaticsList() {
      this.listQuery.pageNum = 1;

      this.getList();
    },

    addProductAttr() {
      this.$router.push({
        path: "/pms/addProductProp",

        query: { cid: this.$route.query.cid, type: this.$route.query.type },
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

    handleSizeChange(val) {
      this.listQuery.pageNum = 1;

      this.listQuery.pageSize = val;

      this.getList();
    },

    handleCurrentChange(val) {
      this.listQuery.pageNum = val;

      this.getList();
    },

    // handleUpdate(index, row) {
    //   this.$router.push({
    //     path: "/pms/updateProductAttr",

    //     query: { id: row.id },
    //   });
    // },
     handleUpdate(index, row) {
        this.$router.push({path:'/pms/updateProductProp',query:{id:row.id}});
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
    nodataFilter(value){
     if(value){
       return value
     }else{
       return "无"
     }
    },
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
        return "规格";
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