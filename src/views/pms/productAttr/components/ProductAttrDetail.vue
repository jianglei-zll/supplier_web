<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="productAttr"
      :rules="rules"
      ref="productAttrFrom"
      label-width="150px"
    >
      <el-form-item label="规格名称：" prop="name">
        <el-input v-model="productAttr.name"></el-input>
      </el-form-item>
      <el-form-item label="规格别名：">
        <el-input v-model="productAttr.rectName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="限制：" prop="xz">
        <el-radio v-model="radio" label="1">选填</el-radio>
        <el-radio v-model="radio" label="2">必填</el-radio>
      </el-form-item> -->
      <!-- <el-form-item label="重要提示：">
        <el-select v-model="value" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="规格说明：">
        <el-input v-model="productAttr.note"></el-input>
      </el-form-item>
      <!-- <el-form-item label="规格交互：" prop="ggjh">
        <el-select v-model="value" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="规格值：">
            <div class="flex">
              <el-input></el-input>
              <div class="tabBtns" style="margin-left:10px">
                <p >
                  <img src="../../../../assets/imgs/shanchu.png"/>
                  <span>删除</span>
                </p>
              </div>
            </div>
            <p class="tj">添加规格值</p>
      </el-form-item> -->
      <!-- <el-form-item label="商品类型：" prop="productAttributeCategoryId">
        <el-select
          v-model="productAttr.productAttributeCategoryId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in productAttrCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-radio-group v-model="productAttr.type">
          <el-radio :label="1">属性</el-radio>
          <el-radio :label="0">规格</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item>
        <div class="subBtns">
            <p @click="back">返回</p>
            <p @click="onSubmit('productAttrFrom')">确定</p>
        </div>
        <!-- <el-button type="primary" @click="onSubmit('productAttrFrom')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('productAttrFrom')"
          >重置</el-button
        > -->
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

const defaultProductAttr = {
 name:"",
 rectName:"",
 note:""
};
export default {
  name: "ProductAttrDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radio: 1,
      options:[{label:'无提示',value:''},{label:'带※号提示',value:'1'}],
      value:'',
      options1:[{label:'复选框',value:''},{label:'输入框',value:'1'}],

      productAttr: Object.assign({}, defaultProductAttr),
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


        xz:[{ required: true, message: "请选择限制类型"}],
        ggjh:[{ required: true, message: "请选择规格交互"}]
      },
      productAttrCateList: null,
      inputListFormat: null,
    };
  },
  created() {
    if (this.isEdit) {
      getProductAttr(this.$route.query.id).then((response) => {
        this.productAttr = response.data;
        this.inputListFormat = this.productAttr.inputList.replace(/,/g, "\n");
      });
    } else {
      this.resetProductAttr();
    }
    // this.getCateList();
  },
  watch: {
    inputListFormat: function (newValue, oldValue) {
      newValue = newValue.replace(/\n/g, ",");
      this.productAttr.inputList = newValue;
    },
  },
  methods: {
    back(){
     this.$router.back();
    },
    getCateList() {
      let listQuery = { pageNum: 1, pageSize: 100 };
      fetchList(listQuery).then((response) => {
        this.productAttrCateList = response.data.records;
      });
    },
    resetProductAttr() {
      this.productAttr = Object.assign({}, defaultProductAttr);
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
              updateProductAttr(this.$route.query.id, this.productAttr).then(
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
              createProductAttr(this.productAttr).then((response) => {
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
.flex{
  display: flex;
  align-items: center;
}
.tj{
  width: 100px;
  height: 30px;
  background: #fff;
  border-radius: 4px;
  line-height: 30px;
  box-shadow: 0px 3px 4px 0px rgb(99 118 154 / 4%);
  border: 1px solid #F0F0F0;
  color:#333;
  text-align: center;
  cursor:pointer;
  margin-top: 10px;
}
.subBtns{
  margin-top: 40px;
  margin-bottom:0;
  padding-bottom:0;

}
</style>
