// Press space to see the transformed image
let imgA, imgB;

function drawVector(img, vector) {
    img.loadPixels();
    img.set(vector.x, vector.y, 0);
    img.updatePixels();
}

function setup() {
    let canvas = createCanvas(512, 512);

    background(220);

    imgA = createImage(512, 512);
    imgB = createImage(512, 512);
}

function mouseDragged() {
    const vector = Vector.make(mouseX, mouseY);
    drawVector(imgA, vector);
    const vec2 = Matrix.rotation(45).multiply(vector);
    drawVector(imgB, vec2);
}

function draw() {
    background(220);
    if (!keyIsDown(32)) {
        image(imgA, 0, 0);
        text('A', 10, 20);
    } else {
        image(imgB, 0, 0);
        text('B', 10, 20);
    }
}

function radians(degrees) {
    return degrees * Math.PI / 180;
}

class Vector {
    constructor(x, y, z = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    asArray() {
        return [this.x, this.y, this.z];
    }

    static make(x, y, z = 1) {
        return new Vector(x, y, z);
    };
}

class Matrix {
    constructor(data) {
        this.data = data;
    }

    static identity() {
        return new Matrix([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
    }

    static translation(x, y) {
        return new Matrix([
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ]);
    }

    static scale(x, y) {
        return new Matrix([
            [x, 0, 0],
            [0, y, 0],
            [0, 0, 1]
        ]);
    }

    static rotation(angle) {
        const rad = radians(angle);
        return new Matrix([
            [Math.cos(rad), -Math.sin(rad), 0],
            [Math.sin(rad), Math.cos(rad), 0],
            [0, 0, 1]
        ]);
    }

    static shear(x, y) {
        return new Matrix([
            [1, x, 0],
            [y, 1, 0],
            [0, 0, 1]
        ]);
    }

    translate(x, y) {
        return this.multiply(Matrix.translation(x, y));
    }

    scale(x, y) {
        return this.multiply(Matrix.scale(x, y));
    }

    rotate(angle) {
        return this.multiply(Matrix.rotation(angle));
    }

    shear(x, y) {
        return this.multiply(Matrix.shear(x, y));
    }

    #multiplyV(vector) {
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push(0);
            for (let j = 0; j < 3; j++) {
                result[i] += this.data[i][j] * vector.asArray()[j];
            }
        }
        return new Vector(result[0], result[1], result[2]);
    }

    #multiplyM(other) {
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push([]);
            for (let j = 0; j < 3; j++) {
                result[i].push(0);
                for (let k = 0; k < 3; k++) {
                    result[i][j] += this.data[i][k] * other.data[k][j];
                }
            }
        }
        return new Matrix(result);
    }

    multiply(something) {
        if (something instanceof Matrix) {
            return this.#multiplyM(something);
        } else if (something instanceof Vector) {
            return this.#multiplyV(something);
        } else {
            throw new Error('Invalid type');
        }
    }
}
