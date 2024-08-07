
const { promises } = require('dns');
const fs = require('fs')
const path = require('path');
const request = require('request');
// 读取文件方法
function readFile(path){
    return new Promise((resolve, reject)=>{
        fs.readFile(path, { flag: 'r', encoding:'utf-8' }, (err, data) => {
            if (err) { reject('出错啦'); }
            resolve(data);
        }); 
    })
}


/**
 * 写入文件
 * @param {String} path 文件路径 
 * @param {any} content  要写入的内容
 * @param {string} flag  写入模式
 * @returns 
 */
function writeFile(path,content,flag){
    return new Promise((resolve, reject)=>{
        //写入文件
        fs.writeFile(path, content, { flag: flag, encoding:'utf-8' }
        , (err) => {
            if (err) { reject('出错啦'); }
            resolve('写入成功');
        });
    })
}


/**
 *获取文件夹下的所有文件,包括子文件夹
 * @param {String} path 
 * @returns 
 */
function getFilesAndFoldersInDir(path) {
    const filesList = [];
    readFile(path, filesList);
    return filesList;
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
function getFolderList(path,names) {
    let filesList = [];
    const files = fs.readdirSync(path); // 需要用到同步读取
    files.forEach(walk);
  
    function walk(file) {
      const states = fs.statSync(path + '/' + file);
      if (states.isDirectory()) {
        getFolderList(path + '/' + file, filesList);
      } else {
  // 创建一个对象保存信息
        let fileName = file.split('.');
        const fileType =  fileName.pop().toLowerCase(); // 获取文件后缀名并转换为小写
        if(names === true  || names.includes(fileType)){
          fileName = fileName.join('');
          const obj = {};
          const filePath = path + '/' + file;
          obj.size = states.size; // 文件大小，以字节为单位
          obj.name = fileName; // 文件名
          obj.path = filePath; // 文件绝对路径
          obj.type = fileType; // 文件类型
          obj.position = "local"; //设置位置信息
          obj.fileLocation = path; // 设置文件位置信息
          filesList.push(obj);
        }
      }
    }
    

    return filesList;
}


/**
 * 删除临时文件夹中的文件
 * @param {string} path 文件名称(fileName)
 */
function removeTempFile(path){
    fs.unlink(path,(err)=>{
        if(err){
            console.log("文件删除失败");
            return false
        }
        return true
    })
} 

/**
 * 下载文件到temp目录(要注意的是,下载到temp中的文件会在软件关闭的时候全部删除)
 * @param {String} url 远程路径 
 * @param {*} fileName 保存的文件名
 * @param {*} callback 回调函数(在下载完成的时候会被调用)
 */
function DownloadFile_Temp(uri,fileName,callback=()=>{}){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(fileName)).on('close', callback);
    
      }
      );
}




// 文件操作
class FileBasic{
    /**
     * 读取文件内容
     * @param {string} path 路径 
     */
    static getFileContent(path){

        return new Promise((resolve, reject)=>{
            fs.readFile(path, { flag: 'r', encoding:'utf-8' }, (err, data) => {
                if (err) { reject('出错啦'); }
                resolve(data);
            }); 
        })
    }

    /**
     * 获取文件夹下所有文件
     * (返回的是所有文件的绝对路径的一个列表)
     * @param {string} pathStr 
     * @
     */
    static getFileList(pathStr){
        return new Promise((resolve, reject)=>{
            fs.readdir(pathStr, { withFileTypes: true }, (err, files) => {
                if (err) { reject('出错啦'); }
                let filesList = [];
                files.forEach(file=>{
                    if(file.isFile()){
                        //获取该文件的绝对路径
                        // console.log(path+file.name)
                        filesList.push(path.resolve(pathStr+file.name))
                    }
                })
                resolve(filesList);
            });
        })
    }

    /**
     * 获取一个文件下所有文件中的信息(返回的是一个字典,key为文件路径,value为文件内容)
     */
      /**
     * 获取一个文件下所有文件中的信息(返回的是一个字典,key为文件路径,value为文件内容)
     */
      static getFileListContent(path){
        return new Promise((resolve, reject)=>{
            this.getFileList(path)
            .then(files=>{
                let fileListContent = {};
                let promiseList = [];
                files.forEach(file=>{
                    promiseList.push(this.getFileContent(file).then(data=>{
                        fileListContent[file] = data;
                    }))
                })
                Promise.all(promiseList)
                .then(()=>{
                    resolve(fileListContent);
                })
                .catch((err)=>{
                    reject(err);
                })
            }
            )
            .catch(err=>{
                reject(err)
            })
        })
    }

    static writeFile(path,content,flag='w'){
        return new Promise((resolve, reject)=>{
            //写入文件
            fs.writeFile(path, content, { flag: flag, encoding:'utf-8' }
            , (err) => {
                if (err) { reject('出错啦'); }
                resolve('写入成功');
            });

        })
    }

    /**
     * 获取一个文件下所有文件的名称(包括文件扩展名)
     * @param {string} path
     * @returns {promises}
     */
    static getFileNameList(path){
        return new Promise((resolve, reject)=>{
          fs.readdir(path, { withFileTypes: true }, (err, files) => {
              
              if (err) { reject('出错啦'); }
              let filesList = [];
              files.forEach(file=>{
                  if(file.isFile()){
                      filesList.push(file.name);
                  }
              })
              resolve(filesList);
          })
        })
       
    }


    /**
     * 获取一个路径下所有的文件, 返回一个数组
     * 顺序是按时间排序
     * @param {string} pathStr 
     */
    static getTimeFileList(pathStr){
        return new Promise((resolve, reject) => {
            try {
                let files = []
                fs.readdirSync(pathStr).map(file=>{
                    files.push(
                        {
                            name: file,
                            path: path.resolve( pathStr + "/" + file),
                            mtime: fs.statSync(pathStr + "/" + file).mtime
                        }
                    )
                }).sort((a,b)=>{
                    resolve(a.mtime.getTime() - b.mtime.getTime())
                })
                resolve(files)
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * 获取指定路径下的文件夹列表
     * @param {string} pathStr 
     * @returns {Promise}
     */
    static getDirectoryList(pathStr){
        return new Promise((resolve, reject) => {
            try{
                fs.readdir(pathStr, "utf-8", (err, files) => {
                    if(err) reject(err)

                    let filesList = []
                    files.forEach(file=>{
                        if(fs.statSync(pathStr + "/" + file).isDirectory()){
                            filesList.push(file)
                        }
                    })

                    resolve(filesList)
                })

            }catch(err){
                reject(err)
            }
        })
    }

    /**
     * 获取指定路径下的文件的二进制数据
     * @param {string} path 
     * @returns {Promise}
     */
    static gteBinaryData(path){
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if(err) reject(err)
                resolve(data)
            })
        })
    }

    static removeDirectory(path){
        return new Promise((resolve, reject) => {
            fs.rmdir(path, { recursive: true }, (err) => {
                if(err) reject(err)
                resolve()
            })
        })
    }

    
    /**
     * 检查文件夹是否存在
     */
    static examineDirectoryExistence(path){
        return new Promise((resolve) => {
             resolve(fs.existsSync(path))
        })
    }

}




export { 
    readFile,
    writeFile,
    getFilesAndFoldersInDir,
    getFolderList,
    removeTempFile,
    DownloadFile_Temp,
    FileBasic
}