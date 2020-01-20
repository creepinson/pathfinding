var cols = 25;
var rows = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
var nosolution = false;

function Cell(i, j) {
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.x = i;
  this.y = j;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.3) {
    this.wall = true;
  }

  this.show = function(color) {
    fill(color);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.x * w, this.y * h, w - 1, h - 1);
  };

  this.addNeighbors = function(grid) {
    var i = this.x;
    var j = this.y;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }

    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }

    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }

    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}

function setup() {
  createCanvas(400, 400);
  console.log("'A*");

  w = width / cols;
  h = height / rows;

  // creating a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  start.wall = false;
  end.wall = false;

  openSet.push(start);

  console.log(grid);
}

function draw() {
  if (openSet.length > 0) {
    // keep going
    var winner = 0;

    for (var i = 0; i < openSet.length; i++) {
      if (openSet.f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      noLoop();

      console.log("DONE!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  } else {
    // no solution
    console.log("No solution");
    nosolution = true;
    noLoop();
  }

  background(0);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  // Find the path
  if (!nosolution) {
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }

  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }
  noFill();
  stroke(255);
  beginShape();

  for (var i = 0; i < path.length; i++) {
    vertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
  }
  endShape();
}
