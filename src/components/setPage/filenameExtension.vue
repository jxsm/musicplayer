<template>
    <div class="frameBox">
        <textarea spellcheck="false" :value="textareaValue" @input="updateInfo"></textarea>
    </div>
</template>

<script>
import globalSet from "../../assets/globalSet"
export default {
    data(){
        return{
            readFileType:[],
            updateTime:0
        }
    },
    mounted(){
        //TODO:需要读取设置信息来获取读取的格式
        this.readFileType = globalSet.getKey('readFileType')
    },
    methods:{
        /**
         * 当用户更改文本框中的值时，调用此方法
         * @param {*} value 
         */
        updateInfo(value){
            if(this.updateTime){
                clearTimeout(this.updateTime)
            }

            this.updateTime = setTimeout(()=>{
                let data = value.target.value.replace(/，/g,',')//向将逗号替换为英文逗号
                data = data.split(',')
                data = data.map(item=>item.trim())//去除前后空格
                data = data.filter(item=>item!='')//去除空字符串
                data = data.map(item=>item.toLowerCase())//转换为小写
                globalSet.update('readFileType',[...new Set(data)],false)
            },500)
        }
    },
    computed:{
        //计算属性
       textareaValue(){
            return this.readFileType.join(',')
       },
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