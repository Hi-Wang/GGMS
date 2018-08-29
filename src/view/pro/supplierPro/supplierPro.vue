<template>
    <div class="supplierPro-container">
        供应商商品
    </div>
</template>
<script>
import { parseTime } from 'assets/js/common';
export default {
  created() {
    console.log(parseTime(123));
  }
};
</script>
<style>
.supplierPro-container {
    margin: 10px 20px 0;
    overflow: hidden;
}
</style>