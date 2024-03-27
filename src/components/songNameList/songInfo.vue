<template>
    <!--TODO:音乐基础信息展示-->
    <div class="infoBox" ref="infoBox"  :style="infoBoxStyle" @dblclick="clickedOn" draggable="false">
        <div class="info">
            <p class="songNameInfo" :title="musicalName">{{musicalName}}</p>
            <p :title="singer">{{singer}}</p>
            <p :title="collection">{{collection}}</p>
            <p :title="timeDuration">{{timeDuration}}</p>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            infoBoxStyle:{},//信息盒子样式
            clickedOnTime:0,//点击时间的记录,避免重复点击
        }
    },
    props:{
        infos:{
        },
        songHeight:{
            type:Number,
            default:50
        },
        sequence:{
            type:Number,
            default:0
        }
    },
    watch:{
        /**
         * 父组件可动态更改该组件元素的高度
         * @param {Number} newValue 
         */
        songHeight(newValue){
            this.infoBoxStyle.height = newValue + "px";
        }

    },
    mounted(){
        setTimeout(()=>{
            this.infoBoxStyle.left = "0px"
            this.infoBoxStyle.opacity = 1
        },this.sequence*10)


    },
    computed:{
        //音乐名称
        musicalName(){
            return this.infos.infos.title || this.infos.name || "未知";
        },
        //歌手
        singer(){
            let singers = this.infos.infos.artists;

            if(singers){
                return singers.join("/");
            }
            else{
                return "未知";
            }
        },
        //专辑
        collection(){
            return this.infos.infos.album || "未知";
        },
        //时间
        timeDuration(){
            const duration = this.infos.infos.timeDuration;
            if(duration){
                return this.formatTime(duration);
            }
            else{
                return "未知";
            }
        }
    },
    methods:{
        /**
         * 计算歌曲时间
         * @param {flaot} seconds  歌曲时间
         */
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${Math.round(remainingSeconds).toString().padStart(2, '0')}`;
        },
        /**
         * 当元素被点击时触发，用于开始播放流程
         */
        clickedOn(){
            //console.log(this.infos.path)
           
            const nowTime = Date.now()
            if((nowTime - this.clickedOnTime) > 500  ){
                this.$emit("clickedOn",this.infos)
            }
        }
    }
}
</script>

<style scoped>
.infoBox{
    font-size: 12px;
    position: relative;
    transition:height 0.3s ;
    margin-top: 10px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    left: 500px;
    opacity: 0;
    transition: left 1s , opacity 1s;
}

.info{
    width: 100%;
    height: 100%;
    background-color: var(--oppositeAdjacent-theme-colour);
    border-radius: 5px 0px 90px 5px;
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.info p{
    width: 21%;
    margin-left: 2%;
    margin-right: 2%;
    text-align: center;  
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--adjacent-theme-colour);
    user-select:none;
}

.info p:nth-child(1){
    width: 30%;
}
</style>