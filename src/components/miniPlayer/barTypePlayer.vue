<template>
    <!--FIXME:该组件为页面底部的条形播放器,默认情况下不显示,只有当小播放器不显示的时候才会触发让其显示-->
    <div class="barMainBox" ref="barMainBox" :style="barMainBoxStyle" draggable="false">
        <div class="oneBox">
            <div class="cover">
                <img :src="imgSrc" alt="封面">
            </div>
            <div class="musicInfoBox" :title="`歌曲名:${songName}\n作者:${artists}`">
                <p>{{songName}}</p>
                <p>{{artists}}</p>
            </div>
        </div>
        <div class="twoBox">
            <div class="controlBox">
                <playMode :pattern="pattern" class="altPattern" :playModeSelect="playModeSelect" @mouseleave="playModeSelect = false"></playMode>
                <!--播放模式-->
               <playbackMode  @click="playModeSelect = !playModeSelect"  ></playbackMode>
                <!--上一首-->
                <div title="上一首" @click="previousMusic">
                    <svg t="1704249396846"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15208" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M518.4 598.4c-19.2-19.2-41.6-51.2-41.6-86.4 0-32 19.2-57.6 41.6-86.4l275.2-281.6c32-32 32-86.4 0-121.6-16-12.8-38.4-22.4-60.8-22.4s-41.6 9.6-60.8 25.6L256 451.2c-32 32-32 86.4 0 121.6l419.2 425.6c32 32 86.4 32 118.4 0s32-86.4 0-121.6l-275.2-278.4z"  p-id="15209"></path></svg>
                </div>
                <!--播放/暂停-->
                <div :title="isPlaying?'暂停':'播放'">
                    <!--播放-->
                    <svg @click="startMusic" t="1704249243774" v-show="!isPlaying" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11908" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" p-id="11909"></path></svg>
                    <!--暂停-->
                    <svg  @click="stopMusic" t="1704249356127" v-show="isPlaying" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12895" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z" p-id="12896"></path></svg>
                </div>
                <!--下一首-->
                <div title="下一首" @click="playNext">
                    <svg t="1704249438522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2712" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M268.8 876.8c-32 32-32 86.4 0 121.6 32 32 86.4 32 118.4 0l419.2-425.6c32-32 32-86.4 0-121.6L387.2 25.6c-16-16-38.4-25.6-60.8-25.6S284.8 9.6 265.6 25.6c-32 32-32 86.4 0 121.6l275.2 281.6c22.4 25.6 41.6 51.2 41.6 86.4s-22.4 64-41.6 86.4l-272 275.2z"  p-id="2713"></path></svg>
                </div>

                <div title="隐藏" @click="$emit('conceal')">
                    <svg t="1704252330556" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5229" width="200" height="200"><path d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z" p-id="5230"></path></svg>
                </div>
            </div>


            <div class="progressBarBox">
                <div class=" timeText nowTime">{{nowTime}}</div>
                <!--进度条-->
                <div id="progressBar" class="progressBar" ref="progressBar">
                    <div class="schedule" id="schedule" :style="scheduleStyle"></div>
                </div>
                <div class=" timeText totalHours">{{totalTime}}</div>
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
import {MusicManagement} from "../../js/musicManagement.js"
import playbackMode from "./playbackMode.vue"

