const FfmpegCommand = require('../../node_modules/fluent-ffmpeg/lib/fluent-ffmpeg.js');
const tempPath = "./userFile/temp/";//临时文件夹
const os = require('os');

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



class Transcoding{


/**
 * 常见的文件类型进行转码
 * @param {string} path 文件位置 
 * @param {string} fileName 保存的文件名 
 * @param {string} position  位置 如(local|internet)本地或网络位置
 * @param {string} target 目标格式
 * @param {Object} headers 请求头可为空
 * @return {Promise} 如果处理正确Promise会返回该文件在temp文件中的路径
 */
static familiar(path,fileName,position,target,headers={}){
    if(position == "local"){
        return Transcoding.ffmpeg_transcoding_path(path,fileName,target)
    }else if(position == "internet"){
        return Transcoding.network_transcode(path,fileName,target,headers)
    }
}

    /**
 * 从网络位置进行转码
 * @param {string} uri 网络位置 
 * @param {*} fileName 保存的文件名如(fileName)
 * @param {*} target 目标类型如(mp3)
 * @param {Object} [headers={}] 请求头
 * 
 */
static network_transcode(uri,fileName,target,headers={}){
    return new Promise((resolve,reject)=>{
      let transcode
      request.head(uri, function(err, res, body){
        if(err){
          reject(err)
        }
        transcode =  request({url:uri,headers:headers},(e)=>{
          if(e){
            reject(e)
          }
        })
      }
      );
  
      //使用该方法通过ffmpeg将数据流转码成指定的类型
      this.ffmpeg_transcoding_path(transcode,fileName,target)
      .then((res)=>{
        resolve(res)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  }
  
  
  
  /**
   * 在使用该函数的时候应该尽量避免在上个同名文件删除之前调用,以避免重复覆盖
   * 使用内置的ffmpeg库进行转码,返回值为转码后该文件在临时文件的文件名
   * @param {string} filePath 要进行转码的文件路径(或可读流)
   * @param {string} fileName 保存的文件名如(fielName)
   * @param {string} target 目标文件类型如(mp3)
   * @return {Promise} 如果正确执行则最终会返回转码后的文件在temp文件中的文件名如(fielName.mp3)
   */
  static ffmpeg_transcoding_path(filePath,fileName,target){
    const completely_fileName = fileName+'.'+target
    return new Promise((resolve,reject)=>{
      FfmpegCommand(filePath)
            .output(tempPath+completely_fileName)
            .on('end', function() {
              resolve(completely_fileName)
            }
            )
            .on('error', function(err) {
              reject(err)
            }
            ).run();
    })
  }


  /**
 * 当ffmpeg报错时候调用这个代码
 * TODO: 为每个平台的报错都运用不同的内容
 */
static _errFfmpeg(){
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




}


/**
 * 转码器列表,第三方插件转码器或解码器只需要在这里对特定的格式进行注册就可以了
 * 原生支持[mp3,ogg,acc,wav,flac,m4a]
 * 原生默认使用包内自带的ffmpeg进行转码和解码播放是使用的浏览器原生的API,所以请转码为浏览器可以播放的格式
 */
let transcoding_list = {
    mp3:Transcoding.familiar,
    ogg:Transcoding.familiar,
    acc:Transcoding.familiar,
    wav:Transcoding.familiar,
    flac:Transcoding.familiar,
    m4a:Transcoding.familiar
  }







module.exports = {Transcoding,transcoding_list};

