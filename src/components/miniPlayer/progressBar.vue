<template>
    <!--这个是进度条组件-->
    <div class="progressBarBox">
        <div class="progressBar" :style="progressBarStyle"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            progressBarStyle:{
                width: '0%',
            }
        }
    },
    methods:{

    },
    mounted(){
        addEventListener('setItemEvent',(e)=>{
            if(e.key === 'music_play_info'){
                const newValue = JSON.parse(e.newValue)
                this.progressBarStyle.width = `${(newValue.nowTime/newValue.endTime)*100}%`
            }
        }
        )
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