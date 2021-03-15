<template>
  <div style="width: 1200px; margin: 0 auto">
    <el-row :gutter="10" class="wkuan">
      <el-col :span="8">
        <div class="kuan">
          <p class="flex ht1">
            <span class="fnt1">未添加属性</span>
            <span class="fnt2">点击【+】可添加属性到该分类下</span>
          </p>
          <div class="ht2">
            <el-input
              v-model="noCheckInput"
              @input="noCheckSearch"
              placeholder="请输入属性名称查询"
              class="inpClass"
            ></el-input>
          </div>
          <div style="height: 600px; overflow-y: auto" v-if="!noCheckInput">
            <p
              class="flex ht3"
              v-for="(item, index) in noCheckList"
              :key="item.id"
              @click="seeAttrDetail(item)"
            >
              <span class="fnt3">{{ item.name }}</span>
              <span class="fnt4" @click.stop="add(item, index)">+</span>
            </p>
          </div>
           <div style="height: 600px; overflow-y: auto" v-else>
            <p
              class="flex ht3"
              v-for="(item, index) in noCheckSearchList"
              :key="item.id"
              @click="seeAttrDetail(item)"
            >
              <span class="fnt3">{{ item.name }}</span>
              <span class="fnt4" @click.stop="searchAdd(item, index)">+</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="kuan">
          <p class="flex ht1">
            <span class="fnt1">已添加属性</span>
            <span class="fnt2">点击【-】可删除该分类下的属性</span>
          </p>
          <div class="ht2">
            <el-input
              v-model="checkedInput"
              placeholder="请输入属性名称查询"
              class="inpClass"
              @input="checkedSearch"
            ></el-input>
          </div>


          <div style="height: 600px; overflow-y: auto" v-if="!checkedInput">
            <p
              class="flex ht3"
              v-for="(item, index) in checkedList"
              :key="item.id"
              @click="seeAttrDetail(item)"
            >
              <span class="fnt3">{{ item.name }}</span>
              <span class="fnt5" @click.stop="cut(item, index)">-</span>
            </p>
          </div>
          <div style="height: 600px; overflow-y: auto" v-else>
            <p
              class="flex ht3"
              v-for="(item, index) in checkedSearchList"
              :key="item.id"
              @click="seeAttrDetail(item)"
            >
              <span class="fnt3">{{ item.name }}</span>
              <span class="fnt5" @click.stop="searchCut(item, index)">-</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="kuan">
          <p class="flex ht1">
            <span class="fnt1">属性详情</span>
          </p>
          <div style="height: 660px; overflow-y: auto">
            <div class="flex ht1 nob">
              <p class="fnt6">属性名称</p>
              <p class="fnt3">{{ attrDetail.name }}</p>
            </div>
            <div class="flex ht1 nob">
              <p class="fnt6">属性别名</p>
              <p class="fnt3" v-if="attrDetail.name">
                {{ attrDetail.rectName ? attrDetail.rectName : "无" }}
              </p>
            </div>
            <div class="flex ht1 nob">
              <p class="fnt6">属性状态</p>
              <p class="fnt3" v-if="attrDetail.name">
                {{ attrDetail.status == 0 ? "正常" : "停用" }}
              </p>
            </div>
            <!-- <div class="flex ht1 nob">
              <p class="fnt6">限制</p>
              <p class="fnt3">属性</p>
            </div> -->
            <div class="flex ht1 nob">
              <p class="fnt6">属性说明</p>
              <p class="fnt3" v-if="attrDetail.name">
                {{ attrDetail.note ? attrDetail.note : "无" }}
              </p>
            </div>
             <div class="flex ht1 nob">
              <p class="fnt6">单位</p>
              <p class="fnt3" v-if="attrDetail.name">
                {{ attrDetail.unit ? attrDetail.unit : "无" }}
              </p>
            </div>
            <!-- <div class="flex ht1 nob">
              <p class="fnt6">属性交互</p>
              <p class="fnt3">复选框</p>
            </div>
            <p class="fnt3 zhi">值1</p>
            <p class="fnt3 zhi">值2</p> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="subBtns">
      <p @click="back">返回</p>
      <p @click="onSubmit('productCateFrom')">确定</p>
    </div>
  </div>
