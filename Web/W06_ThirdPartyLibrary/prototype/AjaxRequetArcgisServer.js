function ArcgisServerRequest(jquery = window.$) {
    return new _ArcgisServerRequest(jquery);
}

function _ArcgisServerRequest(jquery = window.$) {
    if (!jquery) {
        console.error("ArcgisServer初始化失败");
        return;
    }
    this._jquery = jquery;
}


/**
 * ArcGIS Identify接口查询，空间查询
 * @param queryUrl 查询服务地址
 * @param geometry 查询的空间信息
 * @param option {
 *     queryArgs：{Object} ArcGIS Server查询接口参数
 *     onQueryComplete:查询成功回调
 *     queryQueryFailed:查询失败回调
 * }
 */
_ArcgisServerRequest.prototype.queryByIdentify = function(queryUrl, geometry, option = {}) {
    // console.log("this", this);
    if (typeof option.onQueryComplete !== "function") {
        option.onQueryComplete = console.log;
    }
    if (typeof option.queryQueryFailed !== "function") {
        option.queryQueryFailed = console.error;
    }
    if (!queryUrl) {
        return;
    }
    var queryArgs = option.queryArgs ? option.queryArgs : {};
    var defaultArgs = {
        "f": "pjson",
        "returnFieldName": "false", //是否返回字段
        "returnGeometry": "true", //是否返回空间图形
        "returnUnformattedValues": "false",
        "returnZ": "false",
        "tolerance": 1,
        "imageDisplay": "400,400,96",
        // 空间查询Geometry
        "geometry": `{"x":${geometry.longitude},"y":${geometry.latitude}}`, // `{"x": 109.58108486724787,"y": 19.633786347963323}`,
        "geometryType": "esriGeometryPoint", //坐标类型，可以是点、线、面等
        "sr": 4490,
        "mapExtent": "108.7406290847738, 18.010553121028117, 110.7593709152262, 20.309446878971883",
        "layers": "all" //查询所有图层，或者图层序号 0,1
    };

    for (var queryArgsKey in queryArgs) {
        // console.log(queryArgsKey, queryArgs[queryArgsKey]);
        defaultArgs[queryArgsKey] = queryArgs[queryArgsKey];
    }
    // console.log("defaultArgs", defaultArgs);

    this.jqueryAjaxGet(queryUrl, {
        data: defaultArgs,
        onQueryComplete: option.onQueryComplete,
        queryQueryFailed: option.queryQueryFailed
    });
};

/**
 * ArcGIS Query接口查询，属性查询
 * @param queryUrl
 * @param queryArgs ArcGIS Server查询接口参数。
 *      如果类型为字符串，为where子句查询。
 *      如果类型为数组，id列表查询。
 *      如果为对象，按对象设置查询参数。
 * @param option {
 *     onQueryComplete:查询成功回调
 *     queryQueryFailed:查询失败回调
 * }
 */
_ArcgisServerRequest.prototype.queryByQuery = function(queryUrl, queryArgs, option = {}) {
    // console.log("this", this);
    if (typeof option.onQueryComplete !== "function") {
        option.onQueryComplete = console.log;
    }
    if (typeof option.queryQueryFailed !== "function") {
        option.queryQueryFailed = console.error;
    }
    if (!queryUrl) {
        return;
    }
    if (!queryArgs) {
        return;
    }

    var defaultArgs = {
        where: typeof queryArgs === "string" ? queryArgs : "", // 此处为属性查询条件
        text: "",
        // objectIds: ids, // 查询的id列表
        objectIds: Array.isArray(queryArgs) ? queryArgs : "", // 查询的id列表，参数是数组类型，为id查询
        time: "",
        geometry: "", // 空间范围
        geometryType: "esriGeometryEnvelope", // 输入空间范围类型，可以是点、线、面
        inSR: "",
        spatialRel: "esriSpatialRelIntersects", // 查询方法，此处为相交
        relationParam: "",
        outFields: "", // 返回所有字段属性
        returnGeometry: true, // 返回空间图形
        returnTrueCurves: false,
        maxAllowableOffset: "",
        geometryPrecision: "",
        outSR: "",
        returnIdsOnly: false,
        returnCountOnly: false,
        orderByFields: "",
        groupByFieldsForStatistics: "",
        outStatistics: "",
        returnZ: false,
        returnM: false,
        gdbVersion: "",
        returnDistinctValues: false,
        resultOffset: "",
        resultRecordCount: "",
        // f: "geojson"
        f: "pjson"
    };

    if (!Array.isArray(queryArgs) && typeof queryArgs === "object") {
        for (var queryArgsKey in queryArgs) {
            // console.log(queryArgsKey, queryArgs[queryArgsKey]);
            defaultArgs[queryArgsKey] = queryArgs[queryArgsKey];
        }
    }

    this.jqueryAjaxGet(queryUrl, {
        data: defaultArgs,
        onQueryComplete: option.onQueryComplete,
        queryQueryFailed: option.queryQueryFailed
    });
}

/**
 * 通过jquery发送ajax的get请求
 * @param queryServerUrl
 * @param option
 */
_ArcgisServerRequest.prototype.jqueryAjaxGet = function(queryServerUrl, option = {}) {
    if (typeof option.onQueryComplete !== "function") {
        option.onQueryComplete = console.log;
    }
    if (typeof option.queryQueryFailed !== "function") {
        option.queryQueryFailed = console.error;
    }
    if (!queryServerUrl) {
        option.queryQueryFailed("查询失败，服务地址为空");
        return;
    }
    if (!this._jquery) {
        option.queryQueryFailed("JavaScript依赖失败，此工具强依赖jQuery。");
        return;
    }
    this._jquery.ajax({
        type: "GET",
        url: queryServerUrl,
        data: option.data ? option.data : {},
        dataType: option.dataType ? option.dataType : "json",
        success: option.onQueryComplete,
        error: option.queryQueryFailed
    });
}