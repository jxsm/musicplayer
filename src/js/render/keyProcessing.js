/**
 * 按键操作与处理
 */
class keyProcessing{
    static keydownFunc = {} ;//处理函数
    static keyupFunc = {} ;//处理函数
    static pressKeys = {} ;//按键状态
    static isConsole =false;//是否打印当前的按键    
    


    static init(){
        
          //全局监听按键
          this.pressKeys ={}
          window.addEventListener('keydown', event => {
            if(this.isConsole) console.log(event)
              this.pressKeys[event.code] = true
              this.executeProcessing(event.code,true)
          });
  
          window.addEventListener('keyup',  event => {
            if(this.isConsole) console.log(event)
              this.pressKeys[event.code] = false
              this.executeProcessing(event.code,false)
          })
    }

    /**
     * 执行按键处理函数
     * @param {string} key 按键的code值
     * @param {boolean} isdown 是否为按下事件
     */
    static executeProcessing(key,isdown){
        if(isdown){
            if(!this.keydownFunc[key]) return

            for(let func of this.keydownFunc[key]){
                func();
            }
        }
        else{
            if(!this.keyupFunc[key]) return
            for(let func of this.keyupFunc[key]){
                func();
            }
        }
    }


    /**
     * 添加按键按下的事件处理函数
     * @param {KeyboardEvent.code} key 
     * @param {Function} func 
     */
    static addKeydownFunc(key,func){
        if(!this.keydownFunc[key]) this.keydownFunc[key] = []
        this.keydownFunc[key].push(func)
    }

    /**
     * 添加按键松开的事件处理函数
     * @param {KeyboardEvent.code} key 
     * @param {Function} func 
     */
    static addKeyupFunc(key,func){
        if(!this.keyupFunc[key]) this.keyupFunc[key] = []
        this.keyupFunc[key].push(func)
    }

    /**
     * 删除按键按下的事件处理函数
     * @param {string} key 
     * @param {Function} func 
     * @returns 
     */
    static removeKeydownFunc(key,func){
        if(!this.keydownFunc[key]) return
        let index = this.keydownFunc[key].indexOf(func)
        if(index>=0) this.keydownFunc[key].splice(index,1)
    }

    /**
     * 
     * @param {string} key 
     * @param {Function} func 
     * @returns 
     */
    static removeKeyupFunc(key,func){
        if(!this.keyupFunc[key]) return
        let index = this.keyupFunc[key].indexOf(func)
        if(index>=0) this.keyupFunc[key].splice(index,1)
    }
    
}


keyProcessing.init()
export default keyProcessing;