const NocoverImg = 'img/Nocover.png'
export default{
    data(){
        return{
            isPlaying:false,//是否播放
            showAdjustVolume:false,//是否显示音频控件
            shiftOutTimeID:0,//鼠标移出计时器记录
            muteVolume:false,//是否静音
            recordVolume:0,//记录音量
            playModeSelect:false,//是否显示播放模式控件
            barMainBoxStyle:{},//主控件样式
            scheduleStyle:{},//进度条样式
            songName:"未知",//歌曲名,
            artists:"未知", //艺术家
            imgSrc:NocoverImg,//封面图片'
            progressBarTimeId:0,//进度条计时器
            progressBarDown:false,//进度条是否按下
            nowTime:'0:00',//当前播放时间
            totalTime:'0:00',//总播放时间
            listeningState:false,//监听状态
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
                this.barMainBoxStyle.bottom = '0px'
            }else{
                this.barMainBoxStyle.bottom = '-100px'
                this.playModeSelect = false
            }


            if(!this.listeningState && newValue){
                //TODO:
                this.startMonitor_mouse()
                
            }

            if(!newValue){
                //清除监听时间
               this.stopMonitor_mouse()
            }
        }
    },
    components:{
        adjustVolume,
        playMode,
        playbackMode
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
         * 停止播放音乐
         */
        stopMusic(){
            MusicManagement.stop()
            this.isPlaying = false
        },
        /**
         * 播放音乐
         */
        startMusic(){
            MusicManagement.play()
            this.isPlaying = true
        },
        /**
         * 当鼠标处于进度条上时，执行该函数
         */
        progressBarMouses(e){
            this.getMousesPlace(e)

            if(this.progressBarDown){
                //鼠标按下
                this.setProgressBar(e)
            }

            if(this.progressBarTimeId){
                clearTimeout(this.progressBarTimeId)
            }

            this.progressBarTimeId = setTimeout(()=>{
                void 0
            },500)


            
        },
        /**
         * 当鼠标移出进度条时，执行该函数
         */
        progressBarMouseOut(){
            this.progressBarDown = false
            if(this.progressBarTimeId){
                clearTimeout(this.progressBarTimeId)
         }
        },
        /**
         * 当进度条条上,并且鼠标被按下的时候执行该函数
         */
        setProgressBar(e){
            MusicManagement.setProgress(this.getMousesPlace(e))
        },
        /**
         * 获取鼠标在元素中的位置(获取到的是百分比)
         * @param {Object} e  事件对象
         * @returns {number} 鼠标在元素中的位置}(百分比)
         */
        getMousesPlace(e){
            const {left,width} = this.$refs.progressBar.getBoundingClientRect()
            let x = e.clientX
            //计算数百哦
            let hundreds = (x-left)/width*100
            this.scheduleStyle.width = `${hundreds}%`

            let percent = hundreds/100

            if(percent<0)return 0;
            if(percent>1) return 1;
            return percent;
        },
        /**
         * 当鼠标在进度条上松开的时候执行
         * @param {MouseEvent} e 
         */
        barMouseup(e){
              //清除监听
              window.removeEventListener('mousemove',this.getMousesPlace)
            if(this.progressBarDown){
                this.progressBarDown = false
                this.setProgressBar(e)
            }
            this.scheduleStyle.transition = 'width 0.2s'
        },
         /**
         * 当鼠标在进度条上按下的时候执行
         * @param {MouseEvent} e 
         */
        barMousedown(e){
            if((e.target.id === "progressBar" || e.target.id === "schedule") && !this.progressBarDown){
                this.progressBarDown = true
                window.addEventListener('mousemove',this.getMousesPlace)
            }

            this.scheduleStyle.transition = 'width 0s'
        },
        /**
         * 当数据发生变化的时候执行
         * @param {*} e 
         */
        dataChange(e){

            switch(e.key){
                case 'music_play_info':
                    music_play_info(this)
                    break;
                case 'MusicManagement_info':
                 musicManagement_info(this)
                    break;
                case "globalStore":
                    (()=>{
                        const newValue = JSON.parse(e.newValue)
                        MusicManagement.setVolume(newValue.musicVolume/100)
                    })()
                    break;
                case "MusicIsPlay":
                    this.isPlaying = e.newValue
                    break;
            }


          function music_play_info(_this){
            if(!_this.progressBarDown){
                const newValue = JSON.parse(e.newValue)
                _this.scheduleStyle.width = `${(newValue.nowTime/newValue.endTime)*100}%`

                const second  = parseInt(newValue.nowTime % 60)
                const temp = second<10?'0'+second:second

                const second2 = parseInt(newValue.endTime % 60)
                const temp2 = second2<10?'0'+second2:second2
                //设置当前时间
                _this.nowTime = `${parseInt(newValue.nowTime/60)}:${temp}`
                _this.totalTime = `${parseInt(newValue.endTime/60)}:${temp2}`

            }
            
          }


          function musicManagement_info(_this){
            //当前音乐信息发生变化时，更改播放控件中的数据
                
                const newValue = JSON.parse(e.newValue)
                try{
                    if(newValue.nowMusicInfo.artists) {
                        _this.artists = newValue.nowMusicInfo.artists.join('/')
                    }
                    else{
                        _this.artists = '未知'
                    }
                }
                catch(e){
                    _this.artists = '未知'
                }
                
             
                if(newValue.nowMusicName) _this.songName = newValue.nowMusicName;

                if(newValue.img){
                     window.URL.revokeObjectURL(_this.imgSrc)
                    let uint8Data = new Uint8Array(Object.values(newValue.img.data));
                    let blob = new Blob([uint8Data], { type: 'image/png' });
                    _this.imgSrc = URL.createObjectURL(blob);
                }else{
                    _this.imgSrc = NocoverImg;
                }
          }

        },
        /**
         * 开始鼠标监听
         */
        startMonitor_mouse(){
            window.addEventListener('mouseup',this.barMouseup)
            window.addEventListener('mousedown',this.barMousedown)
            this.listeningState = true
        },
        /**
         * 停止鼠标监听
         */
        stopMonitor_mouse(){
            window.removeEventListener('mouseup',this.barMouseup)
            window.removeEventListener('mousedown',this.barMousedown)
            this.listeningState = false
        },
        previousMusic(){
            MusicManagement.previousMusic()
        },
        playNext(){
            MusicManagement.playNext()
        }
    },
    mounted(){
        if(this.isShow && !this.listeningState){
            this.startMonitor_mouse()
        }
        


        //监听全局变量中的播放模式
        addEventListener('globalStore:playMode',(e)=>{
            this.pattern = e.detail.value
        })

        setTimeout(()=>{
            this.pattern=getGlobalStore('playMode')
        },300)

        //监听当前音乐的数据变化
        addEventListener('setItemEvent',this.dataChange)

        if(getGlobalStore("musicVolume") == 0) {
            this.mute(true)
        }

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
    height: 100%;
    background-color: var(--theme-colour);
    border-radius: 10px;
    position: relative;
    transition: width 0.2s;
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