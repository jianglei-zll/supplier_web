<template>
   
  <div class="app-container">
    <div>
      <div class="topBtns">
        <p @click="handleSearchList()">
          <img src="../../../assets/imgs/sousuo.png" />
          <span>查询</span>
        </p>
        <p class="reset" @click="handleResetSearch()">
          <img src="../../../assets/imgs/zhongzhi.png" />
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
          <el-form-item label="商品名称">
            <el-input
              style="width: 250px"
              v-model="listQuery.keyword"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-cascader
              clearable
              change-on-select
              v-model="selectProductCateValue"
              :options="productCateOptions"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品SPU">
            <el-input
              style="width: 250px"
              placeholder="请输入商品SPU"
               v-model="listQuery.spuPlatformCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="商家名称">
            <el-input
              style="width: 250px"
              placeholder="请输入商品名称"
               v-model="listQuery.storeName "
            ></el-input>
          </el-form-item>
          <el-form-item label="商家ID">
            <el-input
              style="width: 250px"
              placeholder="请输入商家ID"
               v-model="listQuery.storeId"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              style="width: 203px"
              v-model="listQuery.keyword"
              placeholder="商品名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品分类：">
            <el-cascader
              clearable
              change-on-select
              v-model="selectProductCateValue"
              :options="productCateOptions"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌：">
            <el-select
              v-model="listQuery.brandId"
              placeholder="请选择品牌"
              clearable
            >
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input
              style="width: 203px"
              v-model="listQuery.productSn"
              placeholder="商品货号"
            ></el-input>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select
              v-model="listQuery.publishStatus"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核状态：">
            <el-select
              v-model="listQuery.verifyStatus"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
    <!-- <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :file-list="fileList"
      multiple
      :show-file-list="false"
      :on-success="SYhandleAvatarSuccess"
      style="margin: 20px 0"
    >
      <el-button type="primary" icon="el-icon-download">溯源码导入</el-button>
    </el-upload> -->
    <el-tabs type="card" @tab-click="handleGoods" class="elTab">
      <el-tab-pane name="0">
        <span slot="label">全部</span>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label">出售中</span>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">仓库中</span>
      </el-tab-pane>
      <!-- <el-tab-pane name="5">
        <span slot="label">待审核</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">待设置价格</span>
      </el-tab-pane> -->
      <!-- <el-tab-pane name="2">
        <span slot="label"><i class="el-icon-refrigerator"></i> 已售馨</span>
      </el-tab-pane> -->

      <!-- <el-tab-pane name="4">
        <span slot="label"><i class="el-icon-truck"></i> 回收站</span>
      </el-tab-pane> -->
      <!-- <el-tab-pane name="10">
        <span slot="label"
          ><i class="el-icon-truck"></i>
          <el-button class="btn-add" @click="handleAddProduct()" size="mini">
            添加商品
          </el-button>
        </span>
      </el-tab-pane> -->
    </el-tabs>
    <div style="display: flex">
      <p class="xiajiaBtn" @click="down">下架</p>
      <p class="xiajiaBtn cjClass" @click="handleAddProduct()">创建商品</p>
    </div>

    <div class="table-container">
      <el-table
        ref="productTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <!-- <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope"
            ><img style="height: 80px" :src="scope.row.pic"
          /></template>
        </el-table-column> -->
        <el-table-column label="商品名称" align="center" width="350">
          <template slot-scope="scope">
            <div style="display: flex">
              <div>
                <img style="height: 80px" :src="scope.row.pic" />
              </div>
              <div style="text-align: left; margin-left: 10px">
                <p class="overflowTwo" style="width: 250px">
                  {{ scope.row.name }}
                </p>
                <p>品牌：{{ scope.row.brandName }}</p>
                <p>SPU:{{ scope.row.spuPlatformCode }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品类目" align="center">
          <template slot-scope="scope">
            <!-- <p>类目1</p>
            <p>类目2</p> -->
            <p>{{ scope.row.thirdClassifyName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="售价" align="center">
          <template slot-scope="scope">
            <p>￥{{ scope.row.price }}</p>
          </template>
        </el-table-column>

        <!-- <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{ scope.row.price }}</p>
            <p>货号：{{ scope.row.productSn }}</p>
          </template>
        </el-table-column> -->
        <el-table-column label="商品状态" width="140" align="center">
          <template slot-scope="scope">
            <p>
              上架：
              <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus"
              >
              </el-switch>
            </p>
            <!-- <p>
              新品：
              <el-switch
                @change="handleNewStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus"
              >
              </el-switch>
            </p>
            <p>
              推荐：
              <el-switch
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus"
              >
              </el-switch>
            </p>
            <p>
              分销：
              <el-switch
                @change="handleFenxiaoStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.isFenxiao"
              >
              </el-switch>
            </p>
            <p>
              会员商品：
              <el-switch
                @change="handleVipStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.isVip"
              >
              </el-switch>
            </p> -->
          </template>
        </el-table-column>
        <el-table-column label="总销量" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sale }}</template>
        </el-table-column>
        <el-table-column label="总库存" width="100" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.stock }}</p>
            <!-- <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleShowSkuEditDialog(scope.$index, scope.row)"
              circle
            ></el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="活动冻结库存" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.activityStock }}</template>
        </el-table-column>
        <el-table-column label="订单冻结库存" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.lowStock }}</template>
        </el-table-column>
        <el-table-column label="商品类型" width="100" align="center">
          <template slot-scope="scope">{{
            scope.row.type == 1 ? "一般商品" : "虚拟商品"
          }}</template>
        </el-table-column>
        <el-table-column label="运费模板" width="100" align="center">
        </el-table-column>
        <el-table-column label="商家" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.storeName }}</template>
        </el-table-column>
        <el-table-column label="最近更新者" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.updateUser }}</template>
        </el-table-column>
        <el-table-column label="最近时间" width="100" align="center">
          <template slot-scope="scope">{{
            scope.row.updateTime | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="180" align="center">
          <template slot-scope="scope">{{
            scope.row.createTime | formatTime
          }}</template>
        </el-table-column>

        <!-- <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column> -->

        <!-- <el-table-column
          label="审核状态"
          width="100"
          align="center"
          v-if="isAdmin"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.verifyStatus | verifyStatusFilter }}</p>
            <p>
              <el-button
                type="text"
                @click="handleShowVeriyEditDialog(scope.$index, scope.row)"
                >审核详情
              </el-button>
            </p>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <div class="tabBtns">
              <p @click="handleUpdateProduct(scope.$index, scope.row)">
                <img src="../../../assets/imgs/bianji.png" />
                <span>编辑</span>
              </p>
              <p @click="handleSeeProduct(scope.$index, scope.row)">
                <img src="../../../assets/imgs/chakan.png" />
                <span>查看</span>
              </p>
            </div>
            <p>
              <!-- <el-button
                size="mini"
                @click="handleDeleteStatus(scope.$index, scope.row)"
                >回收
              </el-button> -->

              <!-- <el-button
                size="mini"
                @click="handleSeeProduct(scope.$index, scope.row)"
                >查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)"
                >编辑
              </el-button> -->
            </p>
            <p>
              <!-- <el-button
                size="mini"
                @click="handleShowVeriyEditDialog(scope.$index, scope.row)"
                >日志
              </el-button> -->
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button> -->
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >
        确定
      </el-button>
    </div> -->
    <div class="pagination-container">
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
    <el-dialog
      title="审核信息"
      :visible.sync="vertyProduct.dialogVisible"
      width="40%"
    >
      <el-form :model="vertyProduct" ref="brandFrom" label-width="150px">
        <el-form-item label="审核状态：" prop="verifyStatus">
          <el-switch
            v-model="vertyProduct.verifyStatus"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="审核备注：" prop="detail">
          <el-input v-model="vertyProduct.detail"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="vertyProduct.dialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="handleEditVConfirm"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        style="width: 100%; margin-top: 20px"
        :data="vertyProduct.list"
        border
      >
        <el-table-column label="审核状态" width="160" align="center">
          <template slot-scope="scope">{{
            scope.row.status | verifyStatusFilter
          }}</template>
        </el-table-column>
        <el-table-column label="审核人" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.vertifyMan }}</template>
        </el-table-column>
        <el-table-column label="审核信息" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.detail }}</template>
        </el-table-column>
        <el-table-column label="审核时间" width="160" align="center">
          <template slot-scope="scope">{{
            scope.row.createTime | formatTime
          }}</template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      title="货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%"
    >
      <span>商品货号：</span>
      <span>{{ editSkuInfo.productSn }}</span>
      <el-input
        placeholder="按sku编号搜索"
        v-model="editSkuInfo.keyword"
        size="small"
        style="width: 50%; margin-left: 20px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchEditSku"
        ></el-button>
      </el-input>
      <el-table
        style="width: 100%; margin-top: 20px"
        :data="editSkuInfo.stockList"
        border
      >
        <el-table-column label="SKU编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in editSkuInfo.productAttr"
          :label="item.name"
          :key="item.id"
          align="center"
        >
          <template slot-scope="scope">
            {{ getProductSkuSp(scope.row, index) }}
          </template>
        </el-table-column>
        <el-table-column label="销售价格" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品库存" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存预警值" width="100" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="handleEditSkuConfirm"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import {
  fetchList,
  updateDeleteStatus,
  updateNewStatus,
  updateRecommendStatus,
  updatePaiMai,
  updateFenxiao,
  updateVip,
  deleteProduct,
  updatePublishStatus,
  updateVerifyStatus,
  fetchVList,
} from "@/api/product";
import {
  fetchList as fetchSkuStockList,
  update as updateSkuStockList,
} from "@/api/skuStock";
import { fetchList as fetchProductAttrList } from "@/api/productAttr";
import { fetchList as fetchBrandList } from "@/api/brand";
import { fetchListWithChildren } from "@/api/productCate";
import { getToken, get } from "@/utils/auth";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  status: 0,
  keyword: null,
  spuPlatformCode: null,
  storeName: null,
  storeId: null,
  thirdClassifyId: null,
};
export default {
  name: "productList",
  data() {
    return {
      fileList: [],
      isAdmin: false,
      dialogVVisible: false,
      editSkuInfo: {
        dialogVisible: false,
        productId: null,
        productSn: "",
        productAttributeCategoryId: null,
        stockList: [],
        productAttr: [],
        keyword: null,
      },
      vertyProduct: {
        dialogVisible: false,
        productId: null,
        detail: "",
        verifyStatus: null,
        list: null,
      },
      operates: [
        {
          label: "商品上架",
          value: "publishOn",
        },
        {
          label: "商品下架",
          value: "publishOff",
        },
        // {
        //   label: "设为推荐",
        //   value: "recommendOn",
        // },
        // {
        //   label: "取消推荐",
        //   value: "recommendOff",
        // },
        // {
        //   label: "设为新品",
        //   value: "newOn",
        // },
        // {
        //   label: "取消新品",
        //   value: "newOff",
        // },
        // {
        //   label: "转移到分类",
        //   value: "transferCategory",
        // },
        // {
        //   label: "移入回收站",
        //   value: "recycle",
        // },
      ],
      action: process.env.BASE_API + "/kl/sourceManager/importex",
      tabsName: "1",
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
      publishStatusOptions: [
        {
          value: 1,
          label: "上架",
        },
        {
          value: 0,
          label: "下架",
        },
      ],
      verifyStatusOptions: [
        {
          value: 1,
          label: "审核通过",
        },
        {
          value: 0,
          label: "未审核",
        },
      ],
      statusOptions: [
        {
          value: 1,
          label: "出售中",
        },
        {
          value: 2,
          label: "已售馨",
        },
        {
          value: 3,
          label: "仓库中",
        },
        // {
        //   value: 4,
        //   label: "回收站",
        // },
      ],
    };
  },

  created() {
    this.getList();
    // this.getBrandList();
    this.getProductCateList();
    this.isAdmin = get("storeId") == 0;
    console.log(get("storeId") == 0);
    console.log(this.isAdmin);
  },
  watch: {
    selectProductCateValue: function (newValue) {
      console.log(newValue);
      if (newValue != null) {
        this.listQuery.thirdClassifyId =
          newValue[newValue.length - 1 > 0 ? newValue.length - 1 : 0];
      } else {
        this.listQuery.thirdClassifyId = null;
      }
    },
  },
  filters: {
    verifyStatusFilter(value) {
      if (value === 1) {
        return "审核通过";
      } else {
        return "未审核";
      }
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    down(){
      if(this.multipleSelection.length==0){
        this.$message.error("请选择商品")
        return
      }
     let ids=this.multipleSelection.map(i=>{
       return i.id
     })
      this.updatePublishStatus1(0, ids);
    },
    SYhandleAvatarSuccess(response) {
      if ((response.code = 200)) {
        this.$message.success(response.message);
      } else {
        this.$message.error(response.message);
      }
    },
    handleGoods(tab, event) {
      this.listQuery.status = tab.name;
      this.getList();
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
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.records;
        this.total = response.data.total;
      });
    },
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then((response) => {
        this.brandOptions = [];
        let brandList = response.data.records;
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id,
          });
        }
      });
    },
    getProductCateList() {
      fetchListWithChildren().then((response) => {
        let list = response.data;
        this.productCateOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              for (let item of list[i].children[j].children) {
                item.label = item.name;
                item.value = item.id;
              }
              children.push({
                label: list[i].children[j].name,
                value: list[i].children[j].id,
                children: list[i].children[j].children,
              });
            }
          }
          this.productCateOptions.push({
            label: list[i].name,
            value: list[i].id,
            children: children,
          });
          console.log(this.productCateOptions);
        }
      });
    },
    handleShowVeriyEditDialog(index, row) {
      this.vertyProduct.dialogVisible = true;
      this.vertyProduct.productId = row.id;
      this.vertyProduct.verifyStatus = row.verifyStatus;
      fetchVList(row.id).then((response) => {
        this.vertyProduct.list = response.data;
      });
    },
    handleShowSkuEditDialog(index, row) {
      this.editSkuInfo.dialogVisible = true;
      this.editSkuInfo.productId = row.id;
      this.editSkuInfo.productSn = row.productSn;
      this.editSkuInfo.productAttributeCategoryId =
        row.productAttributeCategoryId;
      this.editSkuInfo.keyword = null;
      fetchSkuStockList(row.id, { keyword: this.editSkuInfo.keyword }).then(
        (response) => {
          this.editSkuInfo.stockList = response.data;
        }
      );
      if (
        row.productAttributeCategoryId &&
        row.productAttributeCategoryId > 0
      ) {
        fetchProductAttrList(row.productAttributeCategoryId, { type: 0 }).then(
          (response) => {
            this.editSkuInfo.productAttr = response.data.records;
          }
        );
      }
    },
    handleSearchEditSku() {
      fetchSkuStockList(this.editSkuInfo.productId, {
        keyword: this.editSkuInfo.keyword,
      }).then((response) => {
        this.editSkuInfo.stockList = response.data;
      });
    },
    handleEditSkuConfirm() {
      if (
        this.editSkuInfo.stockList == null ||
        this.editSkuInfo.stockList.length <= 0
      ) {
        this.$message({
          message: "暂无sku信息",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要进行修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateSkuStockList(
          this.editSkuInfo.productId,
          this.editSkuInfo.stockList
        ).then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
          this.editSkuInfo.dialogVisible = false;
        });
      });
    },
    handleEditVConfirm() {
      if (this.vertyProduct.detail == null) {
        this.$message({
          message: "暂无审核信息",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要进行审核", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();

        params.append("ids", this.vertyProduct.productId);
        params.append("verifyStatus", this.vertyProduct.verifyStatus);
        params.append("detail", this.vertyProduct.detail);
        updateVerifyStatus(params).then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
        this.vertyProduct.dialogVisible = false;
      });
    },

    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddProduct() {
      this.$router.push({ path: "/pms/addProduct" });
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: "请选择操作类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择要操作的商品",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要进行该批量操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(1, ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0, ids);
            break;
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids);
            break;
          case this.operates[4].value:
            this.updateNewStatus(1, ids);
            break;
          case this.operates[5].value:
            this.updateNewStatus(0, ids);
            break;
          case this.operates[6].value:
            break;
          case this.operates[7].value:
            this.updateDeleteStatus(1, ids);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    handlePublishStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updatePublishStatus(row.publishStatus, ids);
    },

    handleupdatePaiMaiChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updatePaiMai(row.publishStatus, ids);
    },
    handleVipStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateVipStatus(row.isVip, ids);
    },
    handleFenxiaoStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateFenxiaoStatus(row.isFenxiao, ids);
    },
    handleNewStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateNewStatus(row.newStatus, ids);
    },
    handleVerifyStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateVerifyStatus(row.verifyStatus, ids);
    },
    handleRecommendStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateRecommendStatus(row.recommandStatus, ids);
    },
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },

    handleDeleteStatus(index, row) {
      this.$confirm("是否要进行放入回收站操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.updateDeleteStatus(0, ids);
      });
    },
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);

        deleteProduct(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleSeeProduct(index, row) {
      this.$router.push({ path: "/pms/productDetail", query: { id: row.id } });
    },
    handleUpdateProduct(index, row) {
      this.$router.push({ path: "/pms/updateProduct", query: { id: row.id } });
    },
    handleShowProduct(index, row) {
      console.log("handleShowProduct", row);
    },
    handleShowVerifyDetail(index, row) {
      console.log("handleShowVerifyDetail", row);
    },
    handleShowLog(index, row) {
      console.log("handleShowLog", row);
    },
    updateVerifyStatus(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("verifyStatus", verifyStatus);
      updateVerifyStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updatePublishStatus(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("publishStatus", publishStatus);
      updatePublishStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updatePublishStatus1(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("publishStatus", publishStatus);
      updatePublishStatus(params).then((response) => {
        this.getList()
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateFenxiaoStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("newStatus", newStatus);
      updateFenxiao(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateVipStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("newStatus", newStatus);
      updateVip(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },

    updateNewStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("newStatus", newStatus);
      updateNewStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateRecommendStatus(recommendStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("recommendStatus", recommendStatus);
      updateRecommendStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateDeleteStatus(deleteStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("deleteStatus", deleteStatus);
      updateDeleteStatus(params).then((response) => {
        this.$message({
          message: "回收成功",
          type: "success",
          duration: 1000,
        });
      });
      this.getList();
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scope>
.overflowTwo {
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.elTab {
  background: #fff;
  margin-top: 10px;
  margin-bottom: 5px;
  height: 41px;
}
.xiajiaBtn {
  width: 100px;
  height: 36px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #fc6602;
  text-align: center;
  line-height: 36px;
  color: #fc6602;
  margin-top: 10px;
  cursor: pointer;
}
.cjClass {
  background: #fc6602;
  color: #fff;
  margin-left: 20px;
}
</style>


