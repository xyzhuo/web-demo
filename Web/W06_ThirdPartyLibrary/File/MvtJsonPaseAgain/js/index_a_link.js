"use strict";
/**
 *
 * JSON文件批量下载
 *      实现方法：使用jszip压缩的方式实现批量文件的下载
 *      参考资料：
 *          使用JSZip与FileSaver批量下载文件：https://blog.csdn.net/qq_37820215/article/details/108769566
 * 示例中使用到：
 *      （1）JSZip：文件打zip压缩包
 *      （2）FileSaver：文件下载
 *
 * JSZip的基本操作
 *      下载，npm install jszip
 *  1、创建一个JSZip对象：const zip = new JSZip();
 *  2、添加
 *      （1）添加一个文件并写入内容
 *          let blob = new Blob([JSON.stringify(mapStyle.layers)], {type: "text/plain;charset=utf-8"});
 *          // 添加数据到zip文件中
 *          zip.file(`${key}.json`, blob);
 *      （2）添加一个文件夹，并在文件夹中添加一个txt文件并写入内容。
 *          zip.folder("photos").file("hello.txt", "Hello World\n");
 *
 *  3、删除文件或文件夹
 *      （1）删除文件夹的某个文件
 *          zip.remove("photos/README.md");
 *      （2）删除文件夹
 *          zip.remove("photos");
 *
 *  4、生成一个zip文件
 *      // 生成一个zip文件，type:"blob" 压缩的结果为二进制流，可用作文件上传
 *      zip.generateAsync({type: "blob"}).then(content => {
 *          console.log(content);
 *          // file-saver保存文件。直接在浏览器打成zip压缩包并下载
 *          // saveAs(content, "图层文件下载.zip") // 二进制流，自定义文件名
 *      });
 */

let sourceLayerObj = {};

/**
 * 解析json
 */
function paseEle() {

    let jsonUrl = "./hdStyle.json";
    axios.get(jsonUrl).then(({ data: huaduGonganMapStyle }) => {
        console.log("huaduGonganMapStyle", huaduGonganMapStyle);

        // 解析出每一个图层
        sourceLayerObj = paseMvtLayers(huaduGonganMapStyle.layers);
        console.log("sourceLayerObj", sourceLayerObj);

        // 获取到图层对应的样式文件
        let mapStyle = JSON.parse(JSON.stringify(huaduGonganMapStyle));
        mapStyle.layers = [];


        // 通过全部打包到一个zip的方式保存，需要依赖：jszip
        const zip = new JSZip();
        const folder = zip.folder("JSON文件下载"); // 创建一个文件夹

        let blob;
        // 获取到每一个图层
        for (let key in sourceLayerObj) {
            console.log("key", key);

            // mapStyle.layers = sourceLayerObj[key];
            // console.log("mapStyle", mapStyle)

            blob = new Blob([JSON.stringify(mapStyle)], { type: "text/plain;charset=utf-8" });

            // 添加数据到zip文件中
            // zip.file(`${key}.json`, blob);
            folder.file(`${key}.json`, blob); // 向文件夹中添加文件

        }

        // 生成一个zip文件， type:"blob" 压缩的结果为二进制流，可用作文件上传
        zip.generateAsync({ type: "blob" }).then(content => {
            console.log(content);
            // 利用file-saver保存文件。直接在浏览器打成zip压缩包并下载
            saveAs(content, "JSON文件下载.zip") // 生成二进制流  自定义文件名
        });


        /**
         * 添加mvt图层
         * */
        function paseMvtLayers(layers) {

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

        /**
         * 使用<a href="Blob" onclick>的方式实现
         * 无法实现多个JSON文件的下载
         *      参数：saveJSON(mvtJson, `${layerName}.json`);
         * @param {*} data
         * @param {*} filename
         * @returns
         */
        function saveJSON(data, filename) {

            if (!data) {
                alert('保存的数据为空');
                return;
            }
            if (!filename) {
                filename = 'json.json'
            }

            console.log("saveJSON", filename, data);


            if (typeof data === 'object') {
                data = JSON.stringify(data, undefined, 4)
            }
            var blob = new Blob([data], { type: 'text/json' });
            e = document.createEvent('MouseEvents');
            a = document.createElement('a');
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }

    })
}