const fileOperations = require('../../public/static/file');//文件写入模块
const metadata = require('music-metadata');//音乐信息获取模块
const os = require('os');
const fs = require('fs');//文件读取模块
const Transcoding = require("./transcoding-table.js")

const request = require('request');

const tempPath = "./userFile/temp/";//临时文件夹

import RenderPluginsLoad from "./backstage/RenderPluginsLoad"

import PulginManage from "../js/backstage/PulginManage"


/**
 * 处理一些文件
 */
class MonitorDispose{

    /**
     * 获取一个文件夹下指定类型的音乐的信息
     * @param {*} event 
     * @param {[]} arg [路径,类型['mp3'],标识] 
     */
    static getFolderMusicInfo(event,arg){
        const path = arg[0];//文件夹路径，如'E:\\青鸟2\\音乐测试'，注意：路径中需要使用
        let names = arg[1] || ['mp3','ogg','acc','wav','m4a'];
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
   * 检查temp文件下的文件,如果过多则从最老的开始删除
   * @param {number} [MAX=20] 文件的最大数量
   */
  static TestClearTemp(MAX = 20){
    fileOperations.FileBasic.getTimeFileList("userFile/temp/")
    .then(list=>{
      console.log(`文件长度${list.length}`)
      if(list.length>MAX){
        const removeFile = list.length - MAX
        for(let i = 0;i<removeFile;i++){
          console.log(list[i])
          this.clear_Temp_File_By_Path(list[i].name)
        }
      }
    })
  }


  /**
   * 
   * * {
   * path:"路径",
   * position:"位置信息" ,   如(local|internet)本地或网络位置
   * sourceType:"原类型" 如(wav)
   * fileName:,"保存的文件名" 转码后在本地保存的文件名(不需要后缀!!)该文件会被保存到userFile下的temp目录下
   * target:"希望转成的目标类型" 如(mp3),
   * tag:唯一标签
   * headers: 请求头(可为空)
   * } 
   * 接收ipc信息,并调用内置的ffmpeg进行转码
   * 该函数执行后会立即返回转码后临时文件的路径
   * @param {IpcMessageEvent} event 
   * @param {{
   * path:string,
   * position:string,
   * sourceType:string,
   * fileName:string,
   * target:string,
   * tag:string,
   * name:string,
   * artists:Array,
   * headers:object
   * fileLocation:string,
   * }} args 该对象传入的数据应该严格要这样
   */
  static ipc_ffmpeg_transcoding(event,args = {}){
    console.log(args)
    MonitorDispose.TestClearTemp(15)
    //先检查传入的args是否正确
    if(!(args.path && args.position && args.sourceType && args.fileName && args.target && args.tag)){
      event.sender.send('return_ffmpeg_transcoding',[args.tag,'error','请检查传入的args的置是否正确(除了headers属性外都不能为空)'])
    }
    if(Transcoding.transcoding_list[args.sourceType]){   
      fileOperations.FileBasic.getFileNameList("userFile/temp/")
      .then((data)=>{
        const fileName = `${args.fileName}.${args.target}`
          if(data.includes(fileName)){
            
            event.sender.send('return_ffmpeg_transcoding',[args.tag,'ok',fileName,
            {
              name:args.name,//歌曲名称
              artists:args.artists,//艺术家
              img:args.img,//歌曲封面
              path:args.path,//歌曲路径
              fileLocation:args.fileLocation//歌曲文件夹路径
            }])

            
          }else{
            let flag = Transcoding.transcoding_list[args.sourceType](args.path,args.fileName,args.position,args.target,args.headers)
            flag.then((res)=>{
              event.sender.send('return_ffmpeg_transcoding',[args.tag,'ok',res,
              {
                name:args.name,//歌曲名称
                artists:args.artists,//艺术家
                img:args.img,//歌曲封面
                path:args.path,//歌曲路径
                fileLocation:args.fileLocation//歌曲文件夹路径
              }])
            })
            .catch((e)=>{
              event.sender.send('return_ffmpeg_transcoding',[args.tag,'error',e])
            })
          }
      })

      

      
    }
    else{
      event.sender.send('return_ffmpeg_transcoding',[args.tag,'error',"没有相对应的转码器,如果您是开发者您可以尝试更改sourceType属性为其他类型"])
    }
  }








  /**
   * 下载文件到temp文件目录
   * @param {string} uri 资源的远程路径
   * @param {string} filename 保存的资源名称如(a.mp3)
   * @param {Object} headers 请求头(可不传)
   * @returns {Promise} 如果执行正确则返回下载的文件在temp中的文件名称如(a.mp3)
   */
  static DownloadFile_Temp(uri,filename,headers={}){
    return new Promise((resolve,reject)=>{
      request.head(uri, function(err, res, body){
        if(err){
          reject(err)
        }
        request({url:uri,headers:headers}).pipe(fs.createWriteStream(filename)).on('close', ()=>{
          resolve(filename);
        })
      }
      );
    })
  }




  /**
   * 删除临时文件(一般都在关闭软件的时候进行调用)
   */
  static clear_Temp_File(){
    //使用nodejs删除一共文件夹下的所有文件
    const fileList =  fileOperations.getFolderList("./userFile/temp/",true)

    for(let i = 0;i<fileList.length;i++){
      try{
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
      catch(e){
        console.log(e)
      }
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


  /**
   * 读取主题文件
   */
  static async readTheme(event){
    fileOperations.FileBasic.getFileListContent("./userFile/theme/")
    .then(content=>{
      event.sender.send('ThemeFileContent',content)
    })
    .catch(e=>{
      console.log(e)
      event.sender.send('ThemeFileContent','')
    })
  }

  /**
   * 写入主题文件到主题文件夹内
   * @param {*} event 
   * @param {
   * {
   * succeed,
   * err,
   * content
   * }
   * } data 
   */
  static async writeTheme(event,data){
    const themeJson = JSON.parse(data.content)
    fileOperations.FileBasic.writeFile(`./userFile/theme/${themeJson.name}.json`,JSON.stringify(themeJson))
    .then(r=>{
      event.sender.send('writeThemeFile',{succeed:data.succeed})
    })
    .catch(e=>{
      console.log(e)
      event.sender.send('writeThemeFile',{err:data.err})
    })
  }

  /**
   * 获取渲染进程的所有插件的内容
   * @param {*} event 
   */
  static async getRenderPluginsContent(event){
    const contentList = await RenderPluginsLoad.getPulgins()
    event.sender.send('getRenderPluginsContent',contentList)
  }

  /**
   * 获取所有插件的信息内容
   */
  static async getAllPulginInfo(event){
    PulginManage.getAllPulginInfo()
    .then(r=>{
      event.sender.send("getAllPluginsInfo",r)
    })
    .catch(e=>{
      console.log(e)
      event.sender.send("getAllPluginsInfo",{err:"获取插件错误"})
    })
  }
}



/**
 * 获取音乐信息并返回
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


export default MonitorDispose

