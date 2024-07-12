function setup() {
  createCanvas(400, 400);
  frameRate(1);
  background(255, 0, 0);
}

function _dist(p1, p2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [dx, dy] = [abs(x2 - x1), abs(y2 - y1)];
  return sqrt(dx * dx + dy * dy);
}

function draw() {
  // noprotect

  const _center = [width / 2, height / 2];
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const dist_center = _dist([x, y], _center) / 130;
      const raidal_intensity = dist_center * 255;
      const dist_tl = _dist([x,y], [0,0]);
      const diag = sqrt(width ** 2 + height ** 2);
      set(x, y, color(255 - raidal_intensity, raidal_intensity, 255 * (dist_tl / diag)));
    }
  }

  updatePixels();
}