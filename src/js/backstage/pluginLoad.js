import ProgramCycle from "../ProgramCycle" 
import {FileBasic} from "../../../public/static/file"
import fs from "fs"
import path from "path"


ProgramCycle.priorityList.pluginLoad = async ()=>{
    // 加载插件
     const fillList = await FileBasic.getDirectoryList("./userFile/plugin/background/")
     
     for(let i=0;i<fillList.length;i++){

        const NOWFILE = "./userFile/plugin/background/"+fillList[i]+"/"
        //先判断这个文件下是否有plugin.json文件
        if(!fs.existsSync(NOWFILE+"plugin.json")) continue;
        //读取plugin.json文件
        const pluginInfo = JSON.parse(fs.readFileSync(NOWFILE+"plugin.json","utf-8"))
        if(pluginInfo.location !== "background") return
        switch (pluginInfo.loading_time) {
            case 1:
                immediateLoad(NOWFILE,pluginInfo.main)
                break;
            case 2:
                break;
            case 3:
                break
            default:
                break;
        }

     }
}

/**
 * 立即加载插件
 * @param {string} pathStr 文件夹路径 
 * @param {string} mainFile main文件的名称
 * @returns {boolean} 是否加载成功
 */
async function  immediateLoad(pathStr,mainFile){
    const FILESTR  = pathStr+mainFile
    console.log(FILESTR)
    //判断文件是否存在
    if(!fs.existsSync(FILESTR)) return false;
    //导入js文件
    //获取文件中的字符
    fs.readFile(FILESTR,"utf-8",(err,data)=>{
      if(err){
        console.log(`${pathStr}插件加载出错`)
        return
      } 
      else{
        eval(data)
      }
    })
        
    //获取绝对路径
    console.log(path.dirname(__filename))
}