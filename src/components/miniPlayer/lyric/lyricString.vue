<template>
    <div class="lyric" @click="lyricClick" :id="`lyric${lyricIndex}`" >{{ lyric }}</div>
    <div class="schedule"></div>
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
        }
    },
    mounted(){
        
    },
    methods:{
        lyricClick(){
            MusicManagement.setProgressAtValue(this.lyricKey/1000)
            this.$emit("lyricClick",this.lyricIndex)
        }
    },
    computed:{
        
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
}

</style>