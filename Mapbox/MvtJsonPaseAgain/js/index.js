/**
 * 
// 批量JSON下载ss
// https://blog.csdn.net/qq_37820215/article/details/108769566
// https://blog.csdn.net/qq_37820215/article/details/108769566

    JSZip，FileSaver
 */

// let huaduMapUrl = "./hdStyle.json";
let huaduMapUrl = "./layers/huadu.json";
// let huaduMapUrl = "./hdStyle.json";
let sourceLayerArr = [];
let sourceLayerObj = {};

let map;
$.get(huaduMapUrl).then((huaduGonganMapStyle) => {
    console.log("mapStyle", huaduGonganMapStyle);

    // let mapStyle = JSON.parse(JSON.stringify(huaduGonganMapStyle));
    // mapStyle.layers = [];

    map = new mapboxgl.Map({
        container: "map",
        style: huaduGonganMapStyle, //mapStyle, // huaduMapUrl,
        center: [113.21179685670018, 23.425180273500047],
        zoom: 10,
        crs: "EPSG:4326"
    });
    console.log("map", map);

    map.setMaxZoom(19);
});

/**
 * 解析JSON按需选择下载
 */
function paseEle() {

    if (!mvtServiceUrlEle) {
        mvtServiceUrlEle = document.getElementById("mvtServiceUrlEle");
    }

    if (!(mvtServiceUrlEle || mvtServiceUrlEle.value)) {
        alert("请输入Mvt json的服务地址。");
        return;
    }

    // 获取到要解析的路径
    let huaduMapUrl = mvtServiceUrlEle.value; // "./hdStyle.json";

    $.get(huaduMapUrl).then(huaduGonganMapStyle => {
        console.log("huaduGonganMapStyle", huaduGonganMapStyle);

        // 解析出每一个图层
        sourceLayerObj = paseMvtLayers(huaduGonganMapStyle.layers);

        let modalContentEle = document.getElementById("modalContentEle");
        // modalContentEle.innerHTML = "";
        let modalContentHTML = ""
        for (let layerName in sourceLayerObj) {
            console.log("layerName", layerName);

            modalContentHTML += `<label><input type="checkbox" name="layersEle" value="${layerName}"><span>${layerName}</span></label><br/>`;
        }
        modalContentEle.innerHTML = modalContentHTML;

        showModal();

        confirmModal(() => {

            let exportLayerEles = document.getElementsByName("layersEle");
            // document.getElementsByName("layers")[0].value
            // console.log("exportJson", exportJson);

            // 获取要导出的图层名称列表
            let exportLayersName = [];
            for (let exportLayerEle of exportLayerEles) {

                // 如果图层勾选了，添加到要导出的列表
                if (exportLayerEle.checked) {
                    exportLayersName.push(exportLayerEle.value)
                }

            }
            // console.log("exportLayersName", exportLayersName);

            if (exportLayersName.length > 0) {

                let mergeLayersEle = document.getElementsByName("mergeLayersEle");
                if (mergeLayersEle) {

                    // 获取到图层对应的样式文件
                    let mapStyle = JSON.parse(JSON.stringify(huaduGonganMapStyle));
                    mapStyle.layers = [];

                    // 通过全部打包到一个zip的方式保存，需要依赖：jszip
                    const zip = new JSZip();

                    let blob;
                    // 判断是否在合并为一个图层再导出
                    if (mergeLayersEle[0].checked) { // 合并成一个图层

                        for (exportLayerName of exportLayersName) {
                            console.log("sourceLayerObj[exportLayerName]", sourceLayerObj[exportLayerName]);
                            for (let subLayer of sourceLayerObj[exportLayerName]) {
                                mapStyle.layers.push(subLayer);
                            }

                        }

                        blob = new Blob([JSON.stringify(mapStyle)], { type: "text/plain;charset=utf-8" });

                        // 添加数据到zip文件中
                        zip.file(`huadu.json`, blob);

                    } else { // 分别导出为一个图层

                        for (exportLayerName of exportLayersName) {
                            mapStyle.layers = sourceLayerObj[exportLayerName];

                            // 添加数据到zip文件中
                            blob = new Blob([JSON.stringify(mapStyle)], { type: "text/plain;charset=utf-8" });
                            zip.file(`${exportLayerName}.json`, blob);
                        }

                    }

                    // 生成一个zip文件， type:"blob" 压缩的结果为二进制流，可用作文件上传
                    zip.generateAsync({ type: "blob" }).then(content => {

                        console.log(content);
                        // 生成二进制流：直接在浏览器打成zip压缩包并下载。需要依赖 savejs
                        saveAs(content, "图层文件下载.zip") // 利用file-saver保存文件  自定义文件名
                    });

                }

            }

            closeModal();
        })

    });
}



