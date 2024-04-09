<template>
    <div class="waiBox" ref="miniPlayerWaiBox" :style="miniPlayerWaiBoxStyle" >
        <div class="mainBox">
            <div class="upBox" ref="upBox" :style="upBoxStyle" >
                <div class="songCover" >
                    <div class="centralBox"> 
                        <div class="centralCircle"></div>
                    </div>
                    <img :src="imgSrc"/>
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
                 <div title="上一首" @click="previousMusic">
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
                <div title="下一首" @click="playNext">
                    <svg t="1704249438522" class="miniPlSvgaSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2712" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M268.8 876.8c-32 32-32 86.4 0 121.6 32 32 86.4 32 118.4 0l419.2-425.6c32-32 32-86.4 0-121.6L387.2 25.6c-16-16-38.4-25.6-60.8-25.6S284.8 9.6 265.6 25.6c-32 32-32 86.4 0 121.6l275.2 281.6c22.4 25.6 41.6 51.2 41.6 86.4s-22.4 64-41.6 86.4l-272 275.2z"  p-id="2713"></path></svg>
                </div>


                <!--音量控件-->
                <div class="volumeBox" title="调节音量" ref="volumeBox">
                    <adjustVolume class="barAdjustVolume" :muteVolume="muteVolume" @noMuteVolume=" muteVolume= false" @muteVolume="mute(true)" :isShow="showAdjustVolume" :mouseOut="mouseOut" :stopMouseOutTime="stopMouseOutTime"></adjustVolume>
                    <div @mouseenter="alterAdjustVolume(true)" @dblclick="muteVolume?mute(false):mute(true)" @mouseleave="mouseOut" >
                        <div class="slash" v-if="muteVolume"></div>
                        <svg  t="1704266368648" class="miniPlSvgaSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6314" id="mx_n_1704266368648" width="200" height="200"><path d="M619.5 1004.595c-9.6 0-19.3-1.1-29-3.4l-6.8-1.6-328.3-226.3c-7.2-3.1-15.1-4-22.9-2.8l-6.1 0.5h-98.5c-64.5 0-127.9-67.4-127.9-136.2v-249.2c0-62.2 56.2-111 127.9-111h96.4c9.4-1.2 18.1-5 25.4-11.1l2.1-1.6 331.5-237.2 7-1.7c9.4-2.3 19-3.5 28.7-3.6 32.7-0.1 64.7 12.5 88.5 35.9 23.8 23.4 37 54.6 37.2 88v736.7c0 9.6-1.2 19.2-3.4 28.5-13.7 57.4-65.2 96.1-121.8 96.1z m-5.8-74.8c24.8 2.8 49.1-13.4 55.1-38.6 0.9-3.7 1.3-7.5 1.4-11.3v-736.4c-0.1-13.2-5.4-25.8-15-35.2-9.5-9.3-22-14.5-35.3-14.5-2.3 0.1-3.9 0.1-5.8 0.3l-318 227.6c-19 15.4-41.8 24.8-66.2 27.2l-3.6 0.2h-98.4c-22.2 0-53.4 11.3-53.4 36.5v249.3c0 27.1 29.9 61.7 53.4 61.7h95.7c23-3.2 46 0.6 66.9 10.9l4.6 2.7 318.6 219.6zM874.9 796.895c-9.5 0-19.1-3.6-26.3-10.9-14.5-14.5-14.5-38.1 0-52.7 66.1-66.1 101-143.1 101-223s-34.9-156.9-101-223c-14.5-14.5-14.5-38.1 0-52.7s38.1-14.5 52.7 0c80.3 80.3 122.8 175.6 122.8 275.6 0 100-42.5 195.3-122.8 275.6-7.3 7.5-16.9 11.1-26.4 11.1z" p-id="6315"></path></svg>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import playMode from "./playMode.vue"
