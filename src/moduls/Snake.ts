class Snake {
    // 表示蛇的元素
    head:HTMLElement;
    // 蛇的身体
    bodies:HTMLCollection;
    // 获取蛇的容器
    element:HTMLElement;
    constructor() {
        this.head = document.querySelector('#snake > div') as HTMLElement
        this.element = document.getElementById('snake')!
        this.bodies = this.element.getElementsByTagName('div');
        
    }
    // 获取蛇的坐标(蛇头的坐标)
    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }
    set X(value:number){
        // 如果新值和旧值相等，则直接返回不再修改
        if(this.X == value){
            return 
        }
        if(value < 0 || value >290){
            // 进入判断，说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        // 修改x时,是在修改水平坐标,蛇在左右移动过程中,向左走则不能向右走,反之亦然
        // 如果蛇头的坐标和第一节身体的坐标相同,则是掉头,如果最开始没有身体,则需要另外判断
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            console.log('水平放线发生了掉头')
            // 如果发生了掉头,不改变蛇最开始的运动方向
            if(value > this.X){
                // 如果新值大于旧值,这说明蛇在向右走,此时发生了掉头,
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }
        this.moveBody()
        this.head.style.left = value+'px'
        this.checkHeadBody()
    }
    set Y(value:number){
        if(this.Y == value){
            return 
        }
        if(value < 0 || value >290){
            // 进入判断，说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        // 修改x时,是在修改水平坐标,蛇在左右移动过程中,向左走则不能向右走,反之亦然
        // 如果蛇头的坐标和第一节身体的坐标相同,则是掉头,如果最开始没有身体,则需要另外判断
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            console.log('水平放线发生了掉头')
            // 如果发生了掉头,不改变蛇最开始的运动方向
            if(value > this.Y){
                // 如果新值大于旧值,这说明蛇在向右走,此时发生了掉头,
                value = this.Y- 10
            } else {
                value = this.Y + 10
            }
        }
        this.moveBody()
        this.head.style.top = value+'px'
        this.checkHeadBody()
    }
    // 蛇增加身体的方法
    addBody(){
        // 像蛇的身体增加一个div
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
    }
    // 蛇吃食物之后增加身体长度
    moveBody(){
        //遍历所有的身体
        for (let i = this.bodies.length-1; i > 0; i--) {
            
            // 获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            // 设置到当前身体上
            (this.bodies[i]as HTMLElement).style.left = X +'px';
            (this.bodies[i]as HTMLElement).style.top = Y +'px';
            
        }
    }
    // 检查蛇是否撞到了自己的身体
    checkHeadBody(){
        // 获取所有的身体,检查是和我们的蛇头坐标发生了重叠,如果重叠,代表撞到了自己的身体
        for (let i = 1; i < this.bodies.length; i++) {//排除蛇头的位置
            if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop){
                // 进入判断说明蛇头撞到了身体,游戏结束
                throw new Error('撞到自己了')
            }
            
        }
    }
}
export default Snake