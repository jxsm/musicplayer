import Color from 'color'

/**
 * h 色相
 * s 饱和度
 * v 亮度
 */

/**
 * 主题颜色管理
 */
import globalSet from "../assets/globalSet"

class ThemeColors{
    static colorList = [
        '--theme-colour',
        '--opposite-theme-colour',
        '--adjacent-theme-colour',
        '--adjacent-HighBrightness-colour',
        '--adjacentColour-theme-two',
        '--adjacent-theme-colour-d',
        '--oppositeAdjacent-theme-colour'
    ]

    /**
     * 设置主题颜色
     * @param {String} colour 
     */
    static set(colour){
        //看自动主题色是否器用
        if(!globalSet.getKey('autoColor')){
            return
        }


        //判断是浅色还是深色
        const color = Color(colour).hsv()
        if(color.color[2]>60){
            //浅色主题
            this.lightTheme(colour)
        }
        else{
            //深色主题
            this.darkTheme(colour)
        }
    
        
    }

    /**
     * 浅色主题
     */
    static lightTheme(colour){
          //主题色处理
          let lowSaturation = Color(colour).hsv();

          lowSaturation.color[1] = lowSaturation.color[1] * 0.7;
  
          lowSaturation.color[2] = lowSaturation.color[2] * 1.2
  
          document.documentElement.style.setProperty('--theme-colour', lowSaturation.toString());
  
          //相反色处理
          let oppositeColor = Color(colour).hsv();
          oppositeColor.color[0] = oppositeColor.color[0] + 180
          if(oppositeColor.color[0]>360){
              oppositeColor.color[0] = oppositeColor.color[0] - 360
          }
  
          oppositeColor.color[1] =  oppositeColor.color[1] * 1.1
          oppositeColor.color[2] = oppositeColor.color[2] * 0.8;
  
          document.documentElement.style.setProperty('--opposite-theme-colour',oppositeColor.toString())

          //邻近色
          let adjacentColour = Color(colour).hsv();
          adjacentColour.color[0] = adjacentColour.color[0] + 60
          adjacentColour.color[1] =  adjacentColour.color[1] * 0.8
          adjacentColour.color[2] = adjacentColour.color[2] * 0.8;
          document.documentElement.style.setProperty('--adjacent-theme-colour',adjacentColour.toString())

          //邻近色高亮度版本
          adjacentColour.color[2] = 100
          document.documentElement.style.setProperty('--adjacent-HighBrightness-colour',adjacentColour.toString())

          //邻近色2
          let adjacentColour2 = Color(colour).hsv();
          adjacentColour2.color[0] = adjacentColour.color[0] - 60
          adjacentColour2.color[1] =  adjacentColour.color[1] * 0.8
          adjacentColour2.color[2] = adjacentColour.color[2] * 0.8;
          document.documentElement.style.setProperty('--adjacentColour-theme-two',adjacentColour2.toString())

          //低透明度版本
         document.documentElement.style.setProperty('--adjacent-theme-colour-d',this.getOpacity(adjacentColour.toString(),0.5))


         //对比色
         let oppositeAdjacent = Color(colour).hsv();
         oppositeAdjacent.color[0] = oppositeAdjacent.color[0] + 60
         oppositeAdjacent.color[1] =  oppositeAdjacent.color[1] * 0.8
         oppositeAdjacent.color[2] = 90;

         document.documentElement.style.setProperty('--oppositeAdjacent-theme-colour',oppositeAdjacent.toString())

    }

    static darkTheme(colour){
            //主题色处理
            let lowSaturation = Color(colour).hsv();

            lowSaturation.color[1] = lowSaturation.color[1] * 0.7;
    
            lowSaturation.color[2] = lowSaturation.color[2] * 1.2
    
            document.documentElement.style.setProperty('--theme-colour', lowSaturation.toString());
    
            //相反色处理
            let oppositeColor = Color(colour).hsv();
            oppositeColor.color[0] = oppositeColor.color[0] + 180
    
            oppositeColor.color[1] =  oppositeColor.color[1] * 1.2

            oppositeColor = this.darkThemeEnhance(oppositeColor)
          
    
            document.documentElement.style.setProperty('--opposite-theme-colour',oppositeColor.toString())

            let adjacentColour = Color(colour).hsv();
            adjacentColour.color[0] = adjacentColour.color[0] + 60
            adjacentColour.color[1] =  adjacentColour.color[1] * 0.8
            adjacentColour = this.darkThemeEnhance(adjacentColour)
          
            document.documentElement.style.setProperty('--adjacent-theme-colour',adjacentColour.toString())

            //邻近色2
            let adjacentColour2 = Color(colour).hsv();
            adjacentColour2.color[0] = adjacentColour2.color[0] - 60
            if(adjacentColour2.color[0]<0){
                adjacentColour2.color[0] = adjacentColour2.color[0] + 360
            }
            adjacentColour2.color[1] =  adjacentColour2.color[1] * 0.8
            adjacentColour2 = this.darkThemeEnhance(adjacentColour2)
            document.documentElement.style.setProperty('--adjacentColour-theme-two',adjacentColour2.toString())

            //低透明度版本
            document.documentElement.style.setProperty('--adjacent-theme-colour-d',this.getOpacity(adjacentColour.toString(),0.5))

            //对比色
            let oppositeAdjacent = Color(colour).hsv();
            oppositeAdjacent.color[0] = oppositeAdjacent.color[0] + 60
            oppositeAdjacent.color[1] = 50
            oppositeAdjacent.color[2] = 30;
          
            document.documentElement.style.setProperty('--oppositeAdjacent-theme-colour',oppositeAdjacent.toString())
            console.log("深色")
    }

    /**
     * 获取主题颜色
     * 获取所有的主题颜色
     * @returns {Object}
     */
    static getAll(){
        let themeColour = {}

        for(let i = 0;i<this.colorList.length;i++){
            themeColour[this.colorList[i]] = document.documentElement.style.getPropertyValue(this.colorList[i])
        }
        return themeColour;
    }

    /**
     * 恢复到上一次的主题颜色
     */
    static restoreToLast(){
        const jsonStr =  localStorage.getItem('lastThemeColors')
        
        if(jsonStr){
            const lastThemeColors = JSON.parse(jsonStr)
            for(let i = 0;i<this.colorList.length;i++){
                document.documentElement.style.setProperty(this.colorList[i],lastThemeColors[this.colorList[i]])
            }
        }
        else{
            ThemeColors.set("#F5EF6D")
        }
    }

     //获取指定的颜色值并降低到指定的透明度
     static getOpacity(colour,opacity){
        const color  =  Color(colour)
        const y = color.color
        const old = `rgba(${y[0]},${y[1]},${y[2]},${opacity})`
        return old
    }

    /**
     * 对暗色主题进行增强
     * @param {Color} item 
     */
    static darkThemeEnhance(item){
        if(item.color[2] < 20){
            item.color[2] = (item.color[2]+20) * 1.5
        }
        else{
            item.color[2] = (item.color[2]+30) * 1.5
        }
        
        return item
    }

 
}



export default ThemeColors // 导出ThemeColors类