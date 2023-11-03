var canvas = document.getElementById('my_canvas');
var gl = canvas.getContext('webgl');

var vertices = [
    0.0, 0.0, 0.0,
    0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0
];

var indices = [0, 1, 2];

var vertexShaderSource = 
"attribute vec3 aVertexPosition;"+
"void main() {"+
"   gl_Position = vec4(aVertexPosition,1.0);"+
"   gl_PointSize = 10.0;}";

var fragmentShaderSource = 
"precision medium float;"+
"void main() {"+
"   gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);" +
"}";

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertex_shader, vertexShaderSource);
gl.compileShader(vertex_shader);

var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragment_shader, fragmentShaderSource);
gl.compileShader(fragment_shader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertex_shader);
gl.attachShader(shaderProgram, fragment_shader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

var aVertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');

gl.enableVertexAttribArray(aVertexPosition);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.enable(gl.PROGRAM_POINT_SIZE);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.drawElements(gl.POINTS, indices.length, gl.UNSIGNED_SHORT, 0);