define(["./Cartographic-3309dd0d","./Check-7b2a090c","./when-b60132fc","./EllipseOutlineGeometry-00d57030","./Cartesian2-47311507","./Math-119be1a3","./arrayFill-4513d7ad","./buildModuleUrl-57a32107","./Matrix4-cde86d0e","./Cartesian4-3ca25aab","./RuntimeError-4a5c8994","./WebGLConstants-4ae0db90","./ComponentDatatype-c140a87d","./EllipseGeometryLibrary-cf69fd46","./GeometryAttribute-c42d25b7","./FeatureDetection-c3b71206","./GeometryAttributes-252e9929","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-8a5eead4"],(function(e,i,t,r,l,n,a,o,s,d,u,c,m,p,y,G,_,f,h){"use strict";function b(e){var i=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).radius,l={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new r.EllipseOutlineGeometry(l),this._workerName="createCircleOutlineGeometry"}b.packedLength=r.EllipseOutlineGeometry.packedLength,b.pack=function(e,i,t){return r.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,t)};var g=new r.EllipseOutlineGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),x={center:new e.Cartesian3,radius:void 0,ellipsoid:l.Ellipsoid.clone(l.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return b.unpack=function(i,n,a){var o=r.EllipseOutlineGeometry.unpack(i,n,g);return x.center=e.Cartesian3.clone(o._center,x.center),x.ellipsoid=l.Ellipsoid.clone(o._ellipsoid,x.ellipsoid),x.height=o._height,x.extrudedHeight=o._extrudedHeight,x.granularity=o._granularity,x.numberOfVerticalLines=o._numberOfVerticalLines,t.defined(a)?(x.semiMajorAxis=o._semiMajorAxis,x.semiMinorAxis=o._semiMinorAxis,a._ellipseGeometry=new r.EllipseOutlineGeometry(x),a):(x.radius=o._semiMajorAxis,new b(x))},b.createGeometry=function(e){return r.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(i,r){return t.defined(r)&&(i=b.unpack(i,r)),i._ellipseGeometry._center=e.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=l.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),b.createGeometry(i)}}));