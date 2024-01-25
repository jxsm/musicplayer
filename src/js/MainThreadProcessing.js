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
        let names = arg[1] || ['mp3','ogg'];
        const flag = arg[2];
    
        let musicList =  readFile(path,names)

        const infos = setMusicInfo(musicList)//异步获取音乐信息，并返回一个Promise列表和音乐信息列表，Promise列表用于等待

        Promise.all(infos[0])//等待所有Promise完成
        .then(()=>{
            event.sender.send('returnGetFolderMusicInfo',[flag,infos[1]])//发送消息给渲染进程
        })
    }
}





/**
 * 获取一个文件夹下后缀为names中的文件信息
 * @param {String} path  文件夹路径
 * @param {Array} names  文件后缀如['mp3','ogg']
 * @returns [
                {
                    size: 9973321,
                    name: '双笙（陈元汐）,封茗囧菌 - 霜雪千年（Cover 洛天依 ／ 乐正绫）',
                    path: 'E:\\青鸟2\\音乐测试/双笙（陈元汐）,封茗囧菌 - 霜雪千年（Cover 洛天依 ／ 乐正绫）.mp3'
                }
            ]
 */
function readFile(path,names) {
    let filesList = [];
    const files = fs.readdirSync(path); // 需要用到同步读取
    files.forEach(walk);
  
    function walk(file) {
      const states = fs.statSync(path + '/' + file);
      if (states.isDirectory()) {
        readFile(path + '/' + file, filesList);
      } else {
  // 创建一个对象保存信息
        let fileName = file.split('.');
        const fileType =  fileName.pop()
        if(names === true  || names.includes(fileType)){
          fileName = fileName.join('');
          const obj = {};
          const filePath = path + '/' + file;
          obj.size = states.size; // 文件大小，以字节为单位
          obj.name = fileName; // 文件名
          obj.path = filePath; // 文件绝对路径
          obj.type = fileType; // 文件类型
          filesList.push(obj);
        }
      }
    }

    return filesList;
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
    })
    .catch((error)=>{
      if(['mp3','ogg'].includes(i.type)){
        console.log(`音乐信息解析失败:${i.path}`,error)
      }
    })

    prList.push(temp)

  })

  return [prList,infos]
}


module.exports = {monitorDispose,readFile}
