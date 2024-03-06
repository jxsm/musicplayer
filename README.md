---
renderNumberedHeading: true
title: musicplayer
---

# 该项目是一个跨平台的音乐播放器

**首先,如果您是linux用户或mac用户,请先自行安装ffmpeg**

**ubuntu**
```bash
sudo apt-get install ffmpeg
```

**windows用户会使用软件中自带的ffmpeg，不过要注意的是,该ffmpeg为64位的切确保win10和win11可以运行,其他windows版本暂时不确定**

# 还未制作完成,正在制作中


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


