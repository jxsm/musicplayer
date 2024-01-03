<template>
<!--调节音量组件-->
<div class="adjustBox">
    <div class="strip">
        <div class="controlStrip">

        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        isShow(newValue){
            if(newValue){
                void 0
            }
            else{
                void 0
            }
        }
    }
}
</script>

<style scoped>
.adjustBox{
    left: 100px;
    z-index: 90;
    position: absolute;
    width: 40px;
    height: 100px;
    background-color: var(--oppositeAdjacent-theme-colour);
    border-radius: 10px;
    box-shadow: 0px 0px 3px 1px var(--adjacent-theme-colour);
    display: flex;
    align-items: center;
    justify-content: center;
}

.strip{
    position: absolute;
    width: 6px;
    height: 90%;
    background-color: var(--adjacent-theme-colour-d);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.controlStrip{
    width: 100%;
    height: 30%;
    background-color: var(--adjacent-theme-colour);
    border-radius: 10px;
}
.controlStrip::before{
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: -2px;
    background-color:var(--adjacent-theme-colour) ;
}
</style>