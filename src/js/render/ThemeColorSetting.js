import ColorThief from "colorthief"
const colorThief = new ColorThief()


class ThemeColorSetting{
    
    //TODO:自动主题色

    /**
     * 获取图片的主题色
     * @param {string} url 
     * @returns {Promise<[r,g,b]>}
     */
    static async getUrlThemeColor(url){
        //创建一个img节点
        const img = document.createElement('img');
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = url;
        return new Promise((resolve, reject) => {
            img.onload = () => {
                const color = colorThief.getColor(img);
                resolve(color);
            }
            img.onerror = () => {
                reject(new Error('图片加载失败'));
            }
        }
        )
    }


    /**
     * 获取Blob内容中的主题色
     * 请注意,传入的元素必须是Blob类型,否则会报错
     * @param {Blob} blob
     * @returns {Promise<[r,g,b]>}
     */
    static getBlobThemeColor(blob){
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        return new Promise((resolve, reject) => {
            img.onload = () => {
                const color = colorThief.getColor(img);
                resolve(color);
            }
            img.onerror = () => {
                reject(new Error('图片加载失败'));
            }
        })
    }

    
    /**
     * 获取img元素的主题色
     * 可以是未加载完成的图片,函数内会去等待图片加载完成
     * 但如果加载失败则仍然会报错
     * @param {HTMLImageElement} img 
     * @param {Promise<[r,g,b]>}
     */
    static getImgThemeColor(img){
        
        if(!img.complete){
            //该图片还未加载完成
            return new Promise((resolve, reject) => {
                img.onload = () => {
                    const color = colorThief.getColor(img);
                    resolve(color);
                }
                img.onerror = () => {
                    reject(new Error('图片加载失败'));
                }
            })    
        }
        else{
            return new Promise((resolve,reject) => {
                if(img.naturalHeight ===0){
                    reject(new Error('图片加载失败'));
                }
                const color = colorThief.getColor(img);
                resolve(color);
            })
        }
    }


    static rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
      
}




export default ThemeColorSetting;