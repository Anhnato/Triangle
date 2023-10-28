var canvas = document.getElementById('my_canvas');
var gl = canvas.getContext('webgl');

var vertices = [
    //position
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,

    //color
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
];

var vertex_shader_source = 
"attribute vec3 aVertexPosition;"+
"attribute vec3 aVertexColor;"+
"varying vec3 vVertexColor;"+
"void main() {"+
"   vVertexColor = aVertexColor;"+
"   gl_Position = vec4(aVertexPosition,1.0);}";

var fragment_shader_source = 
"precision mediump float;"+
"varying vec3 vVertexColor;"+
"void main() {"+
"   gl_FragColor = vec4(vVertexColor,1.0);}";

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertex_shader, vertex_shader_source);
gl.compileShader(vertex_shader);

var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragment_shader, fragment_shader_source);
gl.compileShader(fragment_shader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertex_shader);
gl.attachShader(shaderProgram, fragment_shader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Get the attribute and uniform locations
var aVertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
var aVertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor');
var uColor = gl.getUniformLocation(shaderProgram, 'uColor');

// Enable the attribute arrays
gl.enableVertexAttribArray(aVertexPosition);
gl.enableVertexAttribArray(aVertexColor);

// Specify the vertex attributes
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
gl.vertexAttribPointer(aVertexColor, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

// Clear the canvas and draw the triangle
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);