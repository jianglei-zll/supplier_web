<template>
  <div>
    <div class="email">
      <div class="e-one">绑定</div>
      <div class="e-for">
        <span class="e-two"
          >发票发送邮箱绑定 <span style="color: red">*</span></span
        >
        <span @click="dialogVisible=true" class="e-btn">绑定</span>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="message">
        <div class="f-email">
          <p>邮箱账号</p>
          <p>密码</p>
        </div>
        <div class="myInput">
          <el-input placeholder="请输入邮箱账号"></el-input>
          <el-input placeholder="请输入邮箱密码"></el-input>
        <p class="tost">邮箱账号会涉及发票发送账号，请谨慎操作</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <span @click="dialogVisible = false" class="cpm-f">取消</span>
        <span :plain="true" @click="open2" class="cpm-t">确定</span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "mailbox",
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    open2() {
      this.dialogVisible = false
        this.$message({
          message: '恭喜你，绑定成功',
          type: 'success'
        });
      },
  },
};
</script>
<style scoped>
.cpm-t {
  background: #fc6602;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  padding: 10px 20px;
  border-radius: 2px;
  cursor: pointer;
}
.cpm-f {
  color: #666;
  font-size: 12px;
  line-height: 20px;
  padding: 10px 20px;
  border-radius: 2px;
  border: 1px solid #ddd;
  cursor: pointer;
}
.tost{
  color: red;
  font-size: 12px;
  padding-top: 20px;
}
.email {
  background: #fff;
  height: 160px;
  width: 570px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.01);
  margin-left: 30px;
  margin-top: 30px;
  border-radius: 6px;
}
.e-one {
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 20px;
}
.e-two {
  font-size: 12px;
}
.e-for {
  padding: 38px 20px;
  display: flex;
  justify-content: space-between;
}
.e-btn {
  width: 100px;
  height: 40px;
  background: #fc6602;
  box-shadow: 0px 4px 10px 0px rgba(252, 131, 2, 0.14);
  border-radius: 4px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border: 1px solid #fc6602;
  font-size: 16px;
  cursor: pointer;
  margin-right: 20px;
}
.message{
  display: flex;

}
.message>:first-child{
  width: 20%;
  text-align: right;
  margin-right: 15px;
}
.message p{
  margin-top: 15px;
}
.f-email>:last-child{
  margin-top: 30px;
}
.myInput>:first-child{
  margin-bottom: 10px;
}
</style>