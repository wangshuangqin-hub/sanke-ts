// 游戏控制器,控制其他所有的类
import Food from './Food'
import ScorePannel from './ScorePanel'
import Snake from './Snake'
class GameControl {
    // 定义三个属性
    // 蛇
    snake:Snake;
    food:Food;
    scorePannel:ScorePannel;
    // 创建一个属性来控制蛇的移动方向(也就是按键的方向)
    direction:string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive = true
    constructor(){
        this.snake = new Snake()
        this.food = new Food()
        this.scorePannel = new ScorePannel(10,2)
        this.init()
    }
    // 游戏的初始化方法,调用后游戏开始
    init(){
        // 绑定键盘案件按下的事件
        
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run()
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        /*
            ArrowUp Up
            ArrowDown Down
            ArrowLeft Left
            ArrowRight Right

        */
    //    console.log(this,'this指向')
    // 赋值之前检查event.key是否合法,判断用户是否按的是方向键
       this.direction = event.key
        // console.log(event.key)
    }
    // 创建一个控制蛇移动的方法
    /*
    
    根据方向来使蛇的位置改变*/
    // 向上 top减少
    // 向下 top增加
    // 向右 left增加
    // 向左 left减少
    run(){
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y-= 10
                break;
            case 'ArrowDown':
            case 'Down':
                Y+= 10
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break;
            case 'ArrowRight':
            case 'Right':
                X+= 10
                break;
        }
        // debugger
        // 检查蛇是否吃到了食物
        this.checkEat(X,Y)
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error) {
            // 进入到cathc，说明出现了异常，游戏结束，不再开启定时器，弹出提示信息
            alert('游戏结束!')
            this.isLive = false
        }

        // 开启一个定时器 ,等级越高,移速越快，蛇活着的时候才能移动
        this.isLive &&　setTimeout(this.run.bind(this), 300 - (this.scorePannel.level -1)*30);
    }
    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(x:number ,y:number){//参数表示蛇的新坐标
        // 如果蛇的坐标和食物的坐标一致，代表蛇吃到了食物
        if(x == this.food.X && y === this.food.Y){
            // 食物的位置需要重置
            this.food.change()
            // 分数需要增加
            this.scorePannel.addScore()
            // 蛇要增加一节
            this.snake.addBody()
        }
    }
}
export default GameControl