//TODO:该js用于获取音乐的信息并返回
import localforage from "localforage"
import globalSet from "../assets/globalSet"

void localforage
class GetMusicInfo {
    static dispose = {

    }

    //外界直接将数据传入这里,这里会去寻找对应的解析函数用于解析音乐信息
    static getInfo = (infos) =>{
       let acquired =   this.dispose[String(infos.type)](infos)
       return acquired
    }
}


 GetMusicInfo.dispose['local'] = async (info)=>{
    const readFileType = globalSet.getKey('readFileType')
    //TODO:向主线程发送请求
    window.ipcRenderer.send('getFolderMusicInfo',[info.path,readFileType,['nameList',info.index,info.label]])



    const promise = new Promise((resolve,reject) => {
        const onGetFolderMusicInfo = (event,arg)=>{
            void event
            if(arg[0][1] === info.index && info.label === arg[0][2]) {
                window.ipcRenderer.removeListener('returnGetFolderMusicInfo',onGetFolderMusicInfo)
                resolve(arg)
            }
        }
        // 这里执行异步操作
        try{
            window.ipcRenderer.on('returnGetFolderMusicInfo',onGetFolderMusicInfo)
        }
        catch(e){
            window.ipcRenderer.removeListener('returnGetFolderMusicInfo',onGetFolderMusicInfo)
            reject(e)
        }
        
            
        
    });


    return promise
}




export {GetMusicInfo}
