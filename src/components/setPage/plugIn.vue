<template>
    <div class="plugIn">
        <PluginIformDetails/>
        <displayPlugIn/>
        <div class="feature">
           <div class="feature-item"> 
                <p>导入插件</p>
                <svg t="1715924336891" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5135" ><path d="M960 672v128c0 89.6-70.4 160-160 160h-576C134.4 960 64 889.6 64 800v-576C64 134.4 134.4 64 224 64h128c19.2 0 32 12.8 32 32s-12.8 32-32 32h-128C172.8 128 128 172.8 128 224v576c0 51.2 44.8 96 96 96h576c51.2 0 96-44.8 96-96v-128c0-19.2 12.8-32 32-32s32 12.8 32 32zM800 576c19.2 0 32-12.8 32-32s-12.8-32-32-32H556.8l326.4-326.4c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0L512 467.2V224c0-19.2-12.8-32-32-32s-32 12.8-32 32V576h352z" p-id="5136"></path></svg>
            </div>
        </div>
    </div>
</template>
<script>
import displayPlugIn from "./displayPlugIn.vue"
import PluginIformDetails from "./PluginIformDetails.vue"
//插件扩展设置
export default {
    components:{
        displayPlugIn,
        PluginIformDetails
    },
    methods:{
        /**
         * 显示插件详情
         * @param {string} info 
         */
        showIformDetails(info){
            console.log(info)
        }
    }
}
</script>

<style scoped>
.plugIn{
    position: absolute;
    width: 80%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--adjacent-theme-colour);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.feature{
    width: 100%;
    height: 6%;
    position: relative;
    display: flex;
    justify-content: flex-end;
}


.feature-item{
    border-radius: 5px;
    width:150px;
    height: 100%;
    background-color: var(--adjacent-HighBrightness-colour);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--adjacent-theme-colour);
    margin-right: 10px;
}

.feature-item *{
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
 
}


.feature-item svg{
    height: 80%;
    fill: var(--adjacent-theme-colour);
}


</style>