/**
 * 提示类,该类中封装了大部分的提示方法,当然也可以自定义提示
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


module.exports = {proceedHint} // 导出proceedHint类


