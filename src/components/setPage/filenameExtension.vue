<template>
    <div class="frameBox">
        <textarea>123</textarea>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        //TODO:需要读取设置信息来获取读取的格式
    }
}
</script>

<style scoped>
.frameBox{
    width: 100%;
    height: 300px;
    background-color: var(--adjacent-theme-colour);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.frameBox textarea{
    width: 96%;
    height: 96%;
    resize: none;
    background-color: rgba(255, 0, 0, 0);
    border: none;
    font-weight: bold;
    font-size: 16px;
    color: var(--theme-colour);
    outline:none;
}

</style>