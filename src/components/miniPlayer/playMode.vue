<template>
    <div class="playModeBox" ref="playModeBox" :style="playModeBoxStyle" >
        <!--顺序播放-->
        <div title="顺序播放" @click="select(1)" :style="bakColor(1)">
            <svg t="1704251873827" class="icon"   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4241" width="200" height="200"><path d="M106 85.5c-22.1 0-40 17.9-40 40v760.6c0 22.1 17.9 40 40 40s40-17.9 40-40V125.5c0-22.1-17.9-40-40-40zM457.3 85.5c-22.1 0-40 17.9-40 40v760.6c0 22.1 17.9 40 40 40s40-17.9 40-40V125.5c0-22.1-17.9-40-40-40zM955.1 661.4c-7.1-12.4-20.3-20-34.6-20h-72c0-0.8 0.1-1.5 0.1-2.3V125.5c0-22.1-17.9-40-40-40s-40 17.9-40 40v513.6c0 0.8 0 1.5 0.1 2.3h-87c-14.3 0-27.5 7.6-34.6 20-7.1 12.4-7.1 27.6 0 40l119.4 206.8c7.1 12.4 20.3 20 34.6 20s27.5-7.6 34.6-20l119.4-206.8c7.2-12.4 7.2-27.7 0-40z m-154 146.8L751 721.4h100.2l-50.1 86.8z" p-id="4242"></path></svg>
            <span>顺序播放</span>
        </div>
        
        <!--列表循环-->
        <div title="列表循环" @click="select(2)" :style="bakColor(2)">
            <svg t="1704249123977"   class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7103" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z" p-id="7104"></path></svg>
            <span>列表循环</span>
        </div>
        <!--单曲循环-->
        <div title="单曲循环" @click="select(3)" :style="bakColor(3)">
            <svg t="1704249146369"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8113" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z" p-id="8114"></path><path d="M512.8 660.6c22.1-0.1 39.9-18.1 39.8-40.2l-1.2-214.1c-0.1-22-18-39.8-40-39.8h-0.2c-22.1 0.1-39.9 18.1-39.8 40.2l1.2 214.1c0.1 22 18 39.8 40 39.8h0.2z" p-id="8115"></path></svg>
            <span>单曲循环</span>
        </div>
        <!--随机播放-->
        <div title="随机播放" @click="select(4)" :style="bakColor(4)">
            <svg t="1704249178758"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10060" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M914.2 705L796.4 596.8c-8.7-8-22.7-1.8-22.7 10V688c-69.5-1.8-134-39.7-169.3-99.8l-45.1-77 47-80.2c34.9-59.6 98.6-97.4 167.4-99.8v60.1c0 11.8 14 17.9 22.7 10l117.8-108.1c5.8-5.4 5.8-14.6 0-19.9L796.4 165c-8.7-8-22.7-1.8-22.7 10v76H758c-4.7 0-9.3 0.8-13.5 2.3-36.5 4.7-72 16.6-104.1 35-42.6 24.4-78.3 59.8-103.1 102.2L513 432l-24.3-41.5c-24.8-42.4-60.5-77.7-103.1-102.2C343 263.9 294.5 251 245.3 251H105c-22.1 0-40 17.9-40 40s17.9 40 40 40h140.3c71.4 0 138.3 38.3 174.4 99.9l47 80.2-45.1 77c-36.2 61.7-103 99.9-174.4 99.9H105c-22.1 0-40 17.9-40 40s17.9 40 40 40l142 0.1h0.2c49.1 0 97.6-12.9 140.2-37.3 42.7-24.4 78.3-59.8 103.2-102.2l22.4-38.3 22.4 38.3c24.8 42.4 60.5 77.8 103.2 102.2 33.1 18.9 69.6 30.9 107.3 35.4 3.8 1.2 7.8 1.8 11.9 1.8l15.9 0.1v55c0 11.8 14 17.9 22.7 10L914.2 725c5.9-5.5 5.9-14.7 0-20z" p-id="10061"></path></svg>
            <span>随机播放</span>
        </div>
    </div>
</template>

<script>
import {alterGlobalStore} from "../../assets/globalStore"
export default{
    data(){
        return{
            showTime:0,//隐藏时间记录器
            playModeBoxStyle:{

            },//播放模式盒子样式
            pattern:1,//播放模式
        }
    },
    methods:{
        /**
         * 用户单击选择了播放模式
         */
        select(text){
            this.pattern = text;
            alterGlobalStore('playMode',text,true)
        }
        ,
        //计算属性背景色
        bakColor(a){
            return a === this.pattern? {backgroundColor:'var(--adjacent-theme-colour)'}:{}
        }
    },
    props:{
        playModeSelect:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        playModeSelect(newValue){
            if(newValue){
                //显示
                if(this.showTime){
                    clearTimeout(this.showTime)
                }
                this.playModeBoxStyle.display = 'flex';
                setTimeout(()=>{
                    this.playModeBoxStyle.opacity = 1;
                    this.playModeBoxStyle.borderRadius = '15px 0px 15px 0px'
                })
                

            }else{
                //隐藏
                this.playModeBoxStyle.opacity = 0;
                this.playModeBoxStyle.borderRadius = '0px 15px 0px 15px'
                this.showTime = setTimeout(()=>{
                    this.playModeBoxStyle.display = 'none';
                    this.showTime = 0
                },300)
            }
        }
    },
}

</script>

<style scoped>
.playModeBox{
    opacity: 0;
    z-index: 90;
    width: 70px;
    height: 150px;
    border-radius: 15px 0px 15px 0px;
    background-color: var(--oppositeAdjacent-theme-colour);
    box-shadow: 0px 0px 3px 1px var(--adjacent-theme-colour);
    position: absolute;
    display: none;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;
    transition: border-radius 0.5s,opacity 0.3s;
}

.playModeBox >div{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-evenly;
}

.playModeBox >div:hover{
    background-color: var(--adjacent-theme-colour-d);
}



.playModeBox >div>svg{
    width: 18px;
    height: 18px;
    fill: var(--theme-colour);
}

.playModeBox >div>span{
    color: var(--theme-colour);
    font-size: 10px;
    font-weight: bold;
}


</style>