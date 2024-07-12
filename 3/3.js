function setup() {
  createCanvas(512, 512);
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
      pixels[idx] = c;
      pixels[idx + 1] = c;
      pixels[idx + 2] = c;
      pixels[idx + 3] = 255;
    }
  }  
}

function draw_line() {
  const dx = p2[0] - p1[0];
  const dy = p1[1] - p2[1];
  const a = -dy / dx; // *(-1) to account for inversed y axis
  const b = p1[1] - a * p1[0];
  
  const xs = [p1[0], p2[0]];
  const range = [Math.max(Math.min(...xs), 0), Math.min(Math.max(...xs), width)];
  
  for (let x = range[0]; x <= range[1]; x++) {
    let val = a * x + b;
    set_pixel(x, Math.round(val), 0);
  }
}

function mouseReleased() {
  background(255);
  loadPixels();
  draw_line();
  updatePixels();
}

