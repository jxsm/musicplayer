<template>
    <div class="deletePluginBox" ref="deletePluginBox">
        <div class="infoBox">
            <!--TODO:先将删除插件的关闭页面功能做出来-->
            <svg t="1703493087916" class="closeSet" @click="$emit('close')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="200" height="200"><path data-v-34e53e54="" d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="" p-id="5099"></path></svg>
            <div class="divisionBox">
                <img :src="imgSrc">
            </div>
        </div>
    </div>
</template>

<script>
import UnfoldAndClone from "../../js/render/UnfoldAndClone"

export default{
    data(){
        return{
            imgSrc:"",
            unfoldAndClone:null
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
        },
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
        }
    },
    watch:{
        infos(){
            this.setImg()
        },
        isShow(newValue){
            if(newValue){
                this.unfoldAndClone.show()
            }
            else{
                this.unfoldAndClone.close()
            }
        }
    },
    mounted()
    {
        setTimeout(()=>{
            console.log(this.infos)
        },1000)

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
    overflow: hidden;
    border-radius: 15px;
    width: 80%;
    height: 80%;
    background-color: var(--adjacent-theme-colour-d);
}

.closeSet{
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


</style>