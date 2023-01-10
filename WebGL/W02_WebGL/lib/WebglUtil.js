/**
 * 初始化WebGL 渲染程序
 * @param {*} vsSource
 */
function initShaders(gl, vsSource, fsSource) {
    /** @type {HTMLCanvasElement} */

    // 1 创建着色器对象
    // 1.1 加载顶点着色器到程序对象中
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    // 1.2 加载片元着色器到程序对象中
    const gragmentShaer = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // 2 将着色器对象中加载到程序对象中
    // 2.1 创建着色器对象
    const program = gl.createProgram();
    // 2.2 加载顶点着色器到程序对象
    gl.attachShader(program, vertexShader);
    // 2.3 加载片元着色器到程序对象
    gl.attachShader(program, gragmentShaer);

    // 3 连接Webgl上下文对象和程序对象
    gl.linkProgram(program);

    // 4 启动程序对象
    gl.useProgram(program);

    // 5 挂载程序对象到Webgl上下文(方便使用)
    gl.program = program;
    return program;
}

/**
 * 创建着色器对象并编译源码
 * @param {*} gl WebGL上下文对象
 * @param {*} shaderType 着色器对象
 * @param {*} shaderSource 着色器程序源代码
 * @returns
 */
function loadShader(gl, shaderType, shaderSource) {
    // 1、根据着色类型，创建着色器对象
    const shader = gl.createShader(shaderType, shaderSource);
    // 2、将着色器文件传入着色器对象中（将 着色器源代码 加载到 着色器对象中）
    gl.shaderSource(shader, shaderSource);
    // 3、编译着色器对象
    gl.compileShader(shader);
    return shader;
}

/**
 * 通过鼠标点击事件获取到WebGL中的坐标位置
 * @param {*} event Canvas的点击事件
 * @param {*} canvas canvas元素
 */
function getWebGLPositionByMouse(event, canvas) {
    // 1、获取当前鼠标点击的屏幕坐标
    const { clientX, clientY } = event;
    // console.log("clientX, clientY", clientX, clientY);

    // 2、获取Canvas在网页中的位置
    const { left, top } = canvas.getBoundingClientRect();
    // console.log("left, top", left, top);

    // 3、相对于canvas左上角的坐标
    const [canvas2dX, canvas2dY] = [clientX - left, clientY - top];
    // console.log("canvas2dX, canvas2dY", canvas2dX, canvas2dY);

    // 4、转换为webgl缩放坐标系坐标
    // 4.1 获取canvas的宽高
    const { width, height } = canvas.getBoundingClientRect();
    // console.log("width, height", width, height);

    // 4.2 获取WebgL坐标系下单位宽度下对应的px坐标长度
    // 单位宽高 对应的px 宽度为canvas的宽、高
    const [halfWidth, halfHeight] = [width / 2, height / 2];

    // 4.3 坐标系原点偏移：从画布左上角移动到画布中心
    const [xBaseCenter, yBaseCenterTop] = [canvas2dX - halfWidth, canvas2dY - halfHeight];

    // 4.4 坐标系y轴方向变化
    const yBaseCenter = -yBaseCenterTop;

    // 4.5 平面坐标系 转 webgl缩放坐标系
    const [x, y] = [xBaseCenter / halfWidth, yBaseCenter / halfHeight];
    // console.log("WebGL缩放坐标。x, y", x, y);
    return { x, y };
}

export { initShaders, getWebGLPositionByMouse };