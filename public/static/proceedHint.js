/**
 * 提示类,该类中封装了侧边推出提示组件的使用
 */
class proceedHint {

    /**
     * 提示
     * @param {String} content 提示内容
     * @param {String} [title = "提示"] 提示标题
     * @param {int} time 提示时间
     */
    static commonHint(content,title="提示",time=3000){
        this.general(content,title,"#3653f6","#242323",time,1)
    }

    /**
     * 警告
     * @param {String} content 提示内容
     * @param {String}   [title = "警告"] 提示标题
     * @param {int} time 提示时间
     */
    static warning(content,title="警告",time=3000){
        this.general(content,title,'#F73859','#242323',time,3)
    }


    /**
     * 提醒
     * @param {String} content 提示内容
     * @param {String} [title = "提醒"] 提示标题
     * @param {int} time 提示时间
     */
    static warn(content,title="提醒",time=3000){
        this.general(content,title,'#FFCF3F','#242323',time,2)
    }

    /**
     * 通用提示函数
     * @param {String} content 提示内容
     * @param {String} title  标题内容
     * @param {String} titleColor 提示栏颜色
     * @param {String} background 提示框背景颜色
     * @param {Int16Array} time 提示时间
     * @param {number} [level=1] 通知等级
     */
    static general(content,title,titleColor,background,time,level = 1){
        let warningEvent = new CustomEvent('hint',{
            detail:{
                title:title,
                content:content,
                titleColor:titleColor,
                time:time,
                background:background,
                level:level
            }
        });
        window.dispatchEvent(warningEvent);
    }
    

}



/**
 * 页面底部的小弹窗的管理类
 */
class MinWindowHint{

    /**
     * 页面底部的小弹窗提示
     * @param {string} hintText 提示文字 
     * @param {Number} [time = 1000]  持续时间
     */
    static hint(hintText,time=1000){
        this.general(hintText,"var(--theme-colour)","var(--opposite-theme-colour)",time)
    }


    /**
     * 页面底部的小弹窗
     * @param {string} hintText 提示文字 
     * @param {string} backgroundColor 背景颜色
     * @param {string} color 字体颜色
     * @param {Number} time 持续时间
     */
    static general(hintText,backgroundColor,color,time){
        let message = new CustomEvent('miniHint',{
            detail:{
                hintText:hintText,
                backgroundColor:backgroundColor,
                color:color,
                time:time
            }
        });
        window.dispatchEvent(message);
    }
}


export {proceedHint,MinWindowHint} // 导出proceedHint类

