const moduleList ={
    UserCopy:require("./UserCopy"),//用户复制接口
    KeyProcessing:require("./keyProcessing"),//键盘事件接口
    ProceedHint:require("./proceedHint"),//提示接口
    ThemeColorSetting:require("./ThemeColorSetting"),//主题颜色设置
    MusicManagement:require("../musicManagement"),//音乐管理
    ThemeColors:require("../ThemeColors"),//颜色处理
    GlobalSet:require("../../assets/globalSet"),//设置类
    GlobalStore:require("../../assets/globalStore"),//全局存储
}


window.Music = {}


for(let key in moduleList){
    if(!window.Music[key]) window.Music[key] = {}
    for(let j in moduleList[key]){
        window.Music[key] = moduleList[key][j]
    }
}
