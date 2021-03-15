<template>
   
  <div class="app-container">
    <div>
      <div class="topBtns">
        <p @click="addMemberLevel()">
          <span>添加</span>
        </p>
      </div>
    </div>
    <div class="table-container">
      <el-table
        ref="memberLevelTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column label="等级名称" align="center">
          <template slot-scope="scope">{{ scope.row.levelName }}</template>
        </el-table-column>
        <el-table-column label="等级" align="center"> 
          <template slot-scope="scope">V{{ scope.row.levelNum }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleUpdate(scope.$index, scope.row)">
                <img src="../../../assets/imgs/bianji.png" />
                <span>编辑</span>
              </p>
              <p @click="sjBtn(scope.$index, scope.row)">
                <img src="../../../assets/imgs/shengji.png" />
                <span>晋升设置</span>
              </p>
              <!-- <p>
                <img src="../../../assets/imgs/jiangji.png" />
                <span>降级设置</span>
              </p> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <!--  编辑 -->
    <el-dialog :title="title" :visible.sync="editdialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
      >
        <el-form-item label="等级">
          <div>V{{ ruleForm.levelNum }}</div>
        </el-form-item>

        <el-form-item label="等级名称" prop="levelName">
          <el-input v-model="ruleForm.levelName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditIntegration"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!--  设置 -->
    <el-dialog title="晋升设置" :visible.sync="setdialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules1"
        ref="ruleForm"
        label-width="150px"
      >
        <el-form-item label="晋升">
          <div>V{{ ruleForm.levelNum }}晋升V{{ ruleForm.levelNum + 1 }}</div>
        </el-form-item>

        <el-form-item label="消费" prop="tiptopAmount">
          <el-input v-model="ruleForm.tiptopAmount" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSet">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, addMemberLevel,setLevelUp } from "@/api/memberLevel";
import { formatDate } from "@/utils/date";
export default {
  name: "memberLevelList",
  data() {
    return {
      title:"",
      operateType: null,  
      ruleForm: {
        levelName: "",
      },
      list: null,
      listLoading: true,
      multipleSelection: [],
      maxLevel: "",
      editdialogVisible: false,
      setdialogVisible: false,
      rules: {
        levelName: [
          { required: true, message: "请输入等级名称", trigger: "blur" },
        ],
      },
      rules1: {
        tiptopAmount: [
          { required: true, message: "请输入数值", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    handleSet() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          setLevelUp(this.ruleForm).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "设置成功",
                type: "success",
                duration: 1000,
              });
              this.setdialogVisible = false;
              this.getList();
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    handleEditIntegration() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.title == "编辑") {
            setLevelUp(this.ruleForm).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                  duration: 1000,
                });
                this.editdialogVisible = false;
                this.getList();
              }
            });
          } else {
            addMemberLevel(this.ruleForm).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                  duration: 1000,
                });
                this.editdialogVisible = false;
                this.getList();
              }
            });
          }
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    getList() {
      this.listLoading = true;
      fetchList().then((response) => {
        this.listLoading = false;
        this.list = response.data;
        if (this.list.length == 0) {
          this.maxLevel = 1;
        } else {
          this.maxLevel = this.list[this.list.length - 1].levelNum + 1;
        }
        console.log(this.maxLevel);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpdate(index, row) {
      this.title = "编辑";
      this.editdialogVisible = true;
      this.ruleForm = Object.assign({}, row);
      //   this.$router.push({
      //     path: "/ums/updateMemberLevel",
      //     query: { id: row.id },
      //   });
    },
    sjBtn(index, row) {
      this.setdialogVisible = true;
      this.ruleForm = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该品牌", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteMemberLevel(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    getProductList(index, row) {
      console.log(index, row);
    },
    getProductCommentList(index, row) {
      console.log(index, row);
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
    searchMemberLevelList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleBatchOperate() {
      console.log(this.multipleSelection);
      if (this.multipleSelection < 1) {
        this.$message({
          message: "请选择一条记录",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let showStatus = 0;
      if (this.operateType === "showMemberLevel") {
        showStatus = 1;
      } else if (this.operateType === "hideMemberLevel") {
        showStatus = 0;
      } else {
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
      let data = new URLSearchParams();
      data.append("ids", ids);
      data.append("showStatus", showStatus);
      updateShowStatus(data).then((response) => {
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    addMemberLevel() {
      //   this.$router.push({ path: "/ums/addMemberLevel" });
      this.title = "添加";
      this.ruleForm = {
        levelName: "",
      };
      this.editdialogVisible = true;
      this.ruleForm.levelNum = this.maxLevel;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tabBtns {
  display: flex;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 26px;
    background: #ffffff;
    box-shadow: 0px 3px 4px 0px rgba(99, 118, 154, 0.04);
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    cursor: pointer;
    margin-right: 10px;
    img {
      margin-right: 5px;
    }
  }
}
</style>


