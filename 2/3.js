function preload() {
  this.original = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
  const original = this.original;
  this.original = undefined;
  
  original.resize(256, 256);
  original.loadPixels();
  
  // [r, g, b]
  const imgs = new Array(3).fill(null).map(img => createImage(256, 256));
  
  imgs.map((img, idx) => {
    img.loadPixels();
    
    for (let i = 0; i < img.pixels.length; i += 4) {
      img.pixels[i + idx] = original.pixels[i + idx];
      img.pixels[i + 3] = 255;
    }
    
    img.updatePixels();
  });
  
  createCanvas(512, 512);
  
  [[0, 0], [256, 0], [0, 256]].map((loc, idx) => {
    image(imgs[idx], ...loc);
  })
  
  const combined = imgs.reduce((prev, img) => {
    prev.blend(img, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
    return prev;
  }, createImage(256, 256));
  
  image(combined, 256, 256);
}