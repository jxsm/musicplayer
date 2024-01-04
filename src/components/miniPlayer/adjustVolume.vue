<template>
<!--调节音量组件-->
<div class="adjustBox" ref="adjustBox" id="adjustBox">
    <div class="strip" ref="strip">
        <div class="controlStrip" ref="controlStrip">

        </div>
    </div>
</div>
</template>
<script>
import {alterGlobalStore} from '../../assets/globalStore.js'
export default {
    data(){
        return{
            volume:0,
            midway:false
        }
    },
    props:{
        isShow:{
            type:Boolean,
            default:false
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
        }
    },
    methods:{
        /**
         * 通过鼠标对象获取音量条应该对应的位置
         * @param {*} e 
         */
        getCoordinates(e){
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
            //设置音量条应该对应的位置
            this.$refs.controlStrip.style.height = (percentage+10) +'%'
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
            void 0
            this.$refs.adjustBox.style.transform = "rotateX(0deg)"
            this.$refs.adjustBox.style.opacity = 1
        },
        /**
         * 隐藏事件
         */
        conceal(){
            void 0 
            this.$refs.adjustBox.style.transform = "rotateX(90deg)"
            this.$refs.adjustBox.style.opacity = 0
        },
        //TODO:鼠标移出组件,更具情况通知父组件是触发隐藏事件
        shiftOut(){
            if(!this.midway){
                console.log("退退退")
            }
        }

    },
    mounted(){
        //监听鼠标点击事件
        this.$refs.strip.addEventListener('click',this.getCoordinates)
        //监听鼠标按下的拖动事件
        document.addEventListener('mousedown',this.mouseDown)
        //监听鼠标抬起事件
        document.addEventListener('mouseup',()=>{
            window.removeEventListener('mousemove',this.getCoordinates)
            this.midway = false
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
    left: 100px;
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