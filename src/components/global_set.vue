<template>
    <div class="wai">
        <div class="app">
            <div class="main_box" ref="mainBox" :style="mainBoxStyle">
            <svg @click="$emit('goset')" t="1703493087916" class="closeSet" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="200" height="200"><path d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="" p-id="5099"></path></svg>

                <div class="topbox" >
                    
                </div>

                <!--主要的设置内容-->
                <div class="contentBox">
                    <!--添加音乐-->
                    <div class="addMusic">
                        <!--添加文件-->
                        <div class="addFileDiv">
                            <p>添加音乐文件夹</p>
                            <selectFile @selectFile="changeFileList" filewidth="150px" fileheight="150px" class="addfile" filecolor="var(--adjacent-theme-colour)"></selectFile>
                        </div>

                        <div class="fillListDiv">
                            <p>音乐文件夹列表</p>
                            <fillList width="100%" height="150px" backgroundColor="var(--adjacent-theme-colour)" :files="files" @del="deleteFiles"></fillList>
                        </div>
                    </div>


                    <!--文件扩展名设置-->
                    <div class="ExtensionNameBox">
                        <p>文件扩展名设置(用','隔开)</p>
                        <filenameExtension></filenameExtension>
                    </div>

                    <!--主题设置-->
                    <div class="themeBox">
                        <themeSetting></themeSetting>
                        <!--预设主题-->
                        <Presuppose></Presuppose>
                    </div>

                    <!--ffmpeg路径设置-->
                    <div class="ffmepgPathBox">
                        <p>FFMPEG设置</p>
                        <ffmpegInfo>
                        </ffmpegInfo>
                    </div>
                </div>

                <div class="topbox" >
                    
                </div>
            </div>
            
            
        </div>
        
    </div>
</template>

<script>
//TODO:改将数据存储改成Local Storage
import selectFile from "./selectFile.vue"
import fillList from "./fillList.vue"
import filenameExtension from "./setPage/filenameExtension.vue"
import {proceedHint} from "../../public/static/proceedHint"
import localForage from "localforage"
import themeSetting from "./setPage/themeSetting.vue"
import Presuppose from "./setPage/themeColoerPresuppose.vue"
import ffmpegInfo from "./setPage/ffmpegInfo.vue"

export default{
    data(){
        return{
            files:[],//文件列表
            firstTime:true,//是否为第一次查询
            mainBoxStyle :{},//mainBox的Style
        }
    },
    methods:{
        /**
         * 关闭设置页面的盒子
         */
        closeBox(){
            this.mainBoxStyle.transform = "rotateY(90deg) rotateX(10deg)"
            this.alterFileList = false
            this.FileListPath = null
        },
        /**
         * 获取音乐文件列表
         */
        getFileList(){
            return localStorage.getItem('filePath')
        },
        /**
         * 更改音乐文件夹列表
         * @param {List} content 内容 
         */
        changeFileList(content){
            //TODO:更改文件列表
            let filePath =  JSON.parse(this.getFileList()) 
            //先检查是否有重复的了
            for(let i = 0;i<filePath.length;i++){
                if(filePath[i].path == content){
                    proceedHint.warn("该文件夹已存在","提醒",2000)
                    return
                }
            }
            //提取文件的名称
            let file_name = content.split('\\').pop()
            filePath.push({path:content,name:file_name.split('/').pop(),collect:false,type:'local'})
            localStorage.setItem('filePath',JSON.stringify(filePath));
            //提示还没搞
            proceedHint.commonHint("添加成功","提醒",2000)
            this.files = filePath
            this.giveNotice(true,content)
        },
        /**
         * 删除文件列表中的文件
         * @param {String} filePath 
         */
        deleteFiles(path){
            let filePath =  JSON.parse(this.getFileList()) 
            for(let i = 0;i<filePath.length;i++){
                if(filePath[i].path == path){
                    filePath.splice(i,1)
                    break
                }
            }
            localForage.removeItem(`musicListInfo:${path}`)
            localStorage.setItem('filePath',JSON.stringify(filePath));
            proceedHint.warn("删除成功","提醒",2000)
            this.files = filePath
            this.giveNotice(false,path)
        },
        /**
         * 发出通知
         * @param {String} path 路径
         * @param {boolean} [type=true] 是添加还是删除  
         */
        giveNotice(type=true,path){
            
            let fileListAlter = new CustomEvent('fileListAlter',{
                detail:{
                    type:type,//是添加还是删除
                    path:path//路径
                }
            })
            window.dispatchEvent(fileListAlter);
        }
       
    },
    mounted(){
        //设置动画
        setTimeout(() =>{
            this.mainBoxStyle.transform = "rotateY(0deg) rotateX(0deg)"
        })


        //当打开的时候获取文件列表
        let filePath =  JSON.parse(this.getFileList())
        this.files = filePath
       
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
        selectFile,//添加文件设置
        fillList,//文件夹列表
        filenameExtension,//文件扩展名设置2
        themeSetting,//主题设置
        Presuppose,//预设主题
        ffmpegInfo,//ffmpeg信息
    }
   
}
</script>

<style scoped>
@import url(../css/global_set.css);

</style>