<template> 
  <el-card class="form-container" shadow="never">
    <el-form :rules="rules" label-width="150px">
      <el-form-item label="晋升" prop="jse">
        V1晋升V2
      </el-form-item>
      <el-form-item label="消费" prop="xf">
        <el-input></el-input>
      </el-form-item>
         <el-form-item>
        <div class='btnsP'>
          <p>返回</p>
          <p>确定</p>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
    name:'setMemberLevel',
    data() {
      return {
        rules: {
          jse: [
            {required: true, message: '请输入等级'}
          ],
          xf: [
            {required: true, message: '请输入消费数量'}
          ],
        }
      }
    },
}
</script>
<style lang="scss" scoped>
.btnsP{
  display: flex;
  p{
    width: 120px;
    height: 36px;
    background: #FC6602;
    box-shadow: 0px 4px 10px 0px rgba(252, 131, 2, 0.14);
    border-radius: 4px;
    color:#fff;
    text-align: center;
    line-height:36px;
    border:1px solid #FC6602;
    cursor: pointer;
  }
  p:first-child{
    color:#333;
    border-color: #E8E8E8;
    background: #fff;
    margin-right:30px;
    box-shadow:none;
  }
}
</style>