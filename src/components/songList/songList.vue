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
                this.listProcessing(this.gainFileList())
            }else{
                //不显示
                this.$refs.songBox.style.opacity = 0
                this.$refs.songBox.style.transform = "rotateX(50deg)"
            }
        }
    },
    methods:{
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