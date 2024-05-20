//将模块挂载到golob上


const moduleList ={
    InformationAcquisition:require('./InformationAcquisition'),//从网络中获取数据
    File:require("../../../public/static/file"),//文件操作
    TranscodingTable:require("../transcoding-table"),//音乐解码器
    MainThreadProcessing:require("../MainThreadProcessing")//主线程中的处理函数
}



global.Music = {}//创建一个Music对象

//全部挂载到global的Music上
for (let key in moduleList) {
    global.Music[key] = moduleList[key]
}