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
        <el-form-item label="商品分类" prop="thirdClassifyId" class="elItem">
          <div>
            <cityEdit
              :provinceId="value.firstClassifyId"
              :cityId="value.secondClassifyId"
              :districtId="value.thirdClassifyId"
              @sendprovinceId="getfirstClassifyId"
              @sendcityId="getsecondClassifyId"
              @senddistrictId="getthirdClassifyId"
              :type="isEdit"
            ></cityEdit>
          </div>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品标题" prop="name">
              <el-input v-model="value.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品副标题">
              <el-input v-model="value.subTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="商品类型" prop="type" >
              <el-select
                v-model="value.type"
                placeholder="请选择"
                style="width: 100%"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌" prop="brandId">
              <el-select
                v-model="value.brandId"
                placeholder="请选择"
                style="width: 100%"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in brands"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="贸易类型" prop="maoyi">
              <el-select
                v-model="value1"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { getBrandON } from "@/api/brand";
import cityEdit from "./cityEdit";
export default {
  name: "productBaseInfo",
  components: {
    cityEdit,
  },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      brands: [],
      firstList: [],
      secondList: [],
      thirdList: [],
      types: [
        { value: 1, label: "一般商品" },
        { value: 0, label: "虚拟商品" },
      ],
      rules: {
        thirdClassifyId: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        name: [{ required: true, message: "请填写商品标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择商品类型", trigger: "blur" }],
        brandId: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        maoyi: [{ required: true, message: "请选择贸易类型", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        type: 1,
      },
    };
  },
  created() {
    this.getbrandList();
  },
  methods: {
    // 获取市ID
    getfirstClassifyId(val) {
      this.value.firstClassifyId = val;
    },
    // 获取省ID
    getsecondClassifyId(val) {
      this.value.secondClassifyId = val;
    },
    // 获取城ID
    getthirdClassifyId(val) {
      this.value.thirdClassifyId = val;
    },
    verificationResult() {
      this.$refs.productInfoForm.validate((valid) => {
        if (valid) {
         this.value.infoResult=true
        } else {
          this.value.infoResult=false
          this.$message({
            message: "验证失败",
            type: "error",
          });
          return false;
        }
      });
    },
    async getbrandList() {
      let { data: list } = await getBrandON();
      this.brands = list;
    },
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