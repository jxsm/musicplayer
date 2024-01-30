<template>
    <div class="waiBox" ref="nameListBox">
        <div class="titleText">
            <p class="songNameBox">曲名</p>
            <p>歌手</p>
            <p>专辑</p>
            <p>时长</p>
        </div>
        <div v-for="(i,t) in musicInformation" :key="t" class="info_list_box">
            <songInfo v-for="(item,index) in i " :key="index" :sequence="index" :infos="item" :songHeight="songHeight" v-show="temp"></songInfo>
        </div>
        
        
    </div>
</template>
<script>
import songInfo from "./songInfo.vue"

import {GetMusicInfo} from "../../js/MusicInformationAcquisition"
import localForage from "localforage"

export default {
    data(){
        return{
            songHeight:50,//每一行的高度
            dynamicHeight:false,//是否需要动态高度
            temp:true,//测试用的，是否显示歌单列表
            currentPathUpdate:0,//currentPat更新记录
            musicInformation:[],//音乐信息存储
            requestLabel:0,//请求标签
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
        ,
        /**
         * 通过浏览器缓存查询音乐信息,如果查询到了则立刻更新,如果没查询到则不更新,等待主线程的数据返回
         * @param {String} key 缓存的查询信息 
         */
        cacheInquire(key,index,label){
            localForage.getItem(`musicListInfo:${key}`)
            .then(r=>{
                if(r){
                    //当获取到信息后就将缓存的信息加载到页面上
                    this.setMusicInformation(index,label,r)
                }
            })
        }
        ,
        //设置音乐信息的存储
        setMusicInformation(index,label,data){
            if(label === this.requestLabel) {
                this.musicInformation[index] = data
            }
        },
        /**
         * 更新缓存中的音乐信息
         * @param {String} key 缓存的查询信息
         * @param {Arry} data  音乐欣喜
         */
        updatCache(key,data){
            localForage.setItem(`musicListInfo:${key}`,data)
        }
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
                this.songHeight = 40
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
        window.addEventListener('globalStore:currentPath',(e)=>{
            
            this.requestLabel = new Date().getTime()
            if(this.currentPathUpdate){
                clearTimeout(this.currentPathUpdate)
            }
            //先查本地数据,如果本地有数据则先设置到页面上,等待网络请求返回后再更新
            const pathList = e.detail.value

            this.currentPathUpdate = setTimeout(()=>{
                this.musicInformation = []
                let pathListIndex = 0
                for(let i in pathList){
                    this.cacheInquire(i,pathListIndex,this.requestLabel)
                    GetMusicInfo.getInfo({path:i,type:pathList[i],index:pathListIndex,label:this.requestLabel})
                    .then((res)=>{
                        this.setMusicInformation(res[0][1],res[0][2],res[1])
                        this.updatCache(i,res[1])
                    })
                    pathListIndex++;
                }

                
            },300)
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
    z-index: 1;
    
}
.info_list_box{
    z-index: 0.8;
}

.songNameBox{
    width: 16%;
}
</style>