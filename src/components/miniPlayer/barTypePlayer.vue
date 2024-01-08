<template>
    <!--FIXME:该组件为页面底部的条形播放器,默认情况下不显示,只有当小播放器不显示的时候才会触发让其显示-->
    <div class="barMainBox" ref="barMainBox">
        <div class="oneBox">
            <div class="cover">
                <img src="../../assets/109951168730716074.jpg" alt="封面">
            </div>
            <div class="musicInfoBox">
                <p>歌曲名</p>
                <p>作者</p>
            </div>
        </div>
        <div class="twoBox">
            <div class="controlBox">
                <playMode :pattern="pattern" class="altPattern" @alterPlayMode="alterPlayMode" :playModeSelect="playModeSelect" @mouseleave="playModeSelect = false"></playMode>
                <!--播放模式-->
                <div @click="this.playModeSelect = !this.playModeSelect" class="pattern" :title="pattern === 1?'顺序播放':pattern ===2?'列表循环':pattern ===3?'单曲循环':'随机播放' ">
                    <!--顺序播放-->
                    <svg t="1704251873827" class="icon"  v-if="pattern===1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4241" width="200" height="200"><path d="M106 85.5c-22.1 0-40 17.9-40 40v760.6c0 22.1 17.9 40 40 40s40-17.9 40-40V125.5c0-22.1-17.9-40-40-40zM457.3 85.5c-22.1 0-40 17.9-40 40v760.6c0 22.1 17.9 40 40 40s40-17.9 40-40V125.5c0-22.1-17.9-40-40-40zM955.1 661.4c-7.1-12.4-20.3-20-34.6-20h-72c0-0.8 0.1-1.5 0.1-2.3V125.5c0-22.1-17.9-40-40-40s-40 17.9-40 40v513.6c0 0.8 0 1.5 0.1 2.3h-87c-14.3 0-27.5 7.6-34.6 20-7.1 12.4-7.1 27.6 0 40l119.4 206.8c7.1 12.4 20.3 20 34.6 20s27.5-7.6 34.6-20l119.4-206.8c7.2-12.4 7.2-27.7 0-40z m-154 146.8L751 721.4h100.2l-50.1 86.8z" p-id="4242"></path></svg>
                    <!--列表循环-->
                    <svg t="1704249123977" title="列表循环" v-if="pattern===2" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7103" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z" p-id="7104"></path></svg>
                    <!--单曲循环-->
                    <svg t="1704249146369" title="单曲循环" v-if="pattern===3" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8113" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z" p-id="8114"></path><path d="M512.8 660.6c22.1-0.1 39.9-18.1 39.8-40.2l-1.2-214.1c-0.1-22-18-39.8-40-39.8h-0.2c-22.1 0.1-39.9 18.1-39.8 40.2l1.2 214.1c0.1 22 18 39.8 40 39.8h0.2z" p-id="8115"></path></svg>
                    <!--随机播放-->
                    <svg t="1704249178758" title="随机播放" v-if="pattern===4" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10060" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M914.2 705L796.4 596.8c-8.7-8-22.7-1.8-22.7 10V688c-69.5-1.8-134-39.7-169.3-99.8l-45.1-77 47-80.2c34.9-59.6 98.6-97.4 167.4-99.8v60.1c0 11.8 14 17.9 22.7 10l117.8-108.1c5.8-5.4 5.8-14.6 0-19.9L796.4 165c-8.7-8-22.7-1.8-22.7 10v76H758c-4.7 0-9.3 0.8-13.5 2.3-36.5 4.7-72 16.6-104.1 35-42.6 24.4-78.3 59.8-103.1 102.2L513 432l-24.3-41.5c-24.8-42.4-60.5-77.7-103.1-102.2C343 263.9 294.5 251 245.3 251H105c-22.1 0-40 17.9-40 40s17.9 40 40 40h140.3c71.4 0 138.3 38.3 174.4 99.9l47 80.2-45.1 77c-36.2 61.7-103 99.9-174.4 99.9H105c-22.1 0-40 17.9-40 40s17.9 40 40 40l142 0.1h0.2c49.1 0 97.6-12.9 140.2-37.3 42.7-24.4 78.3-59.8 103.2-102.2l22.4-38.3 22.4 38.3c24.8 42.4 60.5 77.8 103.2 102.2 33.1 18.9 69.6 30.9 107.3 35.4 3.8 1.2 7.8 1.8 11.9 1.8l15.9 0.1v55c0 11.8 14 17.9 22.7 10L914.2 725c5.9-5.5 5.9-14.7 0-20z" p-id="10061"></path></svg>

                </div>
                <!--上一首-->
                <div title="上一首" >
                    <svg t="1704249396846"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15208" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M518.4 598.4c-19.2-19.2-41.6-51.2-41.6-86.4 0-32 19.2-57.6 41.6-86.4l275.2-281.6c32-32 32-86.4 0-121.6-16-12.8-38.4-22.4-60.8-22.4s-41.6 9.6-60.8 25.6L256 451.2c-32 32-32 86.4 0 121.6l419.2 425.6c32 32 86.4 32 118.4 0s32-86.4 0-121.6l-275.2-278.4z"  p-id="15209"></path></svg>
                </div>
                <!--播放/暂停-->
                <div :title="isPlaying?'暂停':'播放'">
                    <!--播放-->
                    <svg t="1704249243774" v-show="!isPlaying" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11908" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" p-id="11909"></path></svg>
                    <!--暂停-->
                    <svg t="1704249356127" v-show="isPlaying" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12895" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z" p-id="12896"></path></svg>
                </div>
                <!--下一首-->
                <div title="下一首">
                    <svg t="1704249438522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2712" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M268.8 876.8c-32 32-32 86.4 0 121.6 32 32 86.4 32 118.4 0l419.2-425.6c32-32 32-86.4 0-121.6L387.2 25.6c-16-16-38.4-25.6-60.8-25.6S284.8 9.6 265.6 25.6c-32 32-32 86.4 0 121.6l275.2 281.6c22.4 25.6 41.6 51.2 41.6 86.4s-22.4 64-41.6 86.4l-272 275.2z"  p-id="2713"></path></svg>
                </div>

                <div title="隐藏">
                    <svg t="1704252330556" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5229" width="200" height="200"><path d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z" p-id="5230"></path></svg>
                </div>
            </div>


            <div class="progressBarBox">
                <div class=" timeText nowTime">0:30</div>
                <div class="progressBar">
                    <div class="schedule"></div>
                </div>
                <div class=" timeText totalHours">3:34</div>
            </div>

        </div>
        <!--其他控件-->
        <div class="threeBox">
            <!--音量控件-->
            <div class="volumeBox" title="调节音量" ref="volumeBox">
                <adjustVolume class="barAdjustVolume" :muteVolume="muteVolume" @noMuteVolume=" muteVolume= false" @muteVolume="mute(true)" :isShow="showAdjustVolume" :mouseOut="mouseOut" :stopMouseOutTime="stopMouseOutTime"></adjustVolume>
                <div @mouseenter="alterAdjustVolume(true)" @dblclick="muteVolume?mute(false):mute(true)" @mouseleave="mouseOut" >
                    <div class="slash" v-if="muteVolume"></div>
                    <svg  t="1704266368648" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6314" id="mx_n_1704266368648" width="200" height="200"><path d="M619.5 1004.595c-9.6 0-19.3-1.1-29-3.4l-6.8-1.6-328.3-226.3c-7.2-3.1-15.1-4-22.9-2.8l-6.1 0.5h-98.5c-64.5 0-127.9-67.4-127.9-136.2v-249.2c0-62.2 56.2-111 127.9-111h96.4c9.4-1.2 18.1-5 25.4-11.1l2.1-1.6 331.5-237.2 7-1.7c9.4-2.3 19-3.5 28.7-3.6 32.7-0.1 64.7 12.5 88.5 35.9 23.8 23.4 37 54.6 37.2 88v736.7c0 9.6-1.2 19.2-3.4 28.5-13.7 57.4-65.2 96.1-121.8 96.1z m-5.8-74.8c24.8 2.8 49.1-13.4 55.1-38.6 0.9-3.7 1.3-7.5 1.4-11.3v-736.4c-0.1-13.2-5.4-25.8-15-35.2-9.5-9.3-22-14.5-35.3-14.5-2.3 0.1-3.9 0.1-5.8 0.3l-318 227.6c-19 15.4-41.8 24.8-66.2 27.2l-3.6 0.2h-98.4c-22.2 0-53.4 11.3-53.4 36.5v249.3c0 27.1 29.9 61.7 53.4 61.7h95.7c23-3.2 46 0.6 66.9 10.9l4.6 2.7 318.6 219.6zM874.9 796.895c-9.5 0-19.1-3.6-26.3-10.9-14.5-14.5-14.5-38.1 0-52.7 66.1-66.1 101-143.1 101-223s-34.9-156.9-101-223c-14.5-14.5-14.5-38.1 0-52.7s38.1-14.5 52.7 0c80.3 80.3 122.8 175.6 122.8 275.6 0 100-42.5 195.3-122.8 275.6-7.3 7.5-16.9 11.1-26.4 11.1z" p-id="6315"></path></svg>
                </div>
                
            </div>
            
        </div>
    </div>
