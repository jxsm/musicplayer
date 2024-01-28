//TODO:该js用于获取音乐的信息并返回
import localforage from "localforage"

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
    console.log(info)
    //TODO:向主线程发送请求

}





export {GetMusicInfo}
