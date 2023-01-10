/**
 * 参考地址：https://www.csdn.net/tags/Mtjagg2sNTk0ODQtYmxvZwO0O0OO0O0O.html
 * Leaflet中并没有切换坐标系的方法，我想到的方法是销毁现在的地图，记录销毁前的地图层级（zoom），地图中心点，然后重新添加销毁前的数据（marker，Polyline等）和设置zoom，center等参数达到“切换的效果”。
 */

/*
    添加图片图层
    imageUrl:需要加载的图片url
    imageBounds：图片的外边界 例如：[[40.712216, -74.22655], [40.773941, -74.12544]];
    other:其他属性例如 透明度等
*/
layer = L.imageOverlay(
    imageUrl,
    imageBounds, { other, pane: 'imageOverlayPane' }
).addTo(this.map);

/*
    添加图片图层
    id:图层id，用于清除。
    imageUrl:需要加载的图片url
    imageBounds：图片的外边界 例如：[[40.712216, -74.22655], [40.773941, -74.12544]];
    other:其他属性例如 透明度等
*/
LMap.prototype.addImageLayer = function(id, imageUrl, imageBounds, other) {
    var layer = null;
    if (this.epsg == L.CRS.EPSG3857 || !this.epsg) {
        this.imageLayers.forEach((e) => {
            if (e.id == id)
                return false;
        })
        layer = L.imageOverlay(
            imageUrl,
            imageBounds, {
                other,
                pane: 'imageOverlayPane'
            }
        ).addTo(this.map);
    } else {
        let bounds = [...imageBounds[0], ...imageBounds[1]]
        let coordinatesX = [];
        let coordinatesY = [];
        let valueX = bounds[1] - bounds[3]
        let valueY = bounds[0] - bounds[2]
            //插值计算bounds
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j <= 10; j++) {
                let point = []
                if (i == 0) point = proj4("EPSG:4326", this.epsg.code, [bounds[1] - valueX * j * 0.1, bounds[0]]);
                else if (i == 1) point = proj4("EPSG:4326", this.epsg.code, [bounds[1], bounds[0] - valueY * j * 0.1]);
                else if (i == 2) point = proj4("EPSG:4326", this.epsg.code, [bounds[3] + valueX * j * 0.1, bounds[2]]);
                else if (i == 3) point = proj4("EPSG:4326", this.epsg.code, [bounds[3], bounds[2] + valueY * j * 0.1]);
                coordinatesX.push(point[0]);
                coordinatesY.push(point[1]);
            }
        }
        //排序
        coordinatesX.sort(function(a, b) {
            return b - a;
        })
        coordinatesY.sort(function(a, b) {
            return b - a;
        })
        layer = L.Proj.imageOverlay(
            imageUrl,
            L.bounds(
                //-4655709.0378614282,5687384.6802430525
                [coordinatesX[coordinatesX.length - 1], coordinatesY[0]],
                // 3571797.5203373069,-1871514.4962498695
                [coordinatesX[0], coordinatesY[coordinatesY.length - 1]]
            ), {...other,
                pane: 'imageOverlayPane'
            }
        ).addTo(this.map);
    }
    this.imageLayers.push({
        id: id,
        layer: layer
    })
}

/*
    初始化地图
    divID:地图所在div的id。
*/
LMap.prototype.initMap = function(divID, options = {}, mouseEvent) {
        options.zoom = options.zoom ? options.zoom : 6;
        options.epsg = options.epsg ? options.epsg : L.CRS.EPSG3857;
        options.center = options.center ? options.center : [39.905033413167, 116.40191241];
        this.crs = options.epsg;
        this.map = L.map(divID, {
            crs: options.epsg,
            center: options.center, // 地图中心
            zoom: options.zoom, //缩放比列
            zoomControl: false, //禁用 + - 按钮
            doubleClickZoom: false, // 禁用双击放大
            attributionControl: false, // 移除右下角leaflet标识
        })
    }
    /*
        切换地图坐标系，切换后，底图数据，image数据清除需要重新添加
        crs:坐标系参数，具体参考crs变量
        isSaveData:是否保留添加的矢量数据，ture保留，默认false
    */
LMap.prototype.changeCrs = function(crs, isSaveData) {
    let options = {
        center: this.map.getCenter(),
        zoom: this.map.getZoom(),
        epsg: L.CRS[crs]
    }
    this.map.remove();
    this.initMap(this.divID, options, this.mouseEvent)
    if (isSaveData) {
        this.vectorLayers.forEach(i => {
            i.addTo(this.map);
        })
    } else {
        this.vectorLayers = []
    }
    this.imageLayers = []
    this.baseLayer = []
    this.wmsLayers = []
}