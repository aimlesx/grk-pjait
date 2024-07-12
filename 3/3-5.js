// WITH FLOATING POINT NUMBERS
function setup() {
  createCanvas(256, 256);
  background(255);
}

let p1 = [0, 0];
let p2 = [0, 0];

function mousePressed() {
  p1 = [mouseX, mouseY];
}

function mouseDragged() {
  p2 = [mouseX, mouseY];
  background(255);
  noStroke();
  fill('red');
  ellipse(p1[0] - 3,p1[1] - 3, 6);
  fill('green');
  ellipse(p2[0] - 3, p2[1] - 3, 6);
}

function set_pixel(x, y, c) {
  const d = pixelDensity();

  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {

      const idx = 4 * ((y * d + j) * width * d + (x * d + i));
      pixels[idx] = -c;
      pixels[idx + 1] = c;
      pixels[idx + 2] = 0;
      pixels[idx + 3] = 255;
    }
  }
}

function draw_line() {
  const ydist = () => {}

  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const a = -dy / dx; // *(-1) to account for inversed y axis
  const b = p1[1] - a * p1[0];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const d = dy / dx * (x - p1[0]) - (y - p1[1]);
      set_pixel(x, y, d)
    }
  }
}

function mouseReleased() {
  background(255);
  loadPixels();
  draw_line();
  updatePixels();
}

// WITHOUT FLOATING POINT NUMBERS
function setup() {
  createCanvas(256, 256);
  background(255);
}

let p1 = [0, 0];
let p2 = [0, 0];

function mousePressed() {
  p1 = [mouseX, mouseY];
}

function mouseDragged() {
  p2 = [mouseX, mouseY];
  background(255);
  noStroke();
  fill('red');
  ellipse(p1[0] - 3, p1[1] - 3, 6);
  fill('green');
  ellipse(p2[0] - 3, p2[1] - 3, 6);
}

function set_pixel(x, y, c) {
  const d = pixelDensity();
  
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      
      const idx = 4 * ((y * d + j) * width * d + (x * d + i));
      pixels[idx] = -c;
      pixels[idx + 1] = c;
      pixels[idx + 2] = 0;
      pixels[idx + 3] = 255;
    }
  }  
}

function draw_line() {  
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
    
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const d = (2 * dy * (x - p1[0]) - 2 * dx * (y - p1[1])) * 2 * dx;
      set_pixel(x, y, d);
    }
  }
}

function mouseReleased() {
  background(255);
  loadPixels();
  draw_line();
  updatePixels();
}