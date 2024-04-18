

const request = require('request');

let tempCookie = {}

//该类用于网络中的信息获取
class InformationAcquisitionAtNetwork{

  
    /**
     * 获取网易云所对应的歌曲的Id
     * @param {string} name 
     */
    static  get163MusicId(name){

        const sendRequest = (url,data,headers)=>{
            return new Promise((resolve,reject)=>{
                request.post({url:url, form: data,headers: headers}, function(err,httpResponse,body){
                    void httpResponse
                    if(err){
                        reject(err)
                    }
                   resolve(body)

                })
            })
        }


        return new Promise((resolve,reject) =>{
            const url = "http://music.163.com/api/search/pc"
            const data = {
                "s": name,
                "type": 1,
                "offset": 0,
                "limit": 5,
            }

            let headers = {
                "Referer": "http://music.163.com/",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            }

            let isTwo = false
            /**
             * 获取信息
             */
            const q = ()=>{
                this.guarantee163Cookie()
                .then(cookiestr => {
                    headers["Cookie"] = cookiestr
                    sendRequest(url,data,headers)
                    .then(body => {
                        let data = JSON.parse(body)
                        if(data['code'] == -462){
                            if(isTwo){
                                reject(new Error("请求2次都失败了"))
                            }

                            //Cooki过期了重新获取Cooki后再次请求
                            this.get163TempCookie()
                            .then(cookiestr => {
                                headers["Cookie"] = cookiestr
                                isTwo = true
                                q() //重新执行
                            })
                            .catch(err => {
                          
                                reject(err)
                            })
                        }
                        else if(data['code'] == 200){
                            //请求成功解析数据
                            let id = data['result']['songs'][0]['id']
                            resolve(id)
                        }
                    })
                    .catch((err)=>{
                        
                        reject(err)
                    })

                })
            }


            q()
        })
    }


    /**
     * 获取网易云所对应的歌曲的Lyric
     * @param {Number} id
     * @returns {Promise}
     */
    static get163LyricAtId(id){
        const url = `https://music.163.com/api/song/media?id=${id}`
        let headers = {
            "Referer": "http://music.163.com/",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        }
       return new Promise((resolve,reject)=>{
            this.guarantee163Cookie()
            .then((cookie)=>{
                headers['Cookie'] = cookie
                request.get({url:url,headers:headers},(err,response,body)=>{
                    void response
                    if(err){
                        reject(err)
                    }
                    else{
                        const data = JSON.parse(body)

                        if(data['code'] === 200){
                            resolve(data['lyric'])
                        }
                        else{
                            reject(new Error("返回的状态码错误"))
                        }
                    }

                })
            })
       })
    }

    /**
     * 获取网易云的临时Cookie
     * @returns {Promise<string>}
     */
    static  get163TempCookie(){
        return new Promise((resolve,reject)=>{
            const url = "http://music.163.com/"
            request.get(url, (err, response, body) => {
                void body;
                if (err) {
                    console.log(err);
                    reject(new Error("获取网易云的临时Cookie失败"))
                }
                let data = response.toJSON();
                const Cookies = data['headers']['set-cookie'];
                const cookiestr = Cookies.join();
                tempCookie['cookie163'] = cookiestr;
                resolve(cookiestr)
            })  
        })
    }

    /**
     * 该函数会检查是否已经获取了网易云的临时Cookie
     * 如果没有获取，则获取
     * 如果已经获取，则直接返回
     * 如果您的请求需要用到Cookie建议使用这个
     * （但是该方法不能保证Cookie是否过期...）
     */
    static async guarantee163Cookie(){
        if(tempCookie['cookie163']){
            return tempCookie['cookie163']
        }
        else{
            const data = await this.get163TempCookie()
            console.log("获取到的" + data)
            return data
        }
    }
}

export default InformationAcquisitionAtNetwork;