<template>
    <!--这个是进度条组件-->
    <div class="progressBarBox">
        <div class="progressBar"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

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
    width: 30%;
    height: 100%;
    background-color: var(--adjacent-theme-colour);
}

.progressBarBox:hover{
    height:15px;
}


</style>