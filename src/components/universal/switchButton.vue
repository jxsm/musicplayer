
<template>
    <!--开关组件-->
    <div class="border" @click="$emit('beClick')" >
        <div class="round" :style="setRoundStyle(isOn)">

        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            
        }
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
        isOn:{
            typeof:Boolean,
            default:false
        }
    },
    methods:{
        setRoundStyle(){
            const width = Number(this.width.split("px")[0])
            const height =Number(this.height.split("px")[0] )
            if(this.isOn){
                return {transform:`translateX(${width-height}px)`}
            }
            else{
                return {transform:`translateX(0)`}
            }

        }
    },
    computed:{

    },
    mounted(){
    }
}

</script>

<style scoped>
.border{
    width: v-bind(width);
    height: v-bind(height);
    border-radius: 30px;
    background-color: var(--adjacent-theme-colour);
    border: 2px solid var(--opposite-theme-colour);
}

.round{
    width: v-bind(height);
    height: v-bind(height);
    border-radius: 30px;
    background-color: var(--theme-colour);
    transition:transform 0.5s ;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
}
</style>