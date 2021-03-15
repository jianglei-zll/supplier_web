<template>
  <div class="modelDiv">
    <p class="modelTit">基础信息</p>
    <div style="margin: 0 20px; padding-bottom: 20px">
      <el-form
        :model="value"
        :rules="rules"
        ref="productInfoForm"
        label-width="120px"
      >
        <el-form-item label="商品分类" prop="productCategoryId" class="elItem">
          <p>酒类-黄酒-会稽山黄酒</p>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品标题" prop="name">
              <p>{{value.name}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品副标题">
              <p>{{value.subTitle}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品类型" prop="type">
              <p>{{value.type==1?"一般商品":"虚拟商品"}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌" prop="pinpai">
              <p>{{value.brandName}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="贸易类型" prop="maoyi">
              <p>一般贸易</p>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "productBaseInfo",
  props: {
    value: Object,
  },
  data() {
    return {
      value: {},
      rules: {
        productCategoryId: [{ required: true, message: "请选择商品分类" }],
        name: [{ required: true, message: "请填写商品标题" }],
        type: [{ required: true, message: "请选择商品类型" }],
        pinpai: [{ required: true, message: "请选择品牌" }],
        maoyi: [{ required: true, message: "请选择贸易类型" }],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.modelDiv {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.01);
  margin: 20px 30px;
}
.modelTit {
  font-size: 18px;
  font-weight: 600;
  height: 60px;
  line-height: 60px;
  padding-left: 40px;
  border-bottom: 1px solid #f7f7f7;
}
.elItem {
  margin-top: 15px;
}
</style>