<template>
    <div class="waiBox" ref="songBox">
        <detailChunk @cancelCollection="cancelCollection" @collected="collected" v-for="(item,index) in songList" :key="index" :info="item" class="detailChunk"></detailChunk>
    </div>
</template>
<script>
import detailChunk from "./detailChunk.vue"


export default{
    data(){
        return{
            songList:[],//歌单列表
            tempInfo:{},//临时存储歌单信息
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
                //显示
                this.$refs.songBox.style.opacity = 1
                this.$refs.songBox.style.transform = "rotateX(0deg)"
                //在显示的时候激活重新查询文件
                this.gainFileList()
                //开启监听事件
                window.ipcRenderer.on("musicFolderList",this.TwoGetList)
                
            }else{
                //不显示
                this.$refs.songBox.style.opacity = 0
                this.$refs.songBox.style.transform = "rotateX(50deg)"
                //取消监听
                window.ipcRenderer.off("musicFolderList",this.TwoGetList)
            }
        }
    },
    methods:{
        /**
         * 发送获取文件夹列表的请求给主线程
         */
        gainFileList(){
            window.ipcRenderer.send('readFolderList',2)
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
            this.tempInfo = info
            window.ipcRenderer.send('readFolderList',4)
        },
        /**
         * 添加收藏事件
         * @param {Object} info 歌曲信息
         */
        collected(info){
            this.tempInfo = info
            window.ipcRenderer.send('readFolderList',3)
        },
        TwoGetList(event, arg){
            switch (arg[0]){
                case 2:
                    //获取到文件列表然后进行排序,并显示到页面中
                    this.listProcessing(arg)
                    break
                case 3:
                    //添加收藏
                    this.addCollect(arg)
                    break
                case 4:
                    //取消收藏
                    this.removeCollect(arg)
                    break
            }
        }
        ,
        /**
         * 当主线程查询到数据后交给该函数进行顺序处理
         * @param {List} arg 
         */
        listProcessing(arg){
            let FileList  = JSON.parse(arg[1]);
            //TODO:分离收藏和未收藏的歌曲,然后将其都按照字母顺序排序
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
         * 添加收藏处理
         * @param {List} arg 
         */
        addCollect(arg){
            //去找到歌曲然后添加收藏
            let FileList  = JSON.parse(arg[1]);
            for(let i = 0 ;i<FileList.length;i++){
                if(FileList[i].path === this.tempInfo.path){
                    FileList[i].collect = true
                    break
                }
            }
            
            //重新写入到文件中
            window.ipcRenderer.send('changeFolderList',FileList)
        },
        /**
         * 取消收藏处理
         * @param {List} arg 
         */
        removeCollect(arg){
            //去找到歌曲然后添加收藏
            let FileList  = JSON.parse(arg[1]);
            for(let i = 0 ;i<FileList.length;i++){
                if(FileList[i].path === this.tempInfo.path){
                    FileList[i].collect = false
                    break
                }
            }
            //重新写入到文件中
            window.ipcRenderer.send('changeFolderList',FileList)
        }
    },
    mounted(){
        
        
    }
}
</script>
<style scoped>
    .waiBox{
        position: absolute;
        width: 180px;
        height: 80%;
        background-color: #353535;
        border-radius: 0px 0px 10px 10px;
        box-shadow: 0px 2px 10px 0px #5f5f5f;
        opacity: 0;
        transition: opacity 0.2s,transform 0.5s;
        transform-origin:top;
        overflow: scroll;
    }

    .detailChunk:not(:first-child){
        margin-top: 5px;
    }
</style>