function setup() {
  createCanvas(400, 400);
  frameRate(1);
  background(100);
}

function draw() {
  // noprotect

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      set(x, y, x / width * 255);
    }
  }

  updatePixels();
}