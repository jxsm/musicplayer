//渲染线程的插件加载
window.ipcRenderer.on("getRenderPluginsContent",loadPlugin)


window.ipcRenderer.send("getRenderPluginsContent")

/**
 * 关闭时要运行的代码
 */
let WhenOff = []

void WhenOff

/**
 * 加载插件
 * @param {Array} PluginList 
 */
function loadPlugin(event,PluginList) {
    void event
    PluginList.forEach(interposition)
}


/**
 * 判断插件加载的时期,将其插入到合适的位置
 * @param {{loading_time,content,path}} item 
 */
function interposition(item){
    switch(item.loading_time){
        case 1:
            //立刻加载
            ImmediateLoading(item.content)
            break;
        case 2:
            //当页面被关闭时加载
            WhenOff.push(item.content)
            break;
        default:
            console.log(`渲染层插件${item.path}加载时机设置错误,只能为1或2\n而当前值为${item.loading_time}`)
    }
}

/**
 * 立刻加载该插件中的代码
 * @param {string} con 
 */
function ImmediateLoading(con){
    new Function(con)()
}

export {WhenOff}