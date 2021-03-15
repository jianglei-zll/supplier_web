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
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="供货商SKU">
            <el-input
              style="width: 250px"
              placeholder="请输入供货商SKU"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              style="width: 250px"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tbtns">
      <p @click="add()">添加</p>
    </div>
    <div class="table-container">
      <el-table :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column label="供应商SKU" align="center"></el-table-column>
        <el-table-column label="商品名称" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleUpdateProduct(scope.$index, scope.row)">
                <img src="../../../assets/imgs/bianji.png" />
                <span>编辑</span>
              </p>
              <p @click="handleSeeProduct(scope.$index, scope.row)">
                <img src="../../../assets/imgs/shanchu.png" />
                <span>删除</span>
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
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="150px">
        <el-form-item label="供应商SKU编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <div class="subBtns">
                <p @click="back">取消</p>
                <p @click="onSubmit()">确定</p>
            </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "warehouseGoods",
  data() {
    return {
      list: [{}],
      listLoading: false,
      dialogVisible:false,
      total:0,
      listQuery:{
          pageNum:1,
          pageSize:10
      }
    };
  },
  methods: {
    // 查询
    handleSearchList() {},
    // 重置
    handleResetSearch() {},
    // 添加
    add() {
        this.dialogVisible = true;
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
  },
};
</script>
<style lang="scss" scoped>
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
</style>