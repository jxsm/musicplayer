<template>
    <div class="themeSetting">
        <div class="subjectColor">
            <p class="autoColorText">{{ autoColor?"自动主题色已启用":"自动主题色已关闭" }}</p>
            <switchButton width="60px" height="20px" :isOn="autoColor" @beClick="alterAutoColorSet"></switchButton>
            

            <pick-colors :size="150" :value="themeColor" class="showSubjectColor" :z-index="99992" @change="setThemeColor" title="点击设置颜色">

            </pick-colors>
        </div>
        <div class="showColor" ref="showColor">
     


            <pick-colors class="pickColorsStyle" v-for="(item,index) in colorList" :z-index="99992" :key="index"
            :size="80" :value="colorRecord[item]"  @change="(e)=>{setDColor(e,item)}" title="点击设置颜色">
        
            </pick-colors>

        </div>
        
    </div>
    
</template>

<script>
import switchButton from "../universal/switchButton.vue"
import globalSet from "../../assets/globalSet"
import proceedHint from "../../js/render/proceedHint"
import PickColors from 'vue-pick-colors'

export default{
    data(){
        return{
            colorList:[
                '--opposite-theme-colour',
                '--adjacent-theme-colour',
                '--adjacent-HighBrightness-colour',
                '--adjacentColour-theme-two',
                '--adjacent-theme-colour-d',
                '--oppositeAdjacent-theme-colour'
            ],
            autoColor:false,
            colorRecord:{},
            themeColor:'',//主题色
        }
    },
    components:{
        switchButton,
        PickColors,
    },
    mounted(){
        // this.setShowColorDiv()

        this.getGlobaValue()
        this.lodeColorRecord()
    },
    methods:{
        getGlobaValue(){
            this.autoColor = Boolean(globalSet.getKey('autoColor'))
        },
        /**
         * 更改设置
         */
        alterAutoColorSet(){
            this.autoColor = !this.autoColor
            if(this.autoColor) proceedHint.proceedHint.warn("在切换歌曲后生效")
            globalSet.update('autoColor',this.autoColor,false)
        },
        /**
         * 设置主题颜色
         * @param {Sting} color 颜色的名称
         * @param {String} name 颜色的名称
         */
        setDColor(color,name){
            if(this.autoColor){
                proceedHint.MinWindowHint.hint("自动主题启用中,无法设置",2000)
                return
            }
            this.colorRecord[name] = color
            document.documentElement.style.setProperty(name,color)
        },
        /**
         * 获取主题色的值
         * @param {String} name 主题色颜色的名称
         */
        getColorListValue(name){
            return document.documentElement.style.getPropertyValue(name)
        },
        lodeColorRecord(){
            this.colorList.forEach((i)=>{
                this.colorRecord[i] = this.getColorListValue(i)  
            })

            this.themeColor = this.getColorListValue('--theme-colour')

        },
        /**
         * 设置主题色
         * @param {String} color 颜色
         */
        setThemeColor(color){
            if(this.autoColor){
                proceedHint.MinWindowHint.hint("自动主题启用中,无法设置",2000)
                return
            }
            this.themeColor = color
            document.documentElement.style.setProperty('--theme-colour',color)
        }

    }
}

</script>

<style scoped>
.themeSetting{
    width: 80%;
    height: 300px;
    border: 1px solid red;
    display: grid;
    grid-template-columns:1fr 3fr;
}

.subjectColor{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid rgb(25, 218, 160);
}

.showColor{
    border: 1px solid royalblue;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(2,1fr);
    gap: 10px;
    justify-items: center;
    align-items: center;
}








.showSubjectColor{
    border: 4px solid rgb(255, 255, 255);
    border-radius: 15px;
    margin-top: 30px;
    display: flex;
    cursor: pointer;
}

.autoColorText{
    font-weight: bold;
    color: var(--theme-colour);
}


.pickColorsStyle{
    border: 4px solid white;
    border-radius: 10px;
    cursor: pointer;
}


</style>