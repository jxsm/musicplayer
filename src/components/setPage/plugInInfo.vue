<template>
    <div class="outerBox">
        <div class="showPictures">
            <img :src="loadTypeSrc" class="loadTypeSrcStyle">
            <img v-if="!showDefaultIcon" :src="imgSrc" class="pluginImg">
            <svg v-if="showDefaultIcon" t="1715824587703" class="defaultIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5203" width="200" height="200"><path d="M563.20625 545.3875l232.1875-142.7a51.25 51.25 0 0 0-53.6-87.2375L512.00625 456.6 282.61875 315.45a51.25 51.25 0 0 0-53.65 87.2375l231.8375 142.5875v273.925a51.25 51.25 0 1 0 102.4 0zM512.00625 0l443.3875 256v512L512.00625 1024 68.60625 768V256z m0 0"  p-id="5204"></path></svg>
        </div>
        <diV class="details" :title="details">
            {{infos["plugin"]["description"]}}
        </diV>
        <div class="featureBox">
            <div>
                {{infos["plugin"]["author"]}}
            </div>
            <div>
                <svg title="禁用" v-if="infos['config']['enable']" @click="forbiddenThisPlugin" t="1715826382013" class="featureIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4277" ><path d="M512 953.6a441.6 441.6 0 1 1 0-883.2 441.6 441.6 0 0 1 0 883.2z m0-64a377.6 377.6 0 1 0 0-755.2 377.6 377.6 0 0 0 0 755.2z"  p-id="4278"></path><path d="M182.1696 227.4304l45.2608-45.2608 614.4 614.4-45.2608 45.2608z"  p-id="4279"></path></svg>
                <svg title="启用" v-if="!infos['config']['enable']" @click="enableThisPlugin" t="1715826731597" class="featureIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5264" ><path d="M510.2 959.7c-246.9-1-447-202.6-446-449.5s202.6-447 449.5-446 447 202.6 446 449.5-202.6 447-449.5 446z m3.3-833.7c-212.8-0.8-386.7 171.7-387.5 384.5S297.7 897.2 510.5 898 897.2 726.3 898 513.5 726.3 126.8 513.5 126z" p-id="5265"></path><path d="M465.8 712.3L291.1 537.6l43.7-43.7 131 131 262-262 43.7 43.7z" p-id="5266"></path></svg>
                <svg title="详细信息" @click="$emit('detainfo',infos)" t="1715827123087" class="featureIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6279" ><path d="M346.2 514.6m-64.2 0a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z" p-id="6280"></path><path d="M450.1 514.6a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z" p-id="6281"></path><path d="M682.5 514.6m-64.2 0a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z" p-id="6282"></path><path d="M512 136.3c50.7 0 99.9 9.9 146.2 29.5 44.7 18.9 84.9 46 119.5 80.6 34.5 34.5 61.6 74.7 80.6 119.5 19.6 46.3 29.5 95.5 29.5 146.2s-9.9 99.9-29.5 146.2c-18.9 44.7-46 84.9-80.6 119.5-34.5 34.5-74.7 61.6-119.5 80.6-46.3 19.6-95.5 29.5-146.2 29.5s-99.9-9.9-146.2-29.5c-44.7-18.9-84.9-46-119.4-80.6-34.5-34.5-61.6-74.7-80.6-119.5-19.6-46.3-29.5-95.5-29.5-146.2s9.9-99.9 29.5-146.2c18.9-44.7 46-84.9 80.6-119.5 34.5-34.5 74.7-61.6 119.4-80.6 46.3-19.6 95.5-29.5 146.2-29.5m0-70C265.9 66.3 66.3 265.9 66.3 512S265.9 957.7 512 957.7 957.7 758.1 957.7 512 758.1 66.3 512 66.3z" p-id="6283"></path></svg>
                <svg title="删除" t="1715827282105" class="featureIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9036"><path d="M256 256v608a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V256z m480 704H288a96 96 0 0 1-96-96V224a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v640a96 96 0 0 1-96 96z"  p-id="9037"></path><path d="M160 256a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64zM352 448a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0zM480 448a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0zM608 448a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0z"  p-id="9038"></path><path d="M647.04 128h-270.08l-16 64h302.08zM704 256H320a32 32 0 0 1-32-39.68l32-128A32 32 0 0 1 352 64h320a32 32 0 0 1 32 24.32l32 128A32 32 0 0 1 704 256z"  p-id="9039"></path></svg>
            </div>
            
        </div>
    </div>
