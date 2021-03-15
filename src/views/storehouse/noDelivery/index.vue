<template>
  <div class="app-container">
    <div class="tbtns">
      <p @click="add()">添加</p>
    </div>
    <el-table border>
      <el-table-column label="模板编号" align="center"></el-table-column>
      <el-table-column label="模板名称" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1" class="memStatusDiv">
            <span></span>
            <span>启用</span>
          </div>
          <div v-if="scope.row.status == 2" class="memStatusDiv">
            <span class="ty"></span>
            <span>停用</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="最近更新者" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template>
          <div class="tabBtns">
            <p>
              <img src="../../../assets/imgs/bianji.png" />
              <span>编辑</span>
            </p>
            <p>
              <img src="../../../assets/imgs/tingyong.png" />
              <span>停用</span>
            </p>
            <p>
              <img src="../../../assets/imgs/qiyong.png" />
              <span>启用</span>
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
    name:'noDelivery',
    methods:{
      add(){
         this.$router.push({
            path: "/storehouse/updateNoDelivery",
            query: { },
        });
      }
    }
}
</script>
<style lang="scss" scoped>
.tbtns {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  margin-bottom: 15px;
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