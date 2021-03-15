<template>
  <div class="modelDiv">
    <p class="modelTit">
      <span>商品规格</span>
    </p>
    <div class="cardBg" v-if="selectProductAttr.length > 0">
      <div
        v-for="(productAttr, idx) in selectProductAttr"
        :key="idx"
        style="margin-bottom: 20px; width: 40%"
      >
        <div style="margin-bottom: 15px; margin-left: 10px">
          {{ productAttr.name }}：
        </div>
        <div>
          <el-checkbox-group v-model="selectProductAttr[idx].values">
            <div
              v-for="(item, index) in selectProductAttr[idx].options"
              style="display: inline-block"
              class="littleMarginLeft"
              :key="index"
            >
              <el-checkbox :label="item" :key="item"></el-checkbox>
              <el-button
                type="text"
                class="littleMarginLeft"
                @click="handleRemoveProductAttrValue(idx, index)"
                >删除
              </el-button>
            </div>
          </el-checkbox-group>
          <el-input
            v-model="selectProductAttr[idx].addProductAttrValue"
            style="width: 160px; margin-left: 10px"
            clearable
          ></el-input>
          <el-button
            class="littleMarginLeft"
            @click="handleAddProductAttrValue(idx)"
            >增加</el-button
          >
        </div>
      </div>
    </div>
    <div style="padding-left: 20px" shadow="never" class="cardBg" v-else>
      改分类下暂无规格
    </div>
    <p class="modelTit" style="position: relative">
      价格及库存
      <el-button
        type="primary"
        class="refButton"
        size="mini"
        round
        @click="handleRefreshProductSkuList"
        >刷新</el-button
      >
    </p>
    <div
      style="
        margin: 0 20px;
        padding-bottom: 20px;
        padding-top: 20px;
        margin-left: 40px;
      "
    >
      <el-row style="margin-bottom: 10px">
        <el-col :span="8">
          <span class="ft1">批量设置</span>
          <span class="ft2">在下方栏中选择内容进行批量填充</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="4"
          v-for="(item, index) in selectProductAttr"
          :key="index"
        >
          <el-select v-model="item.selectId" placeholder="请选择">
            <el-option
              v-for="(item1, index) in item.values"
              :key="index"
              :label="item1"
              :value="item1"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-col :span="4" class="ft1">企业价</el-col>
        <el-col :span="4">销售价</el-col>
        <el-col :span="4">划线价</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-input class="ipClass" v-model="enterprisePrice"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="ipClass" v-model="price"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="ipClass" v-model="underlinePrice"></el-input>
        </el-col>
        <el-col :span="4">
          <p class="szClass" @click="setPrice">设置</p>
        </el-col>
      </el-row>
      <el-table
        style="width: 100%; margin-top: 20px"
        :data="value.skuStockList"
        border
      >
        <el-table-column
          v-for="(item, index) in selectProductAttr"
          :label="item.name"
          :key="item.id"
          align="center"
          width="125"
        >
          <template slot-scope="scope">
            {{ getProductSkuSp(scope.row, index) }}
          </template>
        </el-table-column>
        <el-table-column label="供货价※" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.supplyPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="企业价※" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.enterprisePrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="销售价※" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="划线价※" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.underlinePrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="重量(kg)※" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商家SKU编码" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode" :disabled="isEdit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存※" align="center">
          <template slot-scope="scope">
            <!-- <el-input
              v-model="scope.row.stock"
              :disabled="value.type == 0 ? true : false"
            ></el-input> -->
              <el-input
              v-model="scope.row.stock"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="属性图片：" align="left" width="340">
          <template slot-scope="scope">
            <single-upload
              v-model="scope.row.pic"
              style="width: 300px; display: inline-block; margin-left: 10px"
            ></single-upload>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleRemoveProductSku(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <el-row type="flex" align="middle" style="margin-top: 15px">
        <el-col :span="4">
          <span class="ft3">总库存</span>
          <span class="ft1">待统计</span>
        </el-col>
        <el-col :span="6">
          <div style="display: flex">
            <p class="ft3 tp">单位</p>
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="display: flex">
            <p class="ft3 tp">发货仓</p>
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/productAttr";
import SingleUpload from "@/components/Upload/singleUpload";
export default {
  name: "productPrice",
  components: { SingleUpload },

  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let objectValueAllEmpty = function (object, type, isEdit) {
      console.log(object);
      var isEmpty = true;
      let data;
      if (type == 0) {
        data = {
          price: object.price,
          lowStock: object.lowStock,
          skuCode: object.skuCode,
        };
      } else {
        data = {
          price: object.price,
          stock: object.stock,
          lowStock: object.lowStock,
          skuCode: object.skuCode,
        };
      }
      Object.keys(data).forEach(function (x) {
        let data1;
        if (isEdit) {
          data1 = data[x].toString();
        } else {
          data1 = data[x];
        }
        if (data1 == null || data1 == "") {
          isEmpty = false;
        }
      });
      if (isEmpty) {
        //值全为空
        return true;
      }
      return false;
    };
    let checkSpu = (rule, value, callback) => {
      if (this.value.skuStockList.length == 0) {
        return callback(new Error("请添加商品规格"));
      } else {
        for (let item of this.value.skuStockList) {
          // let check;
          // if (this.value.type == 0) {
          //   check = item.skuCode && item.lowStock && item.price;
          // } else {
          //   check = item.skuCode && item.lowStock && item.price && item.stock;
          // }
          let check = objectValueAllEmpty(item, this.value.type, this.isEdit);
          if (check) {
            callback();
          } else {
            return callback(new Error("请添加各自商品规格属性"));
          }
        }
      }
    };
    return {
      rules: {
        spuPlatformCode: [
          { required: true, message: "请选择spu", trigger: "blur" },
        ],
        specifications: [
          {
            required: true,
            validator: checkSpu,
            trigger: "blur",
          },
        ],
      },
      selectSku: [],
      selectLoading: false,
      //编辑模式时是否初始化成功
      hasEditCreated: false,
      //商品属性分类下拉选项
      productAttributeCategoryOptions: [],
      //选中的商品属性
      selectProductAttr: [],
      //选中的商品参数
      selectProductParam: [],
      //选中的商品属性图片
      selectProductAttrPics: [],
      //可手动添加的商品属性
      addProductAttrValue: "",
      //商品富文本详情激活类型
      activeHtmlName: "mobile",
      value1: "",
      options1: [],
      enterprisePrice: "",
      price: "",
      underlinePrice: "",
    };
  },
  computed: {
    //是否有商品属性图片
    hasAttrPic() {
      if (this.selectProductAttrPics.length < 1) {
        return false;
      }
      return true;
    },
    //商品的编号
    productId() {
      return this.value.id;
    },
  },
  created() {
    // this.getProductAttrCateList();
  },
  watch: {
    selectProductAttr: {
      handler: function () {
        this.value.newselectProductAttr = this.selectProductAttr;
      },
    },
    productId: function (newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
    "value.thirdClassifyId": {
      handler: function () {
        this.getProductAttrList();
      },
    },
  },
  methods: {
    setPrice() {
      let list = this.selectProductAttr;
      let length = list.length;
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < this.value.skuStockList.length; j++) {
          switch (length) {
            case 1:
              if (list[0].selectId == this.value.skuStockList[j].sp1) {
                this.$set(this.value.skuStockList[j],"enterprisePrice",this.enterprisePrice)
                this.$set(this.value.skuStockList[j],"price",this.price)
                this.$set(this.value.skuStockList[j],"underlinePrice",this.underlinePrice)
              }
              break;
            case 2:
              if (
                list[0].selectId == this.value.skuStockList[j].sp1 &&
                list[1].selectId == this.value.skuStockList[j].sp2
              ) {
                 this.$set(this.value.skuStockList[j],"enterprisePrice",this.enterprisePrice)
                this.$set(this.value.skuStockList[j],"price",this.price)
                this.$set(this.value.skuStockList[j],"underlinePrice",this.underlinePrice)
              }
              break;
            case 3:
              if (
                list[0].selectId == this.value.skuStockList[j].sp1 &&
                list[1].selectId == this.value.skuStockList[j].sp2 &&
                list[2].selectId == this.value.skuStockList[j].sp3
              ) {
                this.$set(this.value.skuStockList[j],"enterprisePrice",this.enterprisePrice)
                this.$set(this.value.skuStockList[j],"price",this.price)
                this.$set(this.value.skuStockList[j],"underlinePrice",this.underlinePrice)
              }
              break;
          }
        }
      }
    },
    searchProductMethod(query) {
      if (query !== "") {
        this.loading = true;
        fetchSpuList({ keyword: query }).then((response) => {
          this.loading = false;
          let skuList = response.data;
          this.selectSku = [];
          for (let i = 0; i < skuList.length; i++) {
            let item = skuList[i];
            let data = {
              id: item.id,
              spuName: item.spuName,
              spuPlatformCode: item.spuPlatformCode,
            };
            this.selectSku.push(data);
          }
        });
      } else {
        this.selectSku = [];
      }
    },
    handleEditCreated() {
      //根据商品属性分类id获取属性和参数
      if (this.value.productAttributeCategoryId != null) {
        this.handleProductAttrChange(this.value.productAttributeCategoryId);
      }
      this.hasEditCreated = true;
    },
    getProductAttrList() {
      let param = {
        type: 1,
        status: 0,
      };
      fetchList(this.value.thirdClassifyId, param).then((response) => {
        let list = response.data;
        this.selectProductAttr = [];
        for (let i = 0; i < list.length; i++) {
          let options = [];
          let values = [];
          if (this.isEdit) {
            if (list[i].handAddStatus === 1) {
              //编辑状态下获取手动添加编辑属性
              options = this.getEditAttrOptions(list[i].id);
            }
            //编辑状态下获取选中属性
            values = this.getEditAttrValues(i);
          }
          this.selectProductAttr.push({
            id: list[i].id,
            name: list[i].name,
            handAddStatus: list[i].handAddStatus,
            inputList: list[i].inputList,
            values: values,
            options: options,
            addProductAttrValue: null,
          });
          console.log(this.selectProductAttr, "selectProductAttr");
        }
        if (this.isEdit) {
          //编辑模式下刷新商品属性图片
          // this.refreshProductAttrPics();
        }
      });
    },
    //获取设置的可手动添加属性值
    getEditAttrOptions(id) {
      let options = [];
      for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
        let attrValue = this.value.productAttributeValueList[i];
        if (attrValue.productAttributeId === id) {
          let strArr = attrValue.value.split(",");
          for (let j = 0; j < strArr.length; j++) {
            options.push(strArr[j]);
          }
          break;
        }
      }
      return options;
    },
    //获取选中的属性值
    getEditAttrValues(index) {
      let values = [];
      if (index === 0) {
        // this.value.skuStockList.forEach((item) => {
        //   item.price = item.price.toString();
        //   item.stock = item.stock.toString();
        //   item.lowStock = item.lowStock.toString();
        // });
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          if (sku.sp1 != null && values.indexOf(sku.sp1) === -1) {
            values.push(sku.sp1);
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          if (sku.sp2 != null && values.indexOf(sku.sp2) === -1) {
            values.push(sku.sp2);
          }
        }
      } else {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          if (sku.sp3 != null && values.indexOf(sku.sp3) === -1) {
            values.push(sku.sp3);
          }
        }
      }

      return values;
    },

    getInputListArr(inputList) {
      return inputList.split(",");
    },
    handleAddProductAttrValue(idx) {
      let options = this.selectProductAttr[idx].options;
      let addProductAttrValue = this.selectProductAttr[idx].addProductAttrValue;
      if (addProductAttrValue == null || addProductAttrValue == "") {
        this.$message({
          message: "属性值不能为空",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (options.indexOf(addProductAttrValue) !== -1) {
        this.$message({
          message: "属性值不能重复",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.selectProductAttr[idx].options.push(addProductAttrValue);
      this.selectProductAttr[idx].addProductAttrValue = null;
    },
    handleRemoveProductAttrValue(idx, index) {
      this.selectProductAttr[idx].options.splice(index, 1);
      console.log(this.selectProductAttr, "删除");
      console.log(this.selectProductAttr[idx], "删除");
    },
    getProductSkuSp(row, index) {
      if (index === 0) {
        return row.sp1;
      } else if (index === 1) {
        return row.sp2;
      } else {
        return row.sp3;
      }
    },
    handleRefreshProductSkuList() {
      this.$confirm("刷新列表将导致sku信息重新生成，是否要刷新", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // this.refreshProductAttrPics();
        this.refreshProductSkuList();
      });
    },
    handleSyncProductSkuPrice() {
      this.$confirm("将同步第一个sku的价格到所有sku,是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (
          this.value.skuStockList !== null &&
          this.value.skuStockList.length > 0
        ) {
          let price = this.value.skuStockList[0].price;
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            this.value.skuStockList[i].price = price;
          }
        }
      });
    },
    refreshProductSkuList() {
      let skuList = [];
      console.log(this.selectProductAttr);
      //只有一个属性时
      if (this.selectProductAttr.length === 1) {
        let values = this.selectProductAttr[0].values;
        for (let i = 0; i < values.length; i++) {
          skuList.push({
            sp1: values[i],
          });
        }
      } else if (this.selectProductAttr.length === 2) {
        let values0 = this.selectProductAttr[0].values;
        let values1 = this.selectProductAttr[1].values;
        for (let i = 0; i < values0.length; i++) {
          if (values1.length === 0) {
            skuList.push({
              sp1: values0[i],
            });
            continue;
          }
          for (let j = 0; j < values1.length; j++) {
            skuList.push({
              sp1: values0[i],
              sp2: values1[j],
            });
          }
        }
      } else {
        let values0 = this.selectProductAttr[0].values;
        let values1 = this.selectProductAttr[1].values;
        let values2 = this.selectProductAttr[2].values;
        for (let i = 0; i < values0.length; i++) {
          if (values1.length === 0) {
            skuList.push({
              sp1: values0[i],
            });
            continue;
          }
          for (let j = 0; j < values1.length; j++) {
            if (values2.length === 0) {
              skuList.push({
                sp1: values0[i],
                sp2: values1[j],
              });
              continue;
            }
            for (let k = 0; k < values2.length; k++) {
              skuList.push({
                sp1: values0[i],
                sp2: values1[j],
                sp3: values2[k],
              });
            }
          }
        }
      }
      this.$set(this.value, "skuStockList", skuList);
    },
    refreshProductAttrPics() {
      this.selectProductAttrPics = [];
      if (this.selectProductAttr.length >= 1) {
        let values = this.selectProductAttr[0].values;
        for (let i = 0; i < values.length; i++) {
          let pic = null;
          if (this.isEdit) {
            //编辑状态下获取图片
            pic = this.getProductSkuPic(values[i]);
          }
          this.selectProductAttrPics.push({ name: values[i], pic: pic });
        }
      }
    },
    //获取商品相关属性的图片
    getProductSkuPic(name) {
      for (let i = 0; i < this.value.skuStockList.length; i++) {
        if (name === this.value.skuStockList[i].sp1) {
          return this.value.skuStockList[i].pic;
        }
      }
      return null;
    },
    //合并商品属性
    mergeProductAttrValue() {
      this.value.productAttributeValueList = [];
      for (let i = 0; i < this.selectProductAttr.length; i++) {
        let attr = this.selectProductAttr[i];
        if (
          attr.handAddStatus === 1 &&
          attr.options != null &&
          attr.options.length > 0
        ) {
          this.value.productAttributeValueList.push({
            productAttributeId: attr.id,
            name: attr.name,
            type: 1,
            value: this.getOptionStr(attr.options),
          });
        }
      }
      for (let i = 0; i < this.selectProductParam.length; i++) {
        let param = this.selectProductParam[i];
        this.value.productAttributeValueList.push({
          productAttributeId: param.id,
          name: param.name,
          type: 2,
          value: param.value,
        });
      }
    },
    //合并商品属性图片
    mergeProductAttrPics() {
      for (let i = 0; i < this.selectProductAttrPics.length; i++) {
        for (let j = 0; j < this.value.skuStockList.length; j++) {
          if (
            this.value.skuStockList[j].sp1 ===
            this.selectProductAttrPics[i].name
          ) {
            // this.value.skuStockList[j].pic = this.selectProductAttrPics[i].pic;
          }
        }
      }
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
    handleRemoveProductSku(index, row) {
      let list = this.value.skuStockList;
      if (list.length === 1) {
        list.pop();
      } else {
        list.splice(index, 1);
      }
      console.log(this.value.skuStockList);
    },
    getParamInputList(inputList) {
      return inputList.split(",");
    },
    handlePrev() {
      this.$emit("prevStep");
    },
    handleNext() {
      this.mergeProductAttrValue();
      this.mergeProductAttrPics();
      this.$emit("nextStep");
    },
    handleFinishCommit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.mergeProductAttrValue();
          this.mergeProductAttrPics();
          this.$emit("finishCommit", this.isEdit);
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
  },
};
</script>
<style lang="scss" scoped>
.littleMarginLeft {
  margin-left: 10px;
}
.cardBg {
  margin-top: 15px;
  // display: flex;
  // flex-wrap: wrap;
  margin-left: 20px;
}
.refButton {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
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
.szClass {
  width: 120px;
  height: 36px;
  background: #fc6602;
  box-shadow: 0px 4px 10px 0px rgba(252, 131, 2, 0.14);
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
}
.ft1 {
  font-size: 12px;
}
.ft2 {
  font-size: 12px;
  color: #999;
  padding-left: 12px;
}
.ft3 {
  font-size: 12px;
  color: #999;
}
.tp {
  margin-top: 14px;
  margin-right: 20px;
}
.ipClass {
  width: 210px;
}
.elItem {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
</style>