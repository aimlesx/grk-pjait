const verts = [[250, 20], [450, 350], [50, 350]];
const [A, B, C] = verts;

function setup() {
  createCanvas(500, 400);
  frameRate(1);
  background(0, 0, 0);
  
  stroke(255);
  verts.forEach(vert => point(...vert));
  
  let [cx, cy] = A;
  
  const iterations = 20000;
  for (let i = 0; i < iterations; i++) {
    const variant = floor(random(0, 3));
    cx = (cx + verts[variant][0]) / 2;
    cy = (cy + verts[variant][1]) / 2;
    point(cx, cy);
  }
  
  updatePixels();
}