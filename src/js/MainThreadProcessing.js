const fileOperations = require('../../public/static/file');//文件写入模块
const metadata = require('music-metadata');//音乐信息获取模块
const os = require('os');
const fs = require('fs');//文件读取模块
var FfmpegCommand = require('../../node_modules/fluent-ffmpeg/lib/fluent-ffmpeg.js');


//检查平台,更具不同的平台下载对应的ffmpeg的包
if (os.type() == 'Windows_NT') {
	//Windows
  FfmpegCommand.setFfmpegPath("ffmpeg/win/ffmpeg-2024-03-04-git-e30369bc1c-full_build/bin/ffmpeg.exe")
}
if (os.type() == 'Darwin') {
	//mac
  FfmpegCommand.setFfmpegPath("ffmpeg/mac/ffmpeg")
  console.log("mac用户,如果包内自带的ffmpeg有问题,则请自行更换到您可使用的版本")
}
if (os.type() == 'Linux') {
	//Linux平台
  FfmpegCommand.setFfmpegPath("ffmpeg/linux/ffmpeg-6.1-amd64-static/ffmpeg")
  console.log("Linux平台用户,如果包内自带的ffmpeg有问题,则请自行更换到您可使用的版本")
}




/**
 * 处理一些文件
 */
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
     let info
      try{ 
        info = await fileOperations.readFile('./userFile/setInfo.json')
        info = JSON.parse(info)
      }
      catch(e){
        console.log("设置配置文件出现文件",e)
        info = 'error'
      }
      
      event.sender.send('returnGetGlobalSet',[arg,info])
    }



    


/**
 * 接收ipc信息,并调用内置的ffmpeg进行转码
 * 该函数执行后会立即返回转码后临时文件的路径
 */
// static ipc_ffmpeg_transcoding(){

// }



/**
 * 使用内置的ffmpeg库进行转码,返回值为转码后临时文件的路径
 * @param {*} filePath 文件路径
 * @param {*} target 目标文件类型
 * @returns {String} 临时文件的路径
 */
static ffmpeg_transcoding_path(filePath,target){

}






/**
 * 删除临时文件(一般都在关闭软件的时候进行调用)
 */
static clear_Temp_File(){
  //使用nodejs删除一共文件夹下的所有文件
  const fileList =  fileOperations.getFolderList("./userFile/temp/",true)

  for(let i = 0;i<fileList.length;i++){
    if(fileList[i].name){
      this.clear_Temp_File_By_Path(fileList[i].name + "." + fileList[i].type)
    }
    else{
      //争对无文件名的文件需要特殊删除
      if(!this.clear_Temp_File_By_Path(fileList[i].type)){
        this.clear_Temp_File_By_Path("."+ fileList[i].type)
      }
      
      
    }
    
    console.log("删除临时文件a:" + fileList[i].name + "." + fileList[i].type)  
  }
}


/**
 * 删除临时文件中的莫一个文件
 * @param {String} name 文件名(需要包含后缀)
 */
static clear_Temp_File_By_Path(name){
  const path = "./userFile/temp/" + name
  fileOperations.removeTempFile(path)
}


/**
 * 检查temp文件夹是否存在,如果不存在则进行创建
 */
static testTemp() {
  if(!fs.existsSync("./userFile/temp/")){
    fs.mkdirSync("./userFile/temp");
  }
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
      if(['mp3','ogg','acc','wav','flac'].includes(i.type)){
        console.log(`音乐信息解析失败:${i.path}`,error)
      }
    })

    prList.push(temp)

  })

  return [prList,infos]
}


/**
 * 当ffmpeg报错时候调用这个代码
 * TODO: 为每个平台的报错都运用不同的内容
 */
function _errFfmpeg(){
  switch (os.type()){
    case 'Windows_NT':
      console.log("ffmpeg报错,请检查ffmpeg是否安装成功(默认使用的内置的ffmpeg请检查内置的ffmpeg是否正常)")
      break;
    case 'Linux':
      console.log("ffmpeg报错,请检查ffmpeg是否安装成功(默认使用的内置的ffmpeg请检查内置的ffmpeg是否正常)")
      break;
    case 'Darwin':
      console.log("ffmpeg报错,请检查ffmpeg是否安装成功(默认使用的内置的ffmpeg请检查内置的ffmpeg是否正常)")
      break;
  }
}




module.exports = {
  monitorDispose
}



