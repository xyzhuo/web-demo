"use script";
/**
 *  弹出框
 *  
<style>
    .popup-ele {
        position: absolute;
        z-index: 9999;
        top: 20px;
        left: 20px;
        color: #ffffff;
    }
    
    .popup-ele>.popup-content {
        margin-left: 24px;
        margin-bottom: 2px;
        padding: 5px;
        background-color: black;
    }
    
    .popup-ele>.popup-traction {
        width: 100%;
        height: 40px;
        background: url(./popupLbl.png) no-repeat;
    }
    
    .popup-ele>.popup-content>div {
        display: flex;
        border-bottom: 1px solid #aaaaaa;
        border-left: 1px solid #aaaaaa;
        border-right: 1px solid #aaaaaa;
    }
    
    .popup-ele>.popup-content>div:nth-child(1) {
        border-top: 1px solid #aaaaaa;
    }
    
    .popup-ele>.popup-content>div>div:nth-child(1) {
        min-width: 80px;
        max-width: 100px;
        padding: 5px 10px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #aaaaaa;
    }
    
    .popup-ele>.popup-content>div>div:nth-child(2) {
        max-width: 200px;
        padding: 5px 10px;
    }
</style>
<body>
    <div class="popup-ele">
        <div class="popup-content">
            <div>
                <div>名称</div>
                <div>B-1轰炸机</div>
                <!-- <div>广东省广州市番禺区钟村街道汉溪村4巷8号601房</div> -->
            </div>
            <div>
                <div>地址</div>
                <div>广东省广州市番禺区钟村街道汉溪村4巷8号601房</div>
            </div>
        </div>
        <div class="popup-traction"></div>
    </div>
</body>
 * @param {*} container 
 * @param {*} popupInfos 
 * @returns 
 */
var Popup = function(container, viewer, popupInfos, option = {}) {
    return new _Popup(container, viewer, popupInfos);
}
var _Popup = function(container, viewer, popupInfos) {
    console.log("infos", container, popupInfos);
    console.log("this", this);
    // var containerEle = document.getElementById(container);
    // if (!containerEle) {
    //     console.error("找不到存放元素的容器");
    //     return {};
    // }

    var containerEle = viewer._element;

    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function(event) {
        var position = viewer.scene.pickPosition(event.position);
        // 从笛卡尔坐标获取经纬度
        var cartographic = Cesium.Cartographic.fromCartesian(position);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        console.log("position", position);
        console.log(Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, Cesium.Cartesian3.fromDegrees(popupInfos.position.longitude, popupInfos.position.latitude)));
        console.log({ longitude, latitude, height: cartographic.height });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    var winPosition = this.lnglat2Window(viewer, popupInfos.position);
    var popupStyle = {
        "position": "absolute",
        "z-index": "9999",
        // // "bottom": "200px",
        "top": winPosition.y + "px",
        "left": winPosition.x + "px",
        // "top": "0px",
        // "left": "0px",
        "color": "#ffffff",
        // "border": "1px solid red",
        "transform": "translate(0, -100%)"
    };
    var popupElement = this.createElement("div", popupStyle);
    containerEle.appendChild(popupElement); // 添加子元素

    // 时钟监听，修改牵引线弹窗的位置
    viewer.clock.onTick.addEventListener(() => {

        var winPosition = this.lnglat2Window(viewer, popupInfos.position);

        // if (window.log) {
        //     console.log("winPosition", winPosition);
        // }
        this.setElementStyle(popupElement, {
            "top": winPosition.y + "px",
            "left": winPosition.x + "px"
        });
    });

    // 生成属性表
    var popupContentStyle = {
        "margin-left": " 24px",
        "margin-bottom": "2px",
        "border-radius": "5px",
        "padding": "5px",
        "background-color": "black",
    };
    var popupContentElement = this.createElement("div", popupContentStyle);
    popupContentElement.appendChild(this.generatePropertyTable(popupInfos.contents));
    popupElement.appendChild(popupContentElement); // 添加子元素

    // 生成牵引线：一个div，设置div的背景图片
    var popupTractionStyle = {
        "width": "100%",
        "height": "40px",
        "background": "url(./popupLbl.png) no-repeat"
    };
    var popupTractionElement = this.createElement("div", popupTractionStyle);
    popupElement.appendChild(popupTractionElement); // 添加子元素
}

