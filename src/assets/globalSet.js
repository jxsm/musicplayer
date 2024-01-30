


//设置通用的调用文件
class globalSet{
    static #setInfo = {
        'readFileType':['mp3','ogg','acc','wav']
    }

    /**
     * 更新设置,值得注意的是,如果你想删除一个设置键请将这个键的值设置为null(注意这里必须是null)
     * @param {String} key 键 
     * @param {All} value 值
     * @param {boolean} [announcement=false] 是否发出通知
     */
    static update(key,value,announcement = false){
        const oldValue = this.#setInfo[key];
        if(value != null){
            this.#setInfo[key] = value;
        }
        else{
            delete this.#setInfo[key];
        }


        if(announcement) this.announcement(key,value,oldValue);
        this.save()

    }


    /**
     * 公告通知函数
     * @param {*} key 键名 
     * @param {*} value 新的值
     * @param {*} oldValue 旧的值
     */
    static announcement(key,value,oldValue){
        let incident = new CustomEvent(`globalSet:${key}`,{
            detail:{
                key:key,
                value:value,
                oldValue:oldValue
            }
        });
        window.dispatchEvent(incident);
    }


    /**
     * 直接进行设置(会替换所有的设置内容,建议只在建在的时候才用)
     * @param {Object} infos  
     */
    static set(infos){
        this.#setInfo = infos;
    }

    /**
     * 获取所有的设置信息,不够要注意的是,你获取到的是克隆出来的数据
     * 更改此数据并不会直接影响到设置中的内容
     * @see update 如果需要更改设置里的内容请使用该函数
     */
    static getALl(){
        return {...this.#setInfo};
    }

    /**
     * 您需要向该函数传入一个对象,此函数会将该对象的每一个键值对都赋值给设置变量,
     * 值得注意的是,使用该函数,并设置需要发出通知的时候,该通知是每一个键发出一次,而不再一齐发出
     * 
     * @param {Object} infos 承载着信息的对象
     * @param {boolean} [announcement=false] 是否进行通知
     */
    static set_Object(infos,announcement = false){
        for(let key in infos){
            this.update(key,infos[key],announcement)
        }
    }

    //将信息保存到本地文件中
    static save(){
        localStorage.setItem('globalSet',JSON.stringify(this.#setInfo))
        window.ipcRenderer.send('globalSetSave',[this.#setInfo])
    }

    /**
     * 获取指定key都数据
     * @param {String} key  键的值(获取到的是拷贝的值)
     */
    static getKey(key){
        return {...this.#setInfo}[key]
    }
}


module.exports = globalSet;

//TODO:该做启动的是的加载设置文件了,然后就开始开始读音乐信息了