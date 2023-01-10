 // <!-- OpenLayers依赖 -->
 // <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@main/dist/en/v7.0.0/legacy/ol.js"></script>
 // <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@main/dist/en/v7.0.0/legacy/ol.css">
const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(), // OSM是有政治问题的地图。
        }),
    ],
    target: "map",
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
    }),
});
console.log("map", map);