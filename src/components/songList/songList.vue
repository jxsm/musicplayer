<template>
    <div class="waiBox" ref="songBox" id="songBox" :style="songBoxStyle" v-if="detailChunkRefresh">
        <!--TODO:选中之后改变样式-->
        <detailChunk  :pitchOn="pitchOn"  @clikcList="switchCurrentFolder" @cancelCollection="cancelCollection" @collected="collected" v-for="(item,index) in songList" :key="index" :info="item" class="detailChunk" :checked="checked == index ? true:false"></detailChunk>
        <div class="muno" ref="muno" :style="munoStyle">
            请先在设置中添加歌单
        </div>
    </div>
</template>
<script>
import detailChunk from "./detailChunk.vue"
import {alterGlobalStore,getGlobalStore} from "../../assets/globalStore"
import {proceedHint} from "../../../public/static/proceedHint"
import keyProcessing from "../../js/render/keyProcessing.js"

export default{
    data(){
        return{
            songList:[],//歌单列表
            concealTime:0,//隐藏计时器
            checked:1,//选中第几个歌单
            pitchOn:[],//被选中的歌单
            songBoxStyle:{
                display:"none",
            },//容器样式
            munoStyle:{
                display:"none",
            },//提示容器样式
            detailChunkRefresh : true
        }
    },
    components:{
        detailChunk
    },
    props:{
        isShow:{
            type:Boolean,
            default:false,
        },
    },
    watch:{
        isShow(){
            if(this.isShow){
                if(this.concealTime){
                    clearTimeout(this.concealTime)
                    this.concealTime = 0
                }
                //显示
                this.songBoxStyle.display = 'block'
                this.detailChunkRefresh = false
                setTimeout(()=>{
                    this.detailChunkRefresh = true
                })

                setTimeout(()=>{
                    this.songBoxStyle.opacity = 1
                    this.songBoxStyle.transform = "rotateX(0deg)"
                },10)


                //在显示的时候激活重新查询文件
                this.listProcessing(this.gainFileList())
                setTimeout(()=>{
                    //监听鼠标点击事件,当鼠标点击自己页面自己页面以外的时候页面关闭
                    window.addEventListener("click",this.testMousePosition)
                },50)
                

                if(this.songList.length == 0){
                    this.munoStyle.display = 'flex'
                    proceedHint.warn('请先添加歌单','提醒',1500)
                }
                else{
                    this.munoStyle.display = 'none'
                }


            }else{
                //不显示
                this.songBoxStyle.opacity = 0
                this.songBoxStyle.transform = "rotateX(50deg)"
                //关闭监听
                window.removeEventListener("click",this.testMousePosition)
                this.concealTime = setTimeout(()=>{
                    this.songBoxStyle.display = 'none'
                    this.concealTime = 0
                },500)
            }
        }
    },
    methods:{
        /**
         * 检查鼠标位置,如果鼠标位置不在此组件内则向父组件传递关闭事件
         */
        testMousePosition(e){
            if(e.target.id!=="songBox" && e.target.id!=="songInfo"){
                this.$emit("closeSongList")
            }
            
        },
        /**
         * 获取歌单列表
         */
        gainFileList(){
            return localStorage.getItem('filePath')
        },
        /**
         * 歌单排序
         * @param {Array} arr 歌单列表 
         */
        songSort(arr){
           
            arr.sort((item1, item2) => {
				const value1 = item1.name.charAt(0);
				const value2 = item2.name.charAt(0);
                // 这里localeCompare应该是不支持第二个参数的 但是并没有报错，请直接使用value1.localeCompare(value2)
				return value1.localeCompare(value2);
			})
           
           
        },
        /**
         * 取消收藏事件
         * @param {Object} info 歌曲信息
         */
        cancelCollection(info){
            this.alterCollect(info,false)
        },
        /**
         * 添加收藏事件
         * @param {Object} info 歌曲信息
         */
        collected(info){
            this.alterCollect(info,true)
            
        },
        /**
         * 修改收藏状态
         */
        alterCollect(info,isCollect =false){
            let FileList  = JSON.parse(this.gainFileList());
            for(let i = 0;i<FileList.length;i++){
                if(FileList[i].path == info.path){
                    FileList[i].collect = isCollect
                    break
                }
            }

            localStorage.setItem('filePath',JSON.stringify(FileList))
        }
        ,
        /**
         * 给查询到的数据排序,并显示到页面中
         * @param {List} arg 
         */
        listProcessing(arg){
            let FileList  = JSON.parse(arg);
            let collect = []
            let noCollect = []

            
            //分离收藏和未收藏的歌曲
            for(let i = 0 ;i<FileList.length;i++){
                if(FileList[i].collect){
                    collect.push(FileList[i])
                }
                else{
                    noCollect.push(FileList[i])
                }
            }
            this.songSort(collect)
            this.songSort(noCollect)
            //合并
            this.songList = collect.concat(noCollect)
        },
        /**
         * 切换当前选择的文件夹
         * @param {Object} info 
         */
        switchCurrentFolder(info){
            let fileList =  getGlobalStore('currentPath')
            if(keyProcessing.pressKeys['ShiftLeft'] || keyProcessing.pressKeys['ShiftRight']){
                fileList[info.path] = info.type
            }else if(keyProcessing.pressKeys['ControlLeft']){
                //删除一个键
                delete fileList[info.path]
            }
            else{
                fileList = {}//清空列表
                fileList[info.path] = info.type
            }
            this.pitchOn = Object.keys(fileList)

            //改变全局变量
            alterGlobalStore('currentPath',fileList,true)
        }

    },
    mounted(){
        //加载全局变量
        setTimeout(()=>{
            let fileList =  getGlobalStore('currentPath')
            this.pitchOn = Object.keys(fileList)
        },10)

        window.addEventListener('fileListAlter',()=>{
            this.songList = []
            setTimeout(()=>{
                this.listProcessing(this.gainFileList())
            })
        })
        
    }
}
</script>
<style scoped>
    .waiBox{
        position: absolute;
        width: 180px;
        height: 80%;
        background-color: var(--adjacent-theme-colour);
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0px 2px 10px 0px #5f5f5f;
        opacity: 0;
        transform: rotateX(50deg);
        transition: opacity 0.2s,transform 0.5s;
        transform-origin:top;
        overflow: scroll;
        display: none;
    }

    .detailChunk:not(:first-child){
        margin-top: 5px;
    }

    .muno{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--theme-colour);
        font-weight: bold;
    }
</style>