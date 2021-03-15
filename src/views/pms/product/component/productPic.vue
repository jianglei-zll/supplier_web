<template>
  <div class="modelDiv">
    <p class="modelTit">
      <span>图片管理</span>
      <span
        >视频：请上传5M以内
        图片：请上传500KB以内，建议尺寸800*800，拖拽图片可更换顺序</span
      >
    </p>
    <div style="margin: 0 20px; padding-bottom: 20px; padding-top: 20px">
      <el-form
        :model="value"
        :rules="rules"
        ref="productAttrForm"
        label-width="150px"
      >
        <el-form-item label="商品轮播图" prop="lbt">
          <div>
            <!-- <div style="margin-right: 20px">
              <el-upload
                action="#"
                :show-file-list="false"
                :on-success="handleViewSuccess"
                :before-upload="beforeViewUpload"
              >
                <img v-if="viewUrl" :src="viewUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p class="viewTit">视频</p>
            </div>

            <div>
              <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div> -->
            <multi-upload v-model="selectProductPics"></multi-upload>
          </div>
        </el-form-item>
        <el-form-item label="商品详情图" prop="lbt">
          <div>
            <multi-upload v-model="selectProductPics1"></multi-upload>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import MultiUpload from "@/components/Upload/multiUpload";
export default {
  name: "productPic",
  components: { MultiUpload },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    //商品的主图和画册图片
    selectProductPics: {
      get: function () {
        let pics = [];
        if (
          this.value.pic === undefined ||
          this.value.pic == null ||
          this.value.pic === ""
        ) {
          return pics;
        }
        pics.push(this.value.pic);
        if (
          this.value.albumPics === undefined ||
          this.value.albumPics == null ||
          this.value.albumPics === ""
        ) {
          return pics;
        }
        let albumPics = this.value.albumPics.split(",");
        for (let i = 0; i < albumPics.length; i++) {
          pics.push(albumPics[i]);
        }
        return pics;
      },
      set: function (newValue) {
        if (newValue == null || newValue.length === 0) {
          this.value.pic = null;
          this.value.albumPics = null;
        } else {
          this.value.pic = newValue[0];
          this.value.albumPics = "";
          if (newValue.length > 1) {
            for (let i = 1; i < newValue.length; i++) {
              this.value.albumPics += newValue[i];
              if (i !== newValue.length - 1) {
                this.value.albumPics += ",";
              }
            }
          }
        }
      },
    },
    selectProductPics1: {
      get: function () {
        let pics = [];
        if (
          this.value.detailMobileHtml === undefined ||
          this.value.detailMobileHtml == null ||
          this.value.detailMobileHtml === ""
        ) {
          return pics;
        }
        let albumPics = this.value.detailMobileHtml.split(",");
        for (let i = 0; i < albumPics.length; i++) {
          pics.push(albumPics[i]);
        }
        console.log(pics,"图片")
        return pics;
      },
      set: function (newValue) {
        console.log(newValue,"newValue")
        if (newValue == null || newValue.length === 0) {
          this.value.detailMobileHtml = null;
        } else {
          console.log(newValue.length)
          this.value.detailMobileHtml = "";
          if (newValue.length > 0) {
            for (let i = 0; i < newValue.length; i++) {
              this.value.detailMobileHtml += newValue[i];
              if (i !== newValue.length - 1) {
                this.value.detailMobileHtml += ",";
              }
            }
          }
        }
      },
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      viewUrl: "",
      rules: {
        lbt: [{ required: true, message: "请放置商品介绍" }],
      },
    };
  },
  methods: {
    handleViewSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeViewUpload() {},
    handlePictureCardPreview() {},
    handleRemove() {},
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
  background: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 4px;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
.viewTit {
  font-size: 12px;
  text-align: center;
}
</style>