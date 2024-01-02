const Color = require('color');



/**
 * 主题颜色管理
 */
class ThemeColors{
    /**
     * 设置主题颜色
     * @param {String} colour 
     */
    static set(colour){
        const color  =  Color(colour)
        document.documentElement.style.setProperty('--theme-colour', color.toString());
        //在设置后要找到颜色的对比色
        const oppositeColor = Color.rgb(255-color.color[0],255-color.color[1],255-color.color[2])
        document.documentElement.style.setProperty('--opposite-theme-colour',oppositeColor.toString())
        //邻近色
        const adjacentColour = Color.rgb(255-color.color[0]/2,255-color.color[1]/2,255-color.color[2]/2)
        document.documentElement.style.setProperty('--adjacent-theme-colour',adjacentColour.toString())
        //对比色的临近色
        const oppositeAdjacent = Color.rgb(255-oppositeColor.color[0]/4,255-oppositeColor.color[1]/4,255-oppositeColor.color[2]/4)
        document.documentElement.style.setProperty('--oppositeAdjacent-theme-colour',oppositeAdjacent.toString())
        //比主题是浅
        
    }

    /**
     * 获取主题颜色
     */
    static get(){
        return getComputedStyle(document.documentElement).getPropertyValue('--theme-colour');
    }

}


module.exports = {ThemeColors} // 导出ThemeColors类