</template>
<script>

//插件信息展示
export default{
    data(){
        return{
            imgSrc:"",
            loadTypeSrc:""
        }
    },
    props:{
        infos:{
            type:Object
        }
    },
    mounted(){
        // plugin:{
        //             author: "作者"
        //             description: "测试插件"
        //             homepage: "作者主页"
        //             loading_time: 1
        //             location: "background"
        //             logo: "logo.png"
        //             main: "main.js"
        //             name: "测试插件"
        //             version: "1.0.0"
        //         },
        //         config:{
        //             enable:true
        //         },
        //         fileName:文件名   
    
        
        
    },
    computed:{
        showDefaultIcon(){
            this.setImg()
            return this.infos['logo'] == void 0
        }
    },
    methods:{
        setImg(){
            this.setloadTypeSrc()
            if(this.infos['logo']){
                this.imgSrc = "data:image/png;base64,"+this.infos['logo']
            }
        },
        /**
         * 禁用本插件
         */
        forbiddenThisPlugin(){
            window.ipcRenderer.send('setPluginEnable',this.infos['fileName'],this.infos['plugin']['location'],false)
        },
        /**
         * 启用插件
         */
        enableThisPlugin(){
            window.ipcRenderer.send('setPluginEnable',this.infos['fileName'],this.infos['plugin']['location'],true)
        },
        /**
         * 设置加载类型展示图片
         */
         setloadTypeSrc(){
            const imgSrc = {
                "background":require("../../assets/svg/xitongguanli.svg"),
                "render":require("../../assets/svg/渲染.svg")
            }
            this.loadTypeSrc = imgSrc[this.infos["plugin"]["location"]]
        },
    }
}

</script>
<style scoped>
.outerBox{
    width: 200px;
    height: 200px;
    background-color: var(--adjacentColour-theme-two);
    border: 2px solid white;
    margin: 10px;
    border-radius: 5px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 50% 40% 10%;
    grid-template-columns: 100%
}

.showPictures{
    border-bottom: 2px solid var(--adjacent-HighBrightness-colour);
    overflow: hidden;
}

.defaultIcon{
    height: 100%;
    transform: scale(1);
    fill: var(--adjacent-HighBrightness-colour);
    transition: transform 0.5s;
}

.defaultIcon:hover{
    transform: scale(1.2);
}


.details{

    border-bottom: 2px solid var(--adjacent-HighBrightness-colour);
    overflow: scroll;
    font-size: 80%;
    color: var(--adjacent-HighBrightness-colour);
    font-weight: bold;
}

.featureBox{
    
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: bold;
    color: var(--adjacent-HighBrightness-colour);
}


.featureBox{
    height: 100%;
    margin-left: 2px;
    fill: var(--adjacent-HighBrightness-colour);
}

.featureBox div{
    height: 100%;
    width: 50%;
}

.featureBox div:nth-child(2){
    display: flex;
    justify-content: flex-end;
}


.featureIcon{
    height: 100%;
}

.pluginImg{
    width: 100%;
    transform: scale(1);
    transition: transform 0.5s;
}

.pluginImg:hover{
    transform: scale(1.1);
}

.loadTypeSrcStyle{
   position: fixed;
   width: 10px;
   height: 10px;
   z-index: 2;
}
</style>