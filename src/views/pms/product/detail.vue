<template>
  <div class="app-container">
    <div class="modelDiv">
      <p class="modelTit">基础信息</p>
      <div style="margin: 0 20px; padding-bottom: 20px">
        <div class="flex">
          <div class="fn1">商品分类</div>
          <div class="fn2">{{ productParam.firstClassifyName }}-{{ productParam.secondClassifyName }}-{{ productParam.thirdClassifyName }}</div>
        </div>
        <div class="flex">
          <div class="fn1">商品标题</div>
          <div class="fn2">{{ productParam.name }}</div>
        </div>
        <div class="flex">
          <div class="fn1">商品副标题</div>
          <div class="fn2">{{ productParam.subTitle }}</div>
        </div>
        <div class="flex">
          <div class="fn1">商品类型</div>
          <div class="fn2">
            {{ productParam.type == 0 ? "虚拟商品" : "实体商品" }}
          </div>
        </div>
        <div class="flex">
          <div class="fn1">品牌</div>
          <div class="fn2">{{ productParam.brandName }}</div>
        </div>
        <div class="flex">
          <div class="fn1">贸易类型</div>
          <div class="fn2">暂无</div>
        </div>
      </div>
    </div>
    <div class="modelDiv">
      <p class="modelTit">商品属性</p>
      <div style="margin: 0 20px; padding-bottom: 20px">
        <el-row>
          <el-col :span="12" v-for="item in selectProductParam" :key="item.id">
            <div class="flex">
              <div class="fn1">{{ item.name }}</div>
              <div class="fn2">{{ item.value | formatNull }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="modelDiv">
      <p class="modelTit">图片管理</p>
      <div style="margin: 0 20px; padding-bottom: 20px">
        <div class="flex">
          <p class="lbt">商品轮播图:</p>
          <!-- <div>
            <div class="viewzwClass"></div>
            <p class="sp">视频</p>
          </div> -->
          <div class="swiper-imgs">
            <div class="imgs">
              <img
                :src="item"
                v-for="(item, index) in selectProductPics"
                :key="index"
              />
            </div>
          </div>
        </div>
         <div class="flex">
          <p class="lbt">商品详情图:</p>
          <div class="swiper-imgs">
            <div class="imgs">
              <img
                :src="item"
                v-for="(item, index) in selectProductPics1"
                :key="index"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modelDiv">
      <p class="modelTit">价格及库存</p>
      <div style="margin: 0 20px; padding-bottom: 20px">
        <el-table
          style="margin-top: 20px"
          :data="productParam.skuStockList"
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
          
          <el-table-column label="供货价" align="center">
             <template slot-scope="scope">
              <div>{{ scope.row.supplyPrice }}</div>
            </template>
          </el-table-column>
          <el-table-column label="企业价" align="center">
             <template slot-scope="scope">
              <div>{{ scope.row.enterprisePrice }}</div>
            </template>
          </el-table-column>
          <el-table-column label="销售价格" width="200" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.price }}</div>
            </template>
          </el-table-column>
          <el-table-column label="划线价" align="center">
             <template slot-scope="scope">
              <div>{{ scope.row.underlinePrice }}</div>
            </template>
          </el-table-column>
          <el-table-column label="重量(kg)" align="center">
             <template slot-scope="scope">
              <div>{{ scope.row.weight }}</div>
            </template>
          </el-table-column>
          <el-table-column label="商家SKU编号" align="center" width="200">
            <template slot-scope="scope">
              <div>{{ scope.row.skuCode }}</div>
            </template>
          </el-table-column>
          <el-table-column label="库存" width="200" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.stock }}</div>
            </template>
          </el-table-column>
          <el-table-column label="平台SKU编号" align="center" width="200">
            <template slot-scope="scope">
              <div>{{ scope.row.skuPlatformCode }}</div>
            </template>
          </el-table-column>
          <el-table-column label="预览图" align="center" width="200">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                alt=""
                style="width: 50px; height: 50px"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="modelDiv">
      <!-- <p class="modelTit">服务与承诺</p>
      <div style="margin: 0 20px; padding-bottom: 20px">
        <div class="flex">
          <div class="fn1">商品限制</div>
          <div class="fn2">
            <el-checkbox-group v-model="checkList" disabled>
              <el-checkbox label="增值税电子普通发票"></el-checkbox>
              <el-checkbox label="增值税纸质普通发票"></el-checkbox>
              <el-checkbox label="增值税纸质专用发票"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="flex">
          <div class="fn1">自动下架</div>
          <div class="zdClass">
            <el-radio v-model="radio" label="1" disabled>否</el-radio>
            <el-radio v-model="radio" label="2" disabled>是</el-radio>
            <p class="fn1">当上架后库存为0时自动下架</p>
          </div>
        </div> -->
        <p class="backClass" @click="$router.back()">返回列表</p>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { getProduct } from "@/api/product";
