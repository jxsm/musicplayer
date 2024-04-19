<template>
    <div class="borderBox">

    </div>
</template>

<script>
import localForage from "localforage"
export default {
    data(){
        return{
            lyric:{}
        }
    },
    mounted(){
        window.addEventListener('setItemEvent',this.dataChange)



        window.ipcRenderer.on('ipcLyric',(e,data)=>{
            void e
            console.log(data)
            if(data.status == 'ok'){
                localForage.getItem('lyric')
                .then(res =>{
                    const info = res || {}
                    info[data.path] = {
                        "lyric":data.lyric,
                        "name":data.name
                    }
                    localForage.setItem('lyric',info)
                    this.lyric = data.lyric
                    console.log(this.lyric)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            else{
                console.error(data.message)
            }
        })

    },
    methods:{
        /**
         * 监听数据发生变化
         * @param {*} e 
         */
        dataChange(e){
            switch(e.key){
                case 'MusicManagement_info':
                    //当换歌的时候触发
                    this.musicManagement_info(e)
                break;
            }
        },
        /**
         * 通知主线程去获取歌词
         * @param {string} name 歌曲名 
         * @param {string} path 歌曲路径
         * @param {string} [handle="auto"] 处理模式,默认处理默认为从网易云获取
         */
        sendLyric(name,path,handle){
            //先在本地查
            localForage.getItem('lyric')
            .then(res=>{
                if(res && res[path] && res[path].name == name){
                    this.lyric = res[path]
                }else{
                    handle = handle || 'auto'
                    const data = {
                        name,
                        path,
                        handle
                    }
                    //获取歌词
                    console.log(data)
                    window.ipcRenderer.send('ipcLyric',data)
                    }
            })
            .catch(err=>{
                console.log(err)
            })


           
        },
        musicManagement_info(e){
            const data =  JSON.parse(e.newValue)
            this.sendLyric(data.nowMusicName,data.nowMusicUri,data.lyricHandle)
        }
    }
}
</script>

<style scoped>
.borderBox{
    border: 1px solid red;
    width: 100%;
    height: 100%;
    
}
</style>