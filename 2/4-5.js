function preload() {
  this.original = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
  const original = this.original;
  this.original = undefined;
  
  original.resize(256, 256);
  original.loadPixels();
  
  const img_h = createImage(256, 256);
  const img_s = createImage(256, 256);
  const img_v = createImage(256, 256);
  
  img_h.loadPixels();
  img_s.loadPixels();
  img_v.loadPixels();
  
  for (let i = 0; i < img_v.pixels.length; i += 4) {
    const r = original.pixels[i] / 255;
    const g = original.pixels[i + 1] / 255;
    const b = original.pixels[i + 2] / 255;

    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);

    const v = cmax;

    const c = cmax - cmin;
    const s = cmax ? c / cmax : 0;
    
    const [x, y] = [(i / 4) % 256, (i / 4) / 256];

    let h;
    if (c === 0)
      h = 0;
    else {
      switch(v) {
        case r:
          h = ((g - b) / c) % 6;
          break;
        case g:
          h = ((b - r) / c) + 2;
          break;
        case b:
          h = ((r - g) / c) + 4;
          break;
      }
    }
    
    h /= 6;
    
    h += h < 0;
    
    img_h.set(x, y, 255 * h);
    img_s.set(x, y, 255 * s);
    img_v.set(x, y, 255 * v);
  }

  img_h.updatePixels();
  img_s.updatePixels();
  img_v.updatePixels();
  
  createCanvas(512,512);
  image(img_h, 0, 0);
  image(img_s, 256, 0);
  image(img_v, 0, 256);
  image(original, 256, 256);
}