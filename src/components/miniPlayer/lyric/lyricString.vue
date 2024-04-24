<template>
    <div class="lyric" :style="lyricWeight" @click="lyricClick" :id="`lyric${lyricIndex}`" >
    {{ lyric }}
    <div class="schedule" v-if="isShow()">
        <div class="scheduleItem" :style="scheduleItemStyle(nowTime)" ></div>
    </div>
    </div>
</template>

<script>
import {MusicManagement} from "../../../js/musicManagement"
export default {
    props: {
        lyric: {//歌词
            type: String,
            default: ''
        },
        lyricIndex:{//歌词的索引
            type:Number,
            default:0
        },
        lyricKey:{//歌词的key
            type:Number,
            default:0
        },
        startTime:{//歌词的起始时间
            type:Number,
            default:0
        },
        endTime:{//歌词的结束时间
            type:Number,
            default:0
        },
        nowTime:{
            type:Number,
            default:0
        }
    },
    mounted(){
    },
    methods:{
        lyricClick(){
            MusicManagement.setProgressAtValue(this.lyricKey/1000)
            this.$emit("lyricClick",this.lyricIndex)
        },
        scheduleItemStyle(){
            if(this.nowTime*1000>=this.startTime&&this.nowTime*1000<=this.endTime){
                return {width:((this.nowTime*1000-this.startTime)/(this.endTime-this.startTime))*100+'%'}
            }
            else{
                return {width:0}
            }
        },
        isShow(){
            return this.nowTime*1000>=this.startTime&&this.nowTime*1000<=this.endTime
        }
    },
    computed:{
        lyricWeight(){
            if(this.lyric.trim().length === 0){
                return {width:"50%"}
            }
            return undefined
        }
    },
    watch:{
        
    }
}
</script>

<style scoped>
.lyric {
    color: var(--adjacent-theme-colour);
    font-weight: bold;
    font-size: 110%;
    margin-bottom: 20px;
    padding: 1%;
    transition: all 0.5s;
}

.lyric:hover {
    background-color: var(--adjacent-theme-colour-d);
    border-radius: 5px;
}

.lyricHigh{
    color: var(--adjacent-HighBrightness-colour);
    font-weight: bold;
    font-size: 130%;
}

.schedule{
    border-radius: 5px;
    background-color: var(--adjacent-theme-colour);
    width: 100%;
    height: 3px;
    overflow: hidden;
}
.scheduleItem{
    transition:width 0.5s ;
    height: 100%;
    background-color: var(--adjacent-HighBrightness-colour);
    border-radius: 5px;
}



</style>