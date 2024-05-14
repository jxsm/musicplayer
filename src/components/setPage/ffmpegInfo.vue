<template>
    <div class="ffmpegWai">
        <p>FFMPEG路径设置</p>
        <div class="ffmpegPath">
            <p>{{ffmpegPath?ffmpegPath:"当前使用的是系统FFMPEG"}}</p>
            <button @click="editPath">修改</button>
            <button @click="clearPath">使用系统</button>
        </div>
    </div>
</template>

<script >
import globalSet from "../../assets/globalSet"
import {proceedHint,MinWindowHint} from "../../../public/static/proceedHint"

export default{
    data(){
        return{
            ffmpegPath:""
        }
    },
    methods:{
        /**
         * 修改ffmpeg路径
         */
        editPath(){
            new Notification("FFMPEG路径设置",{
                body:"请选择ffmpeg路径文件的路径",
            });

            //创建一个input元素
            var input = document.createElement("input");
            //设置type属性为file
            input.type = "file";
            //设置accept属性为只接受文件
            input.accept = "file";
            //监听input元素的change事件
            input.addEventListener("change", ()=> {
                //获取用户选择的文件
                var file = event.target.files[0];
                //获取文件路径
                var filePath = file.path;
                //将文件路径赋值给ffmpegPath变量
                globalSet.update("ffmpegPath",filePath,false)
                this.ffmpegPath = filePath;
                proceedHint.commonHint("修改FFMPEG路径成功");
                MinWindowHint.hint("重启软件后生效")
                
        }
        )
        input.click();
    },
    /**
     * 清除ffmpeg路径(默认是会使用系统ffmpeg)
     */
    clearPath(){
        globalSet.update("ffmpegPath","",false)
        this.ffmpegPath = "";
        proceedHint.warn("当前使用的是系统FFMPEG,请确保系统有FFMPEG","提醒",3000)
        MinWindowHint.hint("重启软件后生效")
    }
        
    },
    mounted(){
        //获取ffmpegPath的值
        this.ffmpegPath = globalSet.getKey("ffmpegPath");
    }
}
</script>


<style>
.ffmpegWai{
    width: 80%;
    height: 100%;
    /* border: 4px solid var(--adjacent-HighBrightness-colour); */
    border-radius: 5px;
}


.ffmpegWai p:nth-of-type(1){
    text-align: center;
    color: var(--adjacent-theme-colour);
}

.ffmpegPath{
    background-color: var(--adjacent-theme-colour);
    width: 100%;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.ffmpegPath button{
    border-radius: 5px;
    width: 10%;
    height: 80%;
    border-radius: 3px;
    color: var(--adjacent-HighBrightness-colour);
    background-color: var(--adjacent-HighBrightness-colour);
    color: var(--adjacent-theme-colour);
    font-weight: bold;
    border: none;
}

.ffmpegPath button:hover{
    background-color: var(--adjacent-theme-colour-d);
}

.ffmpegPath>p{
    overflow: hidden;
    width: 70%;
    height: 80%;
    border-radius: 5px;
    background-color: var(--adjacent-HighBrightness-colour);
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>