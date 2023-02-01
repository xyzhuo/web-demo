/**
 * 地形开挖绘制
 * tooltip: 绘制提示
 * */
function terrainExcavation(viewer, tooltipCallback) {
    if (typeof tooltipCallback !== "function") {
        tooltipCallback = (...args) => {
            console.log("args", args);
        }
    }

    let depthElement = document.getElementById("depth");
    let isExtractElement = document.getElementById("extract");
    let extractHeightElement = document.getElementById("extractHeight");
    let bodyElement = document.getElementsByTagName("body")[0];
    // let isExtract = $("#extract").prop("checked");
    // let extractHeight = Number($("#extractHeight").val());
    // $("body").removeClass("drawCur").addClass("drawCur");
    // document.getElementById("depth").value;


    //绘制多边形
    let handlerPolygon = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Polygon, 0);
    handlerPolygon.activeEvt.addEventListener(function (isActive) {
        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = "";
            bodyElement.classList.add("drawCur");
        } else {
            viewer.enableCursorStyle = true;
            bodyElement.classList.add("drawCur");
        }
    });
    handlerPolygon.movingEvt.addEventListener(function (windowPosition) {
        if (windowPosition.x < 200 && windowPosition.y < 150) {
            tooltipCallback(false);
            return;
        }
        if (handlerPolygon.isDrawing) {
            tooltipCallback(true, windowPosition, "<p>点击确定开挖区域中间点</p><p>右键单击结束绘制，进行开挖。</p>");
        } else {
            tooltipCallback(true, windowPosition, "<p>点击绘制开挖区域第一个点。</p>");
        }
    });
    handlerPolygon.drawEvt.addEventListener(function (result) {
        if (!result.object.positions) {
            tooltipCallback(true, result, "<p>请绘制正确的多边形</p>");
            handlerPolygon.polygon.show = false;
            handlerPolygon.polyline.show = false;
            handlerPolygon.deactivate();
            handlerPolygon.activate();
            return;
        };
        let array = [].concat(result.object.positions);
        tooltipCallback(false);
        let positions = [];
        for (let i = 0, len = array.length; i < len; i++) {
            let cartographic = Cesium.Cartographic.fromCartesian(array[i]);
            let longitude = Cesium.Math.toDegrees(cartographic.longitude);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude);
            let h = cartographic.height;
            if (positions.indexOf(longitude) == -1 && positions.indexOf(latitude) == -1) {
                positions.push(longitude);
                positions.push(latitude);
                positions.push(h);
            }
        }
        // let dep = document.getElementById("depth").value || 500;
        // let isExtract = $("#extract").prop("checked");
        // let extractHeight = Number($("#extractHeight").val());
        viewer.scene.globe.removeAllExcavationRegion();
        viewer.scene.globe.removeAllExtractRegion();
        const depth = Number(depthElement.value) || 500;
        const extractHeight = Number(extractHeightElement.value) || 500;
        const isExtract = isExtractElement;
        if (isExtract) {
            addExtractRegion(positions, depth, extractHeight);
        } else {
            addExcavationRegion(positions, depth);
        }
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
        handlerPolygon.activate();
    });

    // 添加开挖区域
    function addExcavationRegion(positions, dep) {
        viewer.scene.globe.addExcavationRegion({
            name: "ExcavationRegion",
            position: positions,
            height: dep,
            transparent: false
        });
    }

    /**
     * 地形开挖抽出显示效果
     */
    function addExtractRegion(positions, dep, extractHeight) {
        console.log("positions", positions);
        viewer.scene.globe.addExtractRegion({
            name: "ExtractRegion", // 名称
            position: positions, // 区域
            height: dep, // 开挖深度
            transparent: false, // 封边是否透明
            extractHeight: extractHeight, // 抽出高度
            granularity: 1 // 精度
        });
    }



    handlerPolygon.activate();

    // 清除绘制
    document.getElementById("clear").onclick = function () {
        viewer.scene.globe.removeAllExcavationRegion();
        viewer.scene.globe.removeAllExtractRegion();
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
    };
}

/**
 * 兼容浏览器和服务器类型代码的导出
 */
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports.terrainExcavation = terrainExcavation;
} else {
    if (typeof define === "function" && define.amd) {
        define([], function () {
            return terrainExcavation;
        });
    } else {
        window.terrainExcavation = terrainExcavation;
    }
}