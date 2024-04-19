<template>
    <div class="borderBox">
        <ul>
            <li v-for="(item,index) in lyric['lyric']" :key="index">{{item}}</li>
        </ul>
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


        setTimeout(()=>{
            this.storageExpiration()
        },3000)


        window.ipcRenderer.on('ipcLyric',(e,data)=>{
            void e
            if(data.status == 'ok'){
                localForage.getItem('lyric')
                .then(res =>{
                    const info = res || {}
                    info[data.path] = {
                        "lyric":data.lyric,
                        "name":data.name,
                        "time":Date.now()
                    }
                    localForage.setItem('lyric',info)

                    this.setLyric(data.lyric,data.name,data.path)
                    
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
                    this.setLyric(res[path]['lyric'],name,path)
                }else{
                    handle = handle || 'auto'
                    const data = {
                        name,
                        path,
                        handle
                    }
                    //获取歌词
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
        },
        /**
         * 便利歌词的本地存储,删除超过存储时间的歌词
         */
        storageExpiration(){
            localForage.getItem('lyric')
            .then(res=>{
                if(res){
                    const keys = Object.keys(res)
                    keys.forEach(key=>{
                        const info = res[key]
                        //删除超过5天的歌词
                        if(Date.now() - info.time > 5*24*60*60*1000){
                            delete res[key]
                        }
                    })
                    localForage.setItem('lyric',res)
                }
            })
            .catch(err=>{
                console.log(err)
            })  
        },
        /**
         * 设置歌词
         * @param {object} lyric 歌词对象
         * @param {string} name  歌曲名
         * @param {string} path 歌曲文件路径 
         */
        setLyric(lyric,name,path){
            console.log("设置歌词")
            let infos
                    try{
                        infos =  JSON.parse(localStorage.getItem('MusicManagement_info'))
                    }
                    catch{
                        this.lyric['lyric'] = {0:'暂无歌词'}
                        return
                    }

                    if(infos['nowMusicUri'] == path && infos['nowMusicName'] == name){
                        if(Object.keys(lyric).length == 0){
                            this.lyric['lyric'] = {0:'暂无歌词'}
                        }
                        else{
                            this.lyric['lyric'] = lyric
                        }
                    }
        }
    }
}
</script>

<style scoped>
.borderBox{
    border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

}

.borderBox li{
    list-style: none;
    color: var(--adjacent-HighBrightness-colour);
    font-weight: bold;
    margin-bottom: 20px;
}

.borderBox ul{
    padding: 0;
}
</style>