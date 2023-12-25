<template>
    <div class="wai">
        <div class="app">
            <div class="main_box" ref="mainBox">
                <div class="topbox" >
                    <svg @click="$emit('goset')" t="1703493087916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="200" height="200"><path d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="" p-id="5099"></path></svg>
                </div>

                <!--主要的设置内容-->
                <div class="contentBox">
                    <!--添加音乐-->
                    <div class="addMusic">
                    </div>
                </div>
            </div>
            
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
        /**
         * 关闭设置页面的盒子
         */
        closeBox(){
            this.$refs.mainBox.style.transform = "rotateY(90deg)"
         }
    },
    mounted(){
        setTimeout(() =>{
            this.$refs.mainBox.style.transform = "rotateY(0deg)"
        })
    },
    props:{
        show:{
            type:Boolean,
        }
    },
    watch:{
        show(){
            if(this.show){
                this.closeBox()
            }
        }
    }
   
}
</script>

<style scoped>
@import url(../css/global_set.css);

</style>