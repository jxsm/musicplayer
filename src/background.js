
'use strict'
const os = require('os');
import{ readFile,writeFile,getFilesAndFoldersInDir} from "../public/static/file"
import { app, protocol, BrowserWindow ,contextBridge, ipcMain,dialog} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import MonitorDispose from "./js/MainThreadProcessing"
import MusicHttpServer from "./js/MusicHttpServer"
import ProgramCycle from "./js/ProgramCycle" 
import {IpcLyric} from "./js/backstage/ipcLyric"
import {pluginLoad} from "./js/backstage/pluginLoad"
import module_ad from "./js/backstage/importModule"
import {IpcOperatePlugin} from "./js/backstage/operatePlugin"


void module_ad//API加载器
void pluginLoad//插件加载器

ProgramCycle.executePriority()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])




async function createWindow() {
  // Create the browser window.
    let win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth:800,
    minHeight:560,
    transparent: true,
    backgroundColor: '#00000000',
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
    frame: false
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}


app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');//允许音频自动播放


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    ProgramCycle.executeClosed()
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  ProgramCycle.executeProcess()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}





/**
 * 获取歌曲列表
 * @param {Electron.IpcMainEvent} event 
 * @param {*} arg 
 */
function getSonglist(event ,arg){
  let path = arg[0]
  let names = arg[1]
  let fileList =  getFilesAndFoldersInDir(path)
  let rt = []
  //遍历
  for(let i=0;i<fileList.length;i++){
    //判断后缀名是否在names中
    let h = fileList[i].path.split('.')
      for(let j=0;j<names.length;j++){
        if(h[h.length-1] == names[j]){
          rt.push(fileList[i])
        }
      }
  }

  event.sender.send('Songlist',[path,rt])
}




/**
 * 获取歌曲文件夹列表
 */
ipcMain.on("readFolderList",async(event,arg)=>{
  let con = await readFile('./userFile/filePath.json')
  event.sender.send('musicFolderList',[arg,con])
})


/**
 * 写入歌词文件夹列表
 */
ipcMain.on("changeFolderList",async(event,arg)=>{
  let con = await writeFile('./userFile/filePath.json',JSON.stringify(arg),'w')
  if(arg.length===0){
    con = await writeFile('./userFile/filePath.json',[],'w')
  }
  event.sender.send('changeFolder',con)
})

//获取歌曲列表
ipcMain.on('getSonglist',getSonglist)


//用于选取文件的时候获取文件的路径
ipcMain.on('open-Directory', function (event, p) {
  dialog.showOpenDialog({
      properties: ["openDirectory"],
      title: '请选择歌曲目录',
      buttonLabel: '选择'
  }).then(result => {
      event.sender.send('selectedItem', [p,result.filePaths[0]])
  })
});

//检查temp文件夹是否存在,如果不存在则进行创建

MonitorDispose.testTemp()

//监听歌曲信息获取事件
ipcMain.on('getFolderMusicInfo',MonitorDispose.getFolderMusicInfo)

//监听写入设置文件信息
ipcMain.on('globalSetSave',MonitorDispose.globalSetSave)

//监听读取设置文件信息

ipcMain.on('getGlobalSet',MonitorDispose.getGlobalSet)

//删除临时文件下的所有文件
ipcMain.on("clearTempAll",MonitorDispose.clear_Temp_File)

//使用ffmpeg进行转码率
ipcMain.on("ffpegTranscoding",MonitorDispose.ipc_ffmpeg_transcoding)


//开启一个http服务,用于音乐播放服务
const musicServer = new MusicHttpServer()
musicServer.startServer('userFile/temp')

ipcMain.on('getMusicServerPort',(event)=>{
  event.sender.send('getMusicServerPort',musicServer.getPort())
})

//获取歌词
ipcMain.on('ipcLyric',IpcLyric.Ipcentry)

ipcMain.on('getThemeFileContent',MonitorDispose.readTheme)

ipcMain.on('writeThemeFile',MonitorDispose.writeTheme)

ipcMain.on('getRenderPluginsContent',MonitorDispose.getRenderPluginsContent)

ipcMain.on("getAllPluginsInfo",MonitorDispose.getAllPulginInfo)

//禁用插件
ipcMain.on("setPluginEnable",IpcOperatePlugin.setPluginEnable)

//删除插件
ipcMain.on("removePlugins",IpcOperatePlugin.removePlugins)

ipcMain.on("importPlugin",IpcOperatePlugin.importPlugin)