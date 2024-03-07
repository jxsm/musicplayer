# musicplayer

# 该项目是一个跨平台的音乐播放器

**首先,如果您是linux用户或mac用户,请先自行安装ffmpeg**

**ubuntu**

```bash
sudo apt-get install ffmpeg
```

**windows用户会使用软件中自带的ffmpeg，不过要注意的是,该ffmpeg为64位的切确保win10和win11可以运行,其他windows版本暂时不确定**

# 还未制作完成,正在制作中

# 依赖

**electron**
**vue**
**ffmpeg**

## # 注意

**该项目需要使用到ffmpeg,默认是使用内置的ffmpeg(需要自行下载ffmpeg放到ffmpeg目录下,然后在`background.js`中注册ffmpeg路径的位置)**

**如果你想构建好的项目使用系统环境变量中的ffmpeg则可以在`background.js`中将`ffmpegPath`给换成空对象:**

```js
// ffmpegPath = {
//   Windows_NT:"ffmpeg/win/ffmpeg-2024-03-04-git-e30369bc1c-full_build/bin/ffmpeg.exe",
//   Darwin:"ffmpeg/mac/ffmpeg",
//   Linux:"ffmpeg/linux/ffmpeg-6.1-amd64-static/ffmpeg"
// }

ffmpegPath = {}
```

# 构建项目

****

**应为该项目使用到了vue3，所以在构建项目前,请确保您已经正确的安装了vue@3.2.13>= 的版本以及vue/cli**

```bash
# 先从git上克隆仓库
git clone https://github.com/jxsm/musicplayer.git
# 进入项目
cd musicplayer
# 下载依赖
npm install
# 启动项目
npm run electron:serve
# 打包项目
npm run build

```
