/**
 * 提示类,该类中封装了大部分的提示方法,当然也可以自定义提示
 */
class proceedHint {

    /**
     * 提示
     * @param {String} content 提示内容
     * @param {String} title 提示标题[警告]
     * @param {int} time 提示时间
     */
    static commonHint(content,title="提示",time = 3000){
        let tempEvent = new CustomEvent('hint',{
            detail:{
                title:title,
                content:content,
                titleColor:'#3653f6',
                time:time,
                background:'#242323',
            }
        });
        window.dispatchEvent(tempEvent);
    }

    /**
     * 警告
     * @param {String} content 提示内容
     * @param {String} title 提示标题[警告]
     * @param {int} time 提示时间
     */
    static warning(content,title="警告",time = 3000){
        let warningEvent = new CustomEvent('hint',{
            detail:{
                title:title,
                content:content,
                titleColor:'#F73859',
                time:time,
                background:'#242323',
            }
        });
        window.dispatchEvent(warningEvent);
    }


    /**
     * 提醒
     * @param {String} content 提示内容
     * @param {String} title 提示标题[警告]
     * @param {int} time 提示时间
     */
    static warn(content,title="提醒",time = 3000){
        let warningEvent = new CustomEvent('hint',{
            detail:{
                title:title,
                content:content,
                titleColor:'#FFCF3F',
                time:time,
                background:'#242323',
            }
        });
        window.dispatchEvent(warningEvent);
    }

    /**
     * 通用提示函数
     * @param {String} content 提示内容
     * @param {String} title  标题内容
     * @param {String} titleColor 提示栏颜色
     * @param {String} background 提示框背景颜色
     * @param {Int16Array} time 提示事件
     */
    static general(content,title,titleColor,background,time){
        let warningEvent = new CustomEvent('hint',{
            detail:{
                title:title,
                content:content,
                titleColor:titleColor,
                time:time,
                background:background,
            }
        });
        window.dispatchEvent(warningEvent);
    }
    

}


module.exports = {proceedHint} // 导出proceedHint类


