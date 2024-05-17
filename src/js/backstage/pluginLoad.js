import ProgramCycle from "../ProgramCycle" 
import {FileBasic} from "../../../public/static/file"


ProgramCycle.priorityList.pluginLoad = async ()=>{
    // 加载插件
     fillList = await FileBasic.getDirectoryList("./userFile/plugin")
    
    
}