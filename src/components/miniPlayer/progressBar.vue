<template>
    <!--这个是进度条组件-->
    <div class="progressBarBox">
        <div class="progressBar"></div>
    </div>
</template>

<script>

</script>

<style scoped>
.progressBarBox{
    width: 100%;
    height: 7px;
    position: absolute;
    background-color: var(--oppositeAdjacent-theme-colour);
    bottom: 0px;
    z-index: 10;
    transition: height 0.3s;
}

.progressBar{
    width: 30%;
    height: 100%;
    background-color: var(--opposite-theme-colour);
}

.progressBarBox:hover{
    height:15px;
}


</style>