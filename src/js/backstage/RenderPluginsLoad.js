const fs = require("fs")
import {FileBasic} from "../../../public/static/file"

class RenderPluginsLoad{
    static async getPulgins(){
      //插件列表
      let plugins = []
      const FILLLIST = await FileBasic.getDirectoryList("./userFile/plugin/render/")
      for(let i=0;i<FILLLIST.length;i++){
        const NOWFILE = "./userFile/plugin/render/"+FILLLIST[i]+"/"
        if(!fs.existsSync(NOWFILE+"plugin.json")) continue;
        const pluginInfo = JSON.parse(fs.readFileSync(NOWFILE+"plugin.json","utf-8"))
        if(pluginInfo.location !== "render") continue
        //读取config.json文件,看是否启用,并且,如个没有该文件的化进行初始化
        if(fs.existsSync(NOWFILE+"config.json")){
          const configInfo = JSON.parse(fs.readFileSync(NOWFILE+"config.json","utf-8"))
          if(configInfo.enable === false) continue;
        }
        else{
          foundConfig(NOWFILE)
        }
  
        const plugin = {
          loading_time:pluginInfo.loading_time,
          content:await fs.readFileSync(NOWFILE+pluginInfo.main,"utf-8"),
          path:NOWFILE
        }
  
        plugins.push(plugin)
  
      }
  
      return plugins
    }


    /**
     * 创建Config文件
     * @param {string} path 
     */
    static foundConfig(path){
        const TEMPLATE = {
        enable:true
        }
        //判断文件夹是否存在
        if(!fs.existsSync(path)) return
        //创建config.json文件
        console.log(`${path}config.json 文件夹不存在，正在创建`)
        fs.writeFileSync(`${path}config.json`,JSON.stringify(TEMPLATE))
    }
    
}


export default RenderPluginsLoad

