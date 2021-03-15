<template>
  <div class="modelDiv">
    <p class="modelTit">
      <span>商品属性</span>
      <span
        >请准确填写属性，有利于商品在搜索和推荐中露出，错误填写可能面临商品下架或流量损失!
        (注：带※重要属性)</span
      >
    </p>
    <div style="margin: 0 20px; padding-bottom: 20px">
      <el-form ref="productAttrForm" label-width="150px">
        <div
          class="elItem"
          style="padding-left: 20px"
          v-if="
            (selectProductParam != undefined) & (selectProductParam.length == 0)
          "
        >
          改分类下暂无相关属性
        </div>
        <div class="elItem" v-else>
          <div
            v-for="item in selectProductParam"
            :key="item.id"
            style="width: 40%"
          >
            <el-form-item :label="item.name">
              <el-input style="width: 300px" v-model="item.value"></el-input>
            </el-form-item>
          </div>
        </div>

        <!-- <el-row class="elItem">
          <el-col :span="6">
            <el-form-item label="品牌" prop="pinpai">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="口味">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="包装方式">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="特产品类">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="单规格净含量※" prop="jhl">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否为有机食品">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="省份">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产日期" prop="scrq">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="包装规格※" prop="bzgg">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保质期" prop="bzq">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="酒精度数">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="黄酒种类">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年份">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="食品生产许可证编号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品标准号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { fetchListAll } from "@/api/productCate";
import { fetchList } from "@/api/productAttr";
export default {
  name: "productAttribute",
  watch: {
    "value.thirdClassifyId": {
      handler: function () {
        this.getList();
      },
    },
    selectProductParam: {
      handler: function () {
        this.value.newselectProductParam = this.selectProductParam;
      },
    },
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
      selectProductParam: [],
      options1: [{ label: "会稽山", value: "" }],
      options2: [{ label: "干型黄酒（总糖：10.0g/L以下）", value: "" }],
      options3: [{ label: "瓶装", value: "" }],
      options4: [{ label: "是", value: "" }],
      options5: [{ label: "浙江省", value: "" }],
      options6: [{ label: "糯米黄酒", value: "" }],
      rules: {
        pinpai: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        jhl: [
          { required: true, message: "请填写单规格净含量", trigger: "blur" },
        ],
        scrq: [{ required: true, message: "请选择生产日期", trigger: "blur" }],
        bzgg: [{ required: true, message: "请填写包装规格", trigger: "blur" }],
        bzq: [{ required: true, message: "请填写保质期", trigger: "blur" }],
      },
    };
  },
  methods: {
    async getdistrictArr(id) {
      let params = {
        parentId: id,
        isClosed: 0,
      };
      const { code, data } = await fetchListAll(params);
      this.districtArr = data;
    },
    //获取属性的值
    getEditParamValue(id) {
      for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
        if (id == this.value.productAttributeValueList[i].productAttributeId) {
          return this.value.productAttributeValueList[i].value;
        }
      }
    },
    async getList() {
      let params = {
        type: 1,
        status: 0,
      };
      let { data: list } = await fetchList(this.value.thirdClassifyId, params);
      for (let i = 0; i < list.length; i++) {
        let value = null;
        if (this.isEdit) {
          //编辑模式下获取参数属性
          value = this.getEditParamValue(list[i].id);
        }
        this.selectProductParam.push({
          id: list[i].id,
          name: list[i].name,
          value: value,
          inputType: list[i].inputType,
          inputList: list[i].inputList,
        });
      }
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
  span:last-child {
    color: #999999;
    font-size: 12px;
    padding-left: 20px;
  }
}
.el-select,
.el-date-editor {
  width: 100%;
}
.elItem {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
</style>