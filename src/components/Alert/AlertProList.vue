<template>
  <el-dialog
    :title='modelData.title'
    :visible = 'true'
    width="30%"
    center>
  <el-table :data="prolist">
    <el-table-column v-for="(item, index) in modelData.modelHeader" :key="index" :label="item.name" :property="item.property" width="150"></el-table-column>
  </el-table>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel()">取 消</el-button>
        <el-button type="primary" @click="closeModel()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  props: {
    modelData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    prolist: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  created() {
    console.log(this.modelData);
    console.log(this.prolist);
  },
  methods: {
    closeModel() {
      this.$emit('modelShow', false);
    }
  }
};
</script>
<style>
    
</style>