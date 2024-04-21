<template>
    <div class="borderBox" ref="borderBox">
        <div class="lyricHead" ref="lyricHead" id="lyric-1"></div>
        <lyricString @lyricClick="rollBorderBoxToId" v-for="(item,key,index) in lyric['lyric']" :key="key" :lyric="item" :lyricIndex="index" :lyricKey="Number(key)"></lyricString>
        <div class="lyricFoot" ></div>
    </div>
</template>

<script>
import localForage from "localforage"
import lyricString from "./lyricString.vue"

export default {
    data(){
        return{
            lyric:{},
            nowLyricKey:""//当前歌词的key
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
                case "music_play_info":
                    this.music_play_info(e)
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
        /**
         * 当换歌信息发生变化的时候触发
         *
         * @param {*} e 
         */
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
        },
        /**
         * 设置歌词滚动到指定id的位置
         * @param {Number} index id的索引(只需要传入索引即可,不需要传入id)
         */
        setBorderBoxToId(index){
            const domId = 'lyric' + index

            const dom = this.$refs.borderBox.querySelector('#'+domId)
            if(dom){
                this.$refs.borderBox.scrollTo({
                top: dom.offsetTop - this.$refs.lyricHead.clientHeight,
                behavior: "smooth"
                })
            }
        },
        /**
         * 重置歌词样式
         */
        resetLyricStyle(){
            const LyricList =  document.querySelectorAll('.lyricHigh')
            if(LyricList){
                LyricList.forEach(element => {
                    element.classList.remove('lyricHigh')
                });
            }
        },
        /**
         * 设置指定id的元素为当前歌词的样式
         * @param {Number} index 
         */
        setLyricStyle(index){
            const domId = 'lyric' + index
            const doc  =  document.getElementById(domId)

            if(doc){
                doc.classList.add('lyricHigh')
            }
        },
        /**
         * 设置歌词滚动到指定id的位置
         * @param {Number} index id的索引(只需要传入索引即可,不需要传入id)
         */
        rollBorderBoxToId(index){
            this.resetLyricStyle()
            //该函数会自动设置样式和滚动到的位置
            this.setBorderBoxToId(index);
            this.setLyricStyle(index);
        },
        /**
         * 当播放进度发生变化时触发
         * @param {*} e 
         */
        music_play_info(e){
            const data =  JSON.parse(e.newValue)
            void data
            const keyList = Object.keys(this.lyric['lyric'])
            let nowTime = data.nowTime//当前播放到的时间
            //查找当前所在的歌词
            for(let i=0;i<keyList.length;i++){
                
                const key = keyList[i]
                if(nowTime < Number(key)/1000){
                    if(this.nowLyricKey  === -1) return;
                    this.rollBorderBoxToId(-1)
                    this.nowLyricKey = -1
                    return;
                }
            
                if(nowTime >= Number(key)/1000 && nowTime < Number(keyList[i+1])/1000){
                    if(key === this.nowLyricKey) return;
                    this.rollBorderBoxToId(i)
                    this.nowLyricKey = key
                    return;
                }
                else if(nowTime >= Number(keyList[keyList.length-1])/1000){
                    
                    if(keyList[keyList.length-1] === this.nowLyricKey) return;
                    this.rollBorderBoxToId(keyList.length-1)
                    this.nowLyricKey = keyList[keyList.length-1]
                    return;
                }
                
            }

        }

    },
    components:{
        lyricString
    }
}
</script>

<style scoped>
.borderBox{
    border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    position: relative;

}

.borderBox::-webkit-scrollbar{
    display: none;

}

.lyricHead{
    display: block;
    padding-bottom: 30%;
}

.lyricFoot{
    display: block;
    padding-top: 30%;
}

</style>