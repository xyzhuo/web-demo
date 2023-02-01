// 导入依赖
import { BaiduImageryProvider } from "./loading_Imagery_baidu_ES6_BaiduImageryProvider";

// 创建百度地图影像提供者
let baiduImageryProvider = new BaiduImageryProvider({
    url: "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1"
})

let viewer = new Cesium.Viewer("cesiumContainer");
// 添加百度地图提供者
viewer.imageryLayers.addImageryProvider(baiduImageryProvider);