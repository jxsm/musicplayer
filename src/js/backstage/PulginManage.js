import {FileBasic} from "../../../public/static/file"

void FileBasic


/**
 * 插件管理器
 */
class PulginManage{
    /**
     * 获取所有插件信息
     * @returns {Promise<{
     *  background:{},
     *  render:{},
     * }>}
     */
    static async getAllPulginInfo(){
        let PulginInfo = {
            background:{},
            render:{}
        }
        //TODO:这里修改了,渲染线程也需要重新修改
        const BackgroundArr =  await this.getBackgroundFileList()
        for(let i of BackgroundArr){
            try{
                const data = await this.getBackgroundPluginInfo(i)
                const pluginTemp = Object.keys(data).length>0?JSON.parse(await this.getBackgroundPluginInfo(i)):data
                PulginInfo.background[i] = {
                    plugin:pluginTemp,
                    config:await this.getBackgroundConfig(i),
                    fileName:i
                }
            
                PulginInfo.background[i]["logo"]= await this.getBackgroundLogo(i,pluginTemp["logo"])
            }
            catch(err){
                console.error(err)
            }
        }
        const RenderArr = await this.getRenderFileList()
        for(let i of RenderArr){
            try {
                const data = await this.getRenderPluginInfo(i)
                const pluginTemp = Object.keys(data).length>0?JSON.parse(await this.getRenderPluginInfo(i)):data
                PulginInfo.render[i] = {
                    plugin:pluginTemp,
                    config:await this.getRenderConfig(i),
                    fileName:i
                }
                
                PulginInfo.render[i]["logo"]= await this.getRenderLogo(i,pluginTemp["logo"])
            } catch (error) {
                console.error(error)
            }
        }
        return PulginInfo

    }

    /**
     * 获取后台线程的插件文件夹列表
     * @returns {Promise<[]>}
     */
    static getBackgroundFileList(){
       return this.getPluginFileList("userFile/plugin/background")
    }

    /**
     * 获取渲染线程的插件文件夹列表
     * @returns {Promise<[]>}
     */
    static getRenderFileList(){
        return this.getPluginFileList("userFile/plugin/render/")
    }

    /**
     * 获取指定文件夹下的插件列表
     * @param {string} ROOT_PATH 
     * @returns 
     */
    static getPluginFileList(ROOT_PATH){
        return new Promise((resolve,reject)=>{
            FileBasic.getDirectoryList(ROOT_PATH)
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }


    /**
     * 获取后台线程指定文件夹下的插件信息
     * @param {string} name 
     * @returns {Promise}
     */
    static getBackgroundPluginInfo(name){
        return this.getPluginInfo("userFile/plugin/background/",name)
    }

    /**
     * 获取渲染线程指定文件夹下的插件信息
     * @param {string} name 
     * @returns {Promise}
     */
    static getRenderPluginInfo(name){
        return this.getPluginInfo("userFile/plugin/render/",name)
    }


    /**
     * 获取渲染线程指定文件夹下的插件信息
     * @param {string} ROOT_PATH 
     * @param {string} name 
     * @returns 
     */
    static getPluginInfo(ROOT_PATH,name){
        return new Promise((resolve)=>{
            FileBasic.getFileContent(`${ROOT_PATH}${name}/plugin.json`)
            .then(data=>{
                resolve(data)
            })
            .catch(()=>{
                resolve({})
            })
        })
    }


    /**
     * 获取背景线程下指定插件的配置文件
     * @param {string} name 
     * @return 如果文件不存在则默认返回{enable:true}
     */
    static getBackgroundConfig(name){
        return this.getConfig("userFile/plugin/background/",name)
    }

    /**
     * 获取渲染线程下指定插件的配置文件
     * @param {string} name 
     * @return {Promise} 如果文件不存在则默认返回{enable:true}
     */
    static getRenderConfig(name){
        return this.getConfig("userFile/plugin/render/",name)
    }


    /**
     * 获取后台线程下指定插件的配置文件
     * @param {string} ROOT_PATH 
     * @param {string} name 
     * @returns 
     */
    static getConfig(ROOT_PATH,name){
        return new Promise((resolve,reject)=>{
            FileBasic.getFileContent(`${ROOT_PATH}${name}/config.json`)
            .then(data=>{
                try{
                    let jsonDate = JSON.parse(data)
                    resolve(jsonDate)
                }
                catch(err){
                    console.error(err)
                    reject(new Error(`${ROOT_PATH}${name}/config.json 配置文件出错,应为json格式`))
                }
            })
            .catch(()=>{
                resolve({enable:true})
            })
        })
    }

    /**
     * 获取插件的logo
     * @param {string} ROOT_PATH 插件文件夹的根目录 
     * @param {string} name 插件所在的文件名
     * @param {string} imgname logo图片的文件名
     */
    static getLogo(ROOT_PATH,name,imgname){
        return new Promise((resolve)=>{
            FileBasic.gteBinaryData(`${ROOT_PATH}${name}/${imgname}`)
            .then(data=>{
                resolve(data.toString('base64'))
            })
            .catch(()=>{
                resolve(void 0)
            })
        })
    }

    /**
     * 获取后台插件的logo
     * @param {string} name 文件夹名
     * @param {string} imgName 图片名
     * @returns {Promise} 如果文件不存在则默认返回{undefined}
     */
    static getBackgroundLogo(name,imgName){
        return this.getLogo("userFile/plugin/background/",name,imgName)
    }

     /**
     * 获取渲染线程插件的logo
     * @param {string} name 文件夹名
     * @param {string} imgName 图片名
     * @returns {Promise} 如果文件不存在则默认返回{undefined}
     */
    static getRenderLogo(name,imgName){
        return this.getLogo("userFile/plugin/render/",name,imgName)
    }
    
    

}


export default PulginManage