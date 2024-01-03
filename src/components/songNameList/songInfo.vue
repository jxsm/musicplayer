<template>
    <div class="infoBox" ref="infoBox">
        <div class="info">
            <p>{{c}}</p>
            <p>未知</p>
            <p>未知</p>
            <p>未知</p>
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
        c:{
            type:Number,
            default:0
        },
        songHeight:{
            type:Number,
            default:50
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
    }
}
</script>

<style scoped>
.infoBox{
    transition:height 0.3s ;
    margin-top: 10px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
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
</style>