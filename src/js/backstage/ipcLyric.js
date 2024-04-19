//该文件用于接受ipc获取歌词文件的请求并处理
import InformationAcquisitionAtNetwork from "./InformationAcquisition.js"




/**
 * 该类用于处理歌词文件的请求
 */
export class IpcLyric{

    /**
     * 
     * @param {IpcMessageEvent} event 
     * @param {{
     *  handle:string,//处理模式
     *  name:string,//歌曲名
     *  path:string//歌曲路径
     * }} arg 
     */
    static  async Ipcentry(event,arg){
        try{
            let result = await handle[arg.handle](arg['name'])
            event.sender.send('ipcLyric',{
                "status":"ok",
                "lyric":result,
                "path":arg.path,
                "name":arg.name
            })
          
        }
        catch(err){
            event.sender.send('ipcLyric',{
                "status":"err",
                "message":err,
            })
        }
        
    }

    /**
     * 对请求lrc歌词作处理
     * @param {string} songName 歌曲名
     * @returns {Promise}
     */
    static  lrc(songName){
       return new Promise((resolve,reject)=>{
            InformationAcquisitionAtNetwork.get163LyricObject(songName).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
       })
    }

}


/**
 * 用于标记不同的请求如何处理
 */
export let handle = {
    "auto":IpcLyric.lrc,
    "lrc":IpcLyric.lrc,
} 