/*********************************************************************************************************************************************************************************************************************
 * 在加载服务的时候设置：配置多子域加载， iserver、webgl版本需要大于10.1.1
 *  1 服务地址：
 *      1.1 服务地址形式类似于({s}是一个通配符)：
 *          （1）http://{s}/iserver
 *          （2）http://192.168.1.3:{s}/iserver
 *          （3）http://{s}.xuyizhuo.com/iserver
 *      1.2 可以ip、端口、域名 等形式不同均可，如以下情况均可，
 *          （1）不同ip：192.168.1.1:8090、192.168.1.2:8090、192.168.1.3:8090
 *          （2）不同端口：192.168.1.1:8091、192.168.1.1:8092、192.168.1.1:8093
 *          （3）不同域名: t1.xuyizhuo.com、t2.xuyizhuo.com、t3.xuyizhuo.com
 *       总之，地址含有一个通配符{s}，只要subdomains中的值替换后，地址能正常访问，配置就是合理的。
 * 
 *  2 服务的配置方式
 *      2.1 部署多台iserver
 *          这种同时扩展 端口和iServer 的访问量，性能更优
 *          部署多个iServer，在每一台iServer中发布相同的数据服务（同一份数据、相同的服务）。
 *          快捷部署方式(同一台服务器部署多个iServer)：
 *              部署一台iServer后，将 "webapps\iserver\WEB-INF\iserver-services.xml"拷贝到其余的iserver相同路径下，覆盖iserver-services.xml文件。
 * 
 *      2.2 使用nginx代理的方式
 *          这种只是扩展 端口的访问量
 *          修改nginx的配置，让nginx监听多个端口并代理iServer。参考配置如下：
 *          server {
                listen       8091; # Nginx的监听端口
                listen       8092;
                listen       8093;
                listen       8094;
                listen       8095;

                location /iserver {
                    proxy_pass http://127.0.0.1:8090; # 代理的iServer服务地址
                    proxy_redirect off;
                    proxy_buffering off;
                    proxy_set_header Host $host:$server_port;
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                }
            
            }
 * 
 *  3 验证配置
 *      在浏览器中，打开调试器 -> Network，只要看到服务的url加载地址变成对多个不同的域名(域名、ip、端口)发送请求并成功加载时，说明配置成功。
 * 
 * **********************************************************************/
/****************************************************
 * 
 * 方式一：使用scene.open()的方式加载服务
 * 
 ****************************************************/
let subdomainConfig = {
    // 服务的url地址
    urlScheme: "http://{s}/iserver/services/3D-dixiaEr/rest/realspace",
    // 多子域服务地址配置
    subdomains: [
        "localhost:8091",
        "localhost:8092",
        "localhost:8093",
        "localhost:8094",
        "localhost:8095"
    ]
}
let promise_sub = scene.open(subdomainConfig.urlScheme, "场景名称", {
    subdomains: subdomainConfig.subdomains
});
promise_sub.then(function(layers) {
    console.log("场景中的图层列表", layers);
});

// 不同的多子域配置
//子域和不自动定位用法
let promise = scene.open('http://{s}.supermap.com:8090/iserver/services/3D-BIM3/rest/realspace', undefined, {
    subdomains: ['t1', 't2'], //子域
    autoSetView: false //不自动定位
});
promise.then(function(layers) {
    console.log("场景中的图层列表", layers);
});



/****************************************************
 * 
 * 方式二：使用scene.addS3MTilesLayerByScp()的方式加载服务
 * 
 ****************************************************/
//子域用法
let config = {
    subdomainConfig: {
        urlScheme: "http://{s}.supermap.com:8090/iserver/services/3D-BIM/rest/realspace",
        subdomains: ['t1', 't2']
    },
    name: "BIM"
};
let promise_scp = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-BIM/rest/realspace/datas/BIM/config', config);
promise_scp.then(function(layer) {
    console.log("图层", layer);
});





/***********************************************************************************************************************************************************************************************************************
 * 
 * 对图层(S3MTilesLayer)设置
 * 
 * **********************************************************************/

let layer;
layer.LoadingPriority = Cesium.LoadingPriorityMode.Child_Priority_NonLinear; // 调度策略
// layer.lodRangeScale = 0.4; // lod，加载的数据精度无法满足时设置

// 设置图层的最大可见距离值
layer.visibleDistanceMax = 10000;

// 开启indexDB数据缓存
layer.indexedDBSetting.isGeoTilesSave = true;

layer.LoadingPriority = Cesium.LoadingPriorityMode.Child_Priority_NonLinear;
// layer.LoadingPriority = Cesium.LoadingPriorityMode.UsePagedLodInfo; // 调度策略

layer.lodRangeScale = 0.8;
console.log("layer.lodRangeScale", layer.lodRangeScale);
layer.indexedDBSetting.isGeoTilesSave = true;
layer.indexedDBSetting.isGeoTilesRootNodeSave = true;