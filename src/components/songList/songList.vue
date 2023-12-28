<template>
    <div class="waiBox">
        <detailChunk></detailChunk>
    </div>
</template>
<script>
import detailChunk from "./detailChunk.vue"

export default{
    data(){
        return{

        }
    },
    components:{
        detailChunk
    },
    props:{
        isShow:{
            type:Boolean,
            default:false,
        },
    },
    watch:{
        //TODO:完善显示功能
        isShow(){
            if(this.isShow){
                //显示
                void 0
            }else{
                //不显示
                void 0 
            }
        }
    },
    methods:{

    }
}
</script>
<style scoped>
    .waiBox{
        position: absolute;
        width: 180px;
        height: 80%;
        background-color: #353535;
        border-radius: 0px 0px 10px 10px;
        box-shadow: 0px 2px 10px 0px #5f5f5f;
    }
</style>