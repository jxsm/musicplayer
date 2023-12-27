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






module.exports = { readFile,writeFile }
