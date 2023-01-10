export default class Compose {
    constructor() {
        // 父对象，合成对象可以相互嵌套
        this.parent = null;
        // 子对象集合，其集合元素可以是时间轨，也可以是合成对象
        this.children = [];
    }

    /**
     * 添加子对象方法
     * @param {*} obj
     */
    add(obj) {
        obj.parent = this;
        this.children.push(obj)
    }

    /**
     * 基于当前时间更新子对象状态的方法
     * @param {*} t
     */
    update(t) {
        this.children.forEach(ele => {
            ele.update(t);
        });
    }
}