</template>
<script>
import adjustVolume from "./adjustVolume.vue"
import playMode from "./playMode.vue"
import {alterGlobalStore,getGlobalStore} from '../../assets/globalStore.js'
export default{
    data(){
        return{
            pattern:1,//播放模式
            isPlaying:false,//是否播放
            showAdjustVolume:false,//是否显示音频控件
            shiftOutTimeID:0,//鼠标移出计时器记录
            muteVolume:false,//是否静音
            recordVolume:0,//记录音量
            playModeSelect:false//是否显示播放模式控件
        }
    },
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        isShow(newValue){
            if(newValue){
                this.$refs.barMainBox.style.bottom = '0px'
            }else{
                this.$refs.barMainBox.style.bottom = '-100px'
            }
        }
    },
    components:{
        adjustVolume,
        playMode
    },
    methods:{
        /**
         * 控制音量播放控件是否显示
         */
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
         * 更改播放模式
         * @param {*} mode 播放模式
         */
        alterPlayMode(mode){
            //更改公共变量中的数据
            alterGlobalStore('playMode',mode,true)
        },
       
    },
    mounted(){
        //监听全局变量中的播放模式
        addEventListener('globalStore:playMode',(e)=>{
            this.pattern = e.detail.value
        })

        setTimeout(()=>{
            this.pattern=getGlobalStore('playMode')
        },300)
    }
}
</script>
<style scoped>
/**
更改播放模式
 */