</template>
<script>
import { fetchList, deleteProductAttr, listAttr } from "@/api/productAttr";
import { updateAttr } from "@/api/productCate";

export default {
  name: "attrMan",
  data() {
    return {
      list:[],
      list1:[],
      noCheckInput: "",
      checkedInput: "",
      listQuery: {
        type: 1,
        status: 0,
      },
      noCheckSearchList: [],
      checkedSearchList: [],
      noCheckList: [],
      checkedList: [],
      list: [],
      attrDetail: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    back(){
      this.$router.back();
    },
    noCheckSearch() {
      let noCheckSearchList=[]
      for (let i of this.noCheckList) {
        if (i.name.indexOf(this.noCheckInput) >= 0) {
          noCheckSearchList.push(i );
        }
        this.noCheckSearchList=noCheckSearchList
      }
    },
    checkedSearch() {
      let checkedSearchList=[]
      for (let i of this.checkedList) {
        if (i.name.indexOf(this.checkedInput) >= 0) {
          checkedSearchList.push(i );
        }
        this.checkedSearchList=checkedSearchList
      }
    },
    onSubmit() {
      let productAttributeIdList = this.checkedList.map((i) => {
        return i.id;
      });
      let params = {
        productAttributeIdList,
        type:1
      };
      updateAttr(this.$route.query.cid, params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
        this.$router.back();
      });
    },
    seeAttrDetail(item) {
      this.attrDetail = item;
    },
    searchAdd(item,index){
      this.checkedList.push(item);
      this.noCheckSearchList.splice(index, 1);
      this.noCheckList.forEach((e,i) => {
        if(item.id==e.id){
          this.noCheckList.splice(i, 1);
        }
      });
    },
    add(item, index) {
      this.checkedList.push(item);
      this.noCheckList.splice(index, 1);
    },
    searchCut(item, index){
      this.noCheckList.push(item);
      this.checkedSearchList.splice(index, 1);
      this.checkedList.forEach((e,i) => {
        if(item.id==e.id){
          this.checkedList.splice(i, 1);
        }
      });
    },
    cut(item, index) {
      this.noCheckList.push(item);
      this.checkedList.splice(index, 1);
    },
    async getList() {
      this.listLoading = true;
      var { data } = await fetchList(this.$route.query.cid, this.listQuery);
      this.checkedList = data;
      let checkedList = [];
      data.map((item) => {
        checkedList.push(item.id);
      });
      
      var { data: list } = await listAttr(this.listQuery);
      if (this.checkedList.length == 0) {
        this.noCheckList = list;
      } else {
        this.noCheckList = list.filter((val, i) => {
          // 过滤arr
          return !checkedList.includes(val.id);
        });
      }
    },
  },
  filters: {},
};
</script>
<style lang="scss">
.inpClass {
  input {
    border-radius: 40px;
    height: 30px;
  }
}
</style>
<style lang="scss" scoped>
.wkuan {
  padding: 20px;
  background: #fff;
  margin-top: 30px;
}
.kuan {
  border: 1px solid #eee;
  background: #fff;
}
.flex {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  align-items: center;
}
.ht1 {
  height: 46px;
  line-height: 46px;
  padding: 0 15px;
}
.ht2 {
  height: 56px;
  border-bottom: 1px solid #eee;
}
.ht3 {
  height: 40px;
  padding: 0 15px;
  cursor: pointer;
}
.inpClass {
  margin-top: 14px;
  width: 90%;
  margin-left: 5%;
}
.fnt1 {
  color: #333;
  font-size: 16px;
}
.fnt2 {
  color: #999;
  font-size: 12px;
}
.fnt3 {
  color: #333;
  font-size: 14px;
}
.fnt4 {
  color: #0e9100;
  font-size: 24px;
  cursor: pointer;
}
.fnt5 {
  color: #f97474;
  font-size: 24px;
  cursor: pointer;
}
.fnt6 {
  color: #999;
  font-size: 14px;
}
.zhi {
  text-align: right;
  margin-right: 15px;
  margin-top: 10px;
}
.nob {
  border: none;
}
.subBtns {
  margin-right: -5px;
  margin-left: -5px;
}
</style>