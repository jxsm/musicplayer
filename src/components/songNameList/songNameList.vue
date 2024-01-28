<template>
    <div class="waiBox" ref="nameListBox">
        <div class="titleText">
            <p>曲名</p>
            <p>歌手</p>
            <p>专辑</p>
            <p>时长</p>
        </div>
        <songInfo v-for="(item,index) in 100" :key="index" :c="item" :songHeight="songHeight" v-show="temp"></songInfo>
        
    </div>
</template>
<script>
import songInfo from "./songInfo.vue"

import {GetMusicInfo} from "../../js/MusicInformationAcquisition"

export default {
    data(){
        return{
            songHeight:50,//每一行的高度
            dynamicHeight:false,//是否需要动态高度
            temp:true,//测试用的，是否显示歌单列表
            currentPathUpdate:0,//currentPat更新记录
            musicInformation:[],//音乐信息存储
        }
    },
    methods:{
        resizeFn(){
            const upBoxHeight =  window.innerHeight
            if(this.showBar){
                let height = upBoxHeight - 100
                this.$refs.nameListBox.style.height =`${height}px`
            }
            else{
                this.$refs.nameListBox.style.height =`${upBoxHeight-50}px`
            }
        }
        //制作获取文件夹中的文件列表
    },
    components:{
        songInfo
    },
    props:{
        showMiniPlayer:{
            type:Boolean,
            default:true
        },
        showBar:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        showMiniPlayer(newValue){
            //看小播放器是否隐藏了,如果隐藏了则扩大此组件的显示范围
            if(newValue){
                this.$refs.nameListBox.style.width = "60%"
                this.dynamicHeight = false
                this.songHeight = 50
            }
            else{
                this.dynamicHeight = true
                this.$refs.nameListBox.style.width = "95%"
                this.songHeight = 40
            }
        },
        showBar(){
            this.resizeFn()
        }
    },
    mounted(){
        //监听窗口发生变化
        window.addEventListener('resize',this.resizeFn)

        //监听公共变量中被选中的歌单列表的变化
        //TODO:这里监听了全局变量,后续有网络位置的请求可以从这里入手
        window.addEventListener('globalStore:currentPath',(e)=>{
            if(this.currentPathUpdate){
                clearTimeout(this.currentPathUpdate)
            }
            this.currentPathUpdate = setTimeout(()=>{
                //TODO:执行查询
                const pathList = e.detail.value
                let pathListIndex = 0
                for(let i in pathList){
                    GetMusicInfo.getInfo({path:i,type:pathList[i],index:pathListIndex})
                    pathListIndex++;
                }

                
            },1000)
        })

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