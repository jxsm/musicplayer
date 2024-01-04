
let  globalStore = {
   'musicVolume':0,
}

/**
 * 更改全局变量的指定方法,
* 并可以选择是否通知其他组件
值得注意的是,如果你想删除一个全局变量,请将value设置为null
 * @param {String} key 
 * @param {All} value 
 * @param {Boll} [false]
 */
function alterGlobalStore(key,value,inform = false){
   let tempOldValue = globalStore[key]

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
   

}



/**
 * 获取公共变量中的值
 * @param {String} key 
 */
function getGlobalStore(key){
    return globalStore[key]
}



module.exports = {alterGlobalStore,getGlobalStore}
