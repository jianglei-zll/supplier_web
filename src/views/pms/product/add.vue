<template>
  <div>
    <product-base-info
      v-model="productParam"
      :is-edit="isEdit"
      ref="info"
    ></product-base-info>
    <product-attribute
      v-model="productParam"
      :is-edit="isEdit"
    ></product-attribute>
    <product-pic v-model="productParam" :is-edit="isEdit"></product-pic>
    <product-price v-model="productParam" :is-edit="isEdit"></product-price>
    <!-- <product-sla></product-sla> -->
    <div class="subBtns">
      <p @click="onsubmit">提交审核</p>
      <p @click="back">取消</p>
    </div>
  </div>
</template>
<script>
import { createProduct, getProduct, updateProduct } from "@/api/product";
import productBaseInfo from "./edit/productBaseInfo"; // 基础信息
import productAttribute from "./edit/productAttribute"; // 商品属性
import productPic from "./edit/productPic"; //图片管理
import productPrice from "./edit/productPrice"; // 价格及库存
import productSla from "./edit/productSla"; // 服务与承诺
export default {
  name: "add",
  components: {
    productBaseInfo,
    productAttribute,
    productPic,
    productPrice,
    productSla,
  },
  data() {
    return {
      productParam: {
        firstClassifyId: "",
        secondClassifyId: "",
        thirdClassifyId: "",
        name: "",
        subTitle: "",
        type: "",
        brandId: "",
        detailMobileHtml: "",
        albumPicsList:[],
        detailMobileHtmlList:[],
        liquorDetailPic:""
      },
      isEdit: false,
      inforesult: false,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.isEdit = true;
      getProduct(this.$route.query.id).then((response) => {
        this.productParam = response.data;
      });
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    getOptionStr(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i];
        if (i != arr.length - 1) {
          str += ",";
        }
      }
      return str;
    },
    async onsubmit() {
      await this.$refs.info.verificationResult();
      if (!this.productParam.infoResult) return;
      this.productParam.productAttributeValueList = [];
      for (let i = 0; i < this.productParam.newselectProductAttr.length; i++) {
        let attr = this.productParam.newselectProductAttr[i];
        if (
          attr.handAddStatus === 1 &&
          attr.options != null &&
          attr.options.length > 0
        ) {
          this.productParam.productAttributeValueList.push({
            productAttributeId: attr.id,
            name: attr.name,
            type: 1,
            value: this.getOptionStr(attr.options),
          });
        }
      }
      for (let i = 0; i < this.productParam.newselectProductParam.length; i++) {
        let param = this.productParam.newselectProductParam[i];
        this.productParam.productAttributeValueList.push({
          productAttributeId: param.id,
          name: param.name,
          type: 0,
          value: param.value,
        });
      }
      if (this.isEdit) {
        updateProduct(this.$route.query.id, this.productParam).then(
          (response) => {
            this.$message({
              type: "success",
              message: "提交成功",
              duration: 1000,
            });
            this.$router.back();
          }
        );
      } else {
        createProduct(this.productParam).then((response) => {
          this.$message({
            type: "success",
            message: "提交成功",
            duration: 1000,
          });
          this.$router.back();
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.subBtns {
  display: flex;
  width: 100%;
  background: #fff;
  margin-left: 30px;
  padding-left: 60px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  p {
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
  p:last-child {
    border-color: #e8e8e8;
    background: #fff;
    color: #333333;
    box-shadow: 0px 0px 0px 0px;
  }
}
</style>