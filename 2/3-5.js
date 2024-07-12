function preload() {
  this.original = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
  const original = this.original;
  this.original = undefined;
  
  original.resize(256, 256);
  original.loadPixels();
  
  const img_v = createImage(256, 256);
  
  img_v.loadPixels();
    
  for (let i = 0; i < img_v.pixels.length; i += 4) {
    const r = original.pixels[i] / 255;
    const g = original.pixels[i + 1] / 255;
    const b = original.pixels[i + 2] / 255;

    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);

    const v = cmax;

    const [x, y] = [(i / 4) % 256, (i / 4) / 256];

    img_v.set(x, y, 255 * v);
  }

  img_v.updatePixels();
  
  createCanvas(512, 512);
  image(img_v, 0, 0);
  image(original, 256, 0);
}