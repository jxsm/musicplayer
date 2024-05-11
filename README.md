# musicplayer

# 该项目是一个跨平台的音乐播放器

**首先,如果您是linux用户或mac用户,请先自行安装ffmpeg**

**ubuntu**

```bash
sudo apt-get install ffmpeg
```

# 还未制作完成,正在制作中

## # 注意

**该项目需要使用到ffmpeg,默认是使用ffmpeg文件夹下ffmpeg(需要自行下载ffmpeg放到ffmpeg目录下,然后在 `background.js`中注册ffmpeg路径的位置)**

**如果你想构建好的项目使用系统环境变量中的ffmpeg则可以在 `background.js`中将 `ffmpegPath`给换成空对象:**

```js
// ffmpegPath = {
//   Windows_NT:"ffmpeg/win/ffmpeg-2024-03-04-git-e30369bc1c-full_build/bin/ffmpeg.exe",
//   Darwin:"ffmpeg/mac/ffmpeg",
//   Linux:"ffmpeg/linux/ffmpeg-6.1-amd64-static/ffmpeg"
// }

ffmpegPath = {}
```

# 启动项目

```bash
# 先从git上克隆仓库
git clone https://github.com/jxsm/musicplayer.git
# 进入项目
cd musicplayer
# 下载依赖
npm install
# 启动项目
npm run electron:serve


```

# 构建项目

```
# 先从git上克隆仓库
git clone https://github.com/jxsm/musicplayer.git
# 进入项目
cd musicplayer
# 下载依赖
npm install
# 设置环境变量
   # linux || mac
export NODE_OPTIONS=--openssl-legacy-provider
   # windows
set NODE_OPTIONS=--openssl-legacy-provider

# 构建
npm run electron:build


```

# 预览

![1715440897319](images/README/1715440897319.png)

![1715440957063](images/README/1715440957063.png)

![1715440964467](images/README/1715440964467.png)

![1715440973100](images/README/1715440973100.png)
