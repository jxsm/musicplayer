<template>
<!--文件列表-->
<div :style="boxStyle" class="mainBox">
    <div class="fillText" v-for="(item,index) in files" :key="index" >
        <div>{{item.path}}</div>
        <img src="../assets/trash.svg" alt="删除" @click="del(item.path)" >
    </div>
    
</div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        del(filePath){
            this.$emit('del',filePath)
        }
    },
    mounted(){
        
    },
    computed:{
        //查询
        boxStyle(){
            return{
                width:this.width,
                height:this.height,
                backgroundColor:this.backgroundColor
            }
        },
    },
    props:{
        width:{
            type:String,
            default:'0px'
        },
        height:{
            type:String,
            default:'0px'
        },
        backgroundColor:{
            type:String,
            default:'#000'
        },
        files:{
            type:Array,
            default:()=>{return []},
        }
        
    }
}
</script>
<style scoped>
.mainBox{
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
   
}

.fillText{
    margin-top: 10px;
    border-radius: 15px 0px  15px;
    width: 85%;
    height: 30px;
    background-color: #595656;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.fillText div{
    color: #b8a9a9;
    float: left;
    margin-left: 30px;
    width: 85%;
    overflow: hidden;
    white-space:nowrap;
}

</style>