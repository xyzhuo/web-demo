import L from 'leaflet';
import 'leaflet-draw'

/**
 * 基于leaflet封装测距、测面class类
 */
export default class DrawPlug {
    constructor(map, measureGroup) {
        //测距侧面
        this.DRAWING = false; //是否正在绘制
        this.DRAWLAYERS = [];
        this.BarDRAWLAYERS = [];
        this.ISMEASURE = true; //是否是量距
        this.MEASURETOOLTIP; //量距提示
        this.MEASUREAREATOOLTIP; //量面提示
        this.MEASURERESULT = 0; //测量结果

        this.DRAWPOLYLINE; //绘制的折线
        this.DRAWMOVEPOLYLINE; //绘制过程中的折线
        this.DRAWPOLYLINEPOINTS = []; //绘制的折线的节点集

        this.DRAWPOLYGON; //绘制的面
        this.DRAWMOVEPOLYGON; //绘制过程中的面
        this.DRAWPOLYGONPOINTS = []; //绘制的面的节点集
        this.map = map;
        this.measureGroup = measureGroup;
    }
    startDrawLine() {
        let that = this
        that.MEASURERESULT = 0; //测量结果
        that.map.getContainer().style.cursor = 'crosshair';
        var shapeOptions = {
            color: '#3388ff',
            weight: 3,
            opacity: 0.8,
            fill: false,
            clickable: true
        }
        that.DRAWPOLYLINE = new L.Polyline([], shapeOptions); //绘制的折线
        that.measureGroup.addLayer(that.DRAWPOLYLINE);
        if (that.ISMEASURE) { //是否是量距
            that.MEASURETOOLTIP = new L.Tooltip(that.map); //量距提示
        }
        that.map.on('mousedown', onClick);
        that.map.on('dblclick', onDoubleClick);

        function onClick(e) {
            console.log('onClick');
            that.DRAWING = true; //是否正在绘制
            that.DRAWPOLYLINEPOINTS.push(e.latlng); //绘制的折线的节点集
            if (that.DRAWPOLYLINEPOINTS.length > 1 && that.ISMEASURE) { //是否是量距
                that.MEASURERESULT += e.latlng.distanceTo(that.DRAWPOLYLINEPOINTS[that.DRAWPOLYLINEPOINTS.length - 2]);
            }
            that.DRAWPOLYLINE.addLatLng(e.latlng); //绘制的折线
            that.map.on('mousemove', onMove);
        }

        function onMove(e) {
            if (that.DRAWING) { //是否正在绘制
                if (that.DRAWMOVEPOLYLINE != undefined && that.DRAWMOVEPOLYLINE != null) { //绘制过程中的折线
                    that.measureGroup.removeLayer(that.DRAWMOVEPOLYLINE);
                }
                var prevPoint = that.DRAWPOLYLINEPOINTS[that.DRAWPOLYLINEPOINTS.length - 1];
                that.DRAWMOVEPOLYLINE = new L.Polyline([prevPoint, e.latlng], shapeOptions);
                that.measureGroup.addLayer(that.DRAWMOVEPOLYLINE);
                if (that.ISMEASURE) {
                    var distance = that.MEASURERESULT + e.latlng.distanceTo(that.DRAWPOLYLINEPOINTS[that.DRAWPOLYLINEPOINTS.length - 1]);
                    console.log(distance);
                }
            }
        }

        function onDoubleClick(e) {
            that.map.getContainer().style.cursor = '';
            /*显示两点距离*/
            var distance = that.MEASURERESULT + e.latlng.distanceTo(that.DRAWPOLYLINEPOINTS[that.DRAWPOLYLINEPOINTS.length - 1]);

            var myIcon = L.divIcon({
                // html: (distance / 1000).toFixed(2) + "公里",
                className: 'my-div-icon',
                html: "<div>" + "<p>" + (distance / 1000).toFixed(2) + "KM</p>" + "</div>",
                iconSize: 26
            });
            for (let i = 0; i < that.DRAWPOLYLINEPOINTS.length - 2; i++) {

                let distance_cust = that.DRAWPOLYLINEPOINTS[i].distanceTo(that.DRAWPOLYLINEPOINTS[i + 1]);

                let myIcon_cust = L.divIcon({
                    // html: (distance / 1000).toFixed(2) + "公里",
                    className: 'my-div-icon',
                    html: "<div>" + "<p>" + (distance_cust / 1000).toFixed(2) + "KM</p>" + "</div>",
                    iconSize: 26
                });
                let site_c = L.polyline([that.DRAWPOLYLINEPOINTS[i], that.DRAWPOLYLINEPOINTS[i + 1]], { color: 'rgba(0,0,0,0)', }).addTo(that.measureGroup);
                let as = site_c.getCenter()
                let c = new L.Marker(as, { draggable: false, icon: myIcon_cust });
                that.measureGroup.addLayer(c)
            }
            let marker = new L.Marker(e.latlng, { draggable: false, icon: myIcon });
            that.measureGroup.addLayer(marker)
            if (that.DRAWING) {
                if (that.DRAWMOVEPOLYLINE != undefined && that.DRAWMOVEPOLYLINE != null) {
                    that.map.removeLayer(that.DRAWMOVEPOLYLINE);
                    that.DRAWMOVEPOLYLINE = null;
                }
                that.BarDRAWLAYERS.push(that.DRAWPOLYLINE);
                that.DRAWPOLYLINEPOINTS = [];
                that.DRAWING = false;
                that.ISMEASURE = false;
                that.map.off('mousedown');
                that.map.off('mousemove');
                that.map.off('dblclick');
            }
        }
    }
    clearLayer() {
        let that = this
        that.measureGroup.clearLayers()
    }
    startDrawPolygon() {
        let that = this
        that.MEASURERESULT = 0;
        that.map.getContainer().style.cursor = 'crosshair';
        that.map.on('mousedown', function(e) {
            that.DRAWING = true;
            that.DRAWPOLYGONPOINTS.push(e.latlng);
            that.DRAWPOLYGON.addLatLng(e.latlng);
        });
        that.map.on('mousemove', function(e) {
            if (that.DRAWING) {
                if (that.DRAWMOVEPOLYGON != undefined && that.DRAWMOVEPOLYGON != null) {
                    that.map.removeLayer(that.DRAWMOVEPOLYGON);
                }
                var prevPoint = that.DRAWPOLYGONPOINTS[that.DRAWPOLYGONPOINTS.length - 1];
                var firstPoint = that.DRAWPOLYGONPOINTS[0];
                that.DRAWMOVEPOLYGON = new L.Polygon([firstPoint, prevPoint, e.latlng], shapeOptions);
                that.measureGroup.addLayer(that.DRAWMOVEPOLYGON);
            }
        });
        that.map.on('dblclick', function(e) {
            that.map.getContainer().style.cursor = '';
            var tempPoints = [];
            for (var i = 0; i < that.DRAWPOLYGONPOINTS.length; i++) {
                tempPoints.push(that.DRAWPOLYGONPOINTS[i]);
            }
            let as = that.DRAWPOLYGON.getLatLngs()[0]
            as.pop()
            let last = as[0]
            as.push(last)
            for (let i = 0; i < as.length - 1; i++) {

                let distance_cust = as[i].distanceTo(as[i + 1]);

                let myIcon_cust = L.divIcon({
                    // html: (distance / 1000).toFixed(2) + "公里",
                    className: 'my-div-icon',
                    html: "<div>" + "<p>" + (distance_cust / 1000).toFixed(2) + "KM</p>" + "</div>",
                    iconSize: 26
                });
                let site_c = L.polyline([as[i], as[i + 1]], { color: 'rgba(0,0,0,0)', }).addTo(that.measureGroup);
                let as_ccc = site_c.getCenter()
                let c = new L.Marker(as_ccc, { draggable: false, icon: myIcon_cust });
                that.measureGroup.addLayer(c)
            }

            console.log(as);
            tempPoints.push(e.latlng);
            let CC = that.DRAWPOLYGON.getCenter()
            var distance = CalArea(tempPoints);
            var myIcon = L.divIcon({
                html: "<div>" + "<p>" + (distance / 1000000).toFixed(3) + "KM²</p>" + "</div>",
                className: 'my-div-icon',
                iconSize: 26
            });
            let marker = new L.Marker(CC, { draggable: false, icon: myIcon });
            that.measureGroup.addLayer(marker);
            // marker.bindPopup("总面积：" + (distance / 1000000).toFixed(3) + '平方公里').openPopup();
            if (that.DRAWING) {
                if (that.DRAWMOVEPOLYGON != undefined && that.DRAWMOVEPOLYGON != null) {
                    that.map.removeLayer(that.DRAWMOVEPOLYGON);
                    that.DRAWMOVEPOLYGON = null;
                }
                that.BarDRAWLAYERS.push(that.DRAWPOLYGON);

                that.DRAWPOLYGONPOINTS = [];
                that.DRAWING = false;
                that.ISMEASURE = false;
                that.map.off('mousedown');
                that.map.off('mousemove');
                that.map.off('dblclick');
            }
        });
        var shapeOptions = {
            color: '#3388ff',
            weight: 3,
            opacity: 0.8,
            fill: true,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: true
        }

        that.DRAWPOLYGON = new L.Polygon([], shapeOptions);
        that.measureGroup.addLayer(that.DRAWPOLYGON);
        if (that.ISMEASURE) {
            that.MEASUREAREATOOLTIP = new L.Tooltip(that.map);
        }

        function CalArea(latLngs) {
            var pointsCount = latLngs.length,
                area = 0.0,
                d2r = Math.PI / 180,
                p1, p2;
            if (pointsCount > 2) {
                for (var i = 0; i < pointsCount; i++) {
                    p1 = latLngs[i];
                    p2 = latLngs[(i + 1) % pointsCount];
                    area += ((p2.lng - p1.lng) * d2r) *
                        (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
                }
                area = area * 6378137.0 * 6378137.0 / 2.0;
            }
            return Math.abs(area);
        }
    }
}