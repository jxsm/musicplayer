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
            <div @click="savePresuppose">将当前颜色保存为预设</div>
            <div>导入预设</div>
            <div @click="exportPresuppose">将当前颜色导出为预设</div>
        </div>
    </div>

    <inputThemeName v-if="showInputThemeName" @cancel="showInputThemeName = false" :verify-func="verifyFunc">
    </inputThemeName>

</template>

<script>
import globalSet from "../../assets/globalSet"
import proceedHint from "../../js/render/proceedHint"
import {getGlobalStore} from "../../assets/globalStore"
import inputThemeName from "./inputThemeName.vue"
import ThemeColors from "../../js/ThemeColors"

export default{
    data(){
        return{
            presuppose:{
                "阳光沙滩海":['#674EC3','#ACAEDE','#ED5D14','rgb(147, 255, 142)','rgb(204, 201, 132)','rgba(147,255,142,0.5)','#EFCF58'],
                "深邃黑":['#292929','#8C8C8C','#979797','#292929','#A49898','#868686','#585858'],
                "明媚黄粉":['#F684C7','#EF15B9','#28E2AE','#7179FF','#AFE3E9','#A9A1F9','#F9EAA3'],
                "淡黄粉底":['rgb(241, 237, 245)','rgb(160, 163, 155)','rgb(163, 157, 161)','rgb(255, 246, 251)','rgb(201, 198, 204)','rgba(255,246,251,0.5)','rgb(230, 221, 226)'],
            },
            //主题色名列表,可通过公共变量进行修改(影响到全局,注意修改)[对主题文件的读取有较大影响]
            colorList:[
            ],
            showInputThemeName:false,
            verifyFunc:()=>{}
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
        },
        /**
         * 将文件中的预设主题设置到界面中
         */
        setThemeFileContent(event,data){
            void event
            let reckoning = 0
            //先遍历,将数据全部转为json
            for(let i in data){
                
                reckoning +=1
                const INFO = JSON.parse(data[i])
                if(!INFO.color) return;
                let name = INFO.name ? INFO.name:reckoning.toString()
                if(Array.isArray(INFO.color)){
                    this.presuppose[name] = INFO.color
                }
                else{
                    let colors = []
                    for(let j in this.colorList){
                        colors[j] = INFO.color[this.colorList[j]] ?INFO.color[this.colorList[j]] : "#FFFFFF"
                        this.presuppose[name] = colors
                    }
                }
                
            }
        },
        /**
         * 保存当前颜色为预设主题到文件中
         * 和exportPresuppose方法不同,该方法会将预设主题保存到主题文件夹下而不是用户指定位置
         */
        savePresuppose(){
            this.showInputThemeName = true
        },
        /**
         * 将当前主题导出成文件
         * 和savePresuppose方法不同,该方法会将主题导出到用户指定位置而不是主题文件夹
         */
        exportPresuppose(){
            this.verifyFunc = this.exportPresupposeRealize
            this.showInputThemeName = true
        },
        /**
         * 实现主题文件的导出
         * @param {string} name 
         */
        exportPresupposeRealize(name){
            const THEMEOBJ =  this.constructThemeObj(name)
            const THEMSSTR = JSON.stringify(THEMEOBJ)
            //创建一个文件对象让用户保存
            let file = new File([THEMSSTR],name+".json",{type:"application/json"})
            let a = document.createElement("a")
            a.href = URL.createObjectURL(file)
            a.download = name+".json"
            a.click()
            proceedHint.MinWindowHint.hint("导出成功")
        },
        /**
         * 构建主题对象
         * @param {String} name 
         */
        constructThemeObj(name){
            let colorTheme = {
                name:name,
                color:{}
            }

            let ThemeObj =  ThemeColors.getAll()
            //获取当前的主题色

            for(let i in ThemeObj){
                colorTheme.color[i] = ThemeObj[i]
            }

            console.log(colorTheme)

            return colorTheme
        }
    },
    mounted(){
        this.colorList = getGlobalStore("themeColorName")
        //去获取主题文件夹下文件中的内容
        window.ipcRenderer.send('getThemeFileContent',1)
        //TODO: 获取主题文件中的内容
        window.ipcRenderer.on('ThemeFileContent',this.setThemeFileContent)
    },
    //在被卸载前先清除监听事件
    beforeUnmount(){
        window.ipcRenderer.removeListener('ThemeFileContent',this.setThemeFileContent)
    },
    components:{
        inputThemeName
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