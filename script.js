class SimplePaint {
  constructor(canvasId, brushSizeId, colorPickerId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.brushSizeInput = document.getElementById(brushSizeId);
    this.colorPicker = document.getElementById(colorPickerId);
    this.painting = false;
    this.blinkingCircles = [];
    this.brushMode = true;
    this.drawCirclesMode = false;

    this.canvas.addEventListener('mousedown', this.startPosition.bind(this));
    this.canvas.addEventListener('mouseup', this.endPosition.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
  }

  startPosition(e) {
    if (this.brushMode) {
      this.painting = true;
      this.ctx.beginPath();
      this.draw(e);
    } else if (this.drawCirclesMode) {
      const circle = { x: e.clientX - this.canvas.offsetLeft, y: e.clientY - this.canvas.offsetTop, color: this.getRandomColor() };
      this.blinkingCircles.push(circle);
      this.drawCircle(circle);
    }
  }

  endPosition() {
    if (this.brushMode) {
      this.painting = false;
      this.ctx.closePath();
    }
  }

  draw(e) {
    if (!this.painting) return;

    this.ctx.lineWidth = this.brushSizeInput.value;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.colorPicker.value;

    this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
  }

  drawCircle(circle) {
    this.ctx.beginPath();
    this.ctx.arc(circle.x, circle.y, this.brushSizeInput.value / 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = circle.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  saveImage() {
    const image = this.canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    a.download = 'painting.png';
    a.click();
  }

  drawBlinkingCircles() {
    this.blinkingCircles.forEach((circle) => {
      this.drawCircle(circle);
    });
  }

  setBrushMode() {
    this.brushMode = true;
    this.drawCirclesMode = false;
  }

  setDrawCirclesMode() {
    this.brushMode = false;
    this.drawCirclesMode = true;
  }
}

const paintApp = new SimplePaint('paintCanvas', 'brush-size', 'color-picker');
const clearCanvasButton = document.getElementById('clearCanvasButton');
const saveImageButton = document.getElementById('saveImageButton');
const brushButton = document.getElementById('brushButton');
const drawCirclesButton = document.getElementById('drawCirclesButton');

clearCanvasButton.addEventListener('click', () => {
  paintApp.clearCanvas();
  paintApp.blinkingCircles = [];
});

saveImageButton.addEventListener('click', () => paintApp.saveImage());
brushButton.addEventListener('click', () => paintApp.setBrushMode());
drawCirclesButton.addEventListener('click', () => paintApp.setDrawCirclesMode());
paintApp.canvas.addEventListener('mousedown', (e) => paintApp.startPosition(e));
paintApp.canvas.addEventListener('mouseup', () => paintApp.endPosition());
paintApp.canvas.addEventListener('mousemove', (e) => paintApp.draw(e));
setInterval(() => paintApp.drawBlinkingCircles(), 1000);
r');
