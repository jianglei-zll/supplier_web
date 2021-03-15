<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="productProp"
      :rules="rules"
      ref="productAttrFrom"
      label-width="150px"
    >
      <el-form-item label="属性名称：" prop="name">
        <el-input v-model="productProp.name"></el-input>
      </el-form-item>
      <el-form-item label="属性别名：">
        <el-input v-model="productProp.rectName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="限制：" prop="xz">
        <el-radio v-model="radio" label="1">选填</el-radio>
        <el-radio v-model="radio" label="2">必填</el-radio>
      </el-form-item>
      <el-form-item label="重要提示：">
        <el-select v-model="value" placeholder="请选择" sty le="width:100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="属性说明：">
        <el-input v-model="productProp.note"></el-input>
      </el-form-item>
      <!-- <el-form-item label="属性交互：" prop="sxjh">
        <el-select v-model="value" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="属性值：" prop="sxz">
            <div class="flex">
              <el-input></el-input>
              <div class="tabBtns" style="margin-left:10px">
                <p >
                  <img src="../../../../assets/imgs/shanchu.png"/>
                  <span>删除</span>
                </p>
              </div>
            </div>
            <p class="tj">添加属性值</p>
      </el-form-item> -->
      <el-form-item label="单位：" prop="unit">
        <div class="flex">
          <el-input v-model="productProp.unit"></el-input>
          <div class="tabBtns" style="margin-left: 10px">
            <!-- <p >
                  <img src="../../../../assets/imgs/shanchu.png"/>
                  <span>删除</span>
                </p> -->
          </div>
        </div>
        <!-- <p class="tj">添加属性值</p> -->
      </el-form-item>
      <el-form-item>
        <div class="subBtns">
          <p @click="back">返回</p>
          <p @click="onSubmit('productAttrFrom')">确定</p>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { fetchList } from "@/api/productAttrCate";
import {
  createProductAttr,
  getProductAttr,
  updateProductAttr,
} from "@/api/productAttr";

const defaultProductProp = {
  name: "",
  rectName: "",
  note: "",
};
export default {
  name: "ProductPropDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radio: 1,
      options: [
        { label: "无提示", value: "" },
        { label: "带※号提示", value: "1" },
      ],
      value: "",
      options1: [
        { label: "单选框", value: "" },
        { label: "复选框", value: "1" },
        { label: "输入框", value: "2" },
        { label: "时间选择器", value: "3" },
      ],

      productProp: Object.assign({}, defaultProductProp),
      rules: {
        name: [
          { required: true, message: "请输入属性名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        productAttributeCategoryId: [
          { required: true, message: "请选择商品类型", trigger: "blur" },
        ],

        xz: [{ required: true, message: "请选择限制类型" }],
        ggjh: [{ required: true, message: "请选择规格交互" }],
        sxz: [{ required: true, message: "请填写属性值" }],
      },
      productAttrCateList: null,
      inputListFormat: null,
    };
  },
  created() {
    if (this.isEdit) {
      getProductAttr(this.$route.query.id).then((response) => {
        this.productProp = response.data;
        this.inputListFormat = this.productAttr.inputList.replace(/,/g, "\n");
      });
    } else {
      this.resetProductAttr();
    }
  },
  watch: {
    inputListFormat: function (newValue, oldValue) {
      newValue = newValue.replace(/\n/g, ",");
      this.productAttr.inputList = newValue;
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    getCateList() {
      let listQuery = { pageNum: 1, pageSize: 100 };
      fetchList(listQuery).then((response) => {
        this.productAttrCateList = response.data.records;
      });
    },
    resetProductAttr() {
      this.productProp = Object.assign({}, defaultProductProp);
      // this.productAttr.productAttributeCategoryId = Number(this.$route.query.cid);
      // this.productAttr.type = Number(this.$route.query.type);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateProductAttr(this.$route.query.id, this.productProp).then(
                (response) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$router.back();
                }
              );
            } else {
              createProductAttr(this.productProp).then((response) => {
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
                this.resetForm("productAttrFrom");
                this.$router.back();
              });
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.resetProductAttr();
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.tj {
  width: 100px;
  height: 30px;
  background: #fff;
  border-radius: 4px;
  line-height: 30px;
  box-shadow: 0px 3px 4px 0px rgb(99 118 154 / 4%);
  border: 1px solid #f0f0f0;
  color: #333;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
}
.subBtns {
  margin-top: 40px;
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
