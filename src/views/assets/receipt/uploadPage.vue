<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="录入发票" :close-on-click-modal="false" width="30%">
            <el-container>
                <el-form ref="ruleForm" label-width="150px">
                    <el-form-item label="商家订单号" prop="businessOrderId">
                        <el-input v-model="businessOrderId" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="发票上传" prop="updata">
                        <el-upload
                            ref="upload"
                            class="uploadDiv"
                            action="http://10.50.0.84:8202/invoice/upload"
                            :multiple="false"
                            :limit="1"
                            :show-file-list="true"
                            :headers="{
                                'X-Token':
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtc2ciOiJ7XCJ1c2VySWRcIjpcIjFcIixcInVzZXJOYW1lXCI6XCIxMjM0NTY3ODkxMVwifSIsInN1YiI6InRoaXMgaXMgbGpwdHggdG9rZW4iLCJhdWQiOiJNSU5JQVBQIiwiaXNzIjoiTElURU1BTEwiLCJleHAiOjE2MDQwNDk0MTQsImlhdCI6MTYwNDA0MjIxNH0.GcStwu7xpqRo1UjwISKdK7r9wqvS5TggyEEthJts9aQ'
                            }"
                            :data="cupdatas"
                            accept=".pdf"
                            :auto-upload="false"
                            name="multipartFile"
                            :on-success="handleSuccess"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过1M</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-container>
            <div slot="footer" class="dialog-footer" style="height: 40px; border-top: 1px solid #ccc">
                <div class="btnss">
                    <el-button type="primary" @click="save">确定</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'uoloadPage',
    props: ['func','communicatdata'],
    data() {
        return {
            dialogVisible: true,
            fileList: [],
            invoiceId:this.communicatdata.communicatdata,
            businessOrderId:this.communicatdata.businessOrderId,
            cupdatas:{},
        };
    },
    mounted(){
        this.cupdatas = {
            id:this.communicatdata.invoiceId
        }
    },
    methods: {
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        //确定
        save() {
            this.$refs.upload.submit();
        },
        handleSuccess(){
            this.$message.success('上传成功！');
            this.$emit('func', 'ok');
        },
        handleClose: function () {
            this.dialogVisible = false;
            this.$emit('func', 'close');
        }
    }
};
</script>
<style>
.uploadDiv .el-upload--text {
    width: auto;
    height: auto;
    border: none;
}
</style>
<style scoped>
.btnss {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
</style>