const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 800;
const height = canvas.height = 500;

const colorPicker = document.getElementById('colorPicker');

// Retorna uma variação clara ou escura da cor base
function getVariantColor(baseColor, opacity = 1) {
  return baseColor + Math.floor(Math.random() * 128).toString(16).padStart(2, '0');
}

// Função aleatória
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Classe básica de forma
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Bola saltitante
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}

// Quadrado saltitante (desafio extra)
class Square extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
  }

  update() {
    if ((this.x + this.size/2) >= width || (this.x - this.size/2) <= 0) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size/2) >= height || (this.y - this.size/2) <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}

let shapes = [];

function createShapes() {
  const colorBase = colorPicker.value;
  shapes = [];

  for (let i = 0; i < 10; i++) {
    const size = random(10, 25);
    const x = random(size, width - size);
    const y = random(size, height - size);
    const velX = random(-3, 3);
    const velY = random(-3, 3);
    const color = getVariantColor(colorBase);
    if (i % 2 === 0) {
      shapes.push(new Ball(x, y, velX, velY, color, size));
    } else {
      shapes.push(new Square(x, y, velX, velY, color, size + 5));
    }
  }
}

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, width, height);

  for (const shape of shapes) {
    shape.draw();
    shape.update();
  }

  requestAnimationFrame(loop);
}

// Atualiza cor base e reinicia
colorPicker.addEventListener('input', createShapes);

// Início
createShapes();
loop();
