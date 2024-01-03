<template>
    <div class="waiBox" ref="nameListBox">
        <div class="titleText">
            <p>曲名</p>
            <p>歌手</p>
            <p>专辑</p>
            <p>时长</p>
        </div>

        <songInfo v-for="(item,index) in 100" :key="index" :c="item" :songHeight="songHeight"></songInfo>


    </div>
</template>
<script>
import songInfo from "./songInfo.vue"

export default {
    data(){
        return{
            songHeight:50,//每一行的高度
        }
    },
    methods:{

    },
    components:{
        songInfo
    },
    props:{
        showMiniPlayer:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        showMiniPlayer(newValue){
            //看小播放器是否隐藏了,如果隐藏了则扩大此组件的显示范围
            if(newValue){
                this.$refs.nameListBox.style.width = "60%"
                this.$refs.nameListBox.style.height = "94.6%"
                this.songHeight = 50
            }
            else{
                this.$refs.nameListBox.style.height = "88.5%"
                this.$refs.nameListBox.style.width = "95%"
                this.songHeight = 40
            }
        }
    }
}

</script>

<style scoped>
.waiBox{
    width: 60%;
    height: 94.6%;
    position: absolute;
    right: 2%;
    transition:width 0.3s,height 0.3s;
    overflow: scroll;
}

.titleText{
    background-color: var(--theme-colour);
    position: sticky;
    top: 0;
    width: 100%;
    height: 40px;
    font-weight: bold;
    display: flex;
    font-size: 1.3rem;
    justify-content: space-around;
    align-items: center;
    color: var(--opposite-theme-colour);
    box-shadow:  0px 0px 10px 1px var(--adjacent-theme-colour);
    
    
}

</style>