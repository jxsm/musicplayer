<template>
    <!--FIXME: 该组件用于主界面的封装,更改主界面的内容需要到这里来-->
    <div class="AppBox">
        
        <miniPlayer @hideSmallPlayer="hideSmallPlayer" :showMiniPlayer="showMiniPlayer"></miniPlayer>
        <songNameList :showMiniPlayer="showMiniPlayer"></songNameList>
        <barTypePlayer :showMiniPlayer="showMiniPlayer"></barTypePlayer>
    </div>
</template>

<script>
import songNameList from "../songNameList/songNameList.vue"
import miniPlayer from "../miniPlayer/miniPlayer.vue"
import barTypePlayer from "../miniPlayer/barTypePlayer.vue"

export default{
    data(){
        return{
            showMiniPlayer:true,
        }
    },
    components:{
        songNameList,
        miniPlayer,
        barTypePlayer,

    },
    methods:{
        /**
         * 是否显示小播放器
         * @param {Object} e 事件对象传递过来的参数
         */
        hideSmallPlayer(e){
            this.showMiniPlayer = e;
        }
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