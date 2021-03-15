<template>
  <div class="app-container">
    <div class="tbtns">
      <p @click="add()">添加</p>
    </div>
    <div>
      <div class="viewDiv">
        <el-row class="tabletop">
          <el-col :span="5">
            <p class="tabletopTit">模板编号：YS132465786</p>
          </el-col>
          <el-col :span="5">
            <p class="tabletopTit">运费模板名称：江浙沪包邮</p>
          </el-col>
          <el-col :span="5" :offset="5">
            <p class="tabletopTit">更新于2018-10-17 14:05:30</p>
          </el-col>
          <el-col :span="4" style="display: flex; justify-content: flex-end">
            <p class="checkBtn" @click="check()">查看</p>
            <p class="checkBtn">编辑</p>
          </el-col>
        </el-row>
        <el-row class="tabletit">
          <el-col :span="5">
            <p>配送地址</p>
          </el-col>
          <el-col :span="5">
            <p>首件(件)</p>
          </el-col>
          <el-col :span="5">
            <p>首费(元)</p>
          </el-col>
          <el-col :span="5">
            <p>续件(件)</p>
          </el-col>
          <el-col :span="4">
            <p>续费(元)</p>
          </el-col>
        </el-row>
        <el-row class="tablecontent">
          <el-col :span="5">
            <p>中国</p>
          </el-col>
          <el-col :span="5">
            <p>1</p>
          </el-col>
          <el-col :span="5">
            <p>10.00</p>
          </el-col>
          <el-col :span="5">
            <p>1</p>
          </el-col>
          <el-col :span="4">
            <p>10.00</p>
          </el-col>
        </el-row>
      </div>
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
export default {
  name: "freight",
   data() {
    return {
      total:0,
      listQuery:{
          pageNum:1,
          pageSize:10
      }
    };
  },
  methods:{
    add(){
        this.$router.push({
            path: "/storehouse/updateFreight",
            query: { },
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
    // 查看
    check(){
        this.$router.push({
            path: "/storehouse/checkFreight",
            query: { },
        });
    }
  }
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
.viewDiv {
  margin-top: 20px;
  border: 1px solid #eeeeee;
}
.tabletop {
  height: 40px;
  background: #dce1e5;
  border-radius: 2px 2px 0px 0px;
  border-bottom: 1px solid #eeeeee;
  .tabletopTit {
    color: #35617d;
    font-size: 14px;
    line-height: 40px;
    margin-left: 20px;
  }
  .checkBtn {
    width: 68px;
    height: 26px;
    background: #2f4667;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    margin-top: 7px;
    margin-right: 30px;
    font-size: 14px;
  }
}
.tabletit {
  height: 40px;
  line-height: 40px;
  background: #f6f6f6;
  font-size: 14px;
  border-bottom: 1px solid #eeeeee;
  p {
    margin-left: 20px;
  }
}
.tablecontent {
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;
  line-height: 60px;
  font-size: 14px;
  p {
    margin-left: 20px;
  }
}
</style>