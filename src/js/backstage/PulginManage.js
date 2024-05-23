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
        const BackgroundArr =  await this.getBackgroundFileList()
        for(let i of BackgroundArr){
            PulginInfo.background[i] = await this.getBackgroundPluginInfo(i)
        }
        const RenderArr = await this.getRenderPluginInfo()
        for(let i of RenderArr){
            PulginInfo.render[i] = await this.getRenderPluginInfo(i)
        }
        return PulginInfo

    }

    /**
     * 获取后台线程的插件文件夹列表
     * @returns {Promise<[]>}
     */
    static getBackgroundFileList(){
        return new Promise((resolve,reject)=>{
            FileBasic.getDirectoryList("userFile/plugin/background")
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    /**
     * 获取渲染线程的插件文件夹列表
     * @returns {Promise}
     */
    static getRenderFileList(){
        return new Promise((resolve,reject)=>{
            FileBasic.getDirectoryList("userFile/plugin/render")
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
        const ROOT_PATH = "userFile/plugin/background/"
        return new Promise((resolve)=>{
            FileBasic.getFileContent(`${ROOT_PATH}${name}/plugin.json`)
            .then(data=>{
                resolve(data)
            })
            .catch(()=>{
                resolve([])
            })
        })
    }

    /**
     * 获取渲染线程指定文件夹下的插件信息
     * @param {string} name 
     * @returns {Promise}
     */
    static getRenderPluginInfo(name){
        const ROOT_PATH = "userFile/plugin/render/"
        return new Promise((resolve)=>{
            FileBasic.getFileContent(`${ROOT_PATH}${name}/plugin.json`)
            .then(data=>{
                resolve(data)
            })
            .catch(()=>{
                resolve([])
            })
        })
    }

}


export default PulginManage

