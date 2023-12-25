<template>
    <!--窗口顶部控制条-->
    <controlStrip @goset="setDisplay"></controlStrip>
    <!--遮罩层-->
    <div class="shadeBox" ref="shadeBox"></div>
    <!--设置页面-->
    <global_set @goset="startSet" v-if="showSet" :show="GlobalSetAnimation" ></global_set>
</template>


<script>

import controlStrip from "./components/controlStrip.vue"//窗口顶部的控制条
import global_set from "./components/global_set.vue"//窗口设置页

export default {
    components:{
        controlStrip,
        global_set
    },
    data(){
        return{
            showSet:false,
            GlobalSetAnimation:false
        }
    },
    methods:{
        /**
         * 设置是否显示,设置,如果已经显示了则不再显示
         */
         setDisplay(){
            if(!this.showSet){
                this.startSet()
            }
         },
        /**
         * 显示设置页面
         */
        startSet(){
            this.GlobalSetAnimation = true
            if(!this.showSet){
                this.showSet = !this.showSet
                this.GlobalSetAnimation = false
                this.setShadeBox()
            }
            else{
                setTimeout(()=>{
                    this.showSet = !this.showSet
                    this.GlobalSetAnimation = false
                },480)
                this.setShadeBox(0,1)
            }

        },
        /**
         * 设置遮罩的显示和关闭(都是缓慢的)
         * @param {Number} trueOrFalse 显示还是关闭
         * @param {Number} time 动画时常
         */
        setShadeBox(dim=4,time=1){
            this.$refs.shadeBox.style.transition = `filter ${time}s`
            this.$refs.shadeBox.style.filter = `blur(${dim}px)`
        }
        
    },
    mounted(){

    }
    
}
</script>

<style scoped>
.shadeBox{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.162);
    filter: blur(0px);
    transition:filter 0s ;
}
</style>
