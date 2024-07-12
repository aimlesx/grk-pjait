function preload() {
  this.original = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
  createCanvas(256, 512);
  
  const original = this.original;
  this.original = undefined;
  
  original.filter(GRAY);
  original.resize(256, 256);
  original.loadPixels();
    
  let histogram = new Array(256).fill(0);

  for (let i = 0; i < original.pixels.length; i += 4) {
    const grayness = original.pixels[i];
    histogram[grayness]++;
  }
  
  const max = Math.max(...histogram);
  histogram = histogram.map(v => v / max * 256);
  
  const scale = 10;

  stroke(0);
  for (let i = 0; i < histogram.length; i++) {
    line(i, 256, i, 256 - histogram[i] * scale);
  }
  
  image(original, 0, 256);
}