<template>
  <div>
    <div>
      <el-row :gutter="20" class="topRow">
        <el-col :span="8" class="topThree">
          <p class="topColTit">当日数据</p>
          <el-row type="flex" align="middle" class="imgrow">
            <el-col :span="5">
              <img :src="todayData" />
            </el-col>
            <el-col :span="19">
              <p class="topNum">{{ todayNum }}</p>
              <p class="topSubTit">今日注册人数</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <div class="topThree">
            <p class="topColTit">会员分布</p>
            <el-row>
              <el-col :span="15">
                <el-row type="flex" align="middle" class="imgrow imgrow2">
                  <el-col :span="8">
                    <div id="chart1"></div>
                  </el-col>
                  <el-col :span="10" :push="3">
                    <p class="topNum">{{ total }}</p>
                    <p class="topSubTit">总注册会员数</p>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="9" class="menberCol">
                <div class="menberDiv">
                  <el-row
                    type="flex"
                    align="middle"
                    style="margin-top: 10px"
                    v-for="(item, index) in nums"
                    :key="index"
                  >
                    <el-col :span="3">
                      <div class="kuai"></div>
                    </el-col>
                    <el-col :span="11">
                      <p>{{ item.name }}:</p>
                    </el-col>
                    <el-col :span="8">
                      <p>{{ item.value }}</p>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8" class="topThree">
          <p class="topColTit">待处理操作</p>
          <el-row type="flex" align="middle" class="imgrow">
            <el-col :span="5">
              <img :src="done" />
            </el-col>
            <el-col :span="19">
              <p class="topNum">{{ toDeliverNum }}</p>
              <p class="topSubTit">待发货订单数</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="lcDiv">
      <el-row type="flex" justify="space-around">
        <el-col :span="12">
          <p class="lcTit">注册走势图</p>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-select v-model="seltVal" class="selectClass" @change="change">
            <el-option
              v-for="item in selectOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div id="lineChart"></div>
    </div>
  </div>
</template>
<script>
import renshu from "@/assets/imgs/renshu.png";
import dingdan from "@/assets/imgs/dingdan.png";
import echarts from "echarts";
import { toDeliver, userLineChart, userToday, userLevel } from "@/api/home";
export default {
  name: "home",
  data() {
    return {
      todayData: renshu,
      done: dingdan,
      selectOpt: [
        { value: "7", label: "近7天" },
        { value: "14", label: "近14天" },
        { value: "30", label: "近1月" },
      ],
      seltVal: "7",
      todayNum: "",
      nums: [],
      total: "",
      toDeliverNum: "",
    };
  },
  mounted() {
    this.getInit();
    this.createLine();
    this.getUserToday();
    this.getToDeliver();
  },
  methods: {
    change() {
      this.createLine();
    },
    async getToDeliver() {
      let { data } = await toDeliver();
      this.toDeliverNum = data;
    },
    async getUserToday() {
      let { data } = await userToday();
      this.todayNum = data;
    },
    async getInit() {
      let myChart1 = echarts.init(document.getElementById("chart1"));
      let { data } = await userLevel();
      let arr = [];
      let arr1 = [];
      for (let i in data) {
        let obj = {
          name: i,
          value: data[i],
        };
        arr.push(obj);
        arr1.push(data[i]);
      }

      this.total = arr1.reduce((a, b) => a + b);
      this.nums = arr;
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        // legend: {
        //   show: false,
        //   data: ["普通会员数", "黄金会员数"],
        // },
        color: ["#5877F8", "#806EF6"],
        series: [
          {
            type: "pie",
            radius: ["65%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: arr,
          },
        ],
      };
      myChart1.setOption(option);
    },
    async createLine() {
      let chartLine = echarts.init(document.getElementById("lineChart"));
      let params = {
        day: this.seltVal,
      };
      let { data } = await userLineChart(params);
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          show: false,
          data: [],
        },
        color: ["#FF681C"],
        grid: {
          top: 30,
          left: "2%",
          right: "5%",
          bottom: 40,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.date,
          axisLine: {
            lineStyle: {
              color: "#F7F7F7",
            },
          },
          axisLabel: {
            color: "#333",
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: {
              color: "#F7F7F7",
            },
          },
          splitLine: {
            lineStyle: {
              color: ["#F7F7F7"],
            },
          },
          axisLabel: {
            color: "#333",
          },
          axisTick: {
            show: false,
          },
          type: "value",
        },
        series: [
          {
            name: "注册数",
            data: data.count,
            type: "line", // 类型为折线图
            smooth: true,
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#FF681C",
              },
            },
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      chartLine.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.topRow {
  padding: 20px 30px;
}
.topThree {
  border-radius: 6px;
  background: #fff;
  height: 220px;
}
.topColTit {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  padding-left: 30px;
  line-height: 60px;
  height: 60px;
  border-bottom: 1px solid #f7f7f7;
}
.imgrow {
  margin-left: 30px;
  margin-top: 42px;
}
.imgrow2 {
  margin-top: 20px;
}
#chart1 {
  width: 100%;
  height: 120px;
}
.topNum {
  color: #333;
  font-size: 30px;
  line-height: 42px;
}
.topSubTit {
  color: #999;
  font-size: 12px;
  line-height: 17px;
}
.kuai {
  width: 10px;
  height: 10px;
  background: #0f88fe;
}
.kc1 {
  background: #806ef6;
}
.menberCol {
  height: 120px;
  position: relative;
}
.menberDiv {
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 14px;
  line-height: 16px;
  color: #999;
}
.lcDiv {
  height: 310px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.01);
  border-radius: 6px;
  padding: 20px 30px;
  margin: 0 20px;
  border-bottom: 1px solid #f7f7f7;
}
.lcTit {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  line-height: 26px;
}
.selectClass {
  width: 140px;
  border-radius: 2px;
}
#lineChart {
  height: 220px;
  width: 100%;
}
</style>