## 节点操作

### 创建节点
```javascript
$("要创建的节点");
```

### 选择节点

```javascript
/*
.parents()					// 获取当前节点所有的父节点,可以配合eq选择器选择到某一层父节点
.parent()					// 获取当前父节点
.children()					// 获取当前子节点 返回一个集合
    .children("表达式")		// 可以进行筛选 例(div[class='one']
    .children[下标]			// 通过下标筛选
.next()						// 下一个兄弟节点
.prev()						// 上一个兄弟节点
.siblings()					// 所有的兄弟节点
    .siblings("表达式")     // 可以进行筛选
remove()                    // 删除节点
*/
```

### 插入节点
#### 内部插入

```javascript
/*
内部插入节点前为最前方，后为最后方
append()//追加至节点后
    A.append(B)		//B追加至A节点后面
appendTo()//追加至节点后
    A.appendTo(B)		//A追加至B节点后面
prepend()//追加至节点前
    A.prepend(B)	//B追加至A节点前面
prependTo()//追加至节点前
    A.prependTo(B)	//A追加至B节点前面
*/
```

#### 外部插入

```javascript
/*
after()
//插入至节点后
    A.after(B)		//B插入到A后面
insertAfter()
//插入至节点后
    A.insertAfter(B)//A插入到B后面
before()
//插入至节点前
    A.before(B)		//B插入到A前面
insertBefore()
//插入至节点前
    A.insertBefore(B)//B插入到A前面
*/
```

### 替换节点

```javascript
/*
replaceWith() //替换节点
    A.replaceWith(B)//吧A替换成B
replaceAll() //替换节点
    A.replaceAll(B)//吧B替换成A
*/
```

### 复制节点

```javascript
/*
clone() //复制节点
*/
```

### 删除节点

```javascript
/*
remove() //删除节点
A.remove()	//删除remove节点
remove(A)	//删除remove节点
*/
```