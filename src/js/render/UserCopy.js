import proceedHint from "../../../public/static/proceedHint";
class UserCopy{

    /**
     * 用户复制内容
     * @param {string} content 要复制的内容
     * @returns {Boolean} 是否成功
     */
    static copy(content) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(content)
            .catch(err=>{
                console.error('无法复制到剪贴板', err);
                return false;
            })

            return true;
        }
     }

     /**
      * 带地小提示的复制
      * @param {string} content 复制的内容
      * @param {string} [completeHint="复制成功"] //复制成功的提示
      * @param {string} [loseHint="复制失败"] //复制失败的提示
      */
    static copyWithMiniHint(content,completeHint = "复制成功",loseHint = "复制失败"){
        if(this.copy(content)){
            proceedHint.MinWindowHint.hint(completeHint)
        }
        else{
            proceedHint.MinWindowHint.hint(loseHint)
        }
    }
}




export default UserCopy;
