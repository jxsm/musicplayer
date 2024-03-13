//FIXME: 该组件用于管理全局播放的音乐
import localForage from "localforage"



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
        musicList:[],//音乐列表
    }

    static musicId=0//音乐id(用于回调回调的时候识别)

    static listeningState = false //是否正在监听


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
        this.#info.musicList = data;
    }


    /**
     * 打乱音乐列表
     */
    static confuseMusicList(){
        if(!this.#info.musicList || !this.#info.musicList.length) return;
        for(let i = this.#info.musicList.length - 1;i>0;i--){
            const randomIndex = Math.floor(Math.random()*(i+1));
            [this.#info.musicList[i],this.#info.musicList[randomIndex]] = [this.#info.musicList[randomIndex],this.#info.musicList[i]];
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
        const data = {
            path:info.path,//音乐路径
            position:info.position,//音乐位置
            sourceType:info.type,//类型
            fileName:info.name,//名称
            target:target,//目标类型
            tag:this.musicId,//识别id
            headers:headers//请求头
        }
        //发信息到主线程
        window.ipcRenderer.send('ffpegTranscoding',data)
        console.log(this.musicId)
        return this.musicId;

    }


    /**
     * 默认回调函数
     * @param { Electron.IpcMainEvent} event 
     * @param {[tag,'error' || 'ok',info]} data  返回的信息为列表[标识符,状态,数据]
     */
    static defaultCallback(event,data){
        void event
        //如果是本次的请求才执行后续操作
        if(data[0] ===MusicManagement.musicId || MusicManagement.musicId === -1){
            if(data[1] == 'error'){
                console.error(data[2])
            }
            else if(data[1] == 'ok'){
                console.log(data[2])
            }
        }
    }


    /**
     * 启动主线程监听
     * @param {Function} callback 回调函数,如果为空则使用默认回调函数
     */
    static startMonitor(callback=this.defaultCallback) {
        if(!this.listeningState){
            window.ipcRenderer.on('return_ffmpeg_transcoding',callback)
            this.listeningState = true;
        }
    }


}



export {MusicManagement};