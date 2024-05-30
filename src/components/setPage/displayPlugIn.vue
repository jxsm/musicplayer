<template>
    <div class="displayPlugIn">
        <plugInInfo v-for="(item,index) in pluginList" :key="index" :infos="item" ref="plugInInfo">

        </plugInInfo>
      
    </div>
</template>
<script>
import {proceedHint} from "../../js/render/proceedHint"
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
            /**
             * 当插件是否启用被更新的时候触发
             * @param {*} event 
             * @param {string} fileName 
             * @param {string} location 
             * @param {Object} data 
             */
            updatePluginEnable(event,fileName,location,data){
                void event,fileName,location

                if(data["err"]!=void 0){
                    //TODO:改成提示
                    proceedHint.warning("更改失败")
                }

                if(data["ok"]!=void 0){
                    let isEdit = false;
                    for(let i of this.$refs.plugInInfo){
                        if(i.infos["fileName"] === fileName && i.infos["plugin"]["location"] === location){
                            i.infos["config"]["enable"] = data["enable"]
                            //让该组件重新渲染
                            isEdit = true;
                            
                            if(data["enable"]){
                                proceedHint.warn("启用成功,重启后生效")
                            }
                            else{
                                proceedHint.warn("禁用成功,重启后生效")
                            }
                        }
                    }
                    
                    if(!isEdit){
                        proceedHint.warning("返回的插件信息与现有的插件信息不匹配,但配置仍然可能被修改")
                        console.error("返回的插件信息与现有的插件信息不匹配,但配置仍然可能被修改")
                    }
                }



            }
            
        },
        components:{
            plugInInfo
        },
        mounted(){
            window.ipcRenderer.send("getAllPluginsInfo")
            window.ipcRenderer.on("getAllPluginsInfo",this.addPluginList)
            window.ipcRenderer.on("updatePluginEnable",this.updatePluginEnable)
        },
        //被销毁前移除监听
        beforeUnmount(){
              //被销毁前移除监听
            window.ipcRenderer.removeListener("getAllPluginsInfo",this.addPluginList)
            window.ipcRenderer.removeListener("updatePluginEnable",this.updatePluginEnable)
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