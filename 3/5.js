function setup() {
  createCanvas(512, 512);
  background(255);
}

let p1 = [0, 0];
let p2 = [0 ,0];

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

function lerpp(c, t, s) {
  if (c === t) return c;
  
  const diff = Math.abs(t - c);
  const step = Math.min(s, diff);
  
  return c < t ? c + step : c - step;
}

function draw_line() {
  let dx = Math.abs(p2[0] - p1[0]);
  let dy = Math.abs(p2[1] - p1[1]);

  let set_override = set_pixel;
  
  if (dy >= dx) {
    [dx, dy] = [dy, dx];
    p1 = [p1[1], p1[0]];
    p2 = [p2[1], p2[0]];
    
    set_override = (x, y, c) => set_pixel(y, x, c);
  }
  
  const dp = 2 * dy - dx;
  const deq = 2 * dy;
  const dinc = 2 * dy - 2 * dx;
  
  let d = dp;
  let y = p1[1];
  
  for (let x = p1[0]; x !== p2[0]; x = lerpp(x, p2[0], 1)) {
    set_override(x, y, 0);
    if (d < 0) d += deq;
    else {
      d += dinc;
      y = lerpp(y, p2[1], 1);
    }
  }
}

function mouseReleased() { 
  background(255);
  loadPixels();
  draw_line();
  updatePixels();
}
