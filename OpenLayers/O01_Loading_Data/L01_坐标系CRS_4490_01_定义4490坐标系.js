/**
 * 初始化OpenLayers地图。
 */
function initOpenLayersMap() {

    // proj4.defs([
    //     // ["EPSG:4526", "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=38500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"],
    //     ["EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs"]
    // ]);
    // ol.proj.proj4.register(proj4);

    // 注册4490
    proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
    ol.proj.proj4.register(proj4);

    // 重写Projection4490
    const projection = new ol.proj.Projection({
        code: "EPSG:4490",
        units: "degrees",
        axisOrientation: "neu"
    });
    projection.setExent([-180, -90, 180, 90]);
    projection.setWorldExtent([-180, -90, 180, 90]);

    ol.proj.addProjection(projection);

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
            zoom: 1,
            // projection: "EPSG:4326",
            projection: projection,
            multiWorld: true,
        })
    });
    console.log("map", map);
    window.openLayersMap = map;
    openLayersMap.getView().setZoom(6);
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
    // const url = "http://10.3.4.22:31922/iserver/services/map-kingbaseDB_arm64/rest/maps/GuangXi_4490";
    const url = "http://10.3.4.22:31922/iserver/services/map-ugcv5-GuangXi_4490/rest/maps/GuangXi_4490";
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
        // projection: "EPSG:4326"
    });
    map.addLayer(layer);
}

function init() {
    initOpenLayersMap();
}

init();