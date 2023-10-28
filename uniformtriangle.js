  var canvas = document.getElementById('my_canvas');
  var gl = canvas.getContext('webgl');

  var vertices = new Float32Array([
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
  ]);

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var vertexShaderSource = 
  "attribute vec2 coordinates;"+
  "void main(void) {"+
  "  gl_Position = vec4(coordinates, 0.0, 1.0);}";

  var fragmentShaderSource = 
  "precision mediump float;" +
  "uniform vec3 uColor;" + 
  "void main() {"+
  "  gl_FragColor = vec4(uColor,1.0);}";

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  var coord = gl.getAttribLocation(shaderProgram, 'coordinates');
  gl.enableVertexAttribArray(coord);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

  var uniformColor_Loc = gl.getUniformLocation(shaderProgram, "uColor");

  gl.uniform3f(uniformColor_Loc, 0.0, 1.0, 0.0);
    console.log("Complete associate the shader program to buffer objects");

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);