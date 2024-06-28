<template>
    <div class="deletePluginBox" ref="deletePluginBox">
        <div class="infoBox">
            
            <svg t="1703493087916" class="closeSet" @click="$emit('close')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="200" height="200"><path data-v-34e53e54="" d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="" p-id="5099"></path></svg>
            
            <div class="imgBox">
                <div class="titleInfo">
                    <div>
                        <p>确定要删除<kt>{{ showInfo.title }}</kt>吗</p>
                    </div>
                    <div>
                        <div id="certain" class="sebutton" @click="removePlugins">确定</div>
                        <div id="abolish" class="sebutton" @click="$emit('close')">取消</div>
                    </div>
                </div>
            </div>
            <div class="divisionBox">
                <img :src="imgSrc">
            </div>
        </div>
    </div>
</template>

<script>
import UnfoldAndClone from "../../js/render/UnfoldAndClone"
import {proceedHint} from "../../js/render/proceedHint"

export default{
    data(){
        return{
            imgSrc:"",
            unfoldAndClone:null,
            showInfo:{
                title:""
            }
        }
    },
    methods:{
        /**
         * 设置图片
         */
        setImg(){
            if(this.infos['logo']){
                this.imgSrc = "data:image/png;base64,"+this.infos['logo']
            }
            else{
                this.imgSrc = "";
            }
        },
        setShowInfo(){
            this.showInfo.title = this.infos["plugin"]["name"]
        },
        removePlugins(){
            window.ipcRenderer.send("removePlugins",this.infos["plugin"]["location"],this.infos["fileName"])
            window.ipcRenderer.on("removePlugins",this.removeMonitor)
            this.$emit("close")
        },
        async removeMonitor(isOK){
            if(isOK){
                proceedHint.commonHint("删除成功")
            }
            else{
                proceedHint.warn("删除失败")
            }
            window.ipcRenderer.off("removePlugins",this.removeMonitor)
            window.ipcRenderer.send("getAllPluginsInfo")
        }
    },
    props:{
        infos:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        isShow:{
            type:Boolean,
            default:false
        },
        
    },
    watch:{
        isShow(newValue){
            if(newValue){
                this.setImg()
                this.setShowInfo()
                this.unfoldAndClone.show()
            }
            else{
                this.unfoldAndClone.close()
            }
        }
    },
    mounted()
    {
        this.unfoldAndClone = new UnfoldAndClone(this.$refs.deletePluginBox,"flex")
    }
}
</script>

<style scoped>
.deletePluginBox{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    display:none;
    align-items: center;
    justify-content: center;
}

.infoBox{
    position: absolute;
    overflow: hidden;
    border-radius: 15px;
    width: 80%;
    height: 80%;
    background-color: var(--adjacent-theme-colour-d);
    overflow: hidden;
}

.closeSet{
    z-index: 9999;
    position: absolute;
    margin-top: 10px;
    margin-left: 95%;
}
.divisionBox{
    display: flex;
    align-items: center;
    justify-content:center;
    width: 100%;
    height: 90%;
    border: 1px solid red;
}

.divisionBox img{
    top: 0;
    width: 100%;
}

.imgBox{
    top: 0;
    z-index: 99;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top,var(--oppositeAdjacent-theme-colour) 60%, rgba(255, 0, 0, 0));
}

.titleInfo{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
}

.titleInfo div:nth-child(1){
    display: flex;
    grid-row: 2;
    align-items: center;
    justify-content: center;
    color: var(--adjacent-HighBrightness-colour);
}

kt{
    color: var(--opposite-theme-colour);
    font-size: 200%;
}

.titleInfo div:nth-child(2){
    grid-row: 3;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-self:center;
    align-items: center;
}

.sebutton{
    border: 10px !important;
    width: 30% !important;
    height: 40px !important;
    border-radius: 10px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

#certain{
    background-color: var(--opposite-theme-colour);
}


#abolish{
    background-color: var(--adjacent-HighBrightness-colour);
}


</style>