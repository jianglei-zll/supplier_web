<template>
  <div>
    <product-base-info v-model="productParam"></product-base-info>
    <product-attribute v-model="productParam"></product-attribute>
    <product-pic v-model="productParam"></product-pic>
    <product-price v-model="productParam"></product-price>
    <!-- <product-sla></product-sla> -->
    <div class="subBtns">
      <p @click="back">返回</p>
    </div>
  </div>
</template>
<script>
import { getProduct } from "@/api/product";
import productBaseInfo from "./component/productBaseInfo"; // 基础信息
import productAttribute from "./component/productAttribute"; // 商品属性
import productPic from "./component/productPic"; //图片管理
import productPrice from "./component/productPrice"; // 价格及库存
import productSla from "./component/productSla"; // 服务与承诺
export default {
  name: "update",
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
      },
    };
  },
  created() {
    getProduct(this.$route.query.id).then((response) => {
      this.productParam = response.data;
    });
  },
  methods: {
    back() {
      this.$router.back();
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