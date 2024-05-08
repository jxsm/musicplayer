const fs = require('fs')
class ProgramCycle{

    /**
     * 最先执行的,可用于初始化等操作,
     * 会在窗口被创建前执行
     */
    static executePriority(){
        for(let i in this.priorityList){
            this.priorityList[i]()
        }
    }


    /**
     * 优先级第二高的,在窗口被创建后执行(不保证页面渲染完毕)
     */
    static executeProcess(){
        for(let i in this.processList){
            this.processList[i]()
        }
    }

    /**
     * 在软件被关闭的时候执行
     */
    static executeClosed(){
        for(let i in this.closedList){
            this.closedList[i]()
        }
    }



}


ProgramCycle.priorityList = {}
ProgramCycle.processList = {}
ProgramCycle.closedList = {}

/**
 * 文件检查,用于检查文件是否存在,不存在则创建
 */
ProgramCycle.priorityList.fileChecking = function(){
    //检查文件夹是否存在,如果不存在则创建
    if(!fs.existsSync("./userFile")){
        fs.mkdirSync("./userFile")
        console.log("创建用户数据文件夹")
    }

    if(!fs.existsSync("./userFile/theme/")){
        fs.mkdirSync("./userFile/theme/")
        console.log("创建主题文件夹")
    }

}

export default ProgramCycle

