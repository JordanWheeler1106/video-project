tdl.require('tdl.buffers');
tdl.require('tdl.fast');
tdl.require('tdl.fps');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.models');
tdl.require('tdl.primitives');
tdl.require('tdl.programs');
tdl.require('tdl.textures');
tdl.require('tdl.webgl');

// globals
var gl;                   // the gl context.
var canvas;               // the canvas
var math;                 // the math lib.
var fast;                 // the fast math lib.
var g_fpsTimer;           // object to measure frames per second;
var g_logGLCalls = true;  // whether or not to log webgl calls
var g_debug = false;      // whether or not to debug.
var g_drawOnce = false;   // draw just one frame.
var g_canvas2d;           // A global canvas to create textures
var g_ctx2d;              // A global canvas 2d context to create textures
var g_scrollX = 0;        // the position of the grid
var g_scrollY = 0;        // the position of the grid
var g_moveVelocityX = 0;
var g_moveVelocityY = 0;
var g_viewProjection;
var g_viewProjectionInverse;
var g_requestId;

// We'll maintain a grid of images this size
// and scroll across them. When one goes off the left it comes on the right.
var g_imagesAcrossGrid = 10;
var g_imagesDownGrid = 10;
var g_textures = [];
var g_lastMousePosition = {x: 0, y: 0};
var g_lastMouseGridPosition = {x: 0, y: 0};

//g_drawOnce = true;
//g_debug = true;

var g = {
  globals: {},
  imagePlaneConst:{}};

var g_ui = [
  { obj: 'globals',         name: 'backgroundRed',         value: 0, max:   1 },
  { obj: 'globals',         name: 'backgroundGreen',         value: 0.5, max:   1 },
  { obj: 'globals',         name: 'backgroundBlue',         value: 0.3, max:   1 },
  { obj: 'globals',         name: 'imageScale',         value: 0.42, max:   1 },
  { obj: 'globals',         name: 'imageWidth',         value: 1.0,  max:   5 },
  { obj: 'globals',         name: 'imageHeight',        value: 1.0,  max:   5 },
  { obj: 'globals',         name: 'imageSpacing',       value: 1.1,  max:   5 },
  { obj: 'globals',         name: 'rowOffset',          value: 0.5,  max:   2 },
  { obj: 'globals',         name: 'eyeRadius',          value: 5,    max:  10 },
  { obj: 'globals',         name: 'selectionIntensity', value: 0,    max:  10 },
  { obj: 'imagePlaneConst', name: 'bendRadius',         value: 2.4,  max:  10 },
  { obj: 'imagePlaneConst', name: 'bendAmount',         value: 1.0,  max:   1 }];

function ValidateNoneOfTheArgsAreUndefined(functionName, args) {
  for (var ii = 0; ii < args.length; ++ii) {
    if (args[ii] === undefined) {
      tdl.error("undefined passed to gl." + functionName + "(" +
                tdl.webgl.glFunctionArgsToString(functionName, args) + ")");
    }
  }
}

function Log(msg) {
  if (g_logGLCalls) {
    tdl.log(msg);
  }
}

function LogGLCall(functionName, args) {
  if (g_logGLCalls) {
    ValidateNoneOfTheArgsAreUndefined(functionName, args)
    tdl.log("gl." + functionName + "(" +
            tdl.webgl.glFunctionArgsToString(functionName, args) + ")");
  }
}

function Dump() {
  var lastArgWasNumber = false;
  var numArgs = arguments.length;
  var strs = [];
  for (var ii = 0; ii < numArgs; ++ii) {
    var arg = arguments[ii];
    if (typeof arg == 'number') {
      if (lastArgWasNumber) {
        strs.push(", ");
      }
      strs.push(arg.toFixed(3));
      lastArgWasNumber = true;
    } else {
      strs.push(arg.toString());
      lastArgWasNumber = false;
    }
  }
  tdl.log(strs.join(""));
}

/**
 * Sets up a imagePlane
 */
