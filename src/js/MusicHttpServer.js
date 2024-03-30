var net = require('net')
const path = require('path');

class MusicHttpServer {

    

    //进行单例函数
    constructor(){
        if(MusicHttpServer.establish){
          return MusicHttpServer.establish
        }
        else{
          MusicHttpServer.establish = this
        }
    }


    


    /**
     * 获取服务端口号
     */
    getPort(){
      return this.port;
    }




    /**
     * 启动服务器,默认端口是4565,如果端口被占用则会在4566-6000之间寻找一个未被占用的端口
     * @param {string} rootDir  音乐文件根路径
     */
    startServer(rootDir="../userFile/temp/") {
        //先查找可端口
        this.findPort(4565,6000)
        .then(res=>{
          this.port = res;
          //启动服务
          this._sever(res,rootDir)
        })
        .catch(err=>{
          console.error(err)
          throw "无法找到可用的端口,请查端口占用情况,我们的查找范围是(4565,6000),如果报了这个错则说明在这个个范围内都没有找到可用的端口"

        })
    }


    

    /**
     * 查找未被占用的端口,如果该函数已被执行了则就不会再被执行了
     * @param {Number} start 
     * @param {Number} end 
     * @returns {Promise(resolve,reject)}
     */
     findPort(startPort,endPort) {
      if(this.port !== -1){
        return new Promise((resolve)=>{
          resolve(this.port)
        })
      }
      
      let nowPort = -1;

        return new Promise((resolve, reject) => {
          function temp (){
            if(nowPort === endPort && Date.now() - startTime > 10000){
              reject("NOPORT")
            }
            
            setTimeout(temp,100)
          }
          const startTime = Date.now();
          for (let port = startPort; port <= endPort; port++) {
            const server = net.createServer().listen(port);
            server.on('listening', () => {
              server.close();
              resolve(port);
            })
            server.on('error', (err) => {
              if(err.code === 'EADDRINUSE'){
                void err //端口被占用
              }
            })

            nowPort = port
          }

          temp()
      })
    }




    //服务器代码
    _sever(serverPort = 4565,rootDir='../userFile/temp/'){
      const fs = require('fs');
        const path = require('path');
        const http = require('http');

        const server = http.createServer((req, res) => {
          let filePath
          //检查是否为一个路径
          const len  = req.url.split('/').length + req.url.split('\\').length - 1
        
          const URL_TWO = decodeURI(req.url)
        
          if(len ===2){
            filePath = path.join(rootDir, URL_TWO);
          }
          else{
            filePath = path.join("", URL_TWO)
          }
        
          console.log("用户访问本的文件",filePath)
        
        
          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.log(err)
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('File not found\n');
              return;
            }
        

            const rangeHeader = req.headers.range;
            if (!rangeHeader) {
      
              res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Accept-Ranges': 'bytes' });
              fs.createReadStream(filePath).pipe(res);
            } else {
   
              const parts = rangeHeader.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
        
              const contentLength = end - start + 1;
              res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                'Content-Length': contentLength,
                'Content-Type': 'audio/mpeg',
              });
        
              const stream = fs.createReadStream(filePath, { start, end });
              stream.pipe(res);
            }
          });
        });
        
        server.listen(serverPort, () => {
          console.log(`Server running at http://localhost:${serverPort}`);
        });
    }
    
}


module.exports = MusicHttpServer