/**
 * 需要被导出的对象
 */
function ServerRequest() {}

/**
 * 对象的方法
 * @param {string} queryUrl 查询服务地址
 * @param {string} whereSql where子句
 */
ServerRequest.prototype.queryBySQL = function(queryUrl, whereSql) {
    console.log("queryBySQL", queryUrl, whereSql);
};

/**
 * 兼容浏览器和服务器类型代码的导出
 * （1）这里直接导出了对象[new ServerRequest()]，在使用时直接可以 ServerRequest.queryBySQL()调用方法。
 *      ServerRequest.queryBySQL("http://yzltmap.hniplan.com", "1=1");
 * 
 * （2）这里直接导出类[ServerRequest]，在使用时需要先new ServerRequest()进行实例化，如：new ServerRequest().queryBySQL()调用方法。
 *      
 */
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    // module.exports.ServerRequest = new ServerRequest(); // （1）
    module.exports.ServerRequest = ServerRequest; // （2）
} else {
    if (typeof define === "function" && define.amd) {
        define([], function() {
            // return new ServerRequest(); // （1）
            return ServerRequest; // （2）
        });
    } else {
        // window.ServerRequest = new ServerRequest(); // （1）
        window.ServerRequest = ServerRequest; // （2）
    }
}