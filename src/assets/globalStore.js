
let  globalStore = {
   'musicVolume':0,
   'playMode':1,
   'currentPath':{},//当前选中的文件路径
   'themeColorName':[
      '--theme-colour',
      '--opposite-theme-colour',
      '--adjacent-theme-colour',
      '--adjacent-HighBrightness-colour',
      '--adjacentColour-theme-two',
      '--adjacent-theme-colour-d',
      '--oppositeAdjacent-theme-colour'
   ]
}

let firstTime = true

/**
 * 更改全局变量的指定方法,
* 并可以选择是否通知其他组件
值得注意的是,如果你想删除一个全局变量,请将value设置为null
 * @param {String} key 
 * @param {All} value 
 * @param {Boll} [false]
 */
function alterGlobalStore(key,value,inform = false){
   let tempOldValue = JSON.parse(JSON.stringify(globalStore[key]))
   try{
      if(value != null){
         globalStore[key] = value
      }else{
         delete globalStore[key]
      }
   }catch(e){
      console.error(e)
      //检查值是否已经被更改
      if(globalStore[key] != value){
         return
      }
   }

   if(inform){
      let incident = new CustomEvent(`globalStore:${key}`,{
            detail:{
                key:key,
                value:value,
                oldValue:tempOldValue
            }
        });
        window.dispatchEvent(incident);
   }


   save()
}

/**
 * 获取公共变量中的值
 * @param {String} key 
 */
function getGlobalStore(key){
   if(firstTime){
      localLoading()
      firstTime = false
   }
   
    return globalStore[key]
}

/**
 * 通过Object对象设置到公共变量中,注意在存储时key依旧会被转成String类型
 * 也就是说在读取的时候请传入字符串
 * @param {Object} parameter 
 * @param {boolean} [inform=false]  是否进行通知,值得注意的是该通知是分开的
 */
function globalStore_Object(parameter,inform = false){
   for(let akey in parameter){
      alterGlobalStore(akey,parameter[akey],inform)
   }
   
}

/**
 * 返回所有公共变量
 */
function getAll(){
   const temp = JSON.stringify(globalStore)
   return JSON.parse(temp)
}


function save(){
   localStorage.setItem("globalStore",JSON.stringify(globalStore))
}

/**
 * 加载缓存中的数据到内存中
 */
function localLoading(){
   const data =  localStorage.getItem("globalStore")
   if(data){
      globalStore = JSON.parse(data)
   }
}



module.exports = {alterGlobalStore,getGlobalStore,globalStore_Object,getAll}
