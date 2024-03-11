//FIXME: 该组件用于管理全局播放的音乐



/**
 * 管理全局的音乐播放,所有有关播放的控制器都在该类中
 * 
 */
class MusicManagement{
    /**
     * 音乐信息
     */
    static #info = {
        musicId:0,
        nowMusicName:"",
        nowMusicUri:"",
        nowMusicInfo:{},
        musicList:[],
    }

    /**
     * 设置音乐播放列表
     * 可在如切换歌单的时候使用，这将作为歌曲的播放顺序列表进行播放
     * - confuseMusicList 如果您想要随机打乱该列表可以使用该方法
     * @param {Array} data 列表信息 
     */
    static setMusicList(data){
        if(typeof(data) != "object"){
            //报错
            console.error("music list must be an array(setMusicList传入的数据需要是列表)");
            return;
        }
        this.#info.musicList = data;
    }


    /**
     * 通过种子随即打乱音乐列表
     * 种子可以为空,如果为空则会默认使用当前时间辍作为种子
     * @param {int} seed 
     */
    static confuseMusicList(seed = Date.now()){
        void seed
    }

    
}



export {MusicManagement};