/**
 * 构建弹窗的内容
 * @param {*} contentInfos 
 * @returns 
 */
_Popup.prototype.generatePropertyTable = function(contentInfos) {
    console.log("contentInfos", contentInfos);
    var propertyTable = this.createElement("div");
    // propertyTable.appendChild(this.createTextNode("添加子元素"));

    // 弹框属性表的样式
    var rowStyle = {
        "display": "flex",
        "border-bottom": "1px solid #aaaaaa",
        "border-left": "1px solid #aaaaaa",
        "border-right": "1px solid #aaaaaa"
    }

    var cellStyle01 = {
        "min-width": "80px",
        "max-width": "100px",
        "padding: 5p": "10px",
        "text-align": "center",
        "display": "flex",
        "justify-content": "center",
        "align-items": "center",
        "border-right": "1px solid #aaaaaa"
    }

    var cellStyle02 = {
        "max-width": "200px",
        "padding": "5px 10px"
    }

    // 根据属性信息构建属性表
    for (var index in contentInfos) {
        console.log("contentInfo", index, contentInfos[index]);
        // 创建行
        var row = this.createElement("div", rowStyle);
        if (index == 0) { // 第一行，设置顶部分割线
            this.setElementStyle(row, {
                "border-top": "1px solid #aaaaaa"
            })

        }
        // 添加列
        // 第1列
        var cel01 = this.createElement("div", cellStyle01);
        cel01.appendChild(this.createTextNode(contentInfos[index].key));
        row.appendChild(cel01);
        // 第2列
        var cel02 = this.createElement("div", cellStyle02);
        cel02.appendChild(this.createTextNode(contentInfos[index].value));
        row.appendChild(cel02);

        propertyTable.appendChild(row);
    }
    return propertyTable;
}

/**
 * 经纬度坐标转屏幕坐标
 * @param {*} viewer Cesium
 * @param {*} lnglat 经纬度坐标
 */
_Popup.prototype.lnglat2Window = function(viewer, lnglat = {}) {
    // console.log("lnglat", lnglat);
    // 1.计算屏幕坐标
    let position = Cesium.Cartesian3.fromDegrees(lnglat.longitude, lnglat.latitude, 0);
    let chanedc = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);
    // console.log("chanedc", chanedc);
    return chanedc == undefined ? { x: 0, y: 0 } : chanedc;

    // // 2.判断当前视角是否可见
    // let cameraOccluder = new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, viewer.camera.position);
    // let viewerVisible = cameraOccluder.isPointVisible(position);

}

/**
 * 创建元素
 * @param {*} tagName 设置样式的元素
 * @param {*} style 元素的样式
 * @returns 创建的Html元素
 */
_Popup.prototype.createElement = function(tagName, style) {
    console.log("style", style);
    // var element = document.createElement(tagName);
    // return this.setElementStyle(element, style);
    return this.setElementStyle(tagName, style);
}

/**
 * 创建文本元素
 * @param {*} tagName 设置样式的元素
 * @returns 创建的Html元素
 */
_Popup.prototype.createTextNode = function(tagName) {
    // var element = document.createElement(tagName);
    // return this.setElementStyle(element, style);
    return document.createTextNode(tagName);
}

/**
 * 设置元素的Style样式
 * @param {*} element 需要设置Style样式的元素。如果为字符串则为创建元素。
 * @param {*} style 元素的样式
 * @returns 
 */
_Popup.prototype.setElementStyle = function(element, style) {
    // console.log("element", element);
    if (element == undefined) {
        return;
    }

    if (typeof element === "string") {
        element = document.createElement(element);
    }

    // console.log("style", style);

    for (var key in style) {
        // element.setAttribute(key, style[key]);
        element.style[key] = style[key];
    }

    return element;
}