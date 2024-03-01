<template>
    <div class="waiBox" ref="miniPlayerWaiBox" :style="miniPlayerWaiBoxStyle" >
        <div class="mainBox">
            <div class="upBox" ref="upBox" :style="upBoxStyle" >
                <div class="songCover">

                </div>
               

            </div>
            <div class="musicInfo">
                <!--歌词和歌曲信息的区域-->
            </div>
            <div class="musicControl">
                <!--歌曲控件-->
                <!--TODO:添加播放控件-->
                <playMode :playModeSelect = "true"> </playMode>
            </div>
        </div>
    </div>
</template>

<script>
import playMode from "./playMode.vue"
export default{
    data(){
        return{
            miniPlayerWaiBoxStyle :{},//miniPlayerWaiBox的样式
            upBoxStyle :{}//upBox的样式
        }
    },
    methods:{
        /**
         * 窗口大小改变时触发
         * TODO:监听元素的大小,当元素的大小不适合使用小播放器展示的时候发送隐藏小播放器事件
         */
        resizeFn(){
            const upBoxWidth =  this.$refs.upBox.offsetWidth
            const upBoxHeight =  this.$refs.upBox.offsetHeight
            //根据元素的大小判断看需不需要隐藏小播放器
            if(this.showMiniPlayer && (upBoxWidth<330 || upBoxHeight<230)){
                this.$emit('hideSmallPlayer',false)
            }
            else if(!this.showMiniPlayer && upBoxWidth>=330 && upBoxHeight>=230){
                this.$emit('hideSmallPlayer',true)
            }   
            //取最小值
            const min = upBoxWidth>upBoxHeight?upBoxHeight:upBoxWidth
            //设置公共变量到upBoxWidth上
            this.upBoxStyle["--minWidth"] = (min-20+'px')
        },
      

    },
    mounted(){
        //监听页面大小改变事件
        this.resizeFn()
        window.addEventListener('resize',this.resizeFn)
    },
    props:{
        showMiniPlayer:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        showMiniPlayer(newValue){
            if(newValue){
                this.miniPlayerWaiBoxStyle.opacity = 1
            }
            else{
                this.miniPlayerWaiBoxStyle.opacity = 0
            }
        }
    },
    components:{
        playMode
    }
        
}

</script>

<style scoped>
.waiBox{
    opacity: 1;
    position: absolute;
    width: 34%;
    height: 96%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    transition:opacity 0.3s ;
}

.mainBox{
    width: 90%;
    height: 90%;
    background-color: var(--oppositeAdjacent-theme-colour);
    border-radius: 45px;
    transition: box-shadow 0.5s;
    box-shadow: inset 0px 0px 50px 0px var(--theme-colour);
    overflow: hidden;
}

.upBox{
    width: 100%;
    height: 40%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.songCover{
    width: var(--minWidth);
    height: var(--minWidth);
    border-radius: 100%;
    background-color: black;
}

.musicInfo{
    width: 100%;
    height: 50%;
    border: 2px solid rgb(16, 210, 197);
}

.musicControl{
    width: 100%;
    height: 8.8%;
    border: 2px solid rgb(39, 246, 16);
}
</style>