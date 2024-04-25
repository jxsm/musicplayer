<template>
    <!--通知组件-->
    <div class="hintBox" ref="hintBox" @click="ahead" :style="hintBoxStyle">
        <div class="whiteBar" ref="whiteBar" :style="whiteBarStyle">

        </div>

        <div class="mainBox" ref="mainBox" :style="mainBackgroundColor">
            <div class="title" ref="titleBox" :style="titleBoxStyle">
                {{title}}
            </div>
            <div class="text" ref="content">
                {{ content }}
            </div>
        </div>

        <div class="progressBar">
            <div ref="progressBar" :style="progressBarStyle">

            </div>
        </div>
       
    </div>  
</template>
<script>
    export default {
        data() {
            return{
                title:"提示",
                content:"提示内容",
                oldTime:0,//计时器记录
                vanishTime:0,//消失记录器
                titleBoxStyle:{},//标题样式
                progressBarStyle:{},//进度条样式
                hintBoxStyle:{},//通知框样式
                whiteBarStyle:{},//白色条样式
                mainBackgroundColor:{},//背景颜色
            }
        },
        methods:{
            /**
             * 监听事件触发后的回调
             * @param {*} e 
             */
            hintEvent(e){
                //判断是否在通知等级内
                if(e.detail.level<window.hintLevel){
                    return
                }
                this.title = e.detail.title
                this.titleBoxStyle.backgroundColor = e.detail.titleColor
                this.content = e.detail.content
                this.mainBackgroundColor.backgroundColor = e.detail.background
                this.startAnimation(e.detail.time)
                e.stopPropagation();
            },
            /**
             * 设置动画
             * @param {*} time 
             */
            startAnimation(time){
                if(this.oldTime){
                    clearTimeout(this.oldTime)
                }

                if(this.vanishTime){
                    clearTimeout(this.vanishTime)
                }

                this.progressBarStyle.left = '0%'
                this.progressBarStyle.transition = "left 0ms linear"
                this.hintBoxStyle.display = "block"
                this.whiteBarStyle.transition = "left 0ms"
                this.whiteBarStyle.left = "0px"
                setTimeout(()=>{
                    this.hintBoxStyle.right = "0px"
                    this.progressBarStyle.transition = `left ${time}ms linear`
                    this.progressBarStyle.left = '100%'
                    this.whiteBarStyle.transition = `left ${time/4}ms linear`
                    this.whiteBarStyle.left = "300px"
                },50)


                this.oldTime = setTimeout(()=>{
                    //用于关闭提示的
                    this.hintBoxStyle.right = "-300px"
                    this.vanishTime = setTimeout(()=>{
                        this.hintBoxStyle.display = "none"
                        this.vanishTime = 0
                    },500)
                    this.oldTime = 0
                },time)
                
                
            },
            /**
             * 提前关闭
             */
            ahead(){
                this.oldTime = setTimeout(()=>{
                    //用于关闭提示的
                    this.hintBoxStyle.right = "-300px"
                    this.vanishTime = setTimeout(()=>{
                        this.hintBoxStyle.display = "none"
                        this.vanishTime = 0
                    },500)
                    this.oldTime = 0
                },0)
            }
            
        },
        mounted() {
            //监听全局发出的通知事件
            window.addEventListener("hint",this.hintEvent)
        }
    }
</script>



<style scoped>
.hintBox{
    position: absolute;
    z-index: 999999;
    width: 250px;
    height:80px;
    top: 45px;
    right: -300px;
    border-radius: 10px 0px 0px 10px;
    background-color: rgb(48, 48, 48);
    display: flex;
    align-items: center;
    overflow: hidden;
    transition:right 0.4s;
    display: none;
}

.title{
    width: 80px;
    height: 80px;
    background-color: rgb(54, 83, 246);
    color: aliceblue;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mainBox{
    width: 100%;
    height: 100%;
    background-color: #242323;
    display: flex;
    align-items: center;
}

/**
白色的进度条(进度条小时后通知关闭)
*/
.whiteBar{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 300px;
    background-color: aliceblue;
    transition: left 0.5s;
}

.text{
    width: 150px;
    position: relative;
    left: 10px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: aliceblue;
    font-weight: bold;
}

.progressBar{
    width: 100%;
    height: 5px;
    position: absolute;
    background-color: rgb(65, 65, 65);
    top: 75px;
}

.progressBar div{
    background-color: aliceblue;
    width: 100%;
    height: 100%;
    left: 0;
    position: relative;
    transition:left 1s ;
}

</style>