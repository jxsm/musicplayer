<template>
    <div class="waiBox" ref="miniPlayerWaiBox" :style="miniPlayerWaiBoxStyle" >
        <div class="mainBox">
            <div class="upBox" ref="upBox" :style="upBoxStyle" >
                <div class="songCover" >

                </div>
               

            </div>
            <div class="musicInfo">
                <!--歌词和歌曲信息的区域-->
            </div>
            <div class="musicControl">
                <!--歌曲控件-->
                <!--TODO:添加播放控件-->
                <playMode :playModeSelect="playModeSelect" class="altPattern" @mouseleave="playModeSelect = false"></playMode>
                <!--播放模式显示-->
                <playbackMode svgWidth="40px" @click="playModeSelect = !playModeSelect" class="playbackMode"></playbackMode>


                 <!--上一首-->
                 <div title="上一首" >
                    <svg t="1704249396846"  class="miniPlSvgaSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15208" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M518.4 598.4c-19.2-19.2-41.6-51.2-41.6-86.4 0-32 19.2-57.6 41.6-86.4l275.2-281.6c32-32 32-86.4 0-121.6-16-12.8-38.4-22.4-60.8-22.4s-41.6 9.6-60.8 25.6L256 451.2c-32 32-32 86.4 0 121.6l419.2 425.6c32 32 86.4 32 118.4 0s32-86.4 0-121.6l-275.2-278.4z"  p-id="15209"></path></svg>
                </div>
                <!--播放/暂停-->
                <div :title="isPlaying?'暂停':'播放'">
                    <!--播放-->
                    <svg @click="startMusic" t="1704249243774" v-show="!isPlaying" class="miniPlSvgaSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11908" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" p-id="11909"></path></svg>
                    <!--暂停-->
                    <svg  @click="stopMusic" t="1704249356127" v-show="isPlaying" class="miniPlSvgaSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12895" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z" p-id="12896"></path></svg>
                </div>
                <!--下一首-->
                <div title="下一首">
                    <svg t="1704249438522" class="miniPlSvgaSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2712" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M268.8 876.8c-32 32-32 86.4 0 121.6 32 32 86.4 32 118.4 0l419.2-425.6c32-32 32-86.4 0-121.6L387.2 25.6c-16-16-38.4-25.6-60.8-25.6S284.8 9.6 265.6 25.6c-32 32-32 86.4 0 121.6l275.2 281.6c22.4 25.6 41.6 51.2 41.6 86.4s-22.4 64-41.6 86.4l-272 275.2z"  p-id="2713"></path></svg>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import playMode from "./playMode.vue"
import playbackMode from "./playbackMode.vue"
export default{
    data(){
        return{
            pattern:1,//播放模式
            miniPlayerWaiBoxStyle :{},//miniPlayerWaiBox的样式
            upBoxStyle :{},//upBox的样式
            playModeSelect:false
        }
    },
    methods:{
        /**
         * 窗口大小改变时触发
         * TODO:监听元素的大小,当元素的大小不适合使用小播放器展示的时候发送隐藏小播放器事件
         */
        resizeFn(){
            const upBoxWidth =  this.$refs.upBox.offsetWidth
            const upBoxHeight =  this.$refs.upBox.offsetHeight
            //根据元素的大小判断看需不需要隐藏小播放器
            if(this.showMiniPlayer && (upBoxWidth<330 || upBoxHeight<230)){
                this.$emit('hideSmallPlayer',false)
            }
            else if(!this.showMiniPlayer && upBoxWidth>=330 && upBoxHeight>=230){
                this.$emit('hideSmallPlayer',true)
            }   
            //取最小值
            const min = upBoxWidth>upBoxHeight?upBoxHeight:upBoxWidth
            //设置公共变量到upBoxWidth上
            this.upBoxStyle["--minWidth"] = (min-20+'px')
        },
      

    },
    mounted(){
        //监听页面大小改变事件
        this.resizeFn()
        window.addEventListener('resize',this.resizeFn)
    },
    props:{
        showMiniPlayer:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        showMiniPlayer(newValue){
            if(newValue){
                this.miniPlayerWaiBoxStyle.opacity = 1
            }
            else{
                this.miniPlayerWaiBoxStyle.opacity = 0
            }
        }
    },
    components:{
        playMode,
        playbackMode
    }
        
}

</script>

<style scoped>
.waiBox{
    opacity: 1;
    position: absolute;
    width: 34%;
    height: 96%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    transition:opacity 0.3s ;
}

.mainBox{
    width: 90%;
    height: 90%;
    background-color: var(--oppositeAdjacent-theme-colour);
    border-radius: 45px;
    transition: box-shadow 0.5s;
    box-shadow: inset 0px 0px 50px 0px var(--theme-colour);
    overflow: hidden;
}

.upBox{
    width: 100%;
    height: 40%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.songCover{
    width: var(--minWidth);
    height: var(--minWidth);
    border-radius: 100%;
    background-color: black;
}

.musicInfo{
    width: 100%;
    height: 50%;
    border: 2px solid rgb(16, 210, 197);
}

.musicControl{
    width: 100%;
    height: 8.8%;
    border: 2px solid rgb(39, 246, 16);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.altPattern{
    top: 0px;
    transform: translateX(0px);
}

.miniPlSvgaSvg{
    width: 40px;
    height: 40px;
    transition:fill 0.2s ;
    fill: var(--theme-colour);
}

.miniPlSvgaSvg:hover{
    fill: var(--adjacent-theme-colour);
}
</style>