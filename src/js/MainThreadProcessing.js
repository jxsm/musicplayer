const fileOperations = require('../../public/static/file');//文件写入模块
const metadata = require('music-metadata');//音乐信息获取模块

const fs = require('fs');//文件读取模块

class monitorDispose{
    /**
     * 获取一个文件夹下指定类型的音乐的信息
     * @param {*} event 
     * @param {Array} arg [路径,类型['mp3'],标识] 
     */
    static getFolderMusicInfo(event,arg){
        const path = arg[0];//文件夹路径，如'E:\\青鸟2\\音乐测试'，注意：路径中需要使用
        let names = arg[1] || ['mp3','ogg','acc','wav'];
        const flag = arg[2];
    
        let musicList =  fileOperations.getFolderList(path,names)

        const infos = setMusicInfo(musicList)//异步获取音乐信息，并返回一个Promise列表和音乐信息列表，Promise列表用于等待

        Promise.all(infos[0])//等待所有Promise完成
        .then(()=>{
            event.sender.send('returnGetFolderMusicInfo',[flag,infos[1]])//发送消息给渲染进程
        })
    }




    /**
     * 写入设置信息文件
     * @param {*} event 
     * @param {Array} arg 
     */
    static globalSetSave(event,arg){
      void event
      let data = JSON.stringify(arg[0])
      fileOperations.writeFile('./userFile/setInfo.json',data,'w')
    }

    /**
     * 获取本地存储的设置文件内容
     * @param {*} event 
     * @param {*} arg 标记位 
     */
    static async getGlobalSet(event,arg){
      let info = await fileOperations.readFile('./userFile/setInfo.json')
      try{
        info = JSON.parse(info)
      }
      catch(e){
        console.log("设置配置文件出现文件",e)
        info = 'error'
      }
      
      event.sender.send('returnGetGlobalSet',[arg,info])
    }

}





/**
 * 
 * 
 */
function setMusicInfo(infos){
  let prList = []//异步数据列表
  infos.forEach((i)=>{
    let temp = metadata.parseFile(i.path)
    .then(r =>{
      i.infos = r.common
      i.infos.timeDuration = r.format.duration
    })
    .catch((error)=>{
      if(['mp3','ogg','acc','wav'].includes(i.type)){
        console.log(`音乐信息解析失败:${i.path}`,error)
      }
    })

    prList.push(temp)

  })

  return [prList,infos]
}


module.exports = {monitorDispose}
