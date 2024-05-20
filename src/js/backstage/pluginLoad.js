import ProgramCycle from "../ProgramCycle" 
import {FileBasic} from "../../../public/static/file"
import fs from "fs"
import path from "path"
import RenderPluginsLoad from "./RenderPluginsLoad"

ProgramCycle.priorityList.pluginLoad = async ()=>{
    // 加载插件
     const fillList = await FileBasic.getDirectoryList("./userFile/plugin/background/")
     
     for(let i=0;i<fillList.length;i++){

        const NOWFILE = "./userFile/plugin/background/"+fillList[i]+"/"
        //先判断这个文件下是否有plugin.json文件
        if(!fs.existsSync(NOWFILE+"plugin.json")) continue;
        //读取plugin.json文件
        const pluginInfo = JSON.parse(fs.readFileSync(NOWFILE+"plugin.json","utf-8"))
        if(pluginInfo.location !== "background") continue
        //读取config.json文件,看是否启用,并且,如个没有该文件的化进行初始化
        if(fs.existsSync(NOWFILE+"config.json")){
            const configInfo = JSON.parse(fs.readFileSync(NOWFILE+"config.json","utf-8"))
            if(configInfo.enable === false) continue;
        }
        else{
          RenderPluginsLoad.foundConfig(NOWFILE)
        }

        switch (pluginInfo.loading_time) {
            case 1:
                immediateLoad(NOWFILE,pluginInfo.main)
                break;
            case 2:
                addExecuteProcess(NOWFILE,pluginInfo.main)
                break;
            case 3:
                addClosedList(NOWFILE,pluginInfo.main)
                break
            default:
                console.log(`插件优先级设置错误,插件路径:(${NOWFILE})`)
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
    //判断文件夹子是否存在
    if(!fs.existsSync(FILESTR)) return false;
    //导入js文件
    //获取文件中的字符
    fs.readFile(FILESTR,"utf-8",(err,data)=>{
      if(err){
        console.log(`${pathStr}插件加载出错`)
        return
      } 
      else{
        const func = new Function(data)
        func()
      }
    })
        
    //获取绝对路径
    console.log(path.dirname(__filename))
}



/**
 * 给第二优先级的插件添加加载
 * @param {string} pathStr 文件夹路径 
 * @param {string} mainFile main文件的名称
 */
function addExecuteProcess(pathStr,mainFile){
  const FILESTR  = pathStr+mainFile
  if(!fs.existsSync(FILESTR)) return false;

  fs.readFile(FILESTR,"utf-8",(err,data)=>{
    if(err){
      console.log(`${pathStr}插件加载出错`)
    } 
    else{
      const func = new Function(data)
      ProgramCycle.processList[FILESTR] = ()=>{
        func()
      }
    }
  })
}


/**
 * 给第三优先级加载的插件添加加载事件
 * @param {string} pathStr 
 * @param {string} mainFile 
 * @returns 
 */
function addClosedList(pathStr,mainFile){
  const FILESTR  = pathStr+mainFile
  if(!fs.existsSync(FILESTR)) return false;

  fs.readFile(FILESTR,"utf-8",(err,data)=>{
    if(err){
      console.log(`${pathStr}插件加载出错`)
    } 
    else{
      const func = new Function(data)
      ProgramCycle.closedList[FILESTR] = ()=>{
        func()
      }
    }
  })
}



