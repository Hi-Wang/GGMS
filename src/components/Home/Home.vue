<template>
    <el-container class="container" style="background: #ddd;">
        <router-view name="Top"></router-view>
        <router-view name="Main"></router-view>
    </el-container>
</template>
<script>
export default {
    components: {
    }
}
</script>
<style scoped>
    .container{
        position: absolute;
        width: 100%;
        height:100%;
    }
</style>