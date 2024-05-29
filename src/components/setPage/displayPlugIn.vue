<template>
    <div class="displayPlugIn">
        <plugInInfo v-for="(item,index) in pluginList" :key="index" :infos="item" >

        </plugInInfo>
      
    </div>
</template>
<script>
    //展示插件
    import plugInInfo from "./plugInInfo.vue"
    export default{
        data(){
            return{
                pluginList:[]
            }
        },
        methods:{
            addPluginList(event,data){
                /**
                 * 处理插件信息
                 * @param {string} keys 插件的key值
                 * @param {indata} kesy 数据值
                 */
                const handleFunc = (keys,indata)=>{
                    for(let i of keys){
                        const info = indata[i]
                        if(Object.keys(info["plugin"]).length === 0 ){
                            continue
                        }
                        this.pluginList.push(info)
                }
                }

                void event
                window.ipcRenderer.removeListener("getAllPluginsInfo",this.addPluginList)
                handleFunc(Object.keys(data["background"]),data["background"])
                handleFunc(Object.keys(data["render"]),data["render"])
            },
            
            
        },
        components:{
            plugInInfo
        },
        mounted(){
            window.ipcRenderer.send("getAllPluginsInfo")
            window.ipcRenderer.on("getAllPluginsInfo",this.addPluginList)
        }
    }
</script>
<style scoped>
.displayPlugIn{
    width: 100%;
    height: 92%;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;

}
</style>