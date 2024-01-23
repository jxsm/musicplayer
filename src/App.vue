<template>
    <hintModule></hintModule>
    <!--窗口顶部控制条-->
    <controlStrip @goset="setDisplay" :setSongListX="setSongListX" @clicksong="showSong"></controlStrip>
    <!--歌单列表-->
    <songList class="songList" :style="songListStyle" @clicksong="showSong" @closeSongList="showSong" :isShow="songListShow"></songList>
    <!--遮罩层-->
    <div class="shadeBox" ref="shadeBox"></div>
    
    <!--设置页面-->
    <global_set @goset="startSet" v-if="showSet" :show="GlobalSetAnimation" ></global_set>
     <!--主页面-->
    <MainInterface ></MainInterface>

</template>


<script>

import controlStrip from "./components/controlStrip.vue"//窗口顶部的控制条
import global_set from "./components/global_set.vue"//窗口设置页
import hintModule from "./components/publicModule/hintModule.vue"//提示框
import  songList  from "./components/songList/songList.vue"//歌单列表
import MainInterface from "./components/mainInterface/mainInterface.vue"//主页面
import {ThemeColors} from "./js/ThemeColors.js"
import {globalStore_Object,getAll,getGlobalStore, alterGlobalStore} from './assets/globalStore.js'
export default {
    components:{
        controlStrip,
        global_set,
        hintModule,
        songList,
        MainInterface
    },
    data(){
        return{
            showSet:false,//是否显示设置菜单
            GlobalSetAnimation:false,
            SongListX:0,//歌单列表x轴坐标
            songListShow:false,//歌单列表是否显示
        }
    },
    methods:{
        /**
         * 设置是否显示,设置,如果已经显示了则不再显示
         */
         setDisplay(){
            if(!this.showSet){
                this.startSet()
            }
         },
        /**
         * 显示设置页面
         */
        startSet(){
            this.GlobalSetAnimation = true
            if(!this.showSet){
                this.showSet = !this.showSet
                this.GlobalSetAnimation = false
                this.setShadeBox(5,1)
                this.songListShow = false

            }
            else{
                
                setTimeout(()=>{
                    this.showSet = !this.showSet
                    this.GlobalSetAnimation = false
                },310)
                this.setShadeBox(0,1)
            }

        },
        /**
         * 设置遮罩的显示和关闭(都是缓慢的)
         * @param {Number} trueOrFalse 显示还是关闭
         * @param {Number} time 动画时常
         */
        setShadeBox(dim=4,time=1){
            this.$refs.shadeBox.style.transition = `backdrop-filter ${time}s , opacity ${time/2}s`
            this.$refs.shadeBox.style.backdropFilter = `blur(${dim}px)`
            this.$refs.shadeBox.style.opacity = dim==0?0:1

            if(dim==0){
                setTimeout(()=>{
                    this.$refs.shadeBox.style.display = "none"
                    this.$refs.shadeBox.style.zIndex = -2
                },time*1000/2)
            }else{
                this.$refs.shadeBox.style.display = "block"
                this.$refs.shadeBox.style.zIndex = 9999
            }
        },
        /**
         * 设置歌单列表的位置
         * @param {Number} x 位置
         * 传递给了顶部控制条组件,由顶部控制条组件来设置
         */
        setSongListX(x){
            this.SongListX = x - 180/2
        },
        /**
         * 显示歌单列表页面?
         */
        showSong(){
            this.songListShow = !this.songListShow
            if(this.songListShow && this.showSet){
                //当歌单显示的时候关闭设置页面
                this.showSet = true
                this.startSet()
            }
            
        },
        /**
         * 设置filePath的值
         */
        setfFilePath(event,arg){
            if(arg[0] == 1){
                let data =  JSON.parse(arg[1])
                if(data.length>0){
                    localStorage.setItem('filePath',JSON.stringify(data))
                }
                else{
                    localStorage.setItem('filePath',"[]")
                }
            }
            //执行完成后取消监听
            window.ipcRenderer.off('musicFolderList',this.setfFilePath)
        },
        /**
         * 检查FilePath的数据是否存在,如果不存在则进行初始化
         */
        testFilePath(){
            if (!localStorage.getItem('filePath')){
                localStorage.setItem('filePath',"[]")
                //如果不存在则从文件中取读取
                window.ipcRenderer.send('readFolderList',1)
                window.ipcRenderer.on('musicFolderList',this.setfFilePath)
            }
        },
        //软件关闭的时候保存数据
        beforeunloadHandler(e) {
            void e
            //保存歌单数据
            let  filePath = JSON.parse(localStorage.getItem('filePath'))
            if(filePath){
                window.ipcRenderer.send('changeFolderList',filePath)
            }

            //保存公共变量
            localStorage.setItem('globalStore',JSON.stringify(getAll()))
        },
        /**
         * 初始化
         */
        initialize(){
            this.testFilePath()

            //加载保存的公共变量
            try{
                let globalStore = JSON.parse(localStorage.getItem('globalStore'))
                globalStore_Object(globalStore)
            }
            catch{
                console.log("没有保存的公共变量")
            }
        },
        /**
         * 默认选择歌单
         */
        selectThePlaylistByDefault(){
           const a =  Object.keys(getGlobalStore('currentPath')).length
           console.log(getGlobalStore('currentPath'))
           if(a === 0){
                let  filePath = JSON.parse(localStorage.getItem('filePath'))
                
                if(filePath.left != 0 ){
                    let b = {}
                    b[filePath[0].path] = true
                    alterGlobalStore('currentPath',b,true)
                }
           }
        }
    },
    mounted(){
        //初始化
        this.initialize()

        //软件关闭的时候保存数据
        window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
        ThemeColors.set("#41b883")
        //全局监听按键
        window.pressKeys ={}
        window.addEventListener('keydown', function (event) {
            window.pressKeys[event.key] = true
        });

        window.addEventListener('keyup', function (event) {
            window.pressKeys[event.key] = false
        })


        this.selectThePlaylistByDefault()//初始化歌单选中列表

    },
    computed:{
        songListStyle(){
            return {
                left:`${this.SongListX}px`
            }
        }
    }
    
}
</script>

<style scoped>
.shadeBox{
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -2;
    opacity: 0;
    background-color: rgba(52, 52, 52, 0.4);
    backdrop-filter: blur(5px);
    transition:backdrop-filter 0s opacity 0s;
    

}


.songList{
    z-index: 2;
    top: 40px;
}


</style>