import { fetchList } from "@/api/productAttr";
export default {
  name: "memberDetail",
  data() {
    return {
      productParam: "",
      selectProductAttr: [],
      selectProductParam: [],

      checkList: ["增值税电子普通发票", "增值税纸质普通发票"],
      radio: "1",
    };
  },
  created() {
    getProduct(this.$route.query.id).then((response) => {
      this.productParam = response.data;
      this.handleEditCreated();
    });
  },

  computed: {
    //商品的主图和画册图片
    selectProductPics: {
      get: function () {
        let pics = [];
        if (
          this.productParam.pic === undefined ||
          this.productParam.pic == null ||
          this.productParam.pic === ""
        ) {
          return pics;
        }
        pics.push(this.productParam.pic);
        if (
          this.productParam.albumPics === undefined ||
          this.productParam.albumPics == null ||
          this.productParam.albumPics === ""
        ) {
          return pics;
        }
        let albumPics = this.productParam.albumPics.split(",");
        for (let i = 0; i < albumPics.length; i++) {
          pics.push(albumPics[i]);
        }
        return pics;
      },
    },
     selectProductPics1: {
      get: function () {
        let pics = [];
        if (
          this.productParam.detailMobileHtml === undefined ||
          this.productParam.detailMobileHtml == null ||
          this.productParam.detailMobileHtml === ""
        ) {
          return pics;
        }
        let albumPics = this.productParam.detailMobileHtml.split(",");
        for (let i = 0; i < albumPics.length; i++) {
          pics.push(albumPics[i]);
        }
        return pics;
      },
    },
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    type(value) {
      if (value == 1) {
        return "支付宝小程序";
      } else if (value == 2) {
        return "微信公众号";
      }
    },
  },
  methods: {
    getProductSkuSp(row, index) {
      if (index === 0) {
        return row.sp1;
      } else if (index === 1) {
        return row.sp2;
      } else {
        return row.sp3;
      }
    },
    handleEditCreated() {
      this.getList();
      this.getProductAttrList();
    },
    // 属性
    async getList() {
      let params = {
        type: 1,
        status: 0,
      };
      let { data: list } = await fetchList(
        this.productParam.thirdClassifyId,
        params
      );
      for (let i = 0; i < list.length; i++) {
        let value = null;
        value = this.getEditParamValue(list[i].id);
        this.selectProductParam.push({
          id: list[i].id,
          name: list[i].name,
          value: value,
          inputType: list[i].inputType,
          inputList: list[i].inputList,
        });
        console.log(this.selectProductParam, "selectProductParam");
      }
    },
    // 规格
    getProductAttrList() {
      let param = {
        type: 0,
        status: 0,
      };
      fetchList(this.productParam.thirdClassifyId, param).then((response) => {
        let list = response.data;
        this.selectProductAttr = [];
        for (let i = 0; i < list.length; i++) {
          let options = [];
          let values = [];
          if (list[i].handAddStatus === 1) {
            options = this.getEditAttrOptions(list[i].id);
          }
          values = this.getEditAttrValues(i);
          this.selectProductAttr.push({
            id: list[i].id,
            name: list[i].name,
            handAddStatus: list[i].handAddStatus,
            inputList: list[i].inputList,
            values: values,
            options: options,
            addProductAttrValue: null,
          });
        }
        console.log(this.selectProductAttr, "selectProductAttr");
        // if (this.isEdit) {
        //   //编辑模式下刷新商品属性图片
        //   this.refreshProductAttrPics();
        // }
      });
    },
    //获取属性的值
    getEditParamValue(id) {
      for (
        let i = 0;
        i < this.productParam.productAttributeValueList.length;
        i++
      ) {
        if (
          id ===
          this.productParam.productAttributeValueList[i].productAttributeId
        ) {
          return this.productParam.productAttributeValueList[i].value;
        }
      }
    },
    //获取选中的属性值
    getEditAttrValues(index) {
      let values = [];
      if (index === 0) {
        return;
        this.productParam.skuStockList.forEach((item) => {
          item.price = item.price.toString();
          item.stock = item.stock.toString();
          item.lowStock = item.lowStock.toString();
        });
        for (let i = 0; i < this.productParam.skuStockList.length; i++) {
          let sku = this.productParam.skuStockList[i];
          if (sku.sp1 != null && values.indexOf(sku.sp1) === -1) {
            values.push(sku.sp1);
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < this.productParam.skuStockList.length; i++) {
          let sku = this.productParam.skuStockList[i];
          if (sku.sp2 != null && values.indexOf(sku.sp2) === -1) {
            values.push(sku.sp2);
          }
        }
      } else {
        for (let i = 0; i < this.productParam.skuStockList.length; i++) {
          let sku = this.productParam.skuStockList[i];
          if (sku.sp3 != null && values.indexOf(sku.sp3) === -1) {
            values.push(sku.sp3);
          }
        }
      }

      return values;
    },
    //获取设置的可手动添加属性值
    getEditAttrOptions(id) {
      let options = [];
      for (
        let i = 0;
        i < this.productParam.productAttributeValueList.length;
        i++
      ) {
        let attrValue = this.productParam.productAttributeValueList[i];
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
    assets() {
      //  this.$router.push({ path: "/ums/updateMember", query: { id: row.id } });
      this.$router.push({ path: "/ums/assets" });
    },
  },
};
</script>
<style  lang="scss" scoped>
.title {
  height: 60px;
  width: 100%;
  background: #eee;
  line-height: 60px;
  box-sizing: border-box;
  padding-left: 20px;
  color: #0997f7;
  font-weight: bold;
}
.swiper-imgs {
  display: flex;
}
.swiper-imgs .imgs img {
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: inline-block;
}
.viewzwClass {
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: inline-block;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form {
  width: 1000px;
  box-sizing: border-box;
  padding-left: 50px;
}
.flex {
  display: flex;
  margin-top: 15px;
  padding-left: 20px;
}
.flex > div:first-child {
  width: 200px;
}

.assets {
  position: absolute;
  right: 30px;
}
.modelDiv {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.01);
  margin: 20px 30px;
  margin-bottom: 0;
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
.fn1 {
  font-size: 14px;
  color: #999;
}
.fn2 {
  font-size: 14px;
  color: #333;
}
.lbt {
  font-size: 12px;
  color: #333;
  font-weight: 500;
  margin-left: 20px;
  margin-top: 15px;
}
.sp {
  font-size: 12px;
  text-align: center;
  width: 148px;
}
.zdClass {
  display: flex;
  align-items: center;
}
.backClass {
  width: 100px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  color: #333;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  margin-top: 40px;
  margin-left: 20px;
}
</style>