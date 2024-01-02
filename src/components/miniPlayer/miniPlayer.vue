<template>
    <div class="waiBox">
        <div class="mainBox">
            <div class="upBox" ref="upBox">
                <div class="songCover">

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
         * 窗口大小改变时触发
         * TODO:监听元素的大小,当元素的大小不适合使用小播放器展示的时候发送隐藏小播放器事件
         */
        resizeFn(){
            const upBoxWidth =  this.$refs.upBox.offsetWidth
            const upBoxHeight =  this.$refs.upBox.offsetHeight
            //取最小值
            const min = upBoxWidth>upBoxHeight?upBoxHeight:upBoxWidth
            //设置公共变量到upBoxWidth上
            this.$refs.upBox.style.setProperty('--minWidth',min-20+'px')
        }

    },
    mounted(){
        //监听页面大小改变事件
        this.resizeFn()
        window.addEventListener('resize',this.resizeFn)
    }
}

</script>

<style scoped>
.waiBox{
    position: absolute;
    width: 33%;
    height: 96%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mainBox{
    width: 90%;
    height: 90%;
    background-color: var(--oppositeAdjacent-theme-colour);
    border-radius: 45px;
    transition: box-shadow 0.5s;
    box-shadow: inset 0px 0px 50px 0px var(--theme-colour);
}

.upBox{
    width: 100%;
    height: 40%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.songCover{
    width: var(--minWidth);
    height: var(--minWidth);
    border-radius: 100%;
    background-color: black;
}
</style>