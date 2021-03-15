<template>
  <div class="app-container">
    <div class="tbtns">
      <p @click="handleAddProductCate()">添加</p>
    </div>
    <div class="table-container">
      <el-table ref="productCateTable" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="分类图片" width="120" align="center">
          <template>
            <img src="../../../assets/imgs/logo.png"/>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
         <el-table-column label="分类别名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="级别"  align="center">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <el-table-column label="上级分类"  align="center"></el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 1" class="memStatusDiv">
              <span></span>
              <span>正常</span>
            </div>
            <div v-if="scope.row.status == 2" class="memStatusDiv">
              <span class="ty"></span>
              <span>停用</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="操作"  align="center" width="400">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleUpdate(scope.$index, scope.row)">
                <img src="../../../assets/imgs/bianji.png"/>
                <span>编辑</span>
              </p>
              <p>
                <img src="../../../assets/imgs/tingyong.png"/>
                <span>停用</span>
              </p>
              <p>
                <img src="../../../assets/imgs/qiyong.png"/>
                <span>启用</span>
              </p>
              <p style="width:100px" @click="handleGG(scope.$index, scope.row)">
                <img src="../../../assets/imgs/xq.png"/>
                <span>规格管理</span>
              </p>
              <p style="width:100px" @click="handleSX(scope.$index, scope.row)">
                <img src="../../../assets/imgs/xq.png"/>
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
        :page-sizes="[10,15,50]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {fetchList,deleteProductCate,updateShowStatus,updateNavStatus,updateIndexStatus} from '@/api/productCate'

  export default {
    name: "productCateList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        parentId: 0
      }
    },
    created() {
      this.resetParentId();
      this.getList();
    },
    watch: {
      $route(route) {
        this.resetParentId();
        this.getList();
      }
    },
    methods: {
      resetParentId(){
        if (this.$route.query.parentId != null) {
          this.parentId = this.$route.query.parentId;
        } else {
          this.parentId = 0;
        }
      },
      handleAddProductCate() {
        this.$router.push('/pms/addProductCate');
      },
      getList() {
        this.listLoading = true;
        fetchList(this.parentId, this.listQuery).then(response => {
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
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('navStatus',row.navStatus);
        updateNavStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleShowStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('showStatus',row.showStatus);
        updateShowStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleIndexStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('indexStatus',row.indexStatus);
        updateIndexStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/pms/productCate', query: {parentId: row.id}})
      },
      handleTransferProduct(index, row) {
        console.log('handleAddProductCate');
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/pms/updateProductCate',query:{id:row.id}});
      },
      // 规格管理
      handleGG(index,row){
        this.$router.push({path:'/pms/attrProductCate',query:{id:row.id}});
      },
      // 属性管理
      handleSX(index,row){
        this.$router.push({path:'/pms/propProductCate',query:{id:row.id}});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该品牌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProductCate(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    },
    filters: {
      levelFilter(value) {
        if (value === 0) {
          return '一级';
        } else if (value === 1) {
          return '二级';
        }
      },
      disableNextLevel(value) {
        if (value === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
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
  }
}
.memStatusDiv{
  display: flex;
  justify-content: center;
  align-items: center;
  span:first-child{
    width: 8px;
    height: 8px;
    background: #12B726;
    box-shadow: 0px 2px 4px 0px rgba(18, 183, 38, 0.14);
    border-radius: 50%;
    margin-right: 8px;
  }
  .zx{
    background: #565656;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.14);
  }
  .ty{
    background: #FB4528;
    box-shadow: 0px 2px 4px 0px rgba(251, 69, 40, 0.14);
  }
}
</style>
