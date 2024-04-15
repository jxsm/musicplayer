//FIXME: 该组件用于管理全局播放的音乐
import localForage from "localforage"
import {proceedHint} from "../../public/static/proceedHint"
import {getGlobalStore} from "../assets/globalStore"

/**
 * 管理全局的音乐播放,所有有关播放的控制器都在该类中
 * 
 */
class MusicManagement{
    /**
     * 音乐信息
     */
    static #info = {
        nowMusicName:"",//当前音乐名称
        nowMusicUri:"",//当前音乐路径
        nowMusicInfo:{},//当前音乐信息
        nowIndex:0,//当前播放的索引
        fileLocation:"",//文件夹位置
    }

    static #musicList = []//音乐播放列表
    
    static palyNowTimeId = 0

    static playInfo ={
        nowTime:0,//当前时间
        endTime:0,//结束时间
        surplusTime:0,//剩余时间
    }


    static #audioElement = document.createElement("audio");//创建一个audio标签


    

    static nowInTemp = []//现在在temp中的音乐信息

    static URL_PATH = 'http://localhost:4565' //音乐文件请求路径


    static musicId=0//音乐id(用于回调回调的时候识别)

    static playId = 0 //播放id(用于播放音乐的识别id)

    static #listeningState = false //是否正在监听 

    static #volumeTimeId = []

    static #stopTimeId = 0

    static noTranscoding = ['wav','mp3','ogg','aac','webm','flac'] //不需要转码的文件类型



    static #musicInfoListCache  = new Proxy((()=>{
        let musicInfoListCache = {}
        return musicInfoListCache
    })(),{
        get(target,key){
            if(key in target){
                clearTimeout(target[`TimeIdCachet${key}`])
                target[`TimeIdCachet${key}`] = setTimeout(()=>{
                    delete target[`TimeIdCachet${key}`]
                    delete target[key]
                },5000)
                return target[key]
            }
            else{
                return void 0
            }
        },
        set(target,key,value){
            target[`TimeIdCachet${key}`] = setTimeout(()=>{
                delete target[`TimeIdCachet${key}`]
                delete target[key]
            },5000)
            target[key] = value
            return true
        }
    })

    /**
     * 设置音乐播放列表
     * 可在如切换歌单的时候使用，这将作为歌曲的播放顺序列表进行播放
     * - confuseMusicList 如果您想要随机打乱该列表可以使用该方法
     * @param {Array} data 列表信息 
     */
    static setMusicList(data){
        if(typeof(data) != "object"){
            //报错
            console.error("music list must be an array(setMusicList传入的数据需要是列表)");
            return;
        }
        this.#musicList = data;
        this.saveMusicList();
    }

    /**
     * 在音乐类表中添加东西
     * @param {{
     * path,
     * indexName,
     * index
     * }} info 
     */
    static addMusicList(info){
        this.#musicList.push(info);
        this.saveMusicList();
    }

    /**
     * 保存音乐播放列表
     */
    static saveMusicList(){
        localForage.setItem("musicList",this.#musicList)
    }


    /**
     * 打乱音乐列表
     */
    static confuseMusicList(){
        if(!this.#musicList || !this.#musicList.length) return;
        for(let i = this.#musicList.length - 1;i>0;i--){
            const randomIndex = Math.floor(Math.random()*(i+1));
            [this.#musicList[i],this.#musicList[randomIndex]] = [this.#musicList[randomIndex],this.#musicList[i]];
        }
        this.saveMusicList();
        
    }

    /**
     * 清空播放列表
     */
    static clearMusicList(){
        this.#musicList = [];
        this.saveInfo()
    }

    /**
     * 保存#indo中的信息到localStorage中
     */
    static saveInfo(){
        localStorage.setItem("MusicManagement_info",JSON.stringify(this.#info))
    }

    /**
     * 从localStorage中获取数据并设置到对象中
     * (当页面加载的时候加载上一次的记录)
     */
    static setInfoInlocalStorage(){
        const data = localStorage.getItem('MusicManagement_info')
        
        if(data){
            
            this.#info =  JSON.parse(data)
            localStorage.setItem("MusicManagement_info",JSON.stringify(this.#info))
            
            if(this.#info.nowMusicUri){
                
                let nowPath = this.#info.nowMusicUri;
                if(!this.#info.nowMusicUri.startsWith("/")) nowPath =  '/' + this.#info.nowMusicUri;
                nowPath = this.URL_PATH + nowPath
                //设置路径
                this.#audioElement.src = nowPath;
            }
        }
    }


    /**
     * 加载播放模式
     */
    static lodePlayMode(){
        //加载播放模式
        if(getGlobalStore('playMode') ===4){
            this.confuseMusicList()
        }
        
    }

    /**
     * 添加历史信息
     * @param {{
     * path:string,
     * name:string,
     * type:string,
     * }} info 
     */
    static addHistoricalRecord(info){
        if(!info){
            return
        }
        //添加历史记录
        //先读出来
        this.getHistoricalRecord()
        .then(res =>{
            let data = res
            if (!data) data = {};
            //先删除键在增加,好保证顺序
            delete data[info.path];
            //添加数据
            data[info.path] = info;
            //检查数量是不是超过了限制,如果是的话删除多余的
            let music_list_kye = Object.keys(data).length
            if(music_list_kye > 100){
                for(let i = 0;i<music_list_kye-100;i++){
                    delete data[music_list_kye[i]]
                }
            }
            localForage.setItem("music_history",JSON.parse(JSON.stringify(data)));
        })
        
        
    }

    /**
     * 获取历史音乐信息
     * @returns {Promise}
     */
    static getHistoricalRecord(){
        return localForage.getItem("music_history");
    }


    /**
     * 删除音乐信息
     * @param {string} path 音乐的路径 
     * @returns 
     */
    static deleteMusicHistorical(path){
        if(!path) return;
        let data = this.getHistoricalRecord();
        if(!data) return;
        delete data[path];
        localForage.setItem("music_history",data);
    }

    
    //TODO: 添加删除文件夹的时候删除所有文件的播放历史记录
    /**
     * 删除指定文件夹下的所有历史记录信息
     * @param {string} file 
     */
    static deleteFileAllHistorical(file){
        this.getHistoricalRecord()
        .then(res => {
            if (!res) return;
            for(let i in res){
                if(res[i].path.indexOf(file) > -1){
                    delete res[i];
                    
                }
            }
            localForage.setItem("music_history",JSON.parse(JSON.stringify(res)));
        })
    }

    //TODO: 临时文件需要删除
    /**
     * 主线程调用ffmpeg进行转码
     * @param {Object} info 歌曲信息
     * @param {string} target 目标类型
     * @param {Object} [headers={}] 请求头,可以为空,如果您要请求的是远程地址,并且请求头中需要携带信息可以填写此参数 
     * @param {Function} callback 回调函数(可为空,如果为空的话则走默认逻辑)
     * 默认逻辑是当收到主线程的消息后调用[]函数进行播放 
     * @returns {int} 音乐识别id
     */
    static ffpegTranscoding(info,target,headers={}){
        //音乐识别id加上1,即忽略之前的请求返回信息
        this.musicId += 1
        if(!info || !target) return;
        //解析出数据
        let  img
        try{
            img = info.infos.picture
        }
        catch{
            img = void 0
        }
        let artists
        try{
            artists = JSON.parse(JSON.stringify(info.infos.artists))//作者
        }
        catch{
            artists = "未知"
        }

        let songName
        try{
            if(info.infos.title){
               songName = info.infos.title//歌曲名 
            }
            else{
               throw new Error("歌曲名获取失败")
            }
            
        }
        catch{
            if(info.name){
                songName = info.name
            }
            else{
                songName = "未知"
            }
           
        }
        const data = {
            path:info.path,//音乐路径
            position:info.position,//音乐位置
            sourceType:info.type,//类型
            fileName:info.name,//名称
            target:target,//目标类型
            tag:this.musicId,//识别id
            name:songName,//歌曲名
            img:img,//歌曲的封面图片(如果有的话)
            artists:artists,//作者
            headers:headers,//请求头
            fileLocation:info.fileLocation,//文件夹路径
        }
        window.ipcRenderer.send('ffpegTranscoding',data)
        return this.musicId;

    }


    //TODO: 转码后的回调
    /**
     * 默认回调函数
     * @param { Electron.IpcMainEvent} event 
     * @param {[tag,'error' || 'ok',info]} data  返回的信息为列表[标识符,状态,数据]
     */
    static defaultCallback(event,data){
        void event
        //将该文的文件名放到列表中,方便后续操作
        if (data[1] == "ok") MusicManagement.nowInTemp.push(data[2]);
        //如果是本次的请求才执行后续操作
        if(data[0] ===MusicManagement.musicId || MusicManagement.musicId === -1){
            if(data[1] == 'error'){
                console.error(data[2])
            }
            else if(data[1] == 'ok'){

                MusicManagement.pathPlay(data[2],data[3].name,data[3].artists,data[3].img,data[3].fileLocation,data[3].path)
            }
        }
    }

    /**
     * 类表循环情况下的下一首
     */
    static listLoopNext(){
        if(this.#info.nowIndex >= this.#musicList.length-1){
            this.#info.nowIndex = -1;
        }
        this.playNext()
    }



    /**
     * 启动主线程监听
     * @param {Function} callback 回调函数,如果为空则使用默认回调函数
     */
    static startMonitor(callback=this.defaultCallback) {
        if(!this.#listeningState){
            window.ipcRenderer.on('return_ffmpeg_transcoding',callback)
            this.#listeningState = true;
        }

        this.#audioElement.addEventListener('pause',()=>{
            //如果暂停了
            localStorage.setItem("MusicIsPlay",!this.#audioElement.paused)
        })

        this.#audioElement.addEventListener('play',()=>{
            //如果播放了
            localStorage.setItem("MusicIsPlay",!this.#audioElement.paused)
        })

        this.#audioElement.addEventListener('ended',()=>{
            //这一首歌播放结束了,判读以下播放模式
            const playMode = getGlobalStore('playMode')
            switch (playMode){
                case 1:
                    //顺序播放
                    this.playNext()
                    break
                case 2:
                    //列表循环
                    this.listLoopNext()
                    break
                case 3:
                    //单曲循环
                    this.#palyNow()
                    break
                case 4:
                    //随机播放
                    this.listLoopNext()
                    break
            }

            
        })

        this.#audioElement.addEventListener('timeupdate',()=>{
            this.updatePlayInfonNow()
        })


    }



    /**
     * 关闭监听
     * @param {Function} [callback=this.defaultCallback] 回调函数
     */
    static stopMonitor(callback=this.defaultCallback){
        if(this.#listeningState){
            window.ipcRenderer.removeListener('return_ffmpeg_transcoding',callback)
        }
    }


    static #palyNow = ()=>{
        try{
            this.#audioElement.play();
        }
        catch(e){
            console.error("播放失败")
            console.error(e)
        }
    }

    /**
     * 恢复音量,恢复到localStorage中记录的音量的值
     */
    static recoverVolume(){
        //先清除上一个音量控制器的延迟
        if(this.#stopTimeId ){
            clearTimeout(this.#stopTimeId)
        }


        //获取当前的音量
        const infos = JSON.parse(localStorage.getItem('globalStore'))

        this.setVolume(infos.musicVolume/100,1000)

    }

    /**
     * 播放音乐,如果不传递path则默认播放当前歌曲
     * @param {string} path 路径如果直接输入名称则默认在temp的根目录中查找
     * @param {string} name 播放名称
     * @param {Array} artists 作者人列表
     * @param {Int8Array} img 图片信息 
     * @param {string} fileLocation 文件路径
     * @param {string} OriginalPath 原完整路径(在最终播放的音乐和音乐数据来源不同时传入该参数)
     */
    static pathPlay(path,name,artists,img,fileLocation,OriginalPath){
        this.recoverVolume()

        if(!path){
            if(!this.#audioElement.src) return;
            this.#palyNow()
            return
        }
     
        let nowPath = path;
        if(!path.startsWith("/")) nowPath =  '/' + path
        nowPath = this.URL_PATH + nowPath

       clearTimeout(this.palyNowTimeId)
       //设置路径
       this.palyNowTimeId = setTimeout(()=>{
            this.#audioElement.src = nowPath;
            this.#info.img = img
            this.#palyNow()
            this.saveInfo();
       },500)
       //播放
       //更新缓存数据
       this.#info.nowMusicName = name
       this.#info.nowMusicUri = path
       this.#info.nowMusicInfo.artists = artists?artists:"未知"
       this.#info.fileLocation = fileLocation
       if(OriginalPath){
        this.#info.nowIndex = this.getPathInMusicList(fileLocation,OriginalPath)
       }
       else{
        this.#info.nowIndex = this.getPathInMusicList(fileLocation,path)
       }
       
    }


    /**
     * 播放方法,使用该方法进行播放会更新传入的格式来判断是否需要转码
     * @param {Object} infos 音乐信心
     * @param {int} sequence 音乐在页面中列表中的第几个
     */
    static play(infos,sequence){
        
        if(infos === undefined && sequence == undefined){
            this.recoverVolume()
            this.#palyNow();
        }
        else{
            if(!infos.type) return;
            this.addHistoricalRecord(infos)
            //先判断格式
            if(this.noTranscoding.indexOf(infos.type) === -1){
                this.musicId = MusicManagement.ffpegTranscoding(infos,"mp3")
            }
            else{
                let artists
                try{
                    artists = JSON.parse(JSON.stringify(infos.infos.artists))
                }
                catch(e){
                    artists = undefined
                }

                const name = infos.infos.title || infos.name
                

                let img

                try{
                    img = infos.infos.picture[0]
                }catch{
                    img = void 0
                }
                this.pathPlay(infos.path,name,artists,img,infos.fileLocation)
            }
        }
    }

  

    /**
     * 立刻更新音乐信息
     */
    static updatePlayInfonNow(){
        //更新播放信息
        this.playInfo.nowTime = this.#audioElement.currentTime;
        this.playInfo.endTime = this.#audioElement.duration;
        this.playInfo.surplusTime = this.playInfo.endTime - this.playInfo.nowTime
        //将数据存入localStorage
        localStorage.setItem("music_play_info",JSON.stringify(this.playInfo))

        
    }


    /**
     * 停止播放音乐
     * 使用该方法停止播放音乐,音乐会先降低音量慢慢停止
     */
    static stop(){
        this.setVolume(0,1000);
        this.#stopTimeId =  setTimeout(()=>{
            this.#audioElement.pause();
        },1000)

        //暂停
        
    }


    /**
     * 用于获取当前播放器的音量大小
     * @returns {Number} 返回当前的音量[0.1-1]
     */
    static getNowVolume(){
        return this.#audioElement.volume;
    }

    static #playInexRecord;
    /**
     * 播放下一首歌曲
     */
    static playNext(){
        this.clearPlayInexRecord(1)
        if( this.#info.nowIndex>=this.#musicList.length){
            //已经是最后一首了
            this.#info.nowIndex = 0
        }
        else{
            
            this.#playInexRecord= setTimeout(()=>{
                this.getMusicListIndex(this.#info.nowIndex)
                .then((e)=>{
                    this.play(e,this.#info.nowIndex)
                })
            },200)
        }
    }


    /**
     * 清除 #playInexRecord历史记录
     * @param {Number} num 给音乐索引增加多所
     */
    static clearPlayInexRecord(num=0){
        this.#info.nowIndex += num
        clearTimeout(this.#playInexRecord)
        this.#playInexRecord = undefined
    }

    /**
     * 播放上一首歌曲
     */
    static previousMusic(){
        //TODO:播放时索引有误
        this.clearPlayInexRecord(-1)
        if(this.#info.nowIndex == -1){
            //已经是第一首了
            this.#info.nowIndex = 0
            return;
        }
        if(this.#info.nowIndex  >= this.#musicList.length){
            this.#info.nowIndex = 0
        }

        else{
            this.#playInexRecord= setTimeout(()=>{
                this.getMusicListIndex(this.#info.nowIndex)
                .then((e)=>{
                    this.play(e,this.#info.nowIndex)
                })
                .catch(e=>{
                    console.error(e)
                })
            },200)
        }
    }

    /**
     * 获取下一首歌曲
     * @returns {Promise}
     */
    static getNextMusic(){
        if(this.#musicList.length-1 == this.#info.nowIndex){
            //已经是最后一首了
            return new Promise((resolve)=>{
                resolve(void 0)
            });
        }
        else{
            const data = this.#musicList[this.#info.nowIndex+1]
            return new Promise((resolve,reject)=>{
                if(this.#musicInfoListCache[data.indexName]){
                    resolve(this.#musicInfoListCache[data.indexName][data.index])
                }
                else{
                    //如果缓存中没有数据则去读取数据
                        localForage.getItem(data.indexName)
                        .then(e=>{
                            this.#musicInfoListCache[data.indexName] = e
                            resolve(e[data.index])
                        }).catch(e=>{
                            reject(e)
                        })
                        }
            })
        }
    }

    /**
     * 获取音乐列表在指定索引位置的音乐信息
     * @param {Number} index 
     * @returns {Promise}
     */
    static getMusicListIndex(index){
        if(index < 0 || index >= this.#musicList.length) {
            return new Promise((resolve,reject)=>{
                void resolve
                reject(new Error("索引超出范围"))
            })
        }
        const data = this.#musicList[index]
            return new Promise((resolve,reject)=>{
                    if(this.#musicInfoListCache[data.indexName]){
                        
                        resolve(this.#musicInfoListCache[data.indexName][data.index])
                    }
                    localForage.getItem(data.indexName)
                    .then(e=>{
                        resolve(e[data.index])
                    }).catch(e=>{
                        reject(e)
                    })
            })
    }

    /**
     * 获取上一首歌曲
     * @returns {Promise}
     */
    static getPreviousMusic(){
        if(this.#info.nowIndex == 0){
            //已经是最后一首了
            return new Promise((resolve)=>{
                resolve(void 0)
            });
        }
        else{
            const data = this.#musicList[this.#info.nowIndex-1]
            return new Promise((resolve,reject)=>{
                
                    if(this.#musicInfoListCache[data.indexName]){
                        resolve(this.#musicInfoListCache[data.indexName][data.index])
                    }
                    localForage.getItem(data.indexName)
                    .then(e=>{
                        resolve(e[data.index])
                    }).catch(e=>{
                        reject(e)
                    })
            })
        }
    }


    /**
     * 获取指定文件夹下指定所以在音乐播放列表中的索引位置
     * @param {string} path 
     * @param {string} filePath 
     * @returns {int}
     */
    static getPathInMusicList(path,filePath){
        return this.#musicList.findIndex(e=>{
            return e.path == filePath && e.indexName == 'musicListInfo:'+path
        })
    }

    /**
     * 设置音乐的音量
     * 如果传递了time值则音量会在time秒内到达volume
     * @param {number} volume 目标值 (音量值必须在0.0到1.0之间)
     * @param {number} [time=0] 过程持续多少毫秒 默认为0,如果小于100毫秒则不会有过渡
     */
    static setVolume(volume,time = 0){
        

        if(volume > 1 || volume < 0) throw new Error("音量值必须在0.0到1.0之间")
        if(time < 0) console.error('时间必须大于等于0')
        if(volume === this.#audioElement.volume) return


        for(let i = 0;i<this.#volumeTimeId.length;i++){
            clearTimeout(this.#volumeTimeId[i])
        }
        this.#volumeTimeId = []

        if(time <= 100){
            this.#audioElement.volume = volume
        }
        else{
            //缓慢降低音量
            let step = (Math.abs(this.#audioElement.volume - volume))/(time/100)
        
            //计算步数

            let stepCount = (Math.abs(this.#audioElement.volume - volume))/step
            

            for(let i = 0;i<stepCount;i++){
                this.#volumeTimeId.push(setTimeout(()=>{
                    try{
                        if(this.#audioElement.volume>volume){
                            this.#audioElement.volume -= step
                        }
                        else{
                            this.#audioElement.volume += step
                        }
                    }
                    catch (e){
                        this.#audioElement.volume = 0
                        console.error("音量设置失败,重新设置")
                        this.setVolume(volume,time)
                        console.error(e)
                    }
                } 
                ,i*100))
            }

        }
    }


    /**
     * 设置音乐进度
     * @param {Number} ratio 百分比(只能是0.0-1.0之间) 
     */
    static setProgress(ratio){
        if(!this.#audioElement.src) return;

        if(ratio > 1 || ratio < 0) throw new Error("音量值必须在0.0到1.0之间")
        if(ratio === this.#audioElement.currentTime/this.#audioElement.duration) return
        this.#audioElement.currentTime = this.#audioElement.duration * ratio

        this.updatePlayInfonNow()
    }


    static setUri(uri){
        if(!uri) return;
        this.URL_PATH =  uri
    }

}

MusicManagement.setInfoInlocalStorage()//读取缓存中的数据


MusicManagement.startMonitor() //开启监听


window.ipcRenderer.send('getMusicServerPort')


window.ipcRenderer.on('getMusicServerPort',setUrl)


function setUrl(event,data){
    void event;
    if(data){
        MusicManagement.setUri("http://localhost:"+data)
    }
    else{
        proceedHint.warning('端口被占用,无法开启服务')
    }
    
    window.ipcRenderer.removeListener('getMusicServerPort',setUrl)
}


/**
 * 加载播放列表
 * @param {[]} paths 
 */
function lodeMusicList(paths){
   MusicManagement.clearMusicList()
   let isErr = false
   const lode =async ()=>{
        for(let i in paths){
            if(isErr) return;
            let e
            try{
                e = await localForage.getItem(`musicListInfo:${paths[i]}`)
                for(let j = 0;j<e.length;j++){
                    const data =  {
                            indexName:`musicListInfo:${paths[i]}`,
                            index:j,
                            path:e[j].path
                        }
                        MusicManagement.addMusicList(data)
                }
            }
            catch(err){
                isErr = true
                console.error(err)
            }
            
            
        }
   }

   lode();
   setTimeout(()=>{
    MusicManagement.lodePlayMode()
   },500)
}


//TODO: 优化未读取到配置时进行重复读取,尝试3次,如果三次过后仍然没有读取到信息则弹窗提醒用户
window.addEventListener('globalStore:currentPath',(e)=>{
    lodeMusicList(Object.keys(e.detail.value))
})


window.addEventListener('globalStore:playMode',(e)=>{
    const value = e.detail
    if(value.oldValue === 4 && value.value != 4){
        lodeMusicList(Object.keys(getGlobalStore('currentPath')))
    }else{
        MusicManagement.lodePlayMode()
    }
})



export {MusicManagement};