let mvtServiceUrlEle = null;

/**
 * 解析json并下载
 */
function paseAndLoadEle() {

    if (!mvtServiceUrlEle) {
        mvtServiceUrlEle = document.getElementById("mvtServiceUrlEle");
    }

    if (!(mvtServiceUrlEle || mvtServiceUrlEle.value)) {
        alert("请输入Mvt json的服务地址。");
        return;
    }

    // 获取到要解析的路径
    let huaduMapUrl = mvtServiceUrlEle.value; // "./hdStyle.json";
    $.get(huaduMapUrl).then(huaduGonganMapStyle => {
        console.log("huaduGonganMapStyle", huaduGonganMapStyle);

        // 解析出每一个图层
        sourceLayerObj = paseMvtLayers(huaduGonganMapStyle.layers);
        console.log("sourceLayerObj", sourceLayerObj);

        // 获取到图层对应的样式文件
        let mapStyle = JSON.parse(JSON.stringify(huaduGonganMapStyle));
        mapStyle.layers = [];


        // 通过全部打包到一个zip的方式保存，需要依赖：jszip
        const zip = new JSZip();

        let blob;

        // 获取到每一个图层
        for (let key in sourceLayerObj) {

            // console.log("key", key);

            // 设置每一个图层对应的子图层：一般有标注、风格图层
            mapStyle.layers = sourceLayerObj[key];

            blob = new Blob([JSON.stringify(mapStyle)], { type: "text/plain;charset=utf-8" });

            // 添加数据到zip文件中
            zip.file(`${key}.json`, blob);
        }

        // 生成一个zip文件， type:"blob" 压缩的结果为二进制流，可用作文件上传
        zip.generateAsync({ type: "blob" }).then(content => {
            console.log(content);
            // 生成二进制流：直接在浏览器打成zip压缩包并下载
            saveAs(content, "图层文件下载.zip") // 利用file-saver保存文件  自定义文件名
        });

    })
}



/**
 * 解析Mvt的配置文件中的每一个图层图层，按一定的规则将子图层合并成一个图层。
 * @param {Array} layers Mvt的子图层列表
 * @returns 按 { 图层名称: [子图层] } 格式返回的对象
 */
function paseMvtLayers(layers) {

    if (!layers) {
        return;
    }

    let layerCaption; // 工作空间中的图层名
    let layerName; // 同一份数据的名称，同一份数据当作一层
    let _sourceLayerObj = {};

    for (let layer of layers) {

        if (layer.id === "background") {
            continue;
        }

        // 获取到图层名称
        if (layer["metadata"]) {
            layerCaption = layer["metadata"]["layer:caption"];
        } else {
            layerCaption = layer["source-layer"];
        }
        // console.log("layerCaption", layerCaption);

        layerName = layerCaption.substr(0, layerCaption.lastIndexOf("@"));

        if (!_sourceLayerObj[layerName]) {
            _sourceLayerObj[layerName] = [];
        }

        _sourceLayerObj[layerName].push(layer);
        // console.log("layer.id", layer.id);

    }

    console.log("_sourceLayerObj", _sourceLayerObj);
    return _sourceLayerObj;
}