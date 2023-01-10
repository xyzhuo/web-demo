define(["exports","./ArcType-ce2e50ab","./arrayRemoveDuplicates-e9673044","./Matrix2-163b5a1d","./Matrix3-b6f074fa","./ComponentDatatype-77274976","./defaultValue-0a909f67","./EllipsoidRhumbLine-7f84cca0","./GeometryAttribute-0b8b7b82","./GeometryAttributes-f06a2792","./GeometryPipeline-b6eb7525","./IndexDatatype-2149f06c","./Math-e97915da","./PolygonPipeline-1b86ab0c","./Transforms-713aa3a8"],(function(e,t,n,i,o,r,a,s,c,l,u,h,p,f,d){"use strict";function y(){this._array=[],this._offset=0,this._length=0}Object.defineProperties(y.prototype,{length:{get:function(){return this._length}}}),y.prototype.enqueue=function(e){this._array.push(e),this._length++},y.prototype.dequeue=function(){if(0===this._length)return;const e=this._array;let t=this._offset;const n=e[t];return e[t]=void 0,t++,t>10&&2*t>e.length&&(this._array=e.slice(t),t=0),this._offset=t,this._length--,n},y.prototype.peek=function(){if(0!==this._length)return this._array[this._offset]},y.prototype.contains=function(e){return-1!==this._array.indexOf(e)},y.prototype.clear=function(){this._array.length=this._offset=this._length=0},y.prototype.sort=function(e){this._offset>0&&(this._array=this._array.slice(this._offset),this._offset=0),this._array.sort(e)};const g={computeHierarchyPackedLength:function(e,t){let n=0;const i=[e];for(;i.length>0;){const e=i.pop();if(!a.defined(e))continue;n+=2;const o=e.positions,r=e.holes;if(a.defined(o)&&o.length>0&&(n+=o.length*t.packedLength),a.defined(r)){const e=r.length;for(let t=0;t<e;++t)i.push(r[t])}}return n},packPolygonHierarchy:function(e,t,n,i){const o=[e];for(;o.length>0;){const e=o.pop();if(!a.defined(e))continue;const r=e.positions,s=e.holes;if(t[n++]=a.defined(r)?r.length:0,t[n++]=a.defined(s)?s.length:0,a.defined(r)){const e=r.length;for(let o=0;o<e;++o,n+=i.packedLength)i.pack(r[o],t,n)}if(a.defined(s)){const e=s.length;for(let t=0;t<e;++t)o.push(s[t])}}return n},unpackPolygonHierarchy:function(e,t,n){const i=e[t++],o=e[t++],r=new Array(i),a=o>0?new Array(o):void 0;for(let o=0;o<i;++o,t+=n.packedLength)r[o]=n.unpack(e,t);for(let i=0;i<o;++i)a[i]=g.unpackPolygonHierarchy(e,t,n),t=a[i].startingIndex,delete a[i].startingIndex;return{positions:r,holes:a,startingIndex:t}}},m=new i.Cartesian2;function C(e,t,n,o){return i.Cartesian2.subtract(t,e,m),i.Cartesian2.multiplyByScalar(m,n/o,m),i.Cartesian2.add(e,m,m),[m.x,m.y]}const b=new o.Cartesian3;function x(e,t,n,i){return o.Cartesian3.subtract(t,e,b),o.Cartesian3.multiplyByScalar(b,n/i,b),o.Cartesian3.add(e,b,b),[b.x,b.y,b.z]}g.subdivideLineCount=function(e,t,n){const i=o.Cartesian3.distance(e,t)/n,r=Math.max(0,Math.ceil(p.CesiumMath.log2(i)));return Math.pow(2,r)};const T=new o.Cartographic,v=new o.Cartographic,w=new o.Cartographic,A=new o.Cartesian3,L=new s.EllipsoidRhumbLine;g.subdivideRhumbLineCount=function(e,t,n,i){const o=e.cartesianToCartographic(t,T),r=e.cartesianToCartographic(n,v),a=new s.EllipsoidRhumbLine(o,r,e).surfaceDistance/i,c=Math.max(0,Math.ceil(p.CesiumMath.log2(a)));return Math.pow(2,c)},g.subdivideTexcoordLine=function(e,t,n,o,r,a){const s=g.subdivideLineCount(n,o,r),c=i.Cartesian2.distance(e,t),l=c/s,u=a;u.length=2*s;let h=0;for(let n=0;n<s;n++){const i=C(e,t,n*l,c);u[h++]=i[0],u[h++]=i[1]}return u},g.subdivideLine=function(e,t,n,i){const r=g.subdivideLineCount(e,t,n),s=o.Cartesian3.distance(e,t),c=s/r;a.defined(i)||(i=[]);const l=i;l.length=3*r;let u=0;for(let n=0;n<r;n++){const i=x(e,t,n*c,s);l[u++]=i[0],l[u++]=i[1],l[u++]=i[2]}return l},g.subdivideTexcoordRhumbLine=function(e,t,n,o,r,a,s){const c=n.cartesianToCartographic(o,T),l=n.cartesianToCartographic(r,v);L.setEndPoints(c,l);const u=L.surfaceDistance/a,h=Math.max(0,Math.ceil(p.CesiumMath.log2(u))),f=Math.pow(2,h),d=i.Cartesian2.distance(e,t),y=d/f,g=s;g.length=2*f;let m=0;for(let n=0;n<f;n++){const i=C(e,t,n*y,d);g[m++]=i[0],g[m++]=i[1]}return g},g.subdivideRhumbLine=function(e,t,n,i,o){const r=e.cartesianToCartographic(t,T),c=e.cartesianToCartographic(n,v),l=new s.EllipsoidRhumbLine(r,c,e),u=l.surfaceDistance/i,h=Math.max(0,Math.ceil(p.CesiumMath.log2(u))),f=Math.pow(2,h),d=l.surfaceDistance/f;a.defined(o)||(o=[]);const y=o;y.length=3*f;let g=0;for(let t=0;t<f;t++){const n=l.interpolateUsingSurfaceDistance(t*d,w),i=e.cartographicToCartesian(n,A);y[g++]=i.x,y[g++]=i.y,y[g++]=i.z}return y};const E=new o.Cartesian3,I=new o.Cartesian3,M=new o.Cartesian3,P=new o.Cartesian3;g.scaleToGeodeticHeightExtruded=function(e,t,n,i,r){i=a.defaultValue(i,o.Ellipsoid.WGS84);const s=E;let c=I;const l=M;let u=P;if(a.defined(e)&&a.defined(e.attributes)&&a.defined(e.attributes.position)){const a=e.attributes.position.values,h=a.length/2;for(let e=0;e<h;e+=3)o.Cartesian3.fromArray(a,e,l),i.geodeticSurfaceNormal(l,s),u=i.scaleToGeodeticSurface(l,u),c=o.Cartesian3.multiplyByScalar(s,n,c),c=o.Cartesian3.add(u,c,c),a[e+h]=c.x,a[e+1+h]=c.y,a[e+2+h]=c.z,r&&(u=o.Cartesian3.clone(l,u)),c=o.Cartesian3.multiplyByScalar(s,t,c),c=o.Cartesian3.add(u,c,c),a[e]=c.x,a[e+1]=c.y,a[e+2]=c.z}return e},g.polygonOutlinesFromHierarchy=function(e,t,i){const r=[],s=new y;let c,l,u;for(s.enqueue(e);0!==s.length;){const e=s.dequeue();let h=e.positions;if(t)for(u=h.length,c=0;c<u;c++)i.scaleToGeodeticSurface(h[c],h[c]);if(h=n.arrayRemoveDuplicates(h,o.Cartesian3.equalsEpsilon,!0),h.length<3)continue;const p=e.holes?e.holes.length:0;for(c=0;c<p;c++){const h=e.holes[c];let p=h.positions;if(t)for(u=p.length,l=0;l<u;++l)i.scaleToGeodeticSurface(p[l],p[l]);if(p=n.arrayRemoveDuplicates(p,o.Cartesian3.equalsEpsilon,!0),p.length<3)continue;r.push(p);let f=0;for(a.defined(h.holes)&&(f=h.holes.length),l=0;l<f;l++)s.enqueue(h.holes[l])}r.push(h)}return r},g.polygonsFromHierarchy=function(e,t,i,r,s){const c=[],l=[],u=new y;for(u.enqueue(e);0!==u.length;){const e=u.dequeue();let h=e.positions;const p=e.holes;let d,y;if(r)for(y=h.length,d=0;d<y;d++)s.scaleToGeodeticSurface(h[d],h[d]);if(t||(h=n.arrayRemoveDuplicates(h,o.Cartesian3.equalsEpsilon,!0)),h.length<3)continue;let g=i(h);if(!a.defined(g))continue;const m=[];let C=f.PolygonPipeline.computeWindingOrder2D(g);C===f.WindingOrder.CLOCKWISE&&(g.reverse(),h=h.slice().reverse());let b=h.slice();const x=a.defined(p)?p.length:0,T=[];let v;for(d=0;d<x;d++){const e=p[d];let c=e.positions;if(r)for(y=c.length,v=0;v<y;++v)s.scaleToGeodeticSurface(c[v],c[v]);if(t||(c=n.arrayRemoveDuplicates(c,o.Cartesian3.equalsEpsilon,!0)),c.length<3)continue;const l=i(c);if(!a.defined(l))continue;C=f.PolygonPipeline.computeWindingOrder2D(l),C===f.WindingOrder.CLOCKWISE&&(l.reverse(),c=c.slice().reverse()),T.push(c),m.push(b.length),b=b.concat(c),g=g.concat(l);let h=0;for(a.defined(e.holes)&&(h=e.holes.length),v=0;v<h;v++)u.enqueue(e.holes[v])}c.push({outerRing:h,holes:T}),l.push({positions:b,positions2D:g,holes:m})}return{hierarchy:c,polygons:l}};const D=new i.Cartesian2,_=new o.Cartesian3,G=new d.Quaternion,S=new o.Matrix3;g.computeBoundingRectangle=function(e,t,n,i,r){const s=d.Quaternion.fromAxisAngle(e,i,G),c=o.Matrix3.fromQuaternion(s,S);let l=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY,h=Number.POSITIVE_INFINITY,p=Number.NEGATIVE_INFINITY;const f=n.length;for(let e=0;e<f;++e){const i=o.Cartesian3.clone(n[e],_);o.Matrix3.multiplyByVector(c,i,i);const r=t(i,D);a.defined(r)&&(l=Math.min(l,r.x),u=Math.max(u,r.x),h=Math.min(h,r.y),p=Math.max(p,r.y))}return r.x=l,r.y=h,r.width=u-l,r.height=p-h,r},g.createGeometryFromPositions=function(e,n,o,s,l,h,p){let d=f.PolygonPipeline.triangulate(n.positions2D,n.holes);d.length<3&&(d=[0,1,2]);const y=n.positions,g=a.defined(o),m=g?o.positions:void 0;if(l){const e=y.length,t=new Array(3*e);let n=0;for(let i=0;i<e;i++){const e=y[i];t[n++]=e.x,t[n++]=e.y,t[n++]=e.z}const o={attributes:{position:new c.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:t})},indices:d,primitiveType:c.PrimitiveType.TRIANGLES};g&&(o.attributes.st=new c.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:i.Cartesian2.packArray(m)}));const a=new c.Geometry(o);return h.normal?u.GeometryPipeline.computeNormal(a):a}return p===t.ArcType.GEODESIC?f.PolygonPipeline.computeSubdivision(e,y,d,m,s):p===t.ArcType.RHUMB?f.PolygonPipeline.computeRhumbLineSubdivision(e,y,d,m,s):void 0};const R=[],N=[],O=new o.Cartesian3,q=new o.Cartesian3;g.computeWallGeometry=function(e,n,i,s,u,f){let d,y,m,C,b,x,T,v,w,A=e.length,L=0,E=0;const I=a.defined(n),M=I?n.positions:void 0;if(u)for(y=3*A*2,d=new Array(2*y),I&&(w=2*A*2,v=new Array(2*w)),m=0;m<A;m++)C=e[m],b=e[(m+1)%A],d[L]=d[L+y]=C.x,++L,d[L]=d[L+y]=C.y,++L,d[L]=d[L+y]=C.z,++L,d[L]=d[L+y]=b.x,++L,d[L]=d[L+y]=b.y,++L,d[L]=d[L+y]=b.z,++L,I&&(x=M[m],T=M[(m+1)%A],v[E]=v[E+w]=x.x,++E,v[E]=v[E+w]=x.y,++E,v[E]=v[E+w]=T.x,++E,v[E]=v[E+w]=T.y,++E);else{const n=p.CesiumMath.chordLength(s,i.maximumRadius);let o=0;if(f===t.ArcType.GEODESIC)for(m=0;m<A;m++)o+=g.subdivideLineCount(e[m],e[(m+1)%A],n);else if(f===t.ArcType.RHUMB)for(m=0;m<A;m++)o+=g.subdivideRhumbLineCount(i,e[m],e[(m+1)%A],n);for(y=3*(o+A),d=new Array(2*y),I&&(w=2*(o+A),v=new Array(2*w)),m=0;m<A;m++){let o,r;C=e[m],b=e[(m+1)%A],I&&(x=M[m],T=M[(m+1)%A]),f===t.ArcType.GEODESIC?(o=g.subdivideLine(C,b,n,N),I&&(r=g.subdivideTexcoordLine(x,T,C,b,n,R))):f===t.ArcType.RHUMB&&(o=g.subdivideRhumbLine(i,C,b,n,N),I&&(r=g.subdivideTexcoordRhumbLine(x,T,i,C,b,n,R)));const a=o.length;for(let e=0;e<a;++e,++L)d[L]=o[e],d[L+y]=o[e];if(d[L]=b.x,d[L+y]=b.x,++L,d[L]=b.y,d[L+y]=b.y,++L,d[L]=b.z,d[L+y]=b.z,++L,I){const e=r.length;for(let t=0;t<e;++t,++E)v[E]=r[t],v[E+w]=r[t];v[E]=T.x,v[E+w]=T.x,++E,v[E]=T.y,v[E+w]=T.y,++E}}}A=d.length;const P=h.IndexDatatype.createTypedArray(A/3,A-6*e.length);let D=0;for(A/=6,m=0;m<A;m++){const e=m,t=e+1,n=e+A,i=n+1;C=o.Cartesian3.fromArray(d,3*e,O),b=o.Cartesian3.fromArray(d,3*t,q),o.Cartesian3.equalsEpsilon(C,b,p.CesiumMath.EPSILON10,p.CesiumMath.EPSILON10)||(P[D++]=e,P[D++]=n,P[D++]=t,P[D++]=t,P[D++]=n,P[D++]=i)}const _={attributes:new l.GeometryAttributes({position:new c.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})}),indices:P,primitiveType:c.PrimitiveType.TRIANGLES};I&&(_.attributes.st=new c.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:v}));return new c.Geometry(_)};var k=g;e.PolygonGeometryLibrary=k}));
