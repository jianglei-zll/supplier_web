<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleGoods">
      <el-tab-pane label="阿里云OSS" name="1">
        <el-form label-position="right" :model="paySetCommon.aliPaySet" :rules="aliPaySetRules" ref="aliPaySetForm"
                 label-width="200px" style="margin-top: 20px">
          <el-form-item prop="accessKey">
            <span slot="label">授权ID(accessKey)</span>
            <el-input v-model="paySetCommon.aliPaySet.accessKey" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="secretKey">
            <span slot="label">授权密钥(secretKey)</span>
            <el-input v-model="paySetCommon.aliPaySet.secretKey" type="textarea"
                      maxlength="2048"></el-input>
          </el-form-item>
          <el-form-item prop="bucket">
            <span slot="label">桶名(bucket)</span>
            <el-input v-model="paySetCommon.aliPaySet.bucket" type="textarea"
                      maxlength="2048"></el-input>
          </el-form-item>
          <el-form-item prop="host">
                      <span slot="label">节点名(endpoint)</span>
                      <el-input v-model="paySetCommon.aliPaySet.host" type="textarea"
                                maxlength="2048"></el-input>
                    </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="updatePaySet('aliPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="七牛OSS" name="2">
        <el-form label-position="right" :model="paySetCommon.wechatPaySet" :rules="wechatPaySetRules"
                 ref="wechatPaySetForm" label-width="150px" style="margin-top: 20px">
          <el-form-item prop="accessKey">
            <span slot="label">accessKey</span>
            <el-input v-model="paySetCommon.wechatPaySet.accessKey" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="secretKey">
            <span slot="label">secretKey</span>
            <el-input v-model="paySetCommon.wechatPaySet.secretKey" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="bucket">
            <span slot="label">识别符</span>
            <el-input v-model="paySetCommon.wechatPaySet.bucket" maxlength="2048"/>
          </el-form-item>
          <el-form-item prop="host">
            <span slot="label">外链域名</span>
            <el-input v-model="paySetCommon.wechatPaySet.host" maxlength="2048"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updatePaySet('wechatPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="阿里云短信" name="3">
 <el-form label-position="right" :model="paySetCommon.unionPaySet"
                 ref="unionPaySetForm" label-width="150px" style="margin-top: 20px">
           <el-form-item prop="accessKey">
                      <span slot="label">accessKey</span>
                      <el-input v-model="paySetCommon.unionPaySet.accessKey" maxlength="2048"/>
                    </el-form-item>
                    <el-form-item prop="secretKey">
                      <span slot="label">secretKey</span>
                      <el-input v-model="paySetCommon.unionPaySet.secretKey" maxlength="2048"/>
                    </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePaySet('unionPaySetForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>

 import {getSysSysQiniuConfig,updateSysSysQiniuConfig} from '@/api/sys/basicinfo';
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
        getSysSysQiniuConfig(this.activeName).then(res => {
           if(this.activeName==1){
                                             this.paySetCommon.aliPaySet=res.data;
                                          }else if(this.activeName==2){
                                                                              this.paySetCommon.wechatPaySet=res.data;
                                                                           }else if(this.activeName==3){
                                             this.paySetCommon.unionPaySet=res.data;
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
                                  objData.id=this.activeName;
                                  console.log(objData)
            updateSysSysQiniuConfig( objData).then(res => {
              this.isProcess = false;
              if (res.code==200) {
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
