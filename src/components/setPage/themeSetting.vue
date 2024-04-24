<template>
    <div class="themeSetting">
        <div class="subjectColor">
            <p class="autoColorText">{{ autoColor?"自动主题色已启用":"自动主题色已关闭" }}</p>
            <switchButton width="60px" height="20px" :isOn="autoColor" @beClick="alterAutoColorSet"></switchButton>
            <div class="showSubjectColor" title="点击调整主特色">

            </div>
        </div>
        <div class="showColor" ref="showColor">
            <div title="点击设置颜色"></div>
            <div title="点击设置颜色"></div>
            <div title="点击设置颜色"></div>
            <div title="点击设置颜色"></div>
            <div title="点击设置颜色"></div>
            <div title="点击设置颜色"></div>
        </div>
    </div>
</template>

<script>
import switchButton from "../universal/switchButton.vue"
import globalSet from "../../assets/globalSet"
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
        }
    },
    components:{
        switchButton,
    },
    mounted(){
        this.setShowColorDiv()

        this.getGlobaValue()

    },
    methods:{
        setShowColorDiv(){
            const divList =  this.$refs.showColor.querySelectorAll("div")
            for(let i = 0;i<this.colorList.length;i++){
                divList[i].style.backgroundColor = `var(${this.colorList[i]})`
            }

        },
        getGlobaValue(){
            this.autoColor = Boolean(globalSet.getKey('autoColor'))
        },
        /**
         * 更改设置
         */
        alterAutoColorSet(){
            this.autoColor = !this.autoColor
            globalSet.update('autoColor',this.autoColor,false)
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

.showColor div{
    border: 4px solid rgb(255, 255, 255);
    width: 6rem;
    height: 6rem;
    border-radius: 15px;
}





.showSubjectColor{
border: 4px solid rgb(255, 255, 255);
    border-radius: 15px;
    margin-top: 30px;
    display: flex;
    width: 10rem;
    height: 10rem;
    background-color: var(--theme-colour);
    
}

.autoColorText{
    font-weight: bold;
    color: var(--theme-colour);
}


</style>