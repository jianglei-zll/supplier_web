<template> 
    <el-card class="form-container" shadow="never">
        <el-form :model="adminSysNotice" :rules="rules" ref="AdminSysNoticeFrom" label-width="150px">




                    <el-form-item
                            label="公告标题"
                            prop="noticeTitle">
                        <el-input v-model="adminSysNotice.noticeTitle" style="width: 370px;"/>
                    </el-form-item>


 <el-form-item label="公告类型：">
        <el-radio-group v-model="adminSysNotice.noticeType">
          <el-radio :label="1">通知</el-radio>
          <el-radio :label="2">公告</el-radio>
        </el-radio-group>
      </el-form-item>

                    <el-form-item
                            label="公告内容"
                            prop="noticeContent">
                        <el-input v-model="adminSysNotice.noticeContent" style="width: 370px;"/>
                    </el-form-item>

 <el-form-item label="是否显示：">
        <el-radio-group v-model="adminSysNotice.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>






                    <el-form-item
                            label="备注"
                            prop="remark">
                        <el-input v-model="adminSysNotice.remark" style="width: 370px;"/>
                    </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit('AdminSysNoticeFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('AdminSysNoticeFrom')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    import {createAdminSysNotice, getAdminSysNotice, updateAdminSysNotice} from '@/api/sys/adminSysNotice'
    import SingleUpload from '@/components/Upload/singleUpload'

    const defaultAdminSysNotice = {
        name: ''
    };
    export default {
        name: 'AdminSysNoticeDetail',
        components: {SingleUpload},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            adminSysNotice:
            Object.assign({},
        defaultAdminSysNotice),
            rules: {
                name: [
                    {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
                ],
                    logo
            :
                [
                    {required: true, message: '请输入品牌logo', trigger: 'blur'}
                ],
                    sort
            :
                [
                    {type: 'number', message: '排序必须为数字'}
                ],
            }
        }
        },
        created() {
            if (this.isEdit) {
                getAdminSysNotice(this.$route.query.id).then(response => {
                    this.adminSysNotice = response.data;
            })
                ;
            } else {
                this.adminSysNotice = Object.assign({},
            defaultAdminSysNotice)
                ;
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if(this.isEdit
                    )
                        {
                            updateAdminSysNotice(this.$route.query.id, this.adminSysNotice).then(response => {
                                if(response.code == 200
                        )
                            {
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }
                        else
                            {
                                this.$message({
                                    message: response.msg,
                                    type: 'error',
                                    duration: 1000
                                });
                            }

                        })
                            ;
                        }
                    else
                        {
                            createAdminSysNotice(this.adminSysNotice).then(response => {
                                if(response.code == 200
                        )
                            {
                                this.$refs[formName].resetFields();
                                this.adminSysNotice = Object.assign({},
                            defaultAdminSysNotice)
                                ;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.$router.back();
                            }
                        else
                            {
                                this.$message({
                                    message: response.msg,
                                    type: 'error',
                                    duration: 1000
                                });
                            }

                        })
                            ;
                        }
                    })
                        ;

                    } else {
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration: 1000
                        });
                return false;
            }
            })
                ;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.adminSysNotice = Object.assign({},
            defaultAdminSysNotice)
                ;
            }
        }
    }
</script>
<style>
</style>


