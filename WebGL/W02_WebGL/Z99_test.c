// precision mediump float;
// uniform vec4 u_FragColor;
int gl_PointCoord = 0;
int gl_FragColor = 0;
int u_FragColor = 1;
void main() {
    // 计算两个点之间的距离
    float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
    // 距离小于一半
    if (dist < 0.5) {
        gl_FragColor = u_FragColor; // 顶点颜色
    } else {
        discard; // 距离大于0.5，放弃渲染
    }
}