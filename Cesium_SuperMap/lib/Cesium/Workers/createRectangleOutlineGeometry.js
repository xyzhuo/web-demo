define(["./when-b60132fc","./Cartesian2-47311507","./arrayFill-4513d7ad","./buildModuleUrl-57a32107","./Cartographic-3309dd0d","./ComponentDatatype-c140a87d","./Check-7b2a090c","./GeometryAttribute-c42d25b7","./GeometryAttributes-252e9929","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-8a5eead4","./Math-119be1a3","./PolygonPipeline-805ba13c","./RectangleGeometryLibrary-2077f0a4","./Matrix4-cde86d0e","./Cartesian4-3ca25aab","./RuntimeError-4a5c8994","./WebGLConstants-4ae0db90","./FeatureDetection-c3b71206","./earcut-2.2.1-20c8012f","./EllipsoidRhumbLine-ed1a6bf4"],(function(e,t,i,a,r,n,o,l,u,s,c,d,p,f,g,h,y,b,m,_,v){"use strict";var E=new a.BoundingSphere,A=new a.BoundingSphere,G=new r.Cartesian3,R=new t.Rectangle;function P(e,t){var i=e._ellipsoid,r=t.height,o=t.width,s=t.northCap,d=t.southCap,p=r,g=2,h=0,y=4;s&&(g-=1,p-=1,h+=1,y-=2),d&&(g-=1,p-=1,h+=1,y-=2),h+=g*o+2*p-y;var b,m=new Float64Array(3*h),_=0,v=0,E=G;if(s)f.RectangleGeometryLibrary.computePosition(t,i,!1,v,0,E),m[_++]=E.x,m[_++]=E.y,m[_++]=E.z;else for(b=0;b<o;b++)f.RectangleGeometryLibrary.computePosition(t,i,!1,v,b,E),m[_++]=E.x,m[_++]=E.y,m[_++]=E.z;for(b=o-1,v=1;v<r;v++)f.RectangleGeometryLibrary.computePosition(t,i,!1,v,b,E),m[_++]=E.x,m[_++]=E.y,m[_++]=E.z;if(v=r-1,!d)for(b=o-2;b>=0;b--)f.RectangleGeometryLibrary.computePosition(t,i,!1,v,b,E),m[_++]=E.x,m[_++]=E.y,m[_++]=E.z;for(b=0,v=r-2;v>0;v--)f.RectangleGeometryLibrary.computePosition(t,i,!1,v,b,E),m[_++]=E.x,m[_++]=E.y,m[_++]=E.z;for(var A=m.length/3*2,R=c.IndexDatatype.createTypedArray(m.length/3,A),P=0,C=0;C<m.length/3-1;C++)R[P++]=C,R[P++]=C+1;R[P++]=m.length/3-1,R[P++]=0;var w=new l.Geometry({attributes:new u.GeometryAttributes,primitiveType:a.PrimitiveType.LINES});return w.attributes.position=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m}),w.indices=R,w}function C(i){var a=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).rectangle,r=e.defaultValue(i.granularity,d.CesiumMath.RADIANS_PER_DEGREE),n=e.defaultValue(i.ellipsoid,t.Ellipsoid.WGS84),o=e.defaultValue(i.rotation,0),l=e.defaultValue(i.height,0),u=e.defaultValue(i.extrudedHeight,l);this._rectangle=t.Rectangle.clone(a),this._granularity=r,this._ellipsoid=n,this._surfaceHeight=Math.max(l,u),this._rotation=o,this._extrudedHeight=Math.min(l,u),this._offsetAttribute=i.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}C.packedLength=t.Rectangle.packedLength+t.Ellipsoid.packedLength+5,C.pack=function(i,a,r){return r=e.defaultValue(r,0),t.Rectangle.pack(i._rectangle,a,r),r+=t.Rectangle.packedLength,t.Ellipsoid.pack(i._ellipsoid,a,r),r+=t.Ellipsoid.packedLength,a[r++]=i._granularity,a[r++]=i._surfaceHeight,a[r++]=i._rotation,a[r++]=i._extrudedHeight,a[r]=e.defaultValue(i._offsetAttribute,-1),a};var w=new t.Rectangle,L=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),D={rectangle:w,ellipsoid:L,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};C.unpack=function(i,a,r){a=e.defaultValue(a,0);var n=t.Rectangle.unpack(i,a,w);a+=t.Rectangle.packedLength;var o=t.Ellipsoid.unpack(i,a,L);a+=t.Ellipsoid.packedLength;var l=i[a++],u=i[a++],s=i[a++],c=i[a++],d=i[a];return e.defined(r)?(r._rectangle=t.Rectangle.clone(n,r._rectangle),r._ellipsoid=t.Ellipsoid.clone(o,r._ellipsoid),r._surfaceHeight=u,r._rotation=s,r._extrudedHeight=c,r._offsetAttribute=-1===d?void 0:d,r):(D.granularity=l,D.height=u,D.rotation=s,D.extrudedHeight=c,D.offsetAttribute=-1===d?void 0:d,new C(D))};var x=new r.Cartographic;return C.createGeometry=function(t){var r,o,u=t._rectangle,g=t._ellipsoid,h=f.RectangleGeometryLibrary.computeOptions(u,t._granularity,t._rotation,0,R,x);if(!d.CesiumMath.equalsEpsilon(u.north,u.south,d.CesiumMath.EPSILON10)&&!d.CesiumMath.equalsEpsilon(u.east,u.west,d.CesiumMath.EPSILON10)){var y,b=t._surfaceHeight,m=t._extrudedHeight;if(!d.CesiumMath.equalsEpsilon(b,m,0,d.CesiumMath.EPSILON2)){if(r=function(e,t){var i=e._surfaceHeight,a=e._extrudedHeight,r=e._ellipsoid,n=a,o=i,l=P(e,t),u=t.height,s=t.width,d=p.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,o,r,!1),f=d.length,g=new Float64Array(2*f);g.set(d);var h=p.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,n,r);g.set(h,f),l.attributes.position.values=g;var y=t.northCap,b=t.southCap,m=4;y&&(m-=1),b&&(m-=1);var _=2*(g.length/3+m),v=c.IndexDatatype.createTypedArray(g.length/3,_);f=g.length/6;for(var E,A=0,G=0;G<f-1;G++)v[A++]=G,v[A++]=G+1,v[A++]=G+f,v[A++]=G+f+1;if(v[A++]=f-1,v[A++]=0,v[A++]=f+f-1,v[A++]=f,v[A++]=0,v[A++]=f,y)E=u-1;else{var R=s-1;v[A++]=R,v[A++]=R+f,E=s+u-2}if(v[A++]=E,v[A++]=E+f,!b){var C=s+E-1;v[A++]=C,v[A]=C+f}return l.indices=v,l}(t,h),e.defined(t._offsetAttribute)){var _=r.attributes.position.values.length/3,v=new Uint8Array(_);t._offsetAttribute===s.GeometryOffsetAttribute.TOP?v=i.arrayFill(v,1,0,_/2):(y=t._offsetAttribute===s.GeometryOffsetAttribute.NONE?0:1,v=i.arrayFill(v,y)),r.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:v})}var G=a.BoundingSphere.fromRectangle3D(u,g,b,A),C=a.BoundingSphere.fromRectangle3D(u,g,m,E);o=a.BoundingSphere.union(G,C)}else{if((r=P(t,h)).attributes.position.values=p.PolygonPipeline.scaleToGeodeticHeight(r.attributes.position.values,b,g,!1),e.defined(t._offsetAttribute)){var w=r.attributes.position.values.length,L=new Uint8Array(w/3);y=t._offsetAttribute===s.GeometryOffsetAttribute.NONE?0:1,i.arrayFill(L,y),r.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:L})}o=a.BoundingSphere.fromRectangle3D(u,g,b)}return new l.Geometry({attributes:r.attributes,indices:r.indices,primitiveType:a.PrimitiveType.LINES,boundingSphere:o,offsetAttribute:t._offsetAttribute})}},function(i,a){return e.defined(a)&&(i=C.unpack(i,a)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),i._rectangle=t.Rectangle.clone(i._rectangle),C.createGeometry(i)}}));
