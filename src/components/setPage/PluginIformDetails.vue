<template>
    <div class="outerLayer">
        <div class="pluginIform">
            <div class="imgBox">
                <img :src="imageSrc" v-if="imageSrc!=void 0">
            </div>
            <div class="shielding">

            </div>
            <svg data-v-34e53e54="" t="1703493087916" class="closeSet" @click="$emit('close')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5098" width="200" height="200"><path data-v-34e53e54="" d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="" p-id="5099"></path></svg>
            <div class="infoBox">
                <h2>{{title}}</h2>
                <p>版本:{{version}}</p>
                <p @click="openUserHomepage">作者:{{author}}</p>
                <div class="description">
                    {{description}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { shell } from 'electron'

//插件信息详情
export default {
    data(){
        return{
            pluginRotate:90,
            displayStyle:false,
            get pluginRotateY(){
                return this.pluginRotate +"deg"
            },
            get pluginRotateX(){
                return this.pluginRotate ==0?"0deg" : (this.pluginRotate - 45) +"deg"
            },
            get thisDisplay(){
                return this.displayStyle?"flex":"none"
            },
            title:"",
            version:"0.0.0",
            author:"未知",
            description:"",
            imageSrc:""
            
        }
    },
    methods:{
        /**
         * 关闭
         */
        closeSet(){
            this.manage(()=>{
                this.pluginRotate = 90
            },300,()=>{
                this.displayStyle = false
            })()
        },
        /**
         * 显示
         */
        showSet(){
            this.manage(()=>{
                console.log(this.infos)
                this.title = this.infos["plugin"]["name"]
                this.version = this.infos["plugin"]["version"]
                this.author = this.infos["plugin"]["author"]
                this.description = this.infos["plugin"]["description"]
                this.setImg();
                this.displayStyle = true
                setTimeout(()=>{
                    this.pluginRotate = 0
                },0)
            },300)()
        },
        /**
         * 
         * @param {Function} fn  该函数会立即执行
         * @param {Number} Rotate 该函数执行后，等待Rotate时间后，执行fn2
         * @param {Function} fn2 该函数会在Rotate时间后执行
         * @returns {Function} 返回一个函数，该函数可以控制fn和fn2的执行
         */
        manage(fn,Rotate,fn2){
            let timer = null
            return function(){
                if(timer){
                    return
                }
                if(fn) fn.apply(this,arguments)
                timer = setTimeout(()=>{
                    if(fn2) fn2.apply(this,arguments)
                    timer = null
                },Rotate)
            }
        },
        openUserHomepage(){
            const url = this.infos["plugin"]["homepage"]
            if(url){
                shell.openExternal(url)
            }
        },
        setImg(){
            if(this.infos['logo']){
                this.imageSrc = "data:image/png;base64,"+this.infos['logo']
            }
            else{
                this.imageSrc = void 0
            }
            
        }

    },
    props:{
        isShow:{
            type:Boolean,
            default:false
        },
        infos:{
            type:Object,
            default:()=>{
                return {
                    plugin:{
                        name:"标题"
                    }
                }
            }
        },
    },
    watch:{
        isShow(val){
            if(val){
                this.showSet()
            }else{
                this.closeSet()
            }
        }
    }
}
</script>

<style scoped>
.outerLayer{
    display: v-bind(thisDisplay);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    background-color: rgba(188, 188, 189, 0.394);
    justify-content: center;
    align-items: center;
}

.pluginIform{
    overflow: hidden;
    transition: all 0.3s;
    transform: rotateY(v-bind(pluginRotateY)) rotateX(v-bind(pluginRotateX));
    position: absolute;
    width: 80%;
    height: 80%;
    background-color: var(--adjacentColour-theme-two);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 10px 10px 10px 0px var(--adjacent-HighBrightness-colour) ;
}


.pluginIform svg{
    position: absolute;
    right: 10px;
    
}

.infoBox{
    position: absolute;
    z-index: 10;
    color: var(--adjacent-theme-colour);
    display: flex;
    border: 1px solid red;
    width: 90%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.infoBox h1{
    margin: 0;
    padding: 0;
}

.infoBox p {
    margin-top: 2px;
    margin: 0;
}

.description{
    width: 100%;
    height: 60%;
    border: 1px solid rebeccapurple;
    position: relative;
    top: 30px;
    overflow: scroll;
}

.imgBox{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}

.imgBox img{
    opacity: 0.2;
    width: 100%;
}

.shielding{
    z-index: 2;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top,var(--oppositeAdjacent-theme-colour) 30%, rgba(255, 0, 0, 0));
}

</style>