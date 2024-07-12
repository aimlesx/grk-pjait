function _dist(p1, p2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [dx, dy] = [abs(x2-x1), abs(y2-y1)];
  return sqrt(dx*dx+dy*dy);
}

function _triangle(offset = [0, 0], size = [200, 100], col = color(255, 255, 255)) {
  const [w, h] = size;
  const [ox, oy] = offset;
  for(let y = 0; y < h; y++) {
    for(let x = 0; x < w; x++) {
      const xfactor = y/h;
      const xdist = xfactor * w / 2;
      const halfx = abs(x - w / 2);
      const filled = halfx < abs(xdist);
      if (filled)
        set(ox + x, oy + y, col);
    } 
  }
}

function _square(offset = [0, 0], size = [100, 100], col = color(255, 255, 255)) {
  const [w, h] = size;
  const [ox, oy] = offset;
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      set(ox + x, oy + y, col);
    }
  }
}

function setup() {
  createCanvas(500,400);
  frameRate(1);
  background(0, 0, 0);
  
  const sky_color = color(119,170,255);
  const house_color = color(205, 127, 50);
  const roof_color = color(230, 0, 0);
  const grass_color = color(0, 180, 100);
  const flowers_color = color(0, 255, 0);
  
  
  // Sky
  _square([0, 0], [width, height], sky_color);
  // House
  _square([100, 140], [300, 150], house_color);
  // Grass
  const grassHeight = height-290;
  _square([0, 290], [width, grassHeight], grass_color);
  
  // Roof
  _triangle([50, 40], [400, 100], roof_color);
  
  // Flowers
  for (let i = 0; i < 1000; i++) {
    const [x, y] = [floor(random(0, width)), floor(random(0, grassHeight))];
    set(x, 290 + y, flowers_color);
  }
  
  updatePixels();
}