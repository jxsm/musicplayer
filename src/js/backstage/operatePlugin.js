import { ipcMain } from "electron";
import {FileBasic} from "../../../public/static/file"
/**
 * 插件的操作方法
 */
class OperatePlugin{
    /**
     * 设置插件是否启用
     * @param {string} fileName 文件名
     * @param {string} location background or render
     * @param {boolean} enable  启用还是禁止
     * @return {Promise}
     */
    static setPluginEnable(fileName,location,enable){
        switch(location){
            case "background":
                return OperatePlugin.setPathPluginConfig("userFile/plugin/background/",fileName,"enable",enable)
            case "render":
                return OperatePlugin.setPathPluginConfig("userFile/plugin/render/",fileName,"enable",enable)
            default:
                return Promise.reject("location参数错误");
        }
    }

    

    /**
     * 设置或新增指定目录下config中的信息
     * @param {string} ROOT_PATH 根目录
     * @param {string} FILE_NAME 文件夹名
     * @param {string} key
     * @param {string} value 
     * @returns {Promise}
     */
    static async setPathPluginConfig(ROOT_PATH,FILE_NAME,key,value){
       if(!ROOT_PATH || !FILE_NAME || !key){
            throw new Error("参数错误");
       }
       let data = JSON.parse(await FileBasic.getFileContent(ROOT_PATH+"/"+FILE_NAME+"/config.json"));
       data[key] = value;
       await FileBasic.writeFile(ROOT_PATH+"/"+FILE_NAME+"/config.json",JSON.stringify(data))
    }

    static async removePlugin(location,fileName){
        console.log(fileName)
        switch(location){
            case "background":
                return OperatePlugin.removePathPlugin("userFile/plugin/background/",fileName)
            case "render":
                return OperatePlugin.removePathPlugin("userFile/plugin/render/",fileName)
            default:
                return Promise.reject("location参数错误");
        }
    }

    static async removePathPlugin(ROOT_PATH,FILE_NAME){
        if(!ROOT_PATH || !FILE_NAME){
            throw new Error("参数错误");
        }
        await FileBasic.removeDirectory(ROOT_PATH+"/"+FILE_NAME);
    }
}

/**
 * 线程通讯使用的
 */
class IpcOperatePlugin extends OperatePlugin{
    static async setPluginEnable(event,fileName,location,enable){
        try{
            await super.setPluginEnable(fileName,location,enable);
            event.sender.send("updatePluginEnable",fileName,location,{
                ok:'ok',
                enable:enable
            });
        }
        catch(e){
            event.sender.send("updatePluginEnable",fileName,location,{
                err:"err"
            });
            console.warn("禁用插件失败->")
            console.error(e)
        }
        
    }

    static async removePlugins(event,location,fileName){
        
        super.removePlugin(location,fileName)
        .then(()=>{
            event.sender.send("removePlugins",true)
        })
        .catch(e=>{
            console.warn("删除插件失败->")
            console.error(e)
            event.sender.send("removePlugins",false)
        })
    }
}


export default OperatePlugin;

export {OperatePlugin,IpcOperatePlugin}

