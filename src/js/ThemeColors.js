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
        
        //临近色2
        let newColour = Color.rgb(ad(color.color)) 
        



        document.documentElement.style.setProperty('--adjacentColour-theme-two',newColour.toString())


        document.documentElement.style.setProperty('--adjacent-theme-colour',adjacentColour.toString())
        //低透明度版本
        document.documentElement.style.setProperty('--adjacent-theme-colour-d',this.getOpacity(adjacentColour.toString(),0.5))



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

    //获取指定的颜色值并降低到指定的透明度
    static getOpacity(colour,opacity){
        const color  =  Color(colour)
        const y = color.color
        const old = `rgba(${y[0]},${y[1]},${y[2]},${opacity})`
        return old
    }

}


module.exports = {ThemeColors} // 导出ThemeColors类



function ad(rgb){
    const max = Math.max(...rgb);
    const min = Math.min(...rgb);
    const delta = max - min;

    const adjacentColors = [];

    for (let i = 0; i < 3; i++) {
        let newValue = rgb[i] + (i === 0 ? 1 : -1);
        
        if (newValue > max) {
            newValue = max - delta / 2;
        } else if (newValue < min) {
            newValue = min + delta / 2;
        }
        
        adjacentColors.push(newValue);
    }

    return adjacentColors
}