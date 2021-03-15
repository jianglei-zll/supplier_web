<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-button
          class="assets"
          @click="assets"
          type="primary"
          size="small"
        >
          酒证资产
        </el-button>
      <div>基本信息</div>
      <div class="form">
        <div>
          <div class="flex">
            <div>会员号</div>
            <div>{{detail.id}}</div>
          </div>
          <div class="flex">
            <div>昵称</div>
            <div>{{detail.nickname?detail.nickname:"空"}}</div>
          </div>
        </div>

        <div>
          <div class="flex">
            <div>手机号</div>
            <div>{{detail.phone}}</div>
          </div>
          <div class="flex">
            <div>来源渠道</div>
            <div>{{detail.sourceType | type}}</div>
          </div>
        </div>
        <div>

          <div class="flex">
            <div>注册时间</div>
            <div>{{detail.createTime | formatTime }}</div>
          </div>
        </div>
      
      </div>
    </el-card>
    <el-card class="filter-container" shadow="never" style="margin-top:30px"> 
      <div>关联信息</div>
      <div class="form">
        <div>
          <div class="flex">
            <div>支付宝账号</div>
            <div>{{detail.phone}}</div>
          </div>
          
        </div>  
      </div>  
    </el-card>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import {} from "@/api/ums/member";

export default {
  name: "memberDetail",
  data() {
    return {
      detail:""
    };
  },
  created() {
    console.log(this.$route.params.data)
    this.detail=JSON.parse(this.$route.params.data) 
  },
  filters: {
     formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    type(value){
      if(value==1){
        return "支付宝小程序"
      }else if(value==2){
        return "微信公众号"
      }
    }
  },
  methods: {
    assets(){
      //  this.$router.push({ path: "/ums/updateMember", query: { id: row.id } });
      this.$router.push({ path: "/ums/assets"  });
    }
  },
};
</script>
<style  lang="scss" scoped>
.form{
  width:1000px;
 
}
.flex {
  display: flex;
}
.flex>div:first-child{
  width:100px;
}
.form{
  margin-left:20px;

}
.form>div{
  margin:40px 0;
  display: flex;

}
.form>div>div:nth-child(odd){
   width:500px
}
.assets{
  position: absolute;
  right:30px;
}
</style>