function setupImagePlane() {
  var textures = {
      diffuseSampler: tdl.textures.loadTexture([128,128,128,255])};
  var program = tdl.programs.loadProgramFromScriptTags(
      'imageSphereVertexShader',
      'imageSphereFragmentShader');
//  var arrays = tdl.primitives.createCube(1);
  var arrays = tdl.primitives.createPlane(1,1,10,10);
  delete arrays.normal;
  tdl.primitives.reorient(arrays,
      [1, 0, 0, 0,
       0, 0, 1, 0,
       0, -1, 0, 0,
       0, 0, 0, 1]);
  return new tdl.models.Model(program, arrays, textures);
}

function splitter(str, l){
    var strs = [];
    while(str.length > l){
        var pos = str.substring(0, l).lastIndexOf(' ');
        pos = pos <= 0 ? l : pos;
        strs.push(str.substring(0, pos));
        var i = str.indexOf(' ', pos)+1;
        if(i < pos || i > pos+l)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}
/**
 * Sets up a blank Plane
 */
function setupBlankPlane() {
  var textures = {};
  var program = tdl.programs.loadProgramFromScriptTags(
      'blackVertexShader',
      'blackFragmentShader');
  var arrays = tdl.primitives.createPlane(1,1,4,4);
  delete arrays.normal;
  delete arrays.texCoord;
  tdl.primitives.reorient(arrays,
      [1, 0, 0, 0,
       0, 0, 1, 0,
       0, -1, 0, 0,
       0, 0, 0, 1]);
  return new tdl.models.Model(program, arrays, textures);
}

// The ImgTexture stuff has to happen inside a function because
// tdl.textures.Texture doesn't exist when this is first executed.
function hack() {

ImgTexture = function() {
  tdl.textures.Texture.call(this, gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  this.setParameter(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  this.setParameter(gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  this.setParameter(gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  this.setParameter(gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}

tdl.base.inherit(ImgTexture, tdl.textures.Texture);

ImgTexture.prototype.load = function(imgUrl, msg) {
  var img = new Image();
  var that = this;
  img.onload = function() {
    that.uploadTexture();
  }
  this.img = img;
  this.msg = msg;
  img.src = imgUrl;
};

ImgTexture.prototype.uploadTexture = function() {
  var img = this.img;
  var msg = this.msg;
  g_ctx2d.clearRect(0, 0, 256, 256);
  // g_ctx2d.fillStyle="rgb(0,0,255)";
  // g_ctx2d.fillRect(0, 0, 256, 256);
  if(!msg) return;
  if(msg.type == "admin") {
    var first_col = Math.floor(Math.random(255)*255);
    var sec_col = Math.floor(Math.random(255)*255);
    var third_col = Math.floor(Math.random(255)*255);
    g_ctx2d.fillStyle='rgb('+first_col+','+sec_col+','+third_col+')';
    g_ctx2d.fillRect(0, 0, 256, 256);
  } else if(msg.type == "folder") {
    g_ctx2d.fillStyle=msg.topic?msg.topic.color:"rgb(255,255,255)";
    switch(msg.level) {
      case 0:
        g_ctx2d.fillRect(0, 0, 256, 256);
        break;
      case 1:
        g_ctx2d.beginPath();
        g_ctx2d.moveTo(0, 128);
        g_ctx2d.lineTo(40, 0);
        g_ctx2d.lineTo(216, 0);
        g_ctx2d.lineTo(256, 128);
        g_ctx2d.lineTo(216, 256);
        g_ctx2d.lineTo(40, 256);
        g_ctx2d.lineTo(0, 128);
        g_ctx2d.closePath();
        g_ctx2d.fill();
        break;
      case 2:
        var numberOfSides = 5,
            size = 128,
            Xcenter = 128,
            Ycenter = 128,
            step  = 2 * Math.PI / numberOfSides,//Precalculate step value
            shift = (Math.PI / 180.0) * -18;//Quick fix ;)

        g_ctx2d.beginPath();
        for (var i = 0; i <= numberOfSides;i++) {
        	var curStep = i * step + shift;
            g_ctx2d.lineTo (Xcenter + size * Math.cos(curStep), Ycenter + size * Math.sin(curStep));
        }
        g_ctx2d.closePath();
        g_ctx2d.fill();
        break;
      case 3:
        g_ctx2d.beginPath();
        g_ctx2d.arc(128, 128, 125, 0, 2 * Math.PI, false);
        g_ctx2d.closePath();
        g_ctx2d.fill();
        break;
    }
  } else if(msg.type == "nugget") {
    g_ctx2d.fillStyle="rgb(255,255,255)";
    g_ctx2d.beginPath();
    g_ctx2d.moveTo(0, 128);
    g_ctx2d.lineTo(128, 0);
    g_ctx2d.lineTo(256, 128);
    g_ctx2d.lineTo(128, 256);
    g_ctx2d.lineTo(0, 128);
    g_ctx2d.closePath();
    g_ctx2d.fill();
  } else {
    g_ctx2d.fillStyle="rgb(255,255,255)";
    g_ctx2d.fillRect(0, 0, 256, 256);
  }

  g_ctx2d.font = "32px sans-serif";
  g_ctx2d.fillStyle = "rgb(0,0,0)";  //font color
  // TODO: Obviously this needs to be split better.
  //here we write the text
  if(!msg) return;
  var words = splitter(msg.name, 15);
  for(var i = 0; i < words.length; i++) {
    g_ctx2d.fillText(words[i], 128 - Math.ceil(g_ctx2d.measureText(words[i]).width / 2), 140 - Math.ceil(words.length / 2) * 32  + i * 40);
  }

  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, g_canvas2d);
  gl.generateMipmap(gl.TEXTURE_2D);
};

ImgTexture.prototype.bindToUnit = function(unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
};

}  // hack.

/**
 * Returns the absolute position of an element for certain browsers.
 * @param {HTML Element} element The element to get a position for.
 * @return {Object} An object containing x and y as the absolute position
 *     of the given element.
 */
var getAbsolutePosition = function(element) {
  var r = { x: element.offsetLeft, y: element.offsetTop };
  if (element.offsetParent) {
    var tmp = getAbsolutePosition(element.offsetParent);
    r.x += tmp.x;
    r.y += tmp.y;
  }
  return r;
};

 /**
  * Retrieve the coordinates of the given event relative to the center
  * of the widget.
  *
  * @param {eventInfo} eventInfo As returned from
  *     CLIENT3DJS.util.getEventInfo.
  * @param {HTML Element} opt_reference A DOM element whose position we want
  *     to transform the mouse coordinates to. If it is not passed in the
  *     element in the eventInfo will be used.
  * @return {Object} An object containing keys 'x' and 'y'.
  */
var getRelativeCoordinates = function(eventInfo, opt_reference) {
  var x, y;
  var event = eventInfo.event;
  var element = eventInfo.element;
  var reference = opt_reference || eventInfo.element;
  if (!window.opera && typeof event.offsetX != 'undefined') {
    // Use offset coordinates and find common offsetParent
    var pos = { x: event.offsetX, y: event.offsetY };
    // Send the coordinates upwards through the offsetParent chain.
    var e = element;
    while (e) {
      e.mouseX = pos.x;
      e.mouseY = pos.y;
      pos.x += e.offsetLeft;
      pos.y += e.offsetTop;
      e = e.offsetParent;
    }
    // Look for the coordinates starting from the reference element.
    var e = reference;
    var offset = { x: 0, y: 0 }
    while (e) {
      if (typeof e.mouseX != 'undefined') {
        x = e.mouseX - offset.x;
        y = e.mouseY - offset.y;
        break;
      }
      offset.x += e.offsetLeft;
      offset.y += e.offsetTop;
      e = e.offsetParent;
    }
    // Reset stored coordinates
    e = element;
    while (e) {
      e.mouseX = undefined;
      e.mouseY = undefined;
      e = e.offsetParent;
    }
  } else {
    // Use absolute coordinates
    var pos = getAbsolutePosition(reference);
    x = event.pageX - pos.x;
    y = event.pageY - pos.y;
  }
  // Subtract distance to middle
  return { x: x, y: y };
};

var getEventInfo = function(event) {
  event = event ? event : window.event;
  var element = event.target ? event.target : event.srcElement;
  return {
    event: event,
    element: element,
    name: (element.id ? element.id : ('->' + element.toString())),
    wheel: (event.detail ? event.detail : -event.wheelDelta),
    shift: (event.modifiers ? (event.modifiers & Event.SHIFT_MASK) : event.shiftKey)
  };
};

clientPositionToWorldRay = function(
    clientXPosition,
    clientYPosition,
    clientWidth,
    clientHeight) {
  // normScreenX, normScreenY are in frustum coordinates.
  var normScreenX = clientXPosition / (clientWidth * 0.5) - 1;
  var normScreenY = -(clientYPosition / (clientHeight * 0.5) - 1);

  var matrix = g_viewProjectionInverse;

  // Apply inverse view-projection matrix to get the ray in world coordinates.
  return {
      near: math.matrix4.transformPoint(
          matrix, [normScreenX, normScreenY, 0]),
      far: math.matrix4.transformPoint(
          matrix, [normScreenX, normScreenY, 1])
  };
};

var clientPositionToGridPosition = function(
    clientXPosition,
    clientYPosition,
    clientWidth,
    clientHeight) {
  // normScreenX, normScreenY are in frustum coordinates.
  var normScreenX = clientXPosition / (clientWidth * 0.5) - 1;
  var normScreenY = -(clientYPosition / (clientHeight * 0.5) - 1);

  // Compute the sphere's front clip coord.
  var matrix = g_viewProjection;
  var v = [0, 0, g.imagePlaneConst.bendRadius];
  var v = tdl.math.matrix4.transformPoint(
      matrix, v);
  // Apply inverse view-projection matrix to get the ray in world coordinates.
  var matrix = g_viewProjectionInverse;
  var pos = tdl.math.matrix4.transformPoint(
      matrix, [normScreenX, normScreenY, v[2]]);

  // This formula seems wrong :-(
  var unit = computeUnitSize();

  var x = pos[0] / unit.width;
  var y = pos[1] / unit.height;
  return {x: x, y: y};
};

var startX = 0;
var startY = 0;
var scrollXStart = 0;
var scrollYStart = 0;
var down = false;
var numMovesToTrack = 4;
var moveHistory = [];

function addMoveHistory(pos) {
  if (moveHistory.length == numMovesToTrack) {
    moveHistory.shift();
  }
  var now = (new Date()).getTime() * 0.001;
  moveHistory.push({ position: pos, time: now});
}

function getMovePosition(e) {
  var info = getEventInfo(e);
  var m = getRelativeCoordinates(info);
  g_lastMousePosition = m;
  g_lastMouseGridPosition = clientPositionToGridPosition(
     m.x,
     m.y,
     canvas.clientWidth,
     canvas.clientHeight);
  return {x: g_lastMouseGridPosition.x, y: g_lastMouseGridPosition.y};
}

function computeUnitSize() {
  return {
    width: g.globals.imageWidth * g.globals.imageSpacing * g.globals.imageScale,
    height: g.globals.imageHeight * g.globals.imageSpacing * g.globals.imageScale
  };
}

function computeSphereGridInfo() {
  var unit = computeUnitSize();
  var halfCircumfrence = Math.PI;
  var imagesAcrossSphere = Math.floor(halfCircumfrence / unit.width);
  var imagesDownSphere = Math.floor(halfCircumfrence / unit.height);
  var gridXOff = Math.floor(imagesAcrossSphere * -0.5);
  var gridYOff = Math.floor(imagesDownSphere * -0.5);
  var xOff = tdl.math.modClamp(g_scrollX % 1, 1);
  var yOff = tdl.math.modClamp(g_scrollY % 1, 1);
  var texXBase = -tdl.math.modClamp(Math.floor(g_scrollX - gridXOff), g_imagesAcrossGrid);
  var texYBase = -tdl.math.modClamp(Math.floor(g_scrollY - gridYOff), g_imagesDownGrid);

  return {
    unit: unit,
    imagesAcrossSphere: imagesAcrossSphere,
    imagesDownSphere: imagesDownSphere,
    gridXOff: gridXOff,
    gridYOff: gridYOff,
    xOff: xOff,
    yOff: yOff,
    texXBase: texXBase,
    texYBase: texYBase
  };
}

function computeSelection(si, mousePosition, mouseGridPosition) {
  // figure out which grid point to highlight.
  var ray = clientPositionToWorldRay(
      mousePosition.x,
      mousePosition.y,
      canvas.clientWidth,
      canvas.clientHeight);
  var intersection = raySphereIntersection(
      ray.near, ray.far, [0,0,0], g.imagePlaneConst.bendRadius);
  var sphereSelection = undefined;
  if (intersection) {
    var r = g.imagePlaneConst.bendRadius;
    var x = intersection[0];
    var y = intersection[1];
    var z = intersection[2];
    var longAngle = Math.atan2(x, z);
    var d = Math.sqrt(x * x + z * z);
    var latAngle = Math.atan2(y, d);
    var selectionX = longAngle / si.unit.width;
    var selectionY = latAngle  / si.unit.height;
    sphereSelection = {x: selectionX, y: selectionY};
  }

  var selection = {
    x: mouseGridPosition.x / si.unit.width,
    y: mouseGridPosition.y / si.unit.height
  };

  if (sphereSelection) {
    selection.x = math.lerpScalar(
          selection.x, sphereSelection.x, g.imagePlaneConst.bendAmount);
    selection.y = math.lerpScalar(
          selection.y, sphereSelection.y, g.imagePlaneConst.bendAmount);
  }

  var sx = -1;
  var sy = -1;

  if (selection) {
    sy = -selection.y + 0.5 - g_scrollY;
    sy = tdl.math.modClamp(Math.floor(sy), g_imagesDownGrid);
    sx = +selection.x + 0.5 - g_scrollX + (sy % 2) * g.globals.rowOffset;
    sx = tdl.math.modClamp(Math.floor(sx), g_imagesAcrossGrid);
  }

  return {x: sx, y: sy};
}

function handleMouseDown(e) {
  var pos = getMovePosition(e);
  down = true;
  startX = pos.x;
  startY = pos.y;
  scrollXStart = g_scrollX;
  scrollYStart = g_scrollY;
  g_moveVelocityX = 0;
  g_moveVelocityY = 0;
  moveHistory = [];
  addMoveHistory(pos);

  var si = computeSphereGridInfo();
  var sel = computeSelection(si, g_lastMousePosition, g_lastMouseGridPosition);
  // var status = document.getElementById("status");
  // status.innerHTML = g_textures[sel.y][sel.x].msg;
  // angular.element(document.getElementById('viewContainer')).scope().selectItemFromSphereView(g_textures[sel.y][sel.x].msg);
  return false;
}

function handleMouseMove(e) {
  var pos = getMovePosition(e);
  if (down) {
    addMoveHistory(pos);
    //Dump("sc:", g_scrollX, scrollY);
    g_scrollX = scrollXStart + (pos.x - startX);
    g_scrollY = scrollYStart - (pos.y - startY);
  }
  return false;
}

function handleMouseUp(e) {
  if (down) {
    down = false;
    var pos = getMovePosition(e);
    addMoveHistory(pos);
    // Get the newest and oldest move times. If the are close then spin.
    var oldest = moveHistory[0];
    var newest = moveHistory[moveHistory.length - 1];
    var elapsedTime = newest.time - oldest.time;

    if (elapsedTime < 0.4) {
      g_moveVelocityX =  (newest.position.x - oldest.position.x) / elapsedTime;
      g_moveVelocityY = -(newest.position.y - oldest.position.y) / elapsedTime;
      if(g_moveVelocityX == 0 && g_moveVelocityY == 0) {
        console.log('click');
        startX = pos.x;
        startY = pos.y;
        scrollXStart = g_scrollX;
        scrollYStart = g_scrollY;
        g_moveVelocityX = 0;
        g_moveVelocityY = 0;

        var si = computeSphereGridInfo();
        var sel = computeSelection(si, g_lastMousePosition, g_lastMouseGridPosition);
        // var status = document.getElementById("status");
        // status.innerHTML = g_textures[sel.y][sel.x].msg;
        angular.element(document.getElementById('viewContainer')).scope().selectItemFromSphereView(g_textures[sel.y][sel.x].msg);
      } else {
        console.log('drag');
      }
    }
  }
  return false;
}

/**
 * Calculate the intersection of a ray and a sphere
 *
 * point1 + mu1 (point2 - point1)
 * point1 + mu2 (point2 - point1)
 *
 * Return undefined.
 */
function raySphereIntersection(point1, point2, center, radius) {
  var kEpsilon = 0.0001;
  var dp = [
      point2[0] - point1[0],
      point2[1] - point1[1],
      point2[2] - point1[2]];
  var a = dp[0] * dp[0] +
          dp[1] * dp[1] +
          dp[2] * dp[2];
  var b = 2 * (dp[0] * (point1[0] - center[0]) +
               dp[1] * (point1[1] - center[1]) +
               dp[2] * (point1[2] - center[2]));
  var c = center[0] * center[0] +
          center[1] * center[1] +
          center[2] * center[2];
  c += point1[0] * point1[0] +
       point1[1] * point1[1] +
       point1[2] * point1[2];
  c -= 2 * (center[0] * point1[0] +
            center[1] * point1[1] +
            center[2] * point1[2]);
  c -= radius * radius;
  var bb4ac = b * b - 4 * a * c;
  if (Math.abs(a) < kEpsilon || bb4ac < 0) {
    return;
  }

  var sq = Math.sqrt(bb4ac);
  var mu1 = (-b + sq) / (2 * a);
  var mu2 = (-b - sq) / (2 * a);

  var m = Math.min(mu1, mu2);
  return math.addVector(point1, math.mulScalarVector(m, dp));
}

var headlines = [];
var sphereFlag = false;

function main() {
  math = tdl.math;
  fast = tdl.fast;
  canvas = document.getElementById("canvas");

  //canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
  // tell the simulator when to lose context.
  //canvas.loseContextInNCalls(10000);
  sphereFlag = true;

  tdl.webgl.registerContextLostHandler(canvas, handleContextLost);
  tdl.webgl.registerContextRestoredHandler(canvas, handleContextRestored);

  gl = tdl.webgl.setupWebGL(canvas);
  if (!gl) {
    return false;
  }
  if (g_debug) {
    gl = tdl.webgl.makeDebugContext(gl, undefined, LogGLCall);
  }

  g_fpsTimer = new tdl.fps.FPSTimer();
  hack();

  // Create a canvas 2d for making textures with text.
  g_canvas2d = document.createElement('canvas');
  g_canvas2d.width = 256;
  g_canvas2d.height = 256;
  g_ctx2d = g_canvas2d.getContext("2d");

  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);


  initialize();
}

function handleContextLost() {
  tdl.log("context lost");
  tdl.webgl.cancelRequestAnimationFrame(g_requestId);
}

function handleContextRestored() {
  tdl.log("context restored");
  initialize();
}

function initialize() {
  //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, gl.TRUE);
  // ctx.fillRect(50,50,50,50); // something in the background

  // var img = new Image();
  // img.onload = function() {
  //     gl.drawImage(img, 0, 0);
  // }
  // img.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png"; //transparent png

  var images = [
    "img/sphere/test_00.jpg",
    "img/sphere/test_01.jpg",
    "img/sphere/test_02.jpg",
    "img/sphere/test_03.jpg",
    "img/sphere/test_04.jpg",
    "img/sphere/test_05.jpg",
    "img/sphere/test_06.jpg",
    "img/sphere/test_07.jpg",
    "img/sphere/test_08.jpg",
    "img/sphere/test_09.jpg",
    "img/sphere/test_10.jpg",
    "img/sphere/test_11.jpg",
    "img/sphere/test_12.jpg",
    "img/sphere/test_13.jpg",
    "img/sphere/test_14.jpg",
    "img/sphere/test_15.jpg",
    "img/sphere/test_16.jpg",
    "img/sphere/test_17.jpg",
    "img/sphere/test_18.jpg",
    "img/sphere/test_19.jpg",
    "img/sphere/test_20.jpg"];


  var tmpImages = [];
  var tmpHeadlines = [];

  // make a bunch of textures.
  // What to do if we run out of memory?

  g_textures = [];
  for (var ii = 0; ii < g_imagesDownGrid; ++ii) {
    var textures = [];
    for (var jj = 0; jj < g_imagesAcrossGrid; ++jj) {
      var imgTexture = new ImgTexture();
      textures.push(imgTexture);
      if (tmpImages.length == 0) {
        tmpImages = images.slice();
      }
      if (tmpHeadlines.length == 0) {
        tmpHeadlines = headlines.slice();
      }
      var img = tmpImages.splice(math.randomInt(tmpImages.length), 1)[0];
      var headline = tmpHeadlines.splice(math.randomInt(tmpHeadlines.length), 1)[0];
      imgTexture.load(img, headline);
    }
    g_textures.push(textures);
  }

  Log("--Setup ImagePlane---------------------------------------");
  var imagePlane = setupImagePlane();
  Log("--Setup BlankPlane---------------------------------------");
  var blankPlane = setupBlankPlane();

  var then = 0.0;
  var clock = 0.0;
  // var fpsElem = document.getElementById("fps");

  var projection = new Float32Array(16);
  var view = new Float32Array(16);
  var world = new Float32Array(16);
  var worldInverse = new Float32Array(16);
  var worldInverseTranspose = new Float32Array(16);
  g_viewProjection = new Float32Array(16);
  var worldViewProjection = new Float32Array(16);
  var viewInverse = new Float32Array(16);
  g_viewProjectionInverse = new Float32Array(16);
  var eyePosition = new Float32Array(3);
  var target = new Float32Array(3);
  var up = new Float32Array([0,1,0]);
  var v3t0 = new Float32Array(3);
  var v3t1 = new Float32Array(3);
  var v3t2 = new Float32Array(3);
  var v3t3 = new Float32Array(3);
  var m4t0 = new Float32Array(16);
  var m4t1 = new Float32Array(16);
  var m4t2 = new Float32Array(16);
  var m4t3 = new Float32Array(16);
  var zero4 = new Float32Array(4);
  var one4 = new Float32Array([1,1,1,1]);
  var colorMult = new Float32Array(4);

  // Modern building uniforms.
  g.imagePlaneConst.viewProjection = g_viewProjection;
  var imagePlanePer = {
    world: world,
    colorMult: colorMult};

  var blankPlaneConst = {
    worldViewProjection: worldViewProjection};
  var blankPlanePer = { };

  var frameCount = 0;
  function render() {
    ++frameCount;
    var now = (new Date()).getTime() * 0.001;
    var elapsedTime;
    if(then == 0.0) {
      elapsedTime = 0.0;
    } else {
      elapsedTime = now - then;
    }
    then = now;

    g_fpsTimer.update(elapsedTime);
    // fpsElem.innerHTML = g_fpsTimer.averageFPS;

    clock += elapsedTime;
    eyePosition[0] = 0;
    eyePosition[1] = 0;
    eyePosition[2] = g.globals.eyeRadius;

    gl.colorMask(true, true, true, true);
    gl.depthMask(true);
    gl.clearDepth(1);

    ur = g.globals.backgroundRed;
    ug = g.globals.backgroundGreen;
    ub = g.globals.backgroundBlue;
    gl.clearColor(ur,ug,ub,3);
	  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

	  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    fast.matrix4.perspective(
        projection,
        math.degToRad(60),
        canvas.clientWidth / canvas.clientHeight,
        1,
        5000);
    fast.matrix4.lookAt(
        view,
        eyePosition,
        target,
        up);
    fast.matrix4.mul(g_viewProjection, view, projection);
    fast.matrix4.inverse(viewInverse, view);
    fast.matrix4.inverse(g_viewProjectionInverse, g_viewProjection);

    // Draw a blank plane in the middle to mask out the back
    // of the sphere. Alternatively I could figure out why
    // the back of the sphere is not culled by CULL_FACE.
    Log("--Draw Blank---------------------------------------");
    fast.matrix4.mul(
        world,
        fast.matrix4.scaling(m4t2, [100, 100, 100]),
        fast.matrix4.translation(m4t1, [0, 0, 1]));
    fast.matrix4.mul(worldViewProjection, world, g_viewProjection);
    blankPlane.drawPrep(blankPlaneConst);
    blankPlane.draw(blankPlanePer);

    Log("--Draw Images---------------------------------------");
    // All we do is draw a grid of image. The shader warps the grid into a sphere.

    // dampen the velocity
    g_moveVelocityX *= 0.95;
    g_moveVelocityY *= 0.95;

    // scroll
    g_scrollX += g_moveVelocityX * elapsedTime;
    g_scrollY += g_moveVelocityY * elapsedTime;

    var si = computeSphereGridInfo();
    var sel = computeSelection(si, g_lastMousePosition, g_lastMouseGridPosition);

    imagePlane.drawPrep(g.imagePlaneConst);
    var texturesPer = {};

    for (var yy = 0; yy <= si.imagesDownSphere; ++yy) {
      var texRowIndex = tdl.math.modClamp(si.texYBase + yy, g_imagesDownGrid);
      var textures = g_textures[texRowIndex];
      for (var xx = 0; xx <= si.imagesAcrossSphere; ++xx) {
        var texColIndex = tdl.math.modClamp(si.texXBase + xx, g_imagesAcrossGrid);
        texturesPer.diffuseSampler = textures[texColIndex];
        fast.matrix4.mul(
            world,
            fast.matrix4.scaling(
                m4t0,
                [g.globals.imageWidth * g.globals.imageScale,
                 g.globals.imageHeight * g.globals.imageScale,
                 1]),
            fast.matrix4.translation(
                m4t1,
                [(si.gridXOff + xx + si.xOff - (texRowIndex % 2) * g.globals.rowOffset) * si.unit.width,
                 (si.gridYOff + yy + si.yOff) * -si.unit.height,
                 0]));
        fast.matrix4.mul(worldViewProjection, world, g_viewProjection);

        colorMult[0] = 1 + ((sel.x == texColIndex && sel.y == texRowIndex) ? g.globals.selectionIntensity : 0);
        colorMult[1] = 1;
        colorMult[2] = 1;
        colorMult[3] = 1;
        imagePlane.draw(imagePlanePer, texturesPer);
      }
    }

    // Set the alpha to 255.
    // gl.colorMask(false, false, false, true);
    // gl.clearColor(0,0,0.8,3);
    // gl.clearColor(g.globals.backgroundRed/255,g.globals.backgroundGreen/255,g.globals.backgroundBlue/255,1);
    // gl.clear(gl.COLOR_BUFFER_BIT);

    // turn off logging after 1 frame.
    g_logGLCalls = false;

    if (!g_drawOnce) {
      g_requestId = tdl.webgl.requestAnimationFrame(render, canvas);
    }
  }
  render();
  return true;
}

var g_event;
var g_ui;

function getParamId(id) {
  return id.substr(6).replace(/(\w)/, function(m) {return m.toLowerCase() });
}

function setParam(event, ui, obj) {
  var id = event.target.id;
  var value = ui.value / 1000;
  tdl.log(id + ": " + value);
  obj[id] = value;
}

function getUIValue(obj, id) {
  return obj[id] * 1000;
}

function setupSlider($, elem, ui, obj) {
  var labelDiv = document.createElement('div');
  labelDiv.appendChild(document.createTextNode(ui.name));
  // var sliderDiv = document.createElement('div');
  // sliderDiv.id = ui.name;
  // elem.appendChild(labelDiv);
  // elem.appendChild(sliderDiv);

  var inputTag = document.createElement("input");
  inputTag.setAttribute('type', 'range');
  inputTag.setAttribute('min', 0);
  inputTag.setAttribute('max', ui.max * 1000);
  inputTag.setAttribute('step', 5);
  inputTag.setAttribute('value', ui.value?ui.value*1000:0);
  // inputTag.setAttribute('data-rangeslider', null);
  inputTag.id = ui.name;

  elem.appendChild(labelDiv);
  elem.appendChild(inputTag);

  // $(inputTag).rangeslider({
  //           // Deactivate the feature detection
  //     polyfill: false,
  //     // Callback function
  //     onInit: function() {
  //         valueOutput(this.$element[0]);
  //     },
  //     // Callback function
  //     onSlide: function(position, value) {
  //         setParam(event, ui, obj);
  //     },
  //     // Callback function
  //     onSlideEnd: function(position, value) {
  //         getUIValue(obj, ui.name);
  //     }
  // });
  $(inputTag).change(function() {
      obj[ui.name] = $(this).val() / 1000;
  })

  // $(sliderDiv).slider({
  //   range: false,
  //   step: 1,
  //   max: ui.max * 1000,
  //   value: getUIValue(obj, ui.name),
  //   slide: function(event, ui) { setParam(event, ui, obj); }
  // });
}
