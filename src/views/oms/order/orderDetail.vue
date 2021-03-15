<template>
  <div class="detail-container">
    <div class="modelDiv">
      <p class="modelTit">
        <span>订单基础信息</span>
        <span></span>
      </p>
      <div style="margin: 0 20px; padding-bottom: 20px; padding: 20px">
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">平台订单号</el-col>
              <el-col :span="12" class="fot2">{{ order.orderSn }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">订单类型</el-col>
              <el-col :span="12" class="fot2">{{
                order.sourceType | formatSourceType
              }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">订单来源</el-col>
              <el-col :span="12" class="fot2">{{
                order.sourceType | formatSourceType
              }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">下单时间</el-col>
              <el-col :span="12" class="fot2">{{
                formatTime(order.createTime)
              }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row v-if="order.status != 12">
              <el-col :span="12" class="fot1">付款时间</el-col>
              <el-col :span="12" class="fot2"
                >{{ order.paymentTime | formatNull }}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">用户留言</el-col>
              <el-col :span="12" class="fot2">{{
                order.note | formatNull
              }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">平台备注</el-col>
              <el-col :span="12" class="fot2">
                {{ order.mark | formatNull }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="modelDiv">
      <p class="modelTit">
        <span>订单支付信息</span>
        <span></span>
      </p>
      <div style="margin: 0 20px; padding-bottom: 20px; padding: 20px">
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">支付方式</el-col>
              <el-col :span="12" class="fot2">{{
                order.payType | formatPayType
              }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">运费</el-col>
              <el-col :span="12" class="fot2"
                >￥{{ order.freightAmount }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">商品总额</el-col>
              <el-col :span="12" class="fot2">￥{{ order.totalAmount }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">应付金额</el-col>
              <el-col :span="12" class="fot2">￥{{ order.payAmount }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">促销优惠</el-col>
              <el-col :span="12" class="fot2"
                >￥{{ order.promotionAmount }}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">开票金额</el-col>
              <el-col :span="12" class="fot2">暂无</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">实付金额</el-col>
              <el-col :span="12" class="fot2">￥{{ order.payAmount }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="modelDiv">
      <p class="modelTit">
        <span>订单发票信息</span>
        <span></span>
      </p>
      <div style="margin: 0 20px; padding-bottom: 20px; padding: 20px">
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">开具发票</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">注册地址</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">发票类型</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">注册电话</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">单位名称</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">开户银行</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">纳税人识别号</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">银行账号</el-col>
              <el-col :span="12" class="fot2"></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="modelDiv" v-if="order.needDeliver == 1">
      <p class="modelTit">
        <span>订单收货信息</span>
        <span></span>
      </p>
      <div style="margin: 0 20px; padding-bottom: 20px; padding: 20px">
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">收货人姓名</el-col>
              <el-col :span="12" class="fot2">{{ order.receiverName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">收货省市区</el-col>
              <el-col :span="12" class="fot2">{{
                order | formatAddress
              }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">收货人联系方式</el-col>
              <el-col :span="12" class="fot2">{{ order.receiverPhone }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">收货详细地址</el-col>
              <el-col :span="12" class="fot2"
                >{{ order.receiverDetailAddress }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="elItem">
          <el-col :span="12">
            <el-row>
              <el-col :span="12" class="fot1">配送方式</el-col>
              <el-col :span="12" class="fot2">{{
                order.deliveryCompany | formatNull
              }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="modelDiv">
      <p class="modelTit">
        <span>商品信息</span>
        <span></span>
      </p>
      <div style="margin: 0 20px; padding: 20px">
        <el-table :data="order.orderItemList" style="width: 100%" border>
          <el-table-column label="商品名称" width="300">
            <template slot-scope="scope">
              <div class="flex">
                <img :src="scope.row.productPic" class="goodImg" />
                <div>
                  <p class="fnt1">{{ scope.row.productName }}</p>
                  <p class="fnt2">锚定商品：会稽山10年份黄酒</p>
                  <p class="fnt2">SKU：{{ scope.row.skuPlatformCode }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="供货商SKU" align="center">
            <template slot-scope="scope">
              {{ scope.row.productSkuCode }}
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              <p>商品数量：{{ scope.row.productQuantity }}</p>
              <!-- <p>酒证数量：6</p> -->
            </template>
          </el-table-column>
          <el-table-column label="支付信息" width="180">
            <template slot-scope="scope">
              <div>应付单价:￥{{ scope.row.productPrice }}</div>
              <div>实付单价:￥{{ scope.row.productPrice }}</div>
              <div>
                实付金额:￥{{
                  scope.row.productPrice * scope.row.productQuantity
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="发货信息" width="180">
            <template slot-scope="scope">
              <div>发货仓：无</div>
              <div>发货时间 {{ order.deliveryTime }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="物流公司"
            align="center"
            v-if="order.status != 2 && order.status != 12"
          >
            <template slot-scope="scope">
              {{ scope.row.type == 4 ? "无" : order.deliveryCompany }}
            </template>
          </el-table-column>

          <!-- 订单状态-待发货状态 -->
          <!-- <el-table-column label="发货数量" align="center">
            <template>
              <el-input></el-input>
            </template>
          </el-table-column> -->
          <el-table-column
            label="售后状态"
            align="center"
            v-if="order.status != 2 && order.status != 12"
          >
            <template slot-scope="scope"> 无 </template>
          </el-table-column>
          <el-table-column
            label="售后数量"
            align="center"
            v-if="order.status != 2 && order.status != 12"
          >
            <template slot-scope="scope"> 无 </template>
          </el-table-column>
          <!-- 订单状态-已发货状态 -->
          <el-table-column
            label="物流单号"
            align="center"
            v-if="order.status != 2 && order.status != 12"
          >
            <template slot-scope="scope">
              {{ scope.row.type == 4 ? "无" : order.deliverySn }}
            </template>
          </el-table-column>
        </el-table>
        <!-- 订单状态-待发货状态 -->
        <div v-if="order.status==12">
          <p style="margin-top: 10px">国内物流</p>
          <el-form ref="ruleForm" :model="delivery" :rules="rules">
            <el-form-item label="物流公司" prop="deliveryCompany">
              <el-select
                v-model="delivery.deliveryCompany"
                placeholder="请选择发货物流公司"
              >
                <el-option
                  v-for="item in options1"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物流单号" prop="deliverySn">
              <el-input
                style="width: 217px"
                v-model="delivery.deliverySn"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="subBtns">
          <p @click="confirm"  v-if="order.status==12" style="margin-top: 10px">提交</p>
          <p @click="back" style="margin-top: 10px">返回列表</p>
        </div>
      </div>
    </div>

    <!-- <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger"
          >当前订单状态：{{ order.status | formatStatus }}</span
        >
         <div class="operate-button-container" v-show="order.status === 0">
          <el-button size="mini" @click="showUpdateReceiverDialog"
            >修改收货人信息</el-button
          >
          <el-button size="mini">修改商品信息</el-button>
          <el-button size="mini" @click="showUpdateMoneyDialog"
            >修改费用信息</el-button
          >
          <el-button size="mini" @click="showMessageDialog"
            >发送站内信</el-button
          >
          <el-button size="mini" @click="showCloseOrderDialog"
            >关闭订单</el-button
          >
          <el-button size="mini" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
        <div class="operate-button-container" v-show="order.status === 1">
          <el-button size="mini" @click="showUpdateReceiverDialog"
            >修改收货人信息</el-button
          >
          <el-button size="mini" @click="showMessageDialog"
            >发送站内信</el-button
          >
          <el-button size="mini">取消订单</el-button>
          <el-button size="mini" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
        <div
          class="operate-button-container"
          v-show="order.status === 2 || order.status === 3"
        >
          <el-button size="mini" @click="showLogisticsDialog"
            >订单跟踪</el-button
          >
          <el-button size="mini" @click="showMessageDialog"
            >发送站内信</el-button
          >
          <el-button size="mini" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
        <div class="operate-button-container" v-show="order.status === 15">
          <el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
          <el-button size="mini" @click="showMarkOrderDialog"
            >备注订单</el-button
          >
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">订单编号</el-col>
          <el-col :span="6" class="table-cell-title">支付方式</el-col>
          <el-col :span="6" class="table-cell-title">订单类型</el-col>
          <el-col :span="6" class="table-cell-title">订单来源</el-col>
        </el-row>

        <el-row>
          <el-col :span="6" class="table-cell">{{ order.orderSn }}</el-col>
          <el-col :span="6" class="table-cell"></el-col>
          <el-col :span="6" class="table-cell">{{
            order.orderType | formatOrderType
          }}</el-col>
          <el-col :span="6" class="table-cell"></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">下单时间</el-col>
          <el-col
            :span="6"
            class="table-cell-title"
            v-if="order.needDeliver == 1"
            >配送方式</el-col
          >
          <el-col
            :span="6"
            class="table-cell-title"
            v-if="order.needDeliver == 1"
            >物流单号</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"></el-col>
          <el-col :span="6" class="table-cell" v-if="order.needDeliver == 1">{{
            order.deliveryCompany | formatNull
          }}</el-col>
          <el-col :span="6" class="table-cell" v-if="order.needDeliver == 1">{{
            order.deliverySn | formatNull
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px" v-if="order.needDeliver == 1">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
      </div>
      <div class="table-layout" v-if="order.needDeliver == 1">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">收货留言</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{ order.receiverName }}</el-col>
          <el-col :span="6" class="table-cell">{{
            order.receiverPhone
          }}</el-col>
          <el-col :span="6" class="table-cell"></el-col>
          <el-col :span="6" class="table-cell">{{
            order | formatAddress
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderItemList"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.productPic" style="height: 80px" />
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.productName }}</p>
            <p>品牌：{{ scope.row.productBrand }}</p>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.productQuantity }}
          </template>
        </el-table-column>
        <el-table-column label="支付信息" align="center">
          <template slot-scope="scope">
            <p>
              应付单价：￥{{
                takePrice(scope.row.type, scope.row.productPrice)
              }}
            </p>
            <p>货号：{{ scope.row.productSn }}</p> 
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.type | formatType }}
          </template>
        </el-table-column> -->
    <!-- <el-table-column label="属性" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.productAttr }}
          </template>
        </el-table-column> -->

    <!-- <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.productPrice * scope.row.productQuantity }}
          </template>
        </el-table-column> -->
    <!-- </el-table>
       <div style="float: right; margin: 20px">
        合计：<span class="color-danger">￥{{  order.totalAmount }}</span>
      </div> 
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col> -->
    <!-- <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col> -->
    <!--  </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.totalAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >￥{{ order.freightAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{ order.payAmount }}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
             <span class="color-danger"
              >￥{{
                order.payAmount + order.freightAmount 
              }}</span> 
            <span class="color-danger">￥{{ order.payAmount }}</span>
          </el-col>-->

    <!-- <el-col :span="6" class="table-cell"
            >-￥{{ order.couponAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.integrationAmount }}</el-col
          > 
        </el-row>
        <el-row>-->
    <!-- <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col> 
        </el-row>
        <el-row>-->
    <!-- <el-col :span="6" class="table-cell"
            >-￥{{ order.promotionAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.discountAmount }}</el-col
          >
        </el-row>
      </div>
    </el-card> -->
    <el-dialog
      title="修改收货人信息"
      :visible.sync="receiverDialogVisible"
      width="40%"
    >
      <el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
        <el-form-item label="收货人姓名：">
          <el-input
            v-model="receiverInfo.receiverName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <el-input
            v-model="receiverInfo.receiverPostCode"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="所在区域：">
          <v-distpicker
            :province="receiverInfo.receiverProvince"
            :city="receiverInfo.receiverCity"
            :area="receiverInfo.receiverRegion"
            @selected="onSelectRegion"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input
            v-model="receiverInfo.receiverDetailAddress"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="receiverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateReceiverInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="修改费用信息"
      :visible.sync="moneyDialogVisible"
      width="40%"
    >
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.totalAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.freightAmount" size="mini"
              ><template slot="prepend">￥</template></el-input
            >
          </el-col>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.couponAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.integrationAmount }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.promotionAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.discountAmount" size="mini"
              ><template slot="prepend">-￥</template></el-input
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{ order.totalAmount + moneyInfo.freightAmount }}</span
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{
                order.payAmount +
                moneyInfo.freightAmount -
                moneyInfo.discountAmount
              }}</span
            >
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="moneyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateMoneyInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="发送站内信"
      :visible.sync="messageDialogVisible"
      width="40%"
    >
      <el-form :model="message" ref="receiverInfoForm" label-width="150px">
        <el-form-item label="标题：">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSendMessage">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关闭订单" :visible.sync="closeDialogVisible" width="40%">
      <el-form :model="closeInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="备注订单"
      :visible.sync="markOrderDialogVisible"
      width="40%"
    >
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { deliveryOrder1 } from "@/api/order";
import {
  getOrderDetail,
  updateReceiverInfo,
  updateMoneyInfo,
  closeOrder,
  updateOrderNote,
  deleteOrderById,
} from "@/api/order";
import { formatDate } from "@/utils/date";
import VDistpicker from "v-distpicker";
import Form from "../../build/wuyePrice/components/form.vue";
const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null,
};
const defaultLogisticsCompanies = [
  "顺丰快递",
  "圆通快递",
  "中通快递",
  "韵达快递",
];
export default {
  name: "orderDetail",
  components: { VDistpicker },
  data() {
    return {
      delivery: {
        orderId: "",
        deliveryCompany: "",
        deliverySn: "",
      },
      options1: defaultLogisticsCompanies,
      rules: {
        deliveryCompany: [{ required: true, message: "请选择物流公司" }],
        deliverySn: [{ required: true, message: "请填写物流单号" }],
      },

      id: null,
      order: {},
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: {
        orderId: null,
        freightAmount: 0,
        discountAmount: 0,
        status: null,
      },
      messageDialogVisible: false,
      message: { title: null, content: null },
      closeDialogVisible: false,
      closeInfo: { note: null, id: null },
      markOrderDialogVisible: false,
      markInfo: { note: null },
      logisticsDialogVisible: false,
    };
  },
  created() {
    this.get();
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else if (value.length > 8) {
        return value.substr(0, 8) + "...";
      } else {
        return value;
      }
    },
    formatPayType(value) {
      if (value === 2) {
        return "支付宝";
      } else if (value === 1) {
        return "微信小程序";
      } else if (value === 3) {
        return "余额支付";
      } else if (value === 5) {
        return "积分兑换";
      } else if (value === 4) {
        return "线下支付";
      } else {
        return "无";
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return "微信公众号";
      } else if (value === 2) {
        return "支付宝小程序";
      }
    },
    formatOrderType(value) {
      if (value === 2) {
        return "拼团订单";
      } else if (value === 3) {
        return "团购订单";
      } else if (value === 6) {
        return "秒杀订单";
      } else if (value === 1) {
        return "普通订单";
      } else if (value === 4) {
        return "砍价订单";
      } else if (value === 5) {
        return "积分订单";
      } else if (value === 7) {
        return "门店自取订单";
      }
    },
    formatAddress(order) {
      let str = order.receiverProvince;
      if (order.receiverCity != null) {
        str += "  " + order.receiverCity;
      }
      str += "  " + order.receiverRegion;
      // str += "  " + order.receiverDetailAddress;
      return str;
    },
    formatStatus(value) {
      if (value === 12) {
        return "待付款";
      }
      if (value === 1) {
        return "支付成功，没有回掉";
      } else if (value === 2) {
        return "待发货";
      } else if (value === 3) {
        return "待收货";
      } else if (value === 4) {
        return "待评价";
      } else if (value === 5) {
        return "已完成";
      } else if (value === 19) {
        return "申请售后";
      } else if (value === 20) {
        return " 售后已完成";
      } else if (value === 8) {
        return "待分享";
      } else if (value === 13) {
        return "申请退款";
      } else if (value === 14) {
        return "已退款";
      } else if (value === 15) {
        return "已关闭";
      } else if (value === 16) {
        return "无效订单";
      } else if (value === 17) {
        return "已删除";
      } else if (value === 18) {
        return "拼团下单成功";
      }
    },
    formatPayStatus(value) {
      if (value === 0) {
        return "未支付";
      } else if (value === 4) {
        return "已退款";
      } else {
        return "已支付";
      }
    },
    formatDeliverStatus(value) {
      if (value === 0 || value === 1) {
        return "未发货";
      } else {
        return "已发货";
      }
    },
    formatType(value) {
      if (value === 1) {
        return "普通商品";
      } else if (value === 2) {
        return "赠品";
      } else if (value === 4) {
        return "虚拟商品";
      } else if (value === 5) {
        return "提货商品";
      }
    },
    formatProductAttr(value) {
      if (value == null) {
        return "";
      } else {
        let attr = JSON.parse(value);
        let result = "";
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key;
          result += ":";
          result += attr[i].value;
          result += ";";
        }
        return result;
      }
    },
  },
  methods: {
    get() {
      this.id = this.list = this.$route.query.id;
      getOrderDetail(this.id).then((response) => {
        this.order = response.data;
        console.log(this.order.orderItemList[0].productPic, "this.order");
      });
    },
    back() {
      this.$router.back();
    },
    confirm() {
      this.$confirm("是否要进行发货操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              this.delivery.orderId = this.$route.query.id;
              deliveryOrder1(this.delivery).then((response) => {
                this.get();
                this.$message({
                  type: "success",
                  message: "发货成功!",
                });
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发货",
          });
        });
    },
    takePrice(type, price) {
      if (type == 5) {
        return 0;
      } else {
        return price;
      }
    },
    onSelectRegion(data) {
      this.receiverInfo.receiverProvince = data.province.value;
      this.receiverInfo.receiverCity = data.city.value;
      this.receiverInfo.receiverRegion = data.area.value;
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStepStatus(value) {
      if (value === 2) {
        //待发货
        return 2;
      } else if (value === 3) {
        //已发货
        return 3;
      } else if (value === 4) {
        //已完成
        return 4;
      } else if (value === 5) {
        //已完成
        return 5;
      } else {
        //待付款、已关闭、无限订单
        return 6;
      }
    },
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderId: this.order.id,
        receiverName: this.order.receiverName,
        receiverPhone: this.order.receiverPhone,
        receiverPostCode: this.order.receiverPostCode,
        receiverDetailAddress: this.order.receiverDetailAddress,
        receiverProvince: this.order.receiverProvince,
        receiverCity: this.order.receiverCity,
        receiverRegion: this.order.receiverRegion,
        status: this.order.status,
      };
    },
    handleUpdateReceiverInfo() {
      this.$confirm("是否要修改收货信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateReceiverInfo(this.receiverInfo).then((response) => {
          this.receiverDialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showUpdateMoneyDialog() {
      this.moneyDialogVisible = true;
      this.moneyInfo.orderId = this.order.id;
      this.moneyInfo.freightAmount = this.order.freightAmount;
      this.moneyInfo.discountAmount = this.order.discountAmount;
      this.moneyInfo.status = this.order.status;
    },
    handleUpdateMoneyInfo() {
      this.$confirm("是否要修改费用信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateMoneyInfo(this.moneyInfo).then((response) => {
          this.moneyDialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showMessageDialog() {
      this.messageDialogVisible = true;
      this.message.title = null;
      this.message.content = null;
    },
    handleSendMessage() {
      this.$confirm("是否要发送站内信?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.messageDialogVisible = false;
        this.$message({
          type: "success",
          message: "发送成功!",
        });
      });
    },
    showCloseOrderDialog() {
      this.closeDialogVisible = true;
      this.closeInfo.note = null;
      this.closeInfo.id = this.id;
    },
    handleCloseOrder() {
      this.$confirm("是否要关闭?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.closeInfo.id]);
        params.append("note", this.closeInfo.note);
        closeOrder(params).then((response) => {
          this.closeDialogVisible = false;
          this.$message({
            type: "success",
            message: "订单关闭成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
      this.markInfo.id = this.id;
      this.closeOrder.note = null;
    },
    handleMarkOrder() {
      this.$confirm("是否要备注订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", this.markInfo.id);
        params.append("note", this.markInfo.note);
        params.append("status", this.order.status);
        updateOrderNote(params).then((response) => {
          this.markOrderDialogVisible = false;
          this.$message({
            type: "success",
            message: "订单备注成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    handleDeleteOrder() {
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteOrderById([this.id]).then((response) => {
          this.$message({
            message: "删除成功！",
            type: "success",
            duration: 1000,
          });
          this.$router.back();
        });
      });
    },
    showLogisticsDialog() {
      this.logisticsDialogVisible = true;
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
.fot1 {
  color: #999;
  font-size: 14px;
}
.fot2 {
  color: #333;
  font-size: 14px;
  text-align: right;
}
.elItem {
  margin-bottom: 15px;
}
.flex {
  display: flex;
}
.goodImg {
  width: 70px;
  height: 70px;
}
.subBtns {
  display: flex;
  p {
    width: 100px;
    height: 40px;
    background: #fc6602;
    box-shadow: 0px 4px 10px 0px rgba(252, 131, 2, 0.14);
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    border: 1px solid #fc6602;
    text-align: center;
    line-height: 40px;
    margin-left: 20px;
  }
  p:last-child {
    color: #fc6602;
    background: #fff;
    box-shadow: none;
  }
}
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  /* border-top: 1px solid #dcdfe6; */
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-top: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


