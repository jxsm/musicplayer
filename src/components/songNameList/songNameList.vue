<template>
    <div class="waiBox">
        <div class="titleText">
            <p>曲名</p>
            <p>歌手</p>
            <p>专辑</p>
            <p>时长</p>
        </div>

        <songInfo v-for="(item,index) in 100" :key="index" :c="item"></songInfo>


    </div>
</template>
<script>
import songInfo from "./songInfo.vue"

export default {
    data(){
        return{

        }
    },
    methods:{

    },
    components:{
        songInfo
    }
}

</script>

<style scoped>
.waiBox{
    width: 60%;
    height: 94.6%;
    position: absolute;
    right: 2%;
    transition:background-color 0.5s ;
    overflow: scroll;
}

.titleText{
    background-color: var(--theme-colour);
    position: sticky;
    top: 0;
    width: 100%;
    height: 40px;
    font-weight: bold;
    display: flex;
    font-size: 1.3rem;
    justify-content: space-around;
    align-items: center;
    color: var(--opposite-theme-colour);
    box-shadow:  0px 0px 10px 1px var(--adjacent-theme-colour);
    
    
}

</style>