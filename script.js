class SimplePaint {
  constructor(canvasId, brushSizeId, colorPickerId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.brushSizeInput = document.getElementById(brushSizeId);
    this.colorPicker = document.getElementById(colorPickerId);
    this.painting = false;

    this.canvas.addEventListener('mousedown', this.startPosition.bind(this));
    this.canvas.addEventListener('mouseup', this.endPosition.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
  }

  startPosition(e) {
    this.painting = true;
    this.draw(e);
  }

  endPosition() {
    this.painting = false;
    this.ctx.beginPath();
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
}
const paintApp = new SimplePaint('paintCanvas', 'brush-size', 'color-picker');
