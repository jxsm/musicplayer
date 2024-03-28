<template>
    <!--这个是大进度条组件-->
    <div class="progressBarBox" id="progressBarBox" ref="progressBarBox">
        <div class="progressBar" :style="progressBarStyle" id="progressBar"></div>
    </div>
</template>

<script>
import {MusicManagement} from "../../js/musicManagement.js"
export default {
    data(){
        return{
            progressBarStyle:{
                width: '0%',
            },
            progressBarDown:false,//进度条是否被按下,
            isMonitor:false,//是否为监听状态
        }
    },
    methods:{
        /**
         * @param {MouseEvent} e 
         * 当鼠标按下的时候执行
         */
        mousedownBar(e){
            if((e.target.id === "progressBarBox" || e.target.id === "progressBar") && !this.progressBarDown){
                this.progressBarDown = true
                window.addEventListener('mousemove',this.getMousesPlace)
            }
            this.progressBarStyle.transition = 'width 0s'
        },
        /**
         * 鼠标抬起的时候执行
         * @param {MouseEvent} e 
         */
        mouseupBar(e){
              //清除监听
              window.removeEventListener('mousemove',this.getMousesPlace)
                if(this.progressBarDown){
                    this.progressBarDown = false
                    this.setProgressBar(e)
                }
                this.progressBarStyle.transition = 'width 0.2s'
        },
        /**
         * 获取鼠标在进度条中的百分比,并且设置进度条的长度
         */
        getMousesPlace(e){
            const {left,width} = this.$refs.progressBarBox.getBoundingClientRect()
            let x = e.clientX
            //计算数百哦
            let hundreds = Math.floor((x-left)/width*100)
            this.progressBarStyle.width = `${hundreds}%`

            let percent = hundreds/100

            if(percent<0)return 0;
            if(percent>1) return 1;
            return percent;

        },
        /**
         * 设置音乐进度到指定的位置
         */
        setProgressBar(e){
            MusicManagement.setProgress(this.getMousesPlace(e))
        }

    },
    mounted(){
        addEventListener('setItemEvent',(e)=>{
            if(e.key === 'music_play_info' && !this.progressBarDown){
                const newValue = JSON.parse(e.newValue)
                this.progressBarStyle.width = `${(newValue.nowTime/newValue.endTime)*100}%`
            }
        }
        )


        //进度条的拖动
        window.addEventListener('mousedown',this.mousedownBar)
        window.addEventListener('mouseup',this.mouseupBar)
        this.isMonitor = true
    },
    props:{
        miniBarShow:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        miniBarShow(newValue){
            if(newValue){
                //清除监听
                window.removeEventListener('mousedown',this.mousedownBar)
                window.removeEventListener('mouseup',this.mouseupBar)
                this.isMonitor = false
            }
            else if(!this.isMonitor){
                //进行监听
                window.addEventListener('mousedown',this.mousedownBar)
                window.addEventListener('mouseup',this.mouseupBar)
                this.isMonitor = true
            }
        }
    }
}

</script>

<style scoped>
.progressBarBox{
    width: 100%;
    height: 7px;
    position: absolute;
    background-color: var(--adjacentColour-theme-two);
    bottom: 0px;
    z-index: 10;
    transition: height 0.3s;
}

.progressBar{
    height: 100%;
    background-color: var(--adjacent-theme-colour);
    transition:width 0.2s ;
}

.progressBarBox:hover{
    height:15px;
}


</style>