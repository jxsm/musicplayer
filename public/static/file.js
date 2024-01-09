const fs = require('fs')
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
  
  // 遍历读取文件
  function readFile(path, filesList) {
    const files = fs.readdirSync(path); // 需要用到同步读取
    files.forEach(walk);
  
    function walk(file) {
      const states = fs.statSync(path + '/' + file);
      if (states.isDirectory()) {
        readFile(path + '/' + file, filesList);
      } else {
  // 创建一个对象保存信息
        let fileName = file.split('.');
        fileName.pop()
        fileName = fileName.join('.');
        const obj = {};
        obj.size = states.size; // 文件大小，以字节为单位
        obj.name = fileName; // 文件名
        obj.path = path + '/' + file; // 文件绝对路径
        filesList.push(obj);
      }
    }
}



module.exports = { readFile,writeFile,getFilesAndFoldersInDir}
