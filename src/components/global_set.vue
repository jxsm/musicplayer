<template>
    <div class="wai">
        <div class="app">
            <div class="main_box" ref="mainBox">
            <svg @click="$emit('goset')" t="1703493087916" class="closeSet" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="200" height="200"><path d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="" p-id="5099"></path></svg>

                <div class="topbox" >
                    <p>占位</p>
                </div>

                <!--主要的设置内容-->
                <div class="contentBox">
                    <!--添加音乐-->
                    <div class="addMusic">
                        <!--添加文件-->
                        <selectFile @selectFile="changeFileList" filewidth="150px" fileheight="150px" class="addfile" ></selectFile>
                        <fillList width="50%" height="150px" backgroundColor="#4e4e4e" :files="files"></fillList>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import selectFile from "./selectFile.vue"
import fillList from "./fillList.vue"
export default{
    data(){
        return{
            files:["E:\\SteamLibrary\\steamapps"],
            alterFileList:false,//是否要更改文件
            FileListPath:null,//选择的文件的列表
        }
    },
    methods:{
        /**
         * 关闭设置页面的盒子
         */
        closeBox(){
            this.$refs.mainBox.style.transform = "rotateY(90deg) rotateX(10deg)"
        },
        /**
         * 获取音乐文件列表
         */
        getFileList(){
            window.ipcRenderer.send('readFolderList',"获取歌曲文件夹列表");
        },
        /**
         * 更改音乐文件夹列表
         * @param {List} content 内容 
         */
        changeFileList(content){
            //让其读取文件中的内容
            this.alterFileList = true
            //将其放到临时变量中
            this.FileListPath = content
            this.getFileList()//读取文件中的内容
        },
        /**
         * 文件选择后的回调
         * @param {String} data 
         */
        selectFile(data){
            console.log(data)
        }


       
    },
    mounted(){
        //设置动画
        setTimeout(() =>{
            this.$refs.mainBox.style.transform = "rotateY(0deg) rotateX(0deg)"
        }),
         /**
         * 监听读取文件的信息
         */
         window.ipcRenderer.on('musicFolderList', (event, arg) => {
            let oldFileList  = JSON.parse(arg);
            
            //判断是否要更改文件
            if(this.alterFileList ){

                for(let i = 0;i<oldFileList.length;i++){
                    if(oldFileList[i].path == this.FileListPath){
                        console.log("已添加")
                        return
                    }                
                }
                //更改文件
                if(this.FileListPath){
                    //先变量更改
                    oldFileList.push({path:this.FileListPath,name:this.FileListPath.split('\\').pop()});
                    //发送更改信息
                    window.ipcRenderer.send('changeFolderList',oldFileList);
                    //更改完成后恢复变量
                    this.alterFileList = false;
                    this.FileListPath = '';
                }
            }

            this.files = JSON.parse(JSON.stringify(oldFileList))
        })

        /**
         * 监听是否更改成功
         */
        window.ipcRenderer.on('changeFolder', (event, arg) => {
            console.log(arg);
        })

        this.getFileList()

    },
    props:{
        show:{
            type:Boolean,
        }
    },
    watch:{
        show(){
            if(this.show){
                this.closeBox()
            }
        }
    },
    components:{
        selectFile,
        fillList,
    }
   
}
</script>

<style scoped>
@import url(../css/global_set.css);

</style>