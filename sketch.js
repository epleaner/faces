// Modified from https://gist.github.com/lmccart/2273a047874939ad8ad1

// For you to be able to share data between users
// Face tracker object
let ctracker;
let video;
let currentPositions;
let lastPositions;

// gui params
var labelPoints = false;

// gui
var visible = true;
var gui, gui2;

function setup() {
  gui = createGui('🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖');
  gui.addGlobals('labelPoints');

  // setup camera capture
  video = createCapture(VIDEO);
  video.size(window.innerWidth, window.innerHeight);
  video.hide();

  // setup canvas
  createCanvas(window.innerWidth, window.innerHeight);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);

  noStroke();
}

function draw() {
  background(255, 20);
  // image(video, 0, 0);

  currentPositions = ctracker.getCurrentPosition();

  if (currentPositions) lastPositions = currentPositions;
  drawPositions();
}

function drawPositions() {
  let positions = currentPositions || lastPositions;

  if (positions) {
    for (let p in positions) {
      let pos = positions[p];
      fill('red');
      ellipse(pos[0], pos[1], 3);

      if (labelPoints) {
        fill('green');
        text(p, pos[0], pos[1] - 5);
      }
    }
  }
}
