import ThemeColors from "../ThemeColors"
import {WhenOff} from "./pluginLoad"

export default function beforeunloadHandler(event) {
    void event
    //保存歌单数据
    let  filePath = JSON.parse(localStorage.getItem('filePath'))
    if(filePath){
        window.ipcRenderer.send('changeFolderList',filePath)
    }

    //删除临时文件夹中的数据
    window.ipcRenderer.send('clearTempAll',true)

    //保存当时的颜色,在初始化的时候重新设置

    localStorage.setItem('lastThemeColors',JSON.stringify(ThemeColors.getAll()))

    //执行所该生命周期下需要执行的命令
    WhenOff.forEach(item=>{
        new Function(item)()
    })



}