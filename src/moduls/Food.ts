// 定义类,通过类创建对象
// 定义食物类FOOD
class Food{
    // 定义一个属性标识食物所对应的元素
    element:HTMLElement;
    constructor(){
        // 加!表示这个元素一定存在,获取页面中的food元素并赋值给element
        this.element = document.getElementById('food')!;
    }
    // 定义一个获取食物x轴坐标
    get X(){
        return this.element.offsetLeft
    }
    get Y(){
        return this.element.offsetTop
    }
    // 修改食物的位置
    change(){
        // 生成一个随机的位置,确认坐标位置的上限(left:0 :290) (top:0,290),每次移动的距离是一格
        let left = (Math.round(Math.random()*29))*10//生成的事0-29之间的数据,再乘以10,就是10的倍数
        let top = (Math.round(Math.random()*29))*10//生成的事0-29之间的数据,再乘以10,就是10的倍数
        this.element.style.left = left+'px'
        this.element.style.top = top+'px'
    }
}
export default Food;