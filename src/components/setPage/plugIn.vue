<template>
    <div class="plugIn">
        <displayPlugIn/>
        <div class="a">

        </div>
    </div>
</template>
<script>
import displayPlugIn from "./displayPlugIn.vue"
//插件扩展设置
export default {
    components:{
        displayPlugIn
    }
}
</script>

<style scoped>
.plugIn{
    width: 80%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--adjacent-theme-colour);
    overflow: hidden;
}
.a{
    width: 100%;
    height: 10%;
    background-color: red;
}
</style>