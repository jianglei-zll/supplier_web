<template>
  <div :style="{ height: ht + 'px' }">
    <el-row style="height: 100%">
      <el-col :span="12" style="height: 100%">
        <div class="bgClass">
          <p class="tt">同泰酒证</p>
          <p class="ttcontent">酒品保真服务，资产守护增值</p>
          <img src="../../assets/imgs/login-yuansu.png" class="imgClass" />
        </div>
      </el-col>
      <el-col :span="12" style="height: 100%">
        <div class="bgClass1">
          <p class="tt">登录</p>
          <el-row class="ttcontent" type="flex" align="middle">
            <el-col :span="4">
              <img src="../../assets/imgs/logo.png" />
            </el-col>
            <el-col :span="5">
              <p class="yyzx">运营中心</p>
            </el-col>
          </el-row>
          <el-form
            autoComplete="on"
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            label-position="left"
            class="fns"
          >
            <p class="fname">用户名</p>
            <el-form-item prop="username">
              <el-input
                name="username"
                type="text"
                v-model="loginForm.username"
                autoComplete="on"
                placeholder="请输入用户名"
              >
                <span slot="prefix">
                  <svg-icon icon-class="user" class="color-main"></svg-icon>
                </span>
              </el-input>
            </el-form-item>
            <p class="fname">密码</p>
            <el-form-item prop="password">
              <el-input
                name="password"
                :type="pwdType"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.password"
                autoComplete="on"
                placeholder="请输入密码"
              >
                <span slot="prefix">
                  <svg-icon icon-class="password" class="color-main"></svg-icon>
                </span>
                <span slot="suffix" @click="showPwd">
                  <svg-icon icon-class="eye" class="color-main"></svg-icon>
                </span>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 60px">
              <el-button
                class="loginBtn"
                :loading="loading"
                @click.native.prevent="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- <el-card class="login-form-layout">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon
            icon-class="login-mall"
            style="width: 56px; height: 56px; color: #409eff"
          ></svg-icon>
        </div>
        <h2 class="login-title color-main">运营中心</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
  </div>
</template>

<script>
import Config from "@/settings";
import { isvalidUsername } from "@/utils/validate";
import login_center_bg from "@/assets/images/login_center_bg.png";
import { getToken, set } from "@/utils/auth";
import {
  getSysSystemSetting,
  updateSysSystemSetting,
} from "@/api/sys/basicinfo";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      basicInfo: {},
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      dialogVisible: true,
      pwdType: "password",
      login_center_bg,
      ht: document.body.clientHeight,
    };
  },
  created() {
    this.getSysSystemSettings();
  },
  methods: {
    getSysSystemSettings() {
      getSysSystemSetting(1).then((res) => {
        this.basicInfo = res.data;
        set("basicInfo", res.data);
      });
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleReg() {
      this.$router.push({ path: "/reg" });
    },
    handleStore() {
      this.$router.push({ path: "/acceptStore" });
    },
    handleGit() {
      window.location.href = "https://gitee.com/zscat/mallplus";
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("login");
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then((res) => {
              console.log(res);
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch((e) => {
              console.log(e);
              this.loading = false;
            });
        } else {
          console.log("参数验证不合法！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
/* .login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: calc(25% - 190px) auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
} */
.bgClass {
  width: 100%;
  height: 100%;
  background: #fdfdfd;
  background-image: url(../../assets/imgs/bg-yuansu.png);
  background-size: 100%;
}
.tt {
  color: #333;
  font-size: 40px;
  line-height: 56px;
  font-weight: 600;
  padding-top: 20%;
  padding-left: 20%;
}
.ttcontent {
  color: #333;
  font-size: 32px;
  line-height: 45px;
  padding-top: 20px;
  padding-left: 20%;
}
.imgClass {
  padding-left: 20%;
  margin-top: 10%;
}
.bgClass1 {
  background: #fff;
  height: 100%;
}
.yyzx {
  font-size: 24px;
  line-height: 33px;
}
.fname {
  color: #333;
  line-height: 22px;
  font-size: 16px;
  margin-bottom: 10px;
}
.fns {
  width: 50%;
  margin-top: 6%;
  margin-left: 20%;
}
.loginBtn {
  border: none;
  width: 100%;
  height: 44px;
  background: #ff6d0d;
  box-shadow: 0px 1px 10px 0px rgba(255, 109, 13, 0.2);
  border-radius: 22px;
  color: #fff;
  margin-top: 5%;
}
</style>
