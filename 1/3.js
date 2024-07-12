function setup() {
  createCanvas(800, 600);
  frameRate(25);
  background(100);
}

function draw() {
  // noprotect

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      set(x, y, color('#ff0090'));
    }
  }

  updatePixels();
}