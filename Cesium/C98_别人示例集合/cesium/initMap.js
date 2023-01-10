
function initMap(){
    var mapOption={
        //地图可进行切换
        //高德影像地图
        //url:"https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        //google地图（国内暂时被封），后续如果开放可直接f12-->network获取服务
        //osm矢量地图
        //url:"https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        //mapbox影像地图(token如果过期，请选择其他地图图层)
        //url:"https://api.mapbox.com/styles/v1/marsgis/cki0adkar2b0e19mv9tpiewld/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFyc2dpcyIsImEiOiJja2Fod2xlanIwNjJzMnhvMXBkMnNqcjVpIn0.WnxikCaN2KV_zn9tLZO77A"
        //arcgis影像地图
        url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    };
    var imgProvider=new Cesium.UrlTemplateImageryProvider(mapOption);

    var viewerOption={
        animation : false,//是否创建动画小器件，左下角仪表
        baseLayerPicker : false,//是否显示图层选择器
        fullscreenButton : false,//是否显示全屏按钮
        geocoder : false,//是否显示geocoder小器件，右上角查询按钮
        homeButton : false,//是否显示Home按钮
        infoBox : false,//是否显示信息框
        sceneModePicker : false,//是否显示3D/2D选择器
        scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        selectionIndicator : false,//是否显示选取指示器组件
        timeline : false,//是否显示时间轴
        navigationHelpButton : false,//是否显示右上角的帮助按钮
        baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
        shadows: true,//是否显示背影
        shouldAnimate: true,
        imageryProvider:imgProvider,
        //加载地形
         terrainProvider : new Cesium.CesiumTerrainProvider({
             url: "http://data.marsgis.cn/terrain",
         })
    }
    viewer = new Cesium.Viewer("map", viewerOption);
    //去除版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";
}

var flyToEntity = null;
function viewerFlyToLonLat(obj) {
    console.log("飞行参数：", obj.lng, obj.lat, obj.eyeHeight);
    let cartographics = [Cesium.Cartographic.fromDegrees(obj.lng, obj.lat)];
    cartographics.obj = obj;
    Cesium.sampleTerrain(viewer.scene.terrainProvider, 14, cartographics)
        .then((updatedPositions) => {
            var flyToHeight=updatedPositions[0].height;
            if(typeof(flyToHeight)=="undefined"){
                updatedPositions.obj.height = 0;
            }else{
                updatedPositions.obj.height = flyToHeight;
            }
            console.log("地形高度：", updatedPositions.obj.height);
            if (flyToEntity) {
                viewer.entities.remove(flyToEntity);
            }
            flyToEntity = new Cesium.Entity({
                id: 'flyTmp',
                position: Cesium.Cartesian3.fromDegrees(updatedPositions.obj.lng, updatedPositions.obj.lat, updatedPositions.obj.height),
                point: {
                    pixelSize: 0,//控制居中的时候是否展示中心点
                    color: Cesium.Color.RED.withAlpha(0),
                    outlineColor: Cesium.Color.WHITE.withAlpha(0),
                    outlineWidth: 0
                }
            });
            viewer.entities.add(flyToEntity);
            var flyPromise = viewer.flyTo(flyToEntity, {
                duration: updatedPositions.obj.time,//飞行时间,单位：秒
                offset: {
                    heading: Cesium.Math.toRadians(updatedPositions.obj.heading),//旋转角度
                    pitch: Cesium.Math.toRadians(updatedPositions.obj.pitch),//倾斜角度
                    range: updatedPositions.obj.eyeHeight//视角高度
                }
            });
            // 飞行完后
            flyPromise.then(function (flyPromise) {
                console.log("飞行结束");
            }).otherwise(function (error) {
                console.log(error);
            });
        });
}