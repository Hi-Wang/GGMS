<template>
  <div>
    <el-table 
    ref="multipleTable"
    tooltip-effect="dark"
    style="width: 100%"
    :columns="columns"
    :data="tableList"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection"></el-table-column>
    <el-table-column v-for="(item, index) in columns" :key="index" :property="item.property" :label="item.name">
      <template slot-scope="scope" v-if="scope.state === 0 || scope.state === '0'">
        <span>00000</span>
      </template>
      <template slot-scope="scope" v-if="scope.state === 1 || scope.state === '1'">
        <span>1111</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" v-if="scope.state === 0">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
    <!-- <table class="Table">
      <thead>
        <td v-if="tableData.checkbox" :span="4">
          <el-checkbox class="checbox"></el-checkbox>
          全选
        </td>
        <td v-for="(item, index) in tableData.modelHeader" :key="index">{{item.name}}</td>
        <td :span="6">操作</td>
      </thead>
      <tr v-for="(item, index) in tableList" :key="index">
        <td v-if="tableData.checkbox"><el-checkbox class="checbox"></el-checkbox></td>
        <td>{{item.name}}</td>
        <td>
          <div class="imgDiv">
            <img :src="item.img" alt="">
          </div>
        </td>
        <td>{{item.time}}</td>
        <td>{{item.price}}</td>
        <td>{{item.stock}}</td>
        <td>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </td>
      </tr>
    </table> -->
    <el-pagination class="page" background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Object,
      default: () => {
        return [];
      }
    },
    tableData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tableList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {

  }
};
</script>
<style>
@import '~assets/style/list.scss';
</style>