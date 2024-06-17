class UnfoldAndClone{
    dom;
    rotate = 0

    showRotate =0
    cloneRotate = 0

    displayStyle = "block"

    get rotatePosition(){
        return this.rotate + "px";
    }

    get RotateY(){
        return this.rotate +"deg"
    }

    get RotateX(){
        return this.rotate ==0?"0deg" : (this.rotate - 45) +"deg"
    }



    /**
     * 
     */
    constructor(dom,displayStyle = "block",showRotate = 0,cloneRotate = 90){
        this.dom = dom;
        this.showRotate = showRotate;
        this.cloneRotate = cloneRotate;
        this.displayStyle = displayStyle;
    }

    show(){
        this.rotate = this.showRotate;
        this.dom.style.display = this.displayStyle;
        setTimeout(()=>{
            this.dom.style.transition = "transform 0.3s";
            this.dom.style.transform = `rotateY(${this.RotateY}) rotateX(${this.RotateX}`
        },10)
    }

    close(){
        this.rotate = this.cloneRotate;
        this.dom.style.transform = `rotateY(${this.RotateY}) rotateX(${this.RotateX}`
        setTimeout(()=>{
            this.dom.style.display = "none";
        },300)
    }
}


export default UnfoldAndClone;
export {UnfoldAndClone};