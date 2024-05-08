<template>
    <div class="presupposeBox">
        <p>预设主题</p>
        <div class="contentBox">
            <div v-for="(item,key) in presuppose" :key="key" class="presuppose">
                <p>{{key}}</p>
                <div :style="`background-color:${item[0]};`" class="presupposeColor" @click="setColour(key)">
                </div>
            </div>
        </div>
        <div class="storeBox">
            <div>将当前颜色保存为预设</div>
            <div>导入预设</div>
            <div>将当前颜色导出为预设</div>
        </div>
    </div>
</template>

<script>
import globalSet from "../../assets/globalSet"
import proceedHint from "../../js/render/proceedHint"
export default{
    data(){
        return{
            presuppose:{
                "阳光沙滩海":['#674EC3','#ACAEDE','#ED5D14','rgb(147, 255, 142)','rgb(204, 201, 132)','rgba(147,255,142,0.5)','#EFCF58'],
                "深邃黑":['#292929','#8C8C8C','#979797','#292929','#A49898','#868686','#585858'],
                "明媚黄粉":['#F684C7','#EF15B9','#28E2AE','#7179FF','#AFE3E9','#A9A1F9','#F9EAA3'],
                "淡黄粉底":['rgb(241, 237, 245)','rgb(160, 163, 155)','rgb(163, 157, 161)','rgb(255, 246, 251)','rgb(201, 198, 204)','rgba(255,246,251,0.5)','rgb(230, 221, 226)'],
            },
            colorList:[
                '--theme-colour',
                '--opposite-theme-colour',
                '--adjacent-theme-colour',
                '--adjacent-HighBrightness-colour',
                '--adjacentColour-theme-two',
                '--adjacent-theme-colour-d',
                '--oppositeAdjacent-theme-colour'
            ]
        }
    },
    methods:{
        /**
         * 设置主题色
         * @param {String} name 主题色的名字如阳光沙滩海
         */
        setColour(name){
            if(globalSet.getKey('autoColor')){
                proceedHint.MinWindowHint.hint("请关闭自动主题色后再进行设置")
                return;
            }

            const color = this.presuppose[name]
            for(let i =0;i<this.colorList.length;i++){
                document.documentElement.style.setProperty(this.colorList[i],color[i])
            }
            proceedHint.MinWindowHint.hint("切换成功")
        }
    }
}
</script>

<style scoped>
.presupposeBox{
    display: flex;
    width: 80%;
    height: 300px;
    border: 1px solid red;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-weight: bold;
    color: var(--theme-colour);
}

.contentBox{
    overflow: scroll;
    width: 100%;
    height: 100%;
    border: 1px solid blue;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;;
    font-weight: bold;
    justify-items: center;
    align-items: center;
    text-align: center;
}

.presuppose{

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.presupposeColor{
    margin: 0;
    width: 100px;
    height: 100px;
    border: 4px solid white;
    border-radius: 4px;
    cursor: pointer;
}

.storeBox{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
}

.storeBox>div{
    background-color: var(--opposite-theme-colour);
    color:var(--theme-colour) ;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
}
</style>