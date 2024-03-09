<!--该组件用于选中文件-->
<template>
    <div class="outer" :style="outerStyle" @click="addFile">
        <svg t="1703575040210" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4241" width="200" height="200"><path d="M992 480H544V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h448v448c0 17.7 14.3 32 32 32s32-14.3 32-32V544h448c17.7 0 32-14.3 32-32s-14.3-32-32-32z"  p-id="4242"></path></svg>
    </div>
</template>
<script>
import {proceedHint} from '../../public/static/proceedHint'

export default{
    data(){
        return{
            
        }
    },
    props:{
        filewidth:{
            type:String,
            default:"150px"
        },
        fileheight:{
            type:String,
            default:"150px"
        },
        filecolor:{
            type:String,
            default:"#4e4e4e"
        },
        func:{
            type:Function,
        }
    },
    methods:{
        addFile(){
            window.ipcRenderer.send('open-Directory', 1);
        },
       
    },
    mounted(){
        window.ipcRenderer.on('selectedItem', (event, arg) => {
            if(arg[1] == void 0){
                return
            }
            if(arg[0] == 1){
                if(arg[1].length<=3){
                    proceedHint.warning("禁止选择根目录","警告",3000)
                    return
                }
                this.$emit("selectFile",arg[1])
            }
        })
    },
    computed:{
        //计算属性
        /**
         * 设置文件方块的宽高和背景色
         */
        outerStyle(){
            return{
                width:this.filewidth,
                height:this.fileheight,
                backgroundColor:this.filecolor
            }
        }
    },
    watch:{

    }
}
</script>
<style scoped>
.outer{
    border-radius: 15px;   
    display: flex;
    align-items: center;
    justify-content: center;
    transition:box-shadow 0.2s ;
}

.outer:hover{
    box-shadow: inset 0px 0px 15px 8px #31313147;
}

.outer:hover svg{
    width: 60%;
}

.outer svg{
    transition: width 0.2s;
    width: 70%;
    fill:var(--opposite-theme-colour) ;
}


</style>