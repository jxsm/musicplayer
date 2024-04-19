<template>
    <!--迷你通知组件(会出现在软件的中下方,一个小弹窗适合一些不怎么重要的弹窗)-->
    <div class="window_box" :style="window_box_style" ref="window_box">{{hintText}}</div>
</template>

<script>


export default {
    data(){
        return{
                window_box_style:{
                left: "50%",
                top: "80%",
                height:"auto",
                width:"auto",
                backgroundColor:"rgb(105, 105, 105)",
                color:"white",
                opacity:0
            },
            hintText:"",//提示内容
            timeTemp:0,//定时器记录
        }
    },
    methods:{
        /**
         * 当收到通知事件的时候触发
         * @param {CustomEvent} e 
         */
        miniHintEvent(e){
            this.hintText =  e.detail.hintText
            this.window_box_style.backgroundColor = e.detail.backgroundColor
            this.window_box_style.color = e.detail.color
            this.showHint(e.detail.time)
            e.stopPropagation();
        },
        /**
         * 显示提示信息,如果上一次的提示信息还没有消失,则会替换调上一次的提示
         * @param {Number} time  提示多少毫秒后消失
         */
        showHint(time){
            if(this.timeTemp){
                clearTimeout(this.timeTemp)
            }
            setTimeout(()=>{
                this.window_box_style.opacity = 0
            },time)
            this.autoPosition()
            this.window_box_style.opacity = 1
        }
        ,
        /**
         * 自动设置元素的位置和大小
         */
        autoPosition(){
            this.window_box_style.width = "auto"
            this.window_box_style.height = "auto"
            // console.log("元素宽度" + this.$refs.window_box.offsetWidth)
            setTimeout(()=>{
                this.window_box_style.width = this.$refs.window_box.offsetWidth + 30 + "px"
                this.window_box_style.height = this.$refs.window_box.offsetHeight + 10 + "px"
            },3)
        }
    },
    mounted(){
        window.addEventListener("miniHint",this.miniHintEvent)
        
    }
}
</script>

<style scoped>
.window_box{
    position: absolute;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    transition: opacity 0.5s ease-in-out;
    box-shadow: 0px 5px 5px  #00000070;
    font-weight: bold;
}
</style>