<template>
    <!--FIXME: 该组件用于主界面的封装,更改主界面的内容需要到这里来-->
    <div class="AppBox">
        
        <miniPlayer @hideSmallPlayer="hideSmallPlayer" :showMiniPlayer="showMiniPlayer"></miniPlayer>
        <songNameList :showMiniPlayer="showMiniPlayer" :showBar="showBarTypePlayer"></songNameList>
        <barTypePlayer  :isShow="showBarTypePlayer" @conceal="concealBarTypePlayer"></barTypePlayer>
        <progressBar :miniBarShow="showBarTypePlayer" @mouseenter="shiftToBottom"></progressBar>
    </div>
</template>

<script>
import songNameList from "../songNameList/songNameList.vue"
import miniPlayer from "../miniPlayer/miniPlayer.vue"
import barTypePlayer from "../miniPlayer/barTypePlayer.vue"
import progressBar from '../miniPlayer/progressBar.vue'

export default{
    data(){
        return{
            showMiniPlayer:true,//是否显示迷你播放器
            showBarTypePlayer:false,//是否显示底部播放器
            cooling:false,//是否正在冷却
        }
    },
    components:{
        songNameList,
        miniPlayer,
        barTypePlayer,
        progressBar
    },
    methods:{
        /**
         * 是否显示小播放器
         * @param {Object} e 事件对象传递过来的参数
         */
        hideSmallPlayer(e){
            this.showMiniPlayer = e;
        },
        /**
         * 当鼠标移入底部的时候看迷你播放器是否显示,如果没有显示则呼出条形控制器
         * 并且需要拥有冷却时间
         */
        shiftToBottom(){
            if (!this.showMiniPlayer) {
                if(!this.cooling){
                    this.showBarTypePlayer = true;
                }
     
            }
        },
        /**
         * 当底部控制条的隐藏按钮被点击的时候,隐藏底部控制条
         * 并且设置冷却变量为true,冷却时间为1秒
         */
        concealBarTypePlayer(){

            this.showBarTypePlayer = false;
            this.cooling = true;
            setTimeout(() => {
                this.cooling = false;
            },1000)
        }
    },
    watch:{
        showMiniPlayer(newValue){
            this.showBarTypePlayer = !newValue
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
.AppBox{
    width: 100vw;
    height: 96vh;
    background-color: var(--theme-colour);
    transition: background-color 0.5s;
}
</style>