import playbackMode from "./playbackMode.vue"
import {alterGlobalStore,getGlobalStore} from '../../assets/globalStore.js'
import adjustVolume from "./adjustVolume.vue"
import {MusicManagement} from "../../js/musicManagement.js"
const NocoverImg = 'img/Nocover.png'
export default{
    data(){
        return{
            pattern:1,//播放模式
            miniPlayerWaiBoxStyle :{},//miniPlayerWaiBox的样式
            upBoxStyle :{},//upBox的样式
            playModeSelect:false,//是否显示播放模式选择
            showAdjustVolume:false,//是否显示音量调节
            muteVolume:false,//是否静音
            recordVolume:0,//音量记录
            shiftOutTimeID:0,//鼠标移出计时器记录
            isPlaying:false,//是否在播放
            songName:"未知",//当前的歌曲名
            imgSrc:NocoverImg,//歌曲封面突破
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
            const ratios = upBoxWidth/upBoxHeight

            //根据元素的大小判断看需不需要隐藏小播放器
            if(ratios.toFixed(2) >= 1.4 && ratios.toFixed(2) <= 1.67 ){
                this.$emit('hideSmallPlayer',true)
            }
            else {
                this.$emit('hideSmallPlayer',false)
            }   
            //取最小值
            const min = upBoxWidth>upBoxHeight?upBoxHeight:upBoxWidth
            //设置公共变量到upBoxWidth上
            this.upBoxStyle["--minWidth"] = (min-20+'px')
        },
        alterAdjustVolume(isShow){
            this.showAdjustVolume = isShow
        },
          /**
         * 静音事件
         * @param {*} state 是否静音
         */
        mute(state){
            if(state){
                //静音
                const v = getGlobalStore('musicVolume')
                if(v>0){
                    this.recordVolume = v
                }
                alterGlobalStore('musicVolume',0,true)
                this.muteVolume = true
            }else{
                //恢复音量
                alterGlobalStore('musicVolume',this.recordVolume,true)
                this.muteVolume = false
            }
           
        },
         /**
         * 鼠标移出更改音量的位置
         */
         mouseOut(){
            this.stopMouseOutTime()
            this.shiftOutTimeID =  setTimeout(()=>{
                this.alterAdjustVolume(false)
                this.shiftOutTimeID = 0
            },400)
        },
        /**
         * 停止鼠标移出的计时器事件
         */
         stopMouseOutTime(){
            if(this.shiftOutTimeID){
                clearTimeout(this.shiftOutTimeID)
                this.shiftOutTimeID = 0
            }
        },
        /**
         * 播放音乐
         */
        startMusic(){
            MusicManagement.play()
            this.isPlaying = true
        },
        /**
         * 停止播放音乐
         */
         stopMusic(){
            MusicManagement.stop()
            this.isPlaying = false
        },
         /**
         * 当数据发生变化的时候执行
         * @param {*} e 
         */
         dataChange(e){
            switch(e.key){
                case "MusicIsPlay":
                    this.isPlaying = e.newValue
                    break;
                case 'MusicManagement_info':
                 musicManagement_info(this)
                 break;  
            }

            function musicManagement_info(_this){
                //当前音乐信息发生变化时，更改播放控件中的数据
                    
                    const newValue = JSON.parse(e.newValue)
                
                    
                
                    if(newValue.nowMusicName) _this.songName = newValue.nowMusicName;

                    if(newValue.img){
                        let uint8Data = new Uint8Array(Object.values(newValue.img.data));
                        let blob = new Blob([uint8Data], { type: 'image/png' });
                        _this.imgSrc = URL.createObjectURL(blob);
                    }else{
                        _this.imgSrc = NocoverImg;
                    }
            }
        },
        previousMusic(){
            MusicManagement.previousMusic()
        },
        playNext(){
            MusicManagement.playNext()
        }

    },
    mounted(){
        //监听页面大小改变事件
        this.resizeFn()
        window.addEventListener('resize',this.resizeFn)

        if(getGlobalStore("musicVolume") == 0) {
            this.mute(true)
        }
        
        //监听当前音乐的数据变化
        addEventListener('setItemEvent',this.dataChange)

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
        playbackMode,
        adjustVolume
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
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.songCover{
    position: absolute;
    width: var(--minWidth);
    height: var(--minWidth);
    border-radius: 100%;
    background-color: black;
    overflow: hidden;
}

.songCover img{
    width: 100%;
    height: 100%;
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
    justify-content: space-evenly;
}

.altPattern{
    position: absolute;
    bottom: 14%;
    left: 12%;
}

.miniPlSvgaSvg{
    width: 30px;
    height: 30px;
    transition:fill 0.2s ;
    fill: var(--theme-colour);
}

.miniPlSvgaSvg:hover{
    fill: var(--adjacent-theme-colour);
}

.barAdjustVolume{
    bottom: 14%;
}


/**音频斜杠 */
.slash{
    transition: background-color 0.2s;
    position: absolute;
    bottom: 85px;
    width: 30px;
    height: 6px;
    background-color: var(--theme-colour);
    border-radius: 15px;
    transform: rotateZ(40deg) translateY(-5%);
}

.volumeBox:hover .slash{
    background-color: var(--adjacent-theme-colour);
}
.volumeBox:hover svg{
    fill: var(--adjacent-theme-colour);
}

/** 中心圆 */
.centralCircle{
    width: 30px;
    height: 30px;
    background-color: black;
    position: absolute;
    border-radius: 100%;
}

.centralBox{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>