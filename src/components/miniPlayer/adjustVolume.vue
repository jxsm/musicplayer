<template>
<!--调节音量组件-->
<div class="adjustBox" ref="adjustBox" id="adjustBox" :style="adjustBoxStyle" @mouseenter="stopMouseOutTime" @mouseleave="shiftOut">
    <div class="strip" ref="strip">
        <div class="controlStrip" ref="controlStrip" :style="controlStripStyle">

        </div>
    </div>
</div>
</template>
<script>
import {alterGlobalStore,getGlobalStore} from '../../assets/globalStore.js'
export default {
    data(){
        return{
            volume:0,//音量大小
            midway:false,//是否正在被更改
            adjustBoxStyle:{},//调节音量组件的样式
            controlStripStyle:{},//控制条的样式
        }
    },
    props:{
        isShow:{
            type:Boolean,
            default:false
        },
        mouseOut:{
            type:Function,
            default:null
        },
        stopMouseOutTime:{
            type:Function,
            default:null
        },
        muteVolume:{
            tyle:Boolean,
            default:null
        }
    },
    watch:{
        isShow(newValue){
            if(newValue){
                this.show()
            }
            else{
                this.conceal()
            }
        },
        volume(newValue){
            alterGlobalStore('musicVolume',newValue,true)
             //设置音量条应该对应的位置
              this.controlStripStyle.height = (newValue+8) +'%'
             if(newValue <= 2){
                this.$emit('muteVolume')
             }
             else{
                this.$emit('noMuteVolume')
             }
        },
        muteVolume(){
            this.init()
             this.controlStripStyle.transition = 'height 0.3s'
            setTimeout(()=>{
                 this.controlStripStyle.transition = 'height 0s'
            },300)
        },
    },
    methods:{
        /**
         * 通过鼠标对象获取音量条应该对应的位置
         * @param {*} e 
         */
        getCoordinates(e){
            this.controlStripStyle.transition = 'height 0s'
            let parent
            for(let i of e.path){
                if(i.id === 'adjustBox'){
                    parent = i
                }
            }
            if(!parent){
                return
            }
            //获取parent的坐标
            const parentY = parent.getBoundingClientRect().y

            let percentage = 100 - ((e.clientY - parentY)/parent.offsetHeight * 100)
            this.volume = Math.round(percentage)  -1
           
        },
        /**
         * 当鼠标按下的时候执行去监听鼠标移动事件
         */
        mouseDown(){
            window.addEventListener('mousemove',this.getCoordinates)
            this.midway = true
        },
        /**
         * 显示
         */
        show(){
            this.init()
            this.adjustBoxStyle.transform = "rotateX(0deg)"
            this.adjustBoxStyle.opacity = 1
            this.volume = getGlobalStore('musicVolume')

        },
        /**
         * 隐藏事件
         */
        conceal(){
            this.adjustBoxStyle.transform = "rotateX(90deg)"
            this.adjustBoxStyle.opacity = 0
        },
        /**
         * 鼠标抬起的时候移除监听事件
         */
        mouseSeup(){
            window.removeEventListener('mousemove',this.getCoordinates)
            this.midway = false
        },
        /**
         * 鼠标移出组件事件
         */
        shiftOut(){
            if(this.midway){
                setTimeout(this.shiftOut,100)
            }else{
                this.mouseOut()
            }
        },
        /**
         * 初始化函数(每次显示前都需要调用此函数读取公共变量中的音量并设置到组件中)
         */
        init(){
            this.volume = getGlobalStore('musicVolume')
        },
      

    },
    mounted(){
        //监听鼠标点击事件
        this.$refs.strip.addEventListener('click',this.getCoordinates)
        //监听鼠标按下的拖动事件
        this.$refs.strip.addEventListener('mousedown',this.mouseDown)
        //监听鼠标抬起事件
        document.addEventListener('mouseup',this.mouseSeup)


        //监听当公共变量中的音量发生变化的时候
        addEventListener('globalStore:musicVolume',(e)=>{
            this.volume = e.detail.value
        })



    }
}
</script>

<style scoped>
.adjustBox{
    opacity: 0;
    transform-origin:bottom;
    transform: rotateX(90deg);
    transition:transform 0.3s,background-color 0.5s, color 0.5s,opacity 0.3s ;
    z-index: 90;
    position: absolute;
    width: 40px;
    height: 100px;
    background-color: var(--oppositeAdjacent-theme-colour);
    border-radius: 10px;
    box-shadow: 0px 0px 3px 1px var(--adjacent-theme-colour);
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.strip{
    position: absolute;
    width: 6px;
    height: 90%;
    background-color: var(--adjacent-theme-colour-d);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.controlStrip{
    width: 100%;
    height: 10%;
    background-color: var(--adjacent-theme-colour);
    border-radius: 10px;
    
}
.controlStrip::before{
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: -2px;
    background-color:var(--adjacent-theme-colour) ;
}
</style>