const offsets = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function setup() {
  createCanvas(128, 128);
  background(255);
}

let last = [-1, -1];

function mouseDragged() {
  if(mouseButton !== LEFT) return;
  if(last[0] > 0) {
    line(...last, mouseX, mouseY);
  }
  last = [mouseX, mouseY];
}
function mouseReleased() {
  last = [-1, -1];
  if(mouseButton === CENTER) {
    loadPixels();
    flood_fill(mouseX,mouseY);
    updatePixels();
  }
}

function set_pixel(x,y,c) {
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

function get_pixel(x, y, c) {
  const d = pixelDensity();
  
  const idx = 4 * ((y * d) * width * d + (x * d));
  
  return pixels[idx];
}

function flood_fill(x,y) {
  let stack = new Array(0);
  stack.push([x, y]);
    
  let guard = 900000;
  
  while (stack.length > 0 && guard > 0) {
    guard--;
    
    const [x, y] = stack.pop();
    
    if (0 > x || x > width || 0 > y || y > height) continue;
    if (get_pixel(x, y) < 250) continue;
    
    set_pixel(x, y, 200);
    const next = offsets.map(([ox, oy]) => [x + ox, y + oy]);
    stack.push(...next);
  }
}