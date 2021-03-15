<template>
   
  <div style="width: 1000px; margin: 0 auto">
    <el-form
      ref="baseMarkFrom"
      :model="activity"
      :rules="rules1"
      label-width="150px"
    >
      <div class="modelDiv">
        <p class="modelTit">
          <span>商品属性</span>
          <span></span>
        </p>
        <div style="margin: 0 20px; padding-bottom: 20px">
          <el-form-item label="活动标题：" prop="name" style="margin-top: 20px">
            <el-input v-model="activity.name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="移动端标题：" prop="mobileName">
            <el-input
              v-model="activity.mobileName"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动规则：">
            <el-input
              v-model="activity.ruleOfActivity"
              type="textarea"
              :autosize="{ minRows: 3 }"
              maxlength="180"
              class="input-width"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="modelDiv">
        <p class="modelTit">
          <span>活动限制</span>
          <span></span>
        </p>
        <div style="margin: 0 20px; padding-bottom: 20px">
          <el-form-item label="活动时间：" prop="time" style="margin-top: 20px">
            <el-date-picker
              v-model="activity.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="赠送维度：" prop="zswd">
              <el-radio v-model="radio" label="1" fill="#FC6602">订单维度</el-radio>
              <el-radio v-model="radio" label="2" fill="#FC6602" disabled>商品维度(暂缓)</el-radio>
            </el-form-item>
             <el-form-item label="赠品不足：" prop="zpbz">
              <el-radio v-model="radio" label="1" fill="#FC6602">可继续下单(不送赠品)</el-radio>
              <el-radio v-model="radio" label="2" fill="#FC6602" disabled>不可下单(暂缓)</el-radio>
            </el-form-item> -->
        </div>
      </div>
    </el-form>
    <div class="modelDiv">
      <p class="modelTit">
        <span>适应商品</span>
        <span></span>
      </p>
      <div style="margin: 0 20px; padding-bottom: 20px">
        <div class="tbtns" @click="addMaingoods">
          <p>添加主商品</p>
        </div>
        <el-table border style="margin-top: 10px" :data="mainItems">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column label="SPU编号" align="center">
            <template slot-scope="scope">{{
              scope.row.spuPlatformCode
            }}</template>
          </el-table-column>
          <el-table-column label="商品名称" align="center">
            <template slot-scope="scope">{{ scope.row.productName }}</template>
          </el-table-column>
          <el-table-column label="SKU编号" align="center">
            <template slot-scope="scope">{{
              scope.row.skuPlatformCode
            }}</template>
          </el-table-column>
          <el-table-column label="SKU名称" align="center">
            <template slot-scope="scope">{{ scope.row.skuName }}</template>
          </el-table-column>
          <el-table-column label="价格" align="center">
            <template slot-scope="scope">{{ scope.row.money }}</template>
          </el-table-column>
          <el-table-column label="SKU操作" align="center">
            <template slot-scope="scope">
              <el-switch
                :value="!scope.row.isClosed"
                @input="handleInput(scope.$index, scope.row)"
                active-color="#44DB5E"
                inactive-color="#DDDDDD"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <div class="tabBtns">
                <p @click="handleDeleteMaingoods(scope.$index, scope.row)">
                  <img src="../../../../assets/imgs/shanchu.png" />
                  <span>删除</span>
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="tbtns" @click="addGift">
          <p>添加赠品</p>
        </div>
        <el-table border :data="subsidiaryItems" style="margin-top: 10px">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column label="SPU编号" align="center">
            <template slot-scope="scope">{{
              scope.row.spuPlatformCode
            }}</template>
          </el-table-column>
          <el-table-column label="商品名称" align="center">
            <template slot-scope="scope">{{ scope.row.productName }}</template>
          </el-table-column>
          <el-table-column label="SKU编号" align="center">
            <template slot-scope="scope">{{
              scope.row.skuPlatformCode
            }}</template>
          </el-table-column>
          <el-table-column label="SKU名称" align="center">
            <template slot-scope="scope">{{ scope.row.skuName }}</template>
          </el-table-column>
          <el-table-column label="价格" align="center">
            <template slot-scope="scope">{{ scope.row.money }}</template>
          </el-table-column>
          <el-table-column label="库存" align="center">
            <template slot-scope="scope">{{ scope.row.stock }}</template>
          </el-table-column>
          <el-table-column label="SKU操作" align="center">
            <template slot-scope="scope">
              <el-switch
                :value="!scope.row.isClosed"
                @input="handleInput1(scope.$index, scope.row)"
                active-color="#44DB5E"
                inactive-color="#DDDDDD"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <div class="tabBtns">
                <p @click="handleDeleteGifts(scope.$index, scope.row)">
                  <img src="../../../../assets/imgs/shanchu.png" />
                  <span>删除</span>
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="tbtns"
          style="justify-content: flex-start; margin-top: 40px"
        >
          <p @click="onSubmit()">提交</p>
          <p class="obt" @click="back">取消</p>
        </div>
      </div>
    </div>
    <el-dialog title="选择商品" :visible.sync="productShow">
      <div>
        <div>
          <div class="topBtns">
            <p @click="search">
              <img src="../../../../assets/imgs/sousuo.png" />
              <span>查询</span>
            </p>
            <p class="reset" @click="handleResetSearch">
              <img src="../../../../assets/imgs/zhongzhi.png" />
              <span>重置</span>
            </p>
          </div>
          <div class="filterDiv">
            <el-form
              :inline="true"
              :model="listQuery"
              size="small"
              label-width="140px"
            >
              <el-form-item label="商品类型">
                <el-select v-model="listQuery.type" placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="一级分类">
                <el-select v-model="listQuery.LabelId" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-form-item label="品牌">
                <el-select v-model="listQuery.brandId" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="商品名称">
                <el-input
                  v-model="listQuery.productName"
                  placeholder="请输入商品名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="SPU编号">
                <el-input
                  v-model="listQuery.spuPlatformCode"
                  placeholder="请输入SPU编号"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap">
        <div
          style="margin: 0 22px"
          @click="checkGoods(item, index)"
          v-for="(item, index) in checkGoodsList"
          :key="index"
        >
          <div class="imgClass">
            <img :src="item.pic" style="width: 100%; height: 100%" />
            <img
              src="../../../../assets/imgs/checkbox.png"
              v-if="item.check"
              class="chedClass"
            />
          </div>
          <p class="fnt1">{{ item.productName }}</p>
        </div>
      </div>
      <div class="pagination-container" v-if="total">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[10, 15, 50]"
          :current-page.sync="listQuery.pageNum"
          :total="total"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <div
          class="tbtns"
          style="justify-content: flex-start; margin-top: 40px"
        >
          <p @click="surecheckGoods">确定</p>
          <p class="obt" @click="productShow = false">取消</p>
        </div>
      </span>
    </el-dialog>
    <!-- <el-form
      :model="baseMark"
      :rules="rules"
      ref="baseMarkFrom"
      label-width="150px"
      size="small"
    >
      <el-form-item label="活动标题：" prop="note">
        <el-input v-model="baseMark.note" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="活动时间：" prop="time">
        <el-date-picker
          v-model="baseMark.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="选择主体商品：" prop="productRelationList">
        <el-select
          v-model="selectProduct"
          filterable
          remote
          reserve-keyword
          placeholder="商品名称/商品货号"
          :remote-method="searchProductMethod"
          :loading="selectProductLoading"
        >
          <el-option
            v-for="item in selectProductOptions"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px"
              >NO.{{ item.name1 }}</span
            >
          </el-option>
        </el-select>
        <el-button @click="handleAddProductRelation()">添加</el-button>
        <el-table
          ref="productRelationTable"
          :data="baseMark.productRelationList"
          style="width: 100%; margin-top: 20px"
          border
        >
          <el-table-column label="商品名称" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>

          <el-table-column label="绑定sku" align="center">
            <template slot-scope="scope">
              <div v-if="isEdit">
                <el-radio-group v-model="scope.row.skuList">
                  <el-radio
                    v-for="(item, index) in scope.row.stocks"
                    :label="item.id"
                    :key="index"
                    >{{ item.meno }}</el-radio
                  >
                </el-radio-group>
              </div>
              <div v-else>
                <el-checkbox-group v-model="scope.row.skuList">
                  <el-checkbox
                    v-for="item in scope.row.stocks"
                    :key="item.id"
                    :label="item.id"
                    >{{ item.meno }}{{ item.id }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDeleteProductRelation(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="优惠类型：" v-show="baseMark.bigType === 1">
        <el-radio-group v-model="baseMark.smallType">
          <el-radio :label="1">第一单获取</el-radio>
          <el-radio :label="2">所有订单获取</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优惠类型：" v-show="baseMark.bigType === 2">
        <el-radio-group v-model="baseMark.smallType">
          <el-radio :label="1">消费金额</el-radio>
          <el-radio :label="2">购买件数</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="优惠设置："
        v-show="baseMark.smallType === 1 && baseMark.bigType === 2"
      >
        <el-table :data="baseMark.actrule" style="width: 80%" border>
          <el-table-column label="满" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="赠" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reducePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveFullReduction(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button
                type="text"
                @click="handleAddFullReduction(scope.$index, scope.row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item
        label="优惠设置："
        v-show="baseMark.smallType === 2 && baseMark.bigType === 2"
      >
        <el-table :data="baseMark.actrule1" style="width: 80%" border>
          <el-table-column label="满件" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="赠" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reducePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleRemoveFullReduction1(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button
                type="text"
                @click="handleAddFullReduction1(scope.$index, scope.row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="选择赠品：" prop="giftsList">
        <el-select
          v-model="selectGifts"
          filterable
          remote
          reserve-keyword
          placeholder="商品名称/商品货号"
          :remote-method="searchProductMethod1"
          :loading="selectProductLoading"
        >
          <el-option
            v-for="item in selectProductOptions1"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px"
              >NO.{{ item.name1 }}</span
            >
          </el-option>
        </el-select>
        <el-button @click="handleAddGifts()">添加</el-button>
        <el-table
          ref="giftsTable"
          :data="baseMark.giftsList"
          style="width: 100%; margin-top: 20px"
          border
        >
          <el-table-column label="赠品名称" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="绑定sku" align="center">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.skuList">
                <el-radio
                  v-for="(item, index) in scope.row.stocks"
                  :label="item.id"
                  :key="index"
                  >{{ item.meno }}</el-radio
                >
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDeleteGifts(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('baseMarkFrom')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('baseMarkFrom')"
          >重置</el-button
        >
      </el-form-item>
    </el-form> -->
  </div>
</template>
<script>
import SingleUpload from "@/components/Upload/singleUpload";
import {
  createSmsBasicGifts,
  deleteSmsBasicGifts,
  getSmsBasicGifts,
  updateSmsBasicGifts,
  chooseProduct,
} from "@/api/sms/smsBasicGifts";
import { fetchSimpleList as fetchProductList } from "@/api/product";
import { fetchListWithChildren } from "@/api/productCate";
import { fetchList as fetchMemberLevelList } from "@/api/memberLevel";
import { fetchList as fetchGiftsList } from "@/api/pms/Gifts";
const defaultListQuery = {
  type: "",
  LabelId: "",
  brandId: "",
  productName: "",
  spuPlatformCode: "",
  pageNum: 1,
  pageSize: 10,
  source: "",
};
const defaultTypeOptions = [
  {
    label: "首购礼",
    value: 1,
  },
  {
    label: "满购礼",
    value: 2,
  },
  {
    label: "单品礼赠",
    value: 3,
  },
];
const defaultHomeAdvertise = {
  name: "",
  mobileName: "",
  ruleOfActivity: "",
  time: "",
};
export default {
  name: "BaseMarkDetail",
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let islength = (rule, value, callback) => {
      if (this.baseMark.productRelationList.length == 0) {
        callback(new Error("请选择一个主体商品"));
      } else if (this.baseMark.productRelationList[0].skuList.length == 0) {
        callback(new Error("请为主体商品至少绑定一个sku"));
      } else {
        callback();
      }
    };
    let islength1 = (rule, value, callback) => {
      if (this.baseMark.giftsList.length == 0) {
        callback(new Error("请选择一个赠品"));
      } else if (!this.baseMark.giftsList[0].skuList) {
        callback(new Error("请为赠品绑定sku"));
      } else {
        callback();
      }
    };
    return {
      mainItems: [],
      subsidiaryItems: [],
      total: "",
      checkGoodsList: [],
      listQuery: Object.assign({}, defaultListQuery),
      baseMark: {},
      activity: {
        name: "",
        mobileName: "",
        ruleOfActivity: "",
        time: "",
      },
      radio: "1",
      rules1: {
        name: [
          { required: true, message: "请输入移动端标题", trigger: "blur" },
        ],
        mobileName: [
          { required: true, message: "请输入活动标题", trigger: "blur" },
        ],
        time: [{ required: true, message: "请选择活动时间", trigger: "blur" }],
        // zswd: [{ required: true, message: "请选择赠送维度" }],
        // zpbz: [{ required: true, message: "请选择赠品不足时的操作" }],
      },
      productShow: false,
      options1: [
        { label: "全部", value: "" },
        { label: "普通商品", value: 0 },
        { label: "虚拟商品", value: 1 },
      ],
      options2: [
        { lebal: "全部", value: "" },
        { lebal: "分类一", value: "1" },
        { lebal: "分类二", value: "2" },
      ],
      value1: "",

      rules: {
        note: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        // startTime: [
        //   { required: true, message: "请选择开始时间", trigger: "blur" },
        // ],
        // endTime: [
        //   { required: true, message: "请选择到期时间", trigger: "blur" },
        // ],
        time: [{ required: true, message: "请选择活动时间", trigger: "blur" }],
        productRelationList: [
          {
            required: true,
            validator: islength,
            trigger: "blur",
          },
        ],
        giftsList: [
          {
            required: true,
            validator: islength1,
            trigger: "blur",
          },
        ],
      },
      typeOptions: Object.assign({}, defaultTypeOptions),
      selectProduct: null,
      selectProductLoading: false,
      selectProductOptions: [],
      selectProductOptions1: [],
      selectProductCate: null,
      selectMemberLevel: null,
      memberLevleOptions: [],
      selectGifts: [],
      giftsOptions: [],
      productCateOptions: [],
    };
  },
  created() {
    if (this.$route.query.id) {
      this.isEdit = true;
      getSmsBasicGifts(this.$route.query.id).then((response) => {
        let res = response.data;
        let activity = res.activity;
        activity.time = [];
        activity.time.push(activity.startTime);
        activity.time.push(activity.endTime);
        this.activity = activity;
        this.mainItems = res.mainItems;
        this.subsidiaryItems = res.subsidiaryItems;
      });
    }
    // this.getProductCateList();
    // this.getGiftsList();
    // this.searchMemberLevel();
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleDeleteMaingoods(index, row) {
      this.$confirm("是否要删除该主商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.mainItems.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    handleDeleteGifts(index, row) {
      this.$confirm("是否要删除该赠品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subsidiaryItems.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    handleInput(index, row) {
      row.isClosed = !row.isClosed;
      this.$set(this.mainItems, index, row);
    },
    handleInput1(index, row) {
      row.isClosed = !row.isClosed;
      this.$set(this.subsidiaryItems, index, row);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    test(index, row) {
      console.log(row);
    },
    surecheckGoods() {
      let list = this.checkGoodsList.filter((item) => item.check == true);
      if (list.length > 0) {
        if (this.listQuery.source == 0) {
          let maingoodsList = this.mainItems;
          for (let main of list) {
            maingoodsList = maingoodsList.concat(main.mainItems);
          }
          this.mainItems = maingoodsList;
        } else {
          let giftList = this.subsidiaryItems;
          for (let gift of list) {
            giftList = giftList.concat(gift.subsidiaryItems);
          }
          this.subsidiaryItems = giftList;
        }
        this.productShow = false;
      } else {
        this.$message({
          message: "请选择商品",
          type: "error",
          duration: 1000,
        });
      }
    },
    checkGoods(item, index) {
      let compare,spu;
      if (this.listQuery.source == 0) {
        spu=item.mainItems[0].spuPlatformCode
        compare = this.mainItems.some((e) => {
          return e.spuPlatformCode == spu;
        });
      } else {
        spu=item.subsidiaryItems[0].spuPlatformCode   
        compare = this.subsidiaryItems.some((e) => {
          return e.spuPlatformCode == spu;
        });
      }
      if (compare) {
        this.$message({
          message: "请勿选择已在活动列表中的商品",
          type: "error",
          duration: 1000,
        });
        return;
      }
      item.check = !item.check;
      this.$set(this.checkGoodsList, index, item);
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    search() {
      chooseProduct(this.listQuery).then((res) => {
        res = res.data;
        this.checkGoodsList = res.records;
        res.records.forEach((i) => {
          i.check = false;
        });
        this.total = res.total;
      });
    },
    addMaingoods() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.listQuery.source = 0;
      this.productShow = true;
      this.search();
    },
    addGift() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.listQuery.source = 1;
      this.productShow = true;
      this.search();
    },
    onSubmit() {
      this.$refs.baseMarkFrom.validate((valid) => {
        if (valid) {
          if (this.mainItems.length == 0) {
            this.$message({
              message: "请添加主商品",
              type: "error",
              duration: 1000,
            });
            return;
          }
          if (this.subsidiaryItems.length == 0) {
            this.$message({
              message: "请添加赠品",
              type: "error",
              duration: 1000,
            });
            return;
          }
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let activity = this.activity;
            activity.startTime = activity.time[0];
            activity.endTime = activity.time[1];
            let params = {
              activity: activity,
              mainItems: this.mainItems,
              subsidiaryItems: this.subsidiaryItems,
            };
            if (this.isEdit) {
              updateSmsBasicGifts(params).then((response) => {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            } else {
              createSmsBasicGifts(params).then((response) => {
                // this.baseMark = Object.assign({}, defaultHomeAdvertise);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
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
      this.baseMark = Object.assign({}, defaultHomeAdvertise);
      this.giftsOptions = {};
    },
    getGiftsList() {
      fetchGiftsList({ type: 1 }).then((response) => {
        let memberPriceList = [];
        for (let i = 0; i < response.data.records.length; i++) {
          let item = response.data.records[i];
          memberPriceList.push({ id: item.id, name: item.title });
        }
        this.giftsOptions = memberPriceList;
      });
    },
    searchMemberLevel() {
      fetchMemberLevelList({ defaultStatus: 0 }).then((response) => {
        let memberPriceList = [];
        for (let i = 0; i < response.data.records.length; i++) {
          let item = response.data.records[i];
          memberPriceList.push({ id: item.id, name: item.name });
        }
        this.memberLevleOptions = memberPriceList;
      });
    },
    searchProductMethod(query) {
      if (query !== "") {
        this.loading = true;
        fetchProductList({ keyword: query }).then((response) => {
          this.loading = false;
          let productList = response.data;
          this.selectProductOptions = [];
          for (let i = 0; i < productList.length; i++) {
            let item = productList[i];
            let data = {
              id: item.product.id,
              name: item.product.name,
              name1: item.product.id,
              stocks: item.stocks,
              skuList: this.isEdit ? "" : [],
            };
            this.selectProductOptions.push(data);
          }
        });
      } else {
        this.selectProductOptions = [];
      }
    },
    searchProductMethod1(query) {
      if (query !== "") {
        this.loading = true;
        fetchProductList({ keyword: query }).then((response) => {
          this.loading = false;
          let productList = response.data;
          this.selectProductOptions1 = [];
          for (let i = 0; i < productList.length; i++) {
            let item = productList[i];
            console.log(item);
            this.selectProductOptions1.push({
              id: item.product.id,
              name: item.product.name,
              name1: item.product.id,
              stocks: item.stocks,
              skuList: "",
            });
          }
        });
      } else {
        this.selectProductOptions1 = [];
      }
    },
    handleAddProductRelation() {
      if (this.baseMark.productRelationList.length == 1) {
        this.$message({
          message: "最多添加1个主体商品",
          type: "warning",
        });
        return;
      }
      if (this.selectProduct === null) {
        this.$message({
          message: "请先选择商品",
          type: "warning",
        });
        return;
      }
      console.log(this.selectProduct, "selectProduct");
      this.baseMark.productRelationList.push(this.selectProduct);
      this.selectProduct = null;
    },
    handleDeleteProductRelation(index, row) {
      this.baseMark.productRelationList.splice(index, 1);
    },
    handleAddProductCategoryRelation() {
      if (
        this.selectProductCate === null ||
        this.selectProductCate.length === 0
      ) {
        this.$message({
          message: "请先选择商品分类",
          type: "warning",
        });
        return;
      }
      this.baseMark.productCategoryRelationList.push(
        this.getProductCateByIds(this.selectProductCate)
      );
      this.selectProductCate = [];
    },
    handleDeleteProductCateRelation(index, row) {
      this.baseMark.productCategoryRelationList.splice(index, 1);
    },
    getGiftById(id) {
      for (let i = 0; i < this.giftsOptions.length; i++) {
        if (id === this.giftsOptions[i].id) {
          return this.giftsOptions[i];
        }
      }
      return null;
    },
    getMemberLevelById(id) {
      for (let i = 0; i < this.memberLevleOptions.length; i++) {
        if (id === this.memberLevleOptions[i].id) {
          return this.memberLevleOptions[i];
        }
      }
      return null;
    },
    getProductById(id) {
      for (let i = 0; i < this.selectProductOptions.length; i++) {
        if (id === this.selectProductOptions[i].id) {
          return this.selectProductOptions[i];
        }
      }
      return null;
    },
    getProductCateList() {
      fetchListWithChildren().then((response) => {
        let list = response.data;
        this.productCateOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({
                label: list[i].children[j].name,
                value: list[i].children[j].id,
              });
            }
          }
          this.productCateOptions.push({
            label: list[i].name,
            value: list[i].id,
            children: children,
          });
        }
      });
    },
    getProductCateByIds(ids) {
      let name;
      let parentName;
      for (let i = 0; i < this.productCateOptions.length; i++) {
        if (this.productCateOptions[i].value === ids[0]) {
          parentName = this.productCateOptions[i].label;
          for (let j = 0; j < this.productCateOptions[i].children.length; j++) {
            if (this.productCateOptions[i].children[j].value === ids[1]) {
              name = this.productCateOptions[i].children[j].label;
            }
          }
        }
      }
      return { id: ids[1], name: name, name1: parentName };
    },
    //会员级别
    handleAddMemberLevel() {
      if (
        this.selectMemberLevel === null ||
        this.selectMemberLevel.length === 0
      ) {
        this.$message({
          message: "请先选择会员级别",
          type: "warning",
        });
        return;
      }
      this.baseMark.memberLevelList.push(
        this.getMemberLevelById(this.selectMemberLevel)
      );
      this.selectMemberLevel = [];
    },
    handleDeleteMemberLevel(index, row) {
      this.baseMark.memberLevelList.splice(index, 1);
    },
    //赠品
    handleAddGifts() {
      if (this.baseMark.giftsList.length == 1) {
        this.$message({
          message: "最多添加1个赠品",
          type: "warning",
        });
        return;
      }
      if (!this.selectGifts) {
        this.$message({
          message: "请先选择赠品",
          type: "warning",
        });
        return;
      }
      this.baseMark.giftsList.push(this.selectGifts);
      console.log(this.baseMark.giftsList);
      this.selectGifts = [];
    },
    // 优惠设置
    handleRemoveFullReduction(index, row) {
      let fullReductionList = this.baseMark.actrule;
      if (fullReductionList.length === 1) {
        fullReductionList.pop();
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0,
        });
      } else {
        fullReductionList.splice(index, 1);
      }
    },
    handleAddFullReduction(index, row) {
      let fullReductionList = this.baseMark.actrule;
      if (fullReductionList.length < 3) {
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0,
        });
      } else {
        this.$message({
          message: "最多只能添加三条",
          type: "warning",
        });
      }
    },
    handleRemoveFullReduction1(index, row) {
      let fullReductionList = this.baseMark.actrule1;
      if (fullReductionList.length === 1) {
        fullReductionList.pop();
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0,
        });
      } else {
        fullReductionList.splice(index, 1);
      }
    },
    handleAddFullReduction1(index, row) {
      let fullReductionList = this.baseMark.actrule1;
      if (fullReductionList.length < 3) {
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0,
        });
      } else {
        this.$message({
          message: "最多只能添加三条",
          type: "warning",
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.input-width {
  width: 70%;
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
  span:last-child {
    color: #999999;
    font-size: 12px;
    padding-left: 20px;
  }
}
.tbtns {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  p {
    width: 100px;
    height: 36px;
    background: #fc6602;
    border-radius: 4px;
    border: 1px solid #fc6602;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-right: 20px;
    cursor: pointer;
  }
  .obt {
    border-color: #e8e8e8;
    color: #333;
    background: #fff;
  }
}
.imgClass {
  width: 120px;
  height: 120px;
  position: relative;
}
.chedClass {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.fnt1 {
  width: 120px;
  font-size: #333;
  line-height: 20px;
}
</style>