.altPattern{
    top: -152px;
    transform: translateX(-30px);

    }


*{
    /**禁止文字被选中 */
    -webkit-user-select: none;
    user-select: none;
}
.barMainBox{
    box-shadow: 0px -1px  3px 3px var(--theme-colour);
    width: 100%;
    height: 59px;
    background-color: var(--oppositeAdjacent-theme-colour);
    border-radius: 30px 30px 0px 0px;
    position: fixed;
    bottom: -100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: bottom 0.5s;
    z-index: 50;
}


.oneBox{
    width: 160px;
    height: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    margin-left: 20px;
    justify-content: space-around;
}

.twoBox{
    width: 450px;
    height: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.threeBox{
    width: 100px;
    height: 40px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover{
    width: 40px;
    height: 40px;
    background-color: antiquewhite;
}

.cover img{
    width: 100%;
    border-radius: 10px;
}

.musicInfoBox{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.musicInfoBox p{
    width: 100%;
    margin: 0;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--adjacent-theme-colour);
    font-weight: bold;
}

/**播放控件样式 */
.controlBox{
    width: 60%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}




.pattern{
    width: 20px;
    height: 20px;
}

.pattern svg{
    width: 20px;
    height: 20px;
    display: block;
}

svg{
    width: 20px;
    height: 20px;
    transition:fill 0.2s ;
    fill: var(--theme-colour);
}

svg:hover{
    fill: var(--adjacent-theme-colour);
}


/**
进度条样式
*/
.progressBarBox{
    width: 100%;
    height: 10px;
    display: flex;
    align-items: center;
}

.progressBar{
    width: 100%;
    height: 4px;
    border: 1px solid var(--adjacent-theme-colour);
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.timeText{
    width: 42px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    color: var(--theme-colour);
}

.nowTime{
    margin-right: 3px;
}

.totalHours{
    margin-left: 3px;
}

/**
进度条内部的样式
 */
.schedule{
    width: 20%;
    height: 100%;
    background-color: var(--theme-colour);
    border-radius: 10px;
    position: relative;
}

.volumeBox{
    
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.volumeBox:hover .slash{
    background-color: var(--adjacent-theme-colour);
}
.volumeBox:hover svg{
    fill: var(--adjacent-theme-colour);
}

/**音频斜杠 */
.slash{
    transition: background-color 0.2s;
    position: absolute;
    top: 8px;
    width: 20px;
    height: 4px;
    background-color: var(--theme-colour);
    border-radius: 15px;
    transform: rotateZ(40deg);
}

.barAdjustVolume{
    position: absolute;
    left: -10px;
    top: -120px;
}
</style>