<template>
  <div>
    <div class="index">
      <div class="binding">
        <div class="b-head">绑定</div>
        <div class="b-foot">
          <span>区块链账号绑定 <span style="color: red">*</span> </span>
          <span class="b-btn" @click="dialogVisible = true">绑定</span>
        </div>
      </div>
      <div class="unbind">
        <div class="u-head">解绑</div>
        <div class="u-foot">
          <span>区块链账号绑定 <span style="color: red">*</span> </span>
          <span>
            <p>123456789</p>
            <p>会稽山黄酒公司</p>
          </span>
          <span @click="dialog = true" class="b-btn">解绑</span>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="绑定" :visible.sync="dialogVisible" width="30%">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item class="demo-form-inline" label="验证码" prop="pwd">
          <el-input class="yzm" placeholder="请输入验证码" > </el-input>
          <span class="yzm-m">发送验证码</span>
        </el-form-item>
        <el-form-item>
          <p class="tost">区块链账号会涉及到资产发行，请谨慎操作</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span @click="dialogVisible = false" class="cpm-f">取消</span>
        <span :plain="true" @click="open3" class="cpm-t">确定</span>
      </span>
    </el-dialog>
    <el-dialog title="解绑" :visible.sync="dialog" width="30%">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input disabled placeholder="18888888888"></el-input>
        </el-form-item>
        <el-form-item class="demo-form-inline" label="验证码" prop="pwd">
          <el-input placeholder="请输入验证码" class="yzm"> </el-input>
          <span class="yzm-m">发送验证码</span>
        </el-form-item>
        <el-form-item>
          <p class="tost">区块链账号会涉及到资产发行，请谨慎操作</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span @click="dialog = false" class="cpm-f">取消</span>
        <span :plain="true" @click="open4" class="cpm-t">确定</span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialog: false,
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      ruleForm: {
        phone: "",
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    open3() {
      this.dialogVisible = false;
      this.$message({
        message: "绑定成功",
        type: "success",
      });
    },
    open4() {
      this.dialog = false;
      this.$message({
        message: "解绑成功",
        type: "warning",
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
.tost {
  color: red;
  font-size: 13px;
}
.yzm-m {
  width: 100px;
  height: 40px;
  background: #fc6602;
  box-shadow: 0px 4px 10px 0px rgba(252, 131, 2, 0.14);
  border-radius: 4px;
  color: #fff;
  padding: 5px;
  font-size: 12px;
  margin-left: 25px;
  cursor: pointer;
}
.yzm {
  display: inline-block;
  width: 70%;
}
.index {
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-top: 30px;
}
.index > div {
  background: #fff;
  height: 160px;
  width: 570px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.01);
  border-radius: 6px;
}
.b-head,
.u-head {
  font-size: 14px;
  font-weight: 700;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
.b-foot,
.u-foot {
  display: flex;
  justify-content: space-between;
  padding: 35px 20px;
}
.b-btn {
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
.b-foot > :first-child {
  font-size: 13px;
  margin-top: 5px;
}
.u-foot > :first-child,
.u-foot > :nth-child(2) {
  font-size: 13px;
  margin-top: 5px;
}
</style>