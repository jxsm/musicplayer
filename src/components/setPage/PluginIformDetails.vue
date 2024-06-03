<template>
    <div class="outerLayer">
        <div class="pluginIform">
            <svg data-v-34e53e54="" t="1703493087916" class="closeSet" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="200" height="200"><path data-v-34e53e54="" d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="" p-id="5099"></path></svg>
        </div>
    </div>
</template>

<script>
//插件信息详情
export default {
    props:{
        info:{
            typeof:Object,
            default:()=>{}
        }
    }
}
</script>

<style scoped>
.outerLayer{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    background-color: rgba(188, 188, 189, 0.394);
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.pluginIform{
    position: absolute;
    width: 80%;
    height: 80%;
    background-color: var(--adjacentColour-theme-two);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 10px 10px 10px 0px var(--adjacent-HighBrightness-colour) ;
}


.pluginIform svg{
    position: absolute;
    right: 10px;
}
</style>