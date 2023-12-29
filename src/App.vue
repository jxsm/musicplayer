<template>
    <hintModule></hintModule>
    <!--窗口顶部控制条-->
    <controlStrip @goset="setDisplay" :setSongListX="setSongListX" @clicksong="showSong"></controlStrip>
    <!--歌单列表-->
    <songList class="songList" :style="songListStyle" @clicksong="showSong" :isShow="songListShow"></songList>
    <!--遮罩层-->
    <div class="shadeBox" ref="shadeBox"></div>
    
    <!--设置页面-->
    <global_set @goset="startSet" v-if="showSet" :show="GlobalSetAnimation" ></global_set>


     <!--该写主页面了-->

</template>


<script>

import controlStrip from "./components/controlStrip.vue"//窗口顶部的控制条
import global_set from "./components/global_set.vue"//窗口设置页
import hintModule from "./components/publicModule/hintModule.vue"//提示框
import  songList  from "./components/songList/songList.vue"//歌曲列表
export default {
    components:{
        controlStrip,
        global_set,
        hintModule,
        songList,
    },
    data(){
        return{
            showSet:false,//是否显示设置菜单
            GlobalSetAnimation:false,
            SongListX:0,//歌单列表x轴坐标
            songListShow:false,//歌单列表是否显示
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
                this.setShadeBox(5,1)
                this.songListShow = false

            }
            else{
                
                setTimeout(()=>{
                    this.showSet = !this.showSet
                    this.GlobalSetAnimation = false
                },310)
                this.setShadeBox(0,1)
            }

        },
        /**
         * 设置遮罩的显示和关闭(都是缓慢的)
         * @param {Number} trueOrFalse 显示还是关闭
         * @param {Number} time 动画时常
         */
        setShadeBox(dim=4,time=1){
            this.$refs.shadeBox.style.transition = `backdrop-filter ${time}s , opacity ${time/2}s`
            this.$refs.shadeBox.style.backdropFilter = `blur(${dim}px)`
            this.$refs.shadeBox.style.opacity = dim==0?0:1

            if(dim==0){
                setTimeout(()=>{
                    this.$refs.shadeBox.style.display = "none"
                    this.$refs.shadeBox.style.zIndex = -2
                },time*1000/2)
            }else{
                this.$refs.shadeBox.style.display = "block"
                this.$refs.shadeBox.style.zIndex = 9999
            }
        },
        /**
         * 设置歌单列表的位置
         * @param {Number} x 位置
         * 传递给了顶部控制条组件,由顶部控制条组件来设置
         */
        setSongListX(x){
            this.SongListX = x - 180/2
        },
        /**
         * 显示歌单列表页面?
         */
        showSong(){
            this.songListShow = !this.songListShow
            if(this.songListShow && this.showSet){
                //当歌单显示的时候关闭设置页面
                this.showSet = true
                this.startSet()
            }
            
        }
        
    },
    mounted(){

    },
    computed:{
        songListStyle(){
            return {
                left:`${this.SongListX}px`
            }
        }
    }
    
}
</script>

<style scoped>
.shadeBox{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -2;
    opacity: 0;
    background-color: rgba(52, 52, 52, 0.4);
    backdrop-filter: blur(5px);
    transition:backdrop-filter 0s opacity 0s;
    

}
.main{
    width: 100%;
    height: 100%;
    background-color: aqua
}

.songList{
    top: 40px;
}
</style>
