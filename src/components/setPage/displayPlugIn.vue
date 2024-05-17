<template>
    <div class="displayPlugIn">
        <plugInInfo v-for="(item,index) in 10" :key="index" :name="item" >

        </plugInInfo>
      
    </div>
</template>
<script>
    //展示插件
    import plugInInfo from "./plugInInfo.vue"
    export default{
        data(){
            return{

            }
        },
        methods:{
            
        },
        components:{
            plugInInfo
        }
    }
</script>
<style scoped>
.displayPlugIn{
    width: 100%;
    height: 92%;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;

}
</style>