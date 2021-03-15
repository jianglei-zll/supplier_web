<template>
  <div class="modelDiv">
    <p class="modelTit">
      <span>按重量</span>
      <span></span>
    </p>
    <div style="margin: 0 20px; padding-bottom: 20px; padding-left: 20px">
      <el-form :rules="rule">
        <el-form-item label="运费模板名称" prop="mbmc">
          <el-input placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="radio" label="1">启用</el-radio>
          <el-radio v-model="radio" label="2">停用</el-radio>
        </el-form-item>
        <el-form-item label="是否包邮" prop="baoyou">
          <el-radio v-model="radio" label="1">自定义运费</el-radio>
          <el-radio v-model="radio" label="2">包邮</el-radio>
        </el-form-item>
        <el-form-item label="计费方式" prop="type">
          <el-radio v-model="radio" label="1">按重量</el-radio>
        </el-form-item>
        <el-form-item label="运费计算" prop="jisuan">
          <div class="tbtns">
            <p @click="addArea">添加地区</p>
          </div>
          <el-table border :data="[{ value: '' }]">
            <el-table-column label="配送地区" align="center"></el-table-column>
            <el-table-column label="首重(kg)" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="首费(元)" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="续重(kg)" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="续费(元)" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <div class="tabBtns">
                  <p @click="editclick(scope.row)" style="width: 90px">
                    <img src="../../../assets/imgs/bianji.png" />
                    <span>编辑地区</span>
                  </p>
                  <p>
                    <img src="../../../assets/imgs/shanchu.png" />
                    <span>删除</span>
                  </p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
             <div class="subBtns">
                <p @click="back">取消</p>
                <p @click="getCheckedNodes()">保存</p>
            </div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="选择配送区域" :visible.sync="dialogVisible" width="30%">
      <div style="height:400px;overflow-y:auto;margin-left:40px">
        <el-tree
            ref="tree"
          :data="dataList"
          show-checkbox
          node-key="id"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div class="subBtns subBtns1">
        <p @click="back">取消</p>
        <p @click="getCheckedNodes()">确定</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      dialogVisible: true,
      radio: 1,
      rule: {
        mbmc: [{ required: true, message: "请输入运费模板名称" }],
        status: [{ required: true, message: "请选择状态" }],
        baoyou: [{ required: true, message: "请选择是否包邮" }],
        jisuan: [{ required: true, message: "请填写内容" }],
        type: [{ required: true, message: "请选择计费方式" }],
      },
      dataList: [
        { id: 1, label: "浙江省", children: [{ id: "1-1", label: "杭州市" }] },
        { id: 2, label: "上海", children: [{ id: "2-1", label: "上海市" }] },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    // 编辑区域
    editclick() {},
    // 添加区域
    addArea() {},
    getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
    },
    back(){
        this.dialogVisible=false;
    }
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
.tbtns {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  margin-bottom: 5px;
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
}
.subBtns1{
    justify-content: flex-end;
    margin:0;
    padding:0;
    width: auto;
}
</style>