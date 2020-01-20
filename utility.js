function removeFromArray(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elem) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  // var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  var d = getDistance2D(a.i, a.j, b.i, b.j);

  return d;
}

function getDistance2D(x1, x2, y1, y2) {
  var a = x1 - x2;
  var b = y1 - y2;

  var d = Math.sqrt(a * a + b * b);
  return d;
}

function getDistance3D(x1, x2, y1, y2, z1, z2) {
  var a = x1 - x2;
  var b = y1 - y2;
  var c = z1 - z2;

  var d = Math.sqrt(a * a + b * b + c * c);
  return d;
}
