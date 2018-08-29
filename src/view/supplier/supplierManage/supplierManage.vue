<template>
    <div class="supplierManage-container" v-loading.fullscreen.lock="Loading">
        <alert-pro-list v-if="proListModel" :modelData="modelData" :prolist="proList" @modelShow="modelShow"></alert-pro-list>
        <p>供应商管理1页面</p><br><br>
        <el-button type="primary" @click="AlertProList()">商品列表弹框</el-button>
        <list-view :tableData="modelData" :tableList="proList" :columns="columns"></list-view>
    </div>
</template>

<script>
import AlertProList from 'components/Alert/AlertProList';
import ListView from 'components/ListView/ListView';
export default {
  data() {
    return {
      Loading: false,
      proListModel: false,
      proList: [],
      modelData: {
        title: '商品列表',
        checkbox: true  
      },
      columns: [
        {name: '商品名称', property: 'name'}, 
        {name: '商品图片', property: 'img'}, 
        {name: '创建时间', property: 'time'}, 
        {name: '商品价格', property: 'price'}, 
        {name: '商品库存', property: 'stock'}
      ]
    };
  },
  created() {
    this.Loading = true;
    this.$store.dispatch('GetProList').then((res) => {
      this.$nextTick(() => { 
        this.proList = res.data.data;  
        this.Loading = false;
      });
    }).catch(() => {
      this.loading = false;
    });
  },
  methods: {
    AlertProList() {
      this.proListModel = true;
    },
    modelShow(e) {
      this.proListModel = e;
    }
  },
  components: {
    AlertProList,
    ListView
  }
};
</script>

<style>
.supplierManage-container {
    margin: 10px 20px 0;
    overflow: hidden;
}
</style>
