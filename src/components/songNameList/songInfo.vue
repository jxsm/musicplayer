<template>
    <div class="infoBox" ref="infoBox" :style="`left:${tempLeft};opacity:${tempOpacity}`">
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
            tempLeft:'500px',
            tempOpacity:0
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
            this.$refs.infoBox.style.height = newValue + "px";
        }

    },
    mounted(){
        setTimeout(()=>{
            this.tempLeft = '0px';
            this.tempOpacity = 1
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
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${Math.round(remainingSeconds).toString().padStart(2, '0')}`;
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
}

.info p:nth-child(1){
    width: 30%;
}
</style>