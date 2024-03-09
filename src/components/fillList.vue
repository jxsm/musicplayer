<template>
<!--文件列表-->
<div :style="boxStyle" class="mainBox">
    <div class="fillText" v-for="(item,index) in files" :key="index" >
        <div>{{item.path}}</div>
        <svg @click="$emit('del',item.path)" t="1703577149845" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5308" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M256 298.666667h512v554.666666H256V298.666667z m85.333333 85.333333v384h341.333334V384H341.333333z m42.666667 85.333333h85.333333v213.333334H384v-213.333334z m170.666667 0h85.333333v213.333334h-85.333333v-213.333334zM213.333333 298.666667h597.333334v85.333333H213.333333V298.666667z m170.666667-128h256v85.333333H384V170.666667z" p-id="5309"></path></svg>
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
    background-color: var(--opposite-theme-colour);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.fillText div{
    color: var(--theme-colour);
    font-weight: bold;
    float: left;
    margin-left: 30px;
    width: 85%;
    overflow: hidden;
    white-space:nowrap;
}
.fillText svg{
    fill: var(--theme-colour);
}


</style>