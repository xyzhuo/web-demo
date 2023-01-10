/**
 * 初始化OpenLayers地图。
 */
function initOpenLayersMap() {

    // proj4.defs([
    //     // ["EPSG:4526", "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=38500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"],
    //     ["EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs"]
    // ]);
    // ol.proj.proj4.register(proj4);

    const pro = proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");

    // //测试是否引入成功
    // // const position = ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:4526');
    // const position = ol.proj.transform([493393.15, 2526354.13], 'EPSG:4326', 'EPSG:4490');
    // console.log(position);

    var map;
    map = new ol.Map({
        target: "map",
        controls: ol.control.defaults({
                attributionOptions: {
                    collapsed: false,
                },
            })
            .extend([new ol.supermap.control.Logo()]),
        view: new ol.View({
            center: [108.65, 23.65],
            zoom: 12,
            projection: "EPSG:4326",
            multiWorld: true,
        })
    });
    console.log("map", map);
    window.openLayersMap = map;
    // 图层切换控件
    // map.addControl(new ol.control.LayerSwitcher({}));
    // 比例控件
    map.addControl(new ol.supermap.control.ScaleLine());

    addOpenLayersLayer(map);
}

/**
 * 添加OpenLayes图层
 * @param {*} params 
 */
function addOpenLayersLayer(map) {
    const url = "http://10.3.4.22:31922/iserver/services/map-kingbaseDB_arm64/rest/maps/GuangXi_4490";
    // const layer = new ol.layer.Tile({
    //     source: new ol.source.TileSuperMapRest({
    //         url: url,
    //         wrapX: true
    //     }),
    //     // projection: projection
    // });
    const layer = new ol.layer.Tile({
        // opacity: 0.5,
        source: new ol.source.TileSuperMapRest({
            url: url,
            wrapX: true,
        }),
        projection: "EPSG:4326"
    });
    map.addLayer(layer);
}

function init() {
    initOpenLayersMap();
}

init();