<template>
    <Transition>
        <div class="mainBox">
            <form class="contentBox" @submit="userInput" >
                <p>请输入主题色名</p>
                <input @input="(e)=>{themeName = e.target.value}"/>
                <div class="buttonStyle">
                    <button name="verify">确定</button>
                    <button name="cancel">取消</button>
                </div>
            </form>

        </div>
    </Transition>
</template>

<script>
import {proceedHint} from "../../../public/static/proceedHint"
export default {
    data(){
        return{
            themeName:""
        }
    },
    mounted(){
        document.body.appendChild(this.$el);
    },
    methods:{
        userInput(event){
            //阻止默认事件
            event.preventDefault()
            if(event.submitter.name === "verify"){
                if(this.trimAll(this.themeName) === ""){
                    proceedHint.warning("主题色名不能为空")
                    return
                }
                //执行操作
                this.verifyFunc(this.themeName)
                this.$emit("verify",this.themeName)
            }
            else if(event.submitter.name === "cancel"){
                this.$emit("cancel")
            }
        },
        /**
         * 去除空白字符
         * @param {string} ele 
         */
        trimAll(ele){
            if(typeof ele === 'string'){
                return ele.split(/[\t\r\f\n\s]*/g).join('');
            }else
            {
                console.error(`${typeof ele} is not the expected type, but the string type is expected`)
            }
        }
    },
    props:{
        verifyFunc:{
            type:Function,
            default:()=>{}
        }
    }
}
</script>

<style scoped>
.mainBox{
    width: 100%;
    height: 100%;
    background-color: #33333343;
    z-index: 99999;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--adjacentColour-theme-two);
}

.contentBox{
    width: 40%;
    height: 20%;
    background-color: var(--adjacent-HighBrightness-colour);
    border-radius: 5px;
}

input{
    width: 80%;
    height: 30%;
    border: none;
    outline: none;
    background-color: var(--adjacent-theme-colour);
    color: var(--oppositeAdjacent-theme-colour);
    font-size: 18px;
    padding-left: 10px;
    border-radius: 5px;
    font-weight: bold;
}

.buttonStyle{
    width: 80%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.buttonStyle button:first-child{
    margin-right: 10px;
}

button{
    width: 100px;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    }
</style>