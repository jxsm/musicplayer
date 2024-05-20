//初始化
import {globalStore_Object,getGlobalStore, alterGlobalStore} from '../../assets/globalStore.js'
import globalSet from "../../assets/globalSet.js"
import ThemeColors from "../../js/ThemeColors.js"

export default function initialize() {

            if (!localStorage.getItem('filePath')){
                localStorage.setItem('filePath',"[]")
                //如果不存在则从文件中取读取
                window.ipcRenderer.send('readFolderList',1)
                window.ipcRenderer.on('musicFolderList',this.setfFilePath)
            }
   
                //加载保存的公共变量
                try{
                    let globalStore = JSON.parse(localStorage.getItem('globalStore'))
                    globalStore_Object(globalStore)
                }
                catch{
                    console.log("没有保存的公共变量")
                }
    
                //加载设置文件
                window.ipcRenderer.send('getGlobalSet',1)
    
    
                function setGlobalSet(event,data){
                    void event
    
                    if(data[0] === 1){
                        if(data[1] != 'error' && Object.keys(data[1]).length != 0){
                            globalSet.set(data[1])
                        }
                        else{
                            console.log("没有设置文件(现已创建),现目前使用的是默认配置")
                            globalSet.save()
                        }
                    }
                    window.ipcRenderer.off('returnGetGlobalSet',setGlobalSet)
                }
    
                window.ipcRenderer.on('returnGetGlobalSet',setGlobalSet)
                
                //去获取音乐信息
                alterGlobalStore('currentPath',getGlobalStore('currentPath'),true)
                
                //恢复到之前的主题
                ThemeColors.restoreToLast();

                //加载插件加载器
                import("../render/pluginLoad.js")


                

}


