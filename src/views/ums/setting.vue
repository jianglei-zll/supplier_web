<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleGoods">
      <el-tab-pane label="支付宝配置" name="1">
        <el-form label-position="right" :model="paySetCommon.aliPaySet" :rules="aliPaySetRules" ref="aliPaySetForm"
                 label-width="200px" style="margin-top: 20px">
          <el-form-item prop="appid">
            <span slot="label">APPID</span>
            <el-input v-model="paySetCommon.aliPaySet.appid" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="appsecret">
            <span slot="label">AppSecret</span>
            <el-input v-model="paySetCommon.aliPaySet.appsecret" type="textarea" :rows="6"
                      maxlength="2048"></el-input>
          </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="updatePaySet('aliPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="百度配置" name="2">
        <el-form label-position="right" :model="paySetCommon.wechatPaySet" :rules="wechatPaySetRules"
                 ref="wechatPaySetForm" label-width="150px" style="margin-top: 20px">
          <el-form-item prop="appid">
            <span slot="label">APPID</span>
            <el-input v-model="paySetCommon.wechatPaySet.appid" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="appsecret">
            <span slot="label">AppSecret</span>
            <el-input v-model="paySetCommon.wechatPaySet.appsecret" maxlength="2048"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updatePaySet('wechatPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="QQ配置" name="3">
        <el-form label-position="right" :model="paySetCommon.unionPaySet" :rules="unionPaySetRules"
                 ref="unionPaySetForm" label-width="150px" style="margin-top: 20px">
          <el-form-item prop="appid">
                      <span slot="label">APPID</span>
                      <el-input v-model="paySetCommon.unionPaySet.appid" maxlength="2048"/>
                    </el-form-item>
                    <el-form-item prop="appsecret">
                      <span slot="label">AppSecret</span>
                      <el-input v-model="paySetCommon.unionPaySet.appsecret" maxlength="2048"/>
                    </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updatePaySet('unionPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="头条配置" name="4">
        <el-form label-position="right" :model="paySetCommon.wechatAppPaySet" :rules="wechatPaySetRules"
                 ref="wechatAppPaySetForm" label-width="150px" style="margin-top: 20px">
          <el-form-item prop="appid">
            <span slot="label">APPID</span>
            <el-input v-model="paySetCommon.wechatAppPaySet.appid" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="appsecret">
            <span slot="label">AppSecret</span>
            <el-input v-model="paySetCommon.wechatAppPaySet.appsecret" maxlength="2048"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updatePaySet('wechatAppPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="抖音配置" name="5">
        <el-form label-position="right" :model="paySetCommon.wechatAppletPaySet" :rules="wechatPaySetRules"
                 ref="wechatAppletPaySetForm" label-width="150px" style="margin-top: 20px">
          <el-form-item prop="appid">
            <span slot="label">APPID</span>
            <el-input v-model="paySetCommon.wechatAppletPaySet.appid" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="appsecret">
            <span slot="label">AppSecret</span>
            <el-input v-model="paySetCommon.wechatAppletPaySet.appsecret" maxlength="2048"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updatePaySet('wechatAppletPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

 import {getOrderSetting,updateOrderSetting} from '@/api/ums/appletSetting';
  export default {
    data() {
      return {
        isProcess: false, // 接口是否处理中
        activeName: '1', // 选中的支付设置类别，1 支付宝 2 微信支付(扫码，公众号，H5) 3 银联 4预存款 5 微信支付（app） 6 微信小程序支付
        paySetCommon: {
          aliPaySet: {}, // 支付宝设置
          wechatPaySet: {}, // 微信支付(扫码，公众号，H5)设置
          unionPaySet: {}, // 银联设置
          prePaySet: {}, // 预存款设置
          wechatAppPaySet: {}, // 微信支付（app）设置
          wechatAppletPaySet: {} // 微信小程序支付
        },
        aliPaySetRules: { // 支付宝设置校验规则
          appId: [
            {
              required: true,
              message: '请输入应用ID(appId)',
              trigger: 'blur'
            }
          ],
          appPrivateKey: [
            {
              required: true,
              message: '请输入开发者私钥(RSA(SHA256))',
              trigger: 'blur'
            }
          ],
          alipayPublicKey: [
            {
              required: true,
              message: '请输入支付宝公钥(RSA(SHA256))',
              trigger: 'blur'
            }
          ],
        },
        wechatPaySetRules: { // 微信设置校验规则
          appId: [
            {
              required: true,
              message: '请输入APPID',
              trigger: 'blur'
            }
          ],
          appSecret: [
            {
              required: true,
              message: '请输入AppSecret',
              trigger: 'blur'
            }
          ],
          merchantNum: [
            {
              required: true,
              message: '请输入商户号',
              trigger: 'blur'
            }
          ],
          apiKey: [
            {
              required: true,
              message: '请输入API密钥',
              trigger: 'blur'
            }
          ],
        },
        unionPaySetRules: { // 银联设置校验规则
          merchantNum: [
            {
              required: true,
              message: '请输入商户号',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    created() {
      this.queryPaySet()
    },
    methods: {
    handleGoods(tab, event) {
                        this.activeName = tab.name;
                        this.queryPaySet()
                      },
      // 查询支付设置
      queryPaySet() {
        getOrderSetting(this.activeName).then(res => {
         if(this.activeName==1){
                                            this.paySetCommon.aliPaySet=res.data;
                                         }else if(this.activeName==2){
                                                                             this.paySetCommon.wechatPaySet=res.data;
                                                                          }else if(this.activeName==3){
                                            this.paySetCommon.unionPaySet=res.data;
                                         }
                                                                else if(this.activeName==4){
                                                                        this.paySetCommon.wechatAppPaySet=res.data;
                                                                                      }
                                                                                      else if(this.activeName==5){
                                                                              this.paySetCommon.wechatAppletPaySet=res.data;
                                                                                                            }

          if (this.$refs["aliPaySetForm"]) {
            this.$refs["aliPaySetForm"].resetFields();
          }
          if (this.$refs["wechatPaySetForm"]) {
            this.$refs["wechatPaySetForm"].resetFields();
          }
          if (this.$refs["unionPaySetForm"]) {
            this.$refs["unionPaySetForm"].resetFields();
          }
          if (this.$refs["wechatAppPaySetForm"]) {
            this.$refs["wechatAppPaySetForm"].resetFields();
          }
          if (this.$refs["wechatAppletPaySetForm"]) {
            this.$refs["wechatAppletPaySetForm"].resetFields();
          }
        })
      },
      // 修改支付设置
      updatePaySet(formName) {
        this.$refs[formName].validate(valid => {
          if (valid && !this.isProcess) {
            this.isProcess = true;
             var objData;
                                  if(this.activeName==1){
                                                          objData = this.paySetCommon.aliPaySet;
                                                        }else if(this.activeName==2){
                                    objData = this.paySetCommon.wechatPaySet;
                                  }else if(this.activeName==3){
                                     objData = this.paySetCommon.unionPaySet;
                                  }
                                                         else if(this.activeName==4){
                                                                                  objData = this.paySetCommon.wechatAppPaySet;
                                                                               }
                                                                               else if(this.activeName==5){
                                                                                                        objData = this.paySetCommon.wechatAppletPaySet;
                                                                                                     }
                                                                                                     else if(this.activeName==6){
                                                                                                                                                                                                 objData = this.paySetCommon.blancePaySet;
                                                                                                                                                                                              }

objData.id=this.activeName;
            updateOrderSetting(this.activeName,objData).then(res => {
              this.isProcess = false;
             if (res.code == 200) {
                this.queryPaySet();
                this.$message({
                  type: 'success',
                  message: '更新成功'
                });
              } else {
                this.$message({
                  message: '修改失败',
                  type: 'error'
                })
              }
            })
          }
        });
      },
    }
  }
</script>
