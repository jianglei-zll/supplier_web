<template>
    <div>
        <el-select v-model="provinceId1" style="width: 167px; margin-right: 25px" @change="getProvince" :disabled="type">
            <el-option v-for="item in provinceArr" :value="item.id" :key="item.id" :label="item.name"> </el-option>
        </el-select>
        <el-select v-model="cityId1" style="width: 167px; margin-right: 25px" @change="getCity" :disabled="type">
            <el-option v-for="item in cityArr" :value="item.id" :key="item.id" :label="item.name"> </el-option>
        </el-select>
        <el-select v-model="districtId1" style="width: 167px; margin-right: 25px" @change="getDistrict" :disabled="type">
            <el-option v-for="item in districtArr" :value="item.id" :key="item.id" :label="item.name"> </el-option>
        </el-select>
    </div>
</template>

<script>
import { fetchListAll } from "@/api/productCate";
export default {
    data() {
        return {
            provinceArr: [],
            cityArr: [],
            districtArr: [],
            provinceId1:"",
            cityId1:"",
            districtId1:""
        };
    },
    props: ['provinceId', 'cityId', 'districtId',"type"],
    watch: {
        provinceId(newName, oldName) {
             this.provinceId1=this.provinceId
            this.getcityArr(newName);
        },
        cityId(newName, oldName) {
            this.cityId1=this.cityId
            this.getdistrictArr(newName);
        },
        districtId(newName, oldName) {
            this.districtId1=this.districtId
        }
    },
    created() {
        this.getProvinceArr();
        // this.getcityArr(this.provinceId);
        // this.getdistrictArr(this.cityId);
    },
    methods: {
        // 获取省列表
        async getProvinceArr() {
            let params={
                parentId:0,
                isClosed:0
            }
            const { code, data } = await fetchListAll(params);
            if (code === 200) {
                this.provinceArr = data;
            }
        },
        // 获取市列表
        async getcityArr(id) {
             let params={
                parentId:id,
                isClosed:0
            }
            const { code, data } = await fetchListAll(params);
                this.cityArr = data;
        },
        // 获取区列表
        async getdistrictArr(id) {
             let params={
                parentId:id,
                isClosed:0
            }
            const { code, data } = await fetchListAll(params);
                this.districtArr = data;
        },
        getProvince() {
            this.getcityArr(this.provinceId1);
            this.cityId1 = '';
            this.districtId1 = '';
            this.$emit('sendprovinceId', this.provinceId1);
        },
        getCity() {
            this.getdistrictArr(this.cityId1);
            this.districtId1 = '';
            this.$emit('sendcityId', this.cityId1);
        },
        getDistrict() {
            this.$emit('senddistrictId', this.districtId1);
        }
    }

    // getCounty() {
    //   for (var i = 0; i < this.cityArr.length; i++) {
    //     var obj = this.cityArr[i]
    //     if (this.city == obj.name) {
    //       this.countyArr = obj.sub
    //       this.county = ''
    //       this.$emit('getCounty', this.city)
    //     }
    //   }
    // },
    // getDistrict() {
    //   this.$emit('getCity', this.county)
    // }
};
</script>

<style>
</style>
