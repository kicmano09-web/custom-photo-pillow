/**
 * Image Customizer - Canvas-based Photo Editor
 * Handles upload, zoom, rotate, crop, and preview functionality
 */

class ImageCustomizer {
  constructor() {
    this.canvas = document.getElementById('customizerCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.placeholder = document.getElementById('canvasPlaceholder');
    this.uploadInput = document.getElementById('imageUpload');
    this.zoomSlider = document.getElementById('zoomSlider');
    this.rotateSlider = document.getElementById('rotateSlider');
    this.cropButton = document.getElementById('cropButton');
    this.resetButton = document.getElementById('resetButton');
    this.removeImageButton = document.getElementById('removeImageButton');
    this.imageData = null;
    this.image = new Image();
    this.zoom = 1;
    this.rotation = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.init();
  }

  init() {
    // File upload
    this.canvas.addEventListener('click', () => this.uploadInput.click());
    this.placeholder.addEventListener('click', () => this.uploadInput.click());
    this.uploadInput.addEventListener('change', (e) => this.handleImageUpload(e));

    // Drag and drop
    this.canvas.addEventListener('dragover', (e) => e.preventDefault());
    this.canvas.addEventListener('drop', (e) => this.handleDragDrop(e));

    // Canvas events
    this.canvas.addEventListener('mousedown', (e) => this.startDrag(e));
    this.canvas.addEventListener('mousemove', (e) => this.drag(e));
    this.canvas.addEventListener('mouseup', () => this.endDrag());
    this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));

    // Touch events for mobile
    this.canvas.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
    this.canvas.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
    this.canvas.addEventListener('touchend', () => this.endDrag());

    // Slider events
    this.zoomSlider.addEventListener('input', (e) => this.handleZoom(e));
    this.rotateSlider.addEventListener('input', (e) => this.handleRotate(e));

    // Button events
    this.cropButton.addEventListener('click', () => this.cropImage());
    this.resetButton.addEventListener('click', () => this.resetImage());
    this.removeImageButton.addEventListener('click', () => this.removeImage());
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      this.loadImage(file);
    }
  }

  handleDragDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      this.loadImage(file);
    }
  }

  loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.image.src = e.target.result;
      this.image.onload = () => {
        this.placeholder.style.display = 'none';
        this.zoom = 1;
        this.rotation = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.zoomSlider.value = 1;
        this.rotateSlider.value = 0;
        this.draw();
        this.updateImageData();
      };
    };
    reader.readAsDataURL(file);
  }

  handleZoom(e) {
    this.zoom = parseFloat(e.target.value);
    const zoomPercent = Math.round(this.zoom * 100);
    e.target.nextElementSibling.textContent = zoomPercent + '%';
    this.draw();
  }

  handleRotate(e) {
    this.rotation = parseInt(e.target.value);
    const rotateValue = e.target.value + '°';
    e.target.nextElementSibling.textContent = rotateValue;
    this.draw();
  }

  handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    this.zoom = Math.max(0.5, Math.min(3, this.zoom + delta));
    this.zoomSlider.value = this.zoom;
    this.zoomSlider.nextElementSibling.textContent = Math.round(this.zoom * 100) + '%';
    this.draw();
  }

  startDrag(e) {
    if (!this.image.src) return;
    this.isDragging = true;
    this.dragStartX = e.clientX || e.pageX;
    this.dragStartY = e.clientY || e.pageY;
  }

  drag(e) {
    if (!this.isDragging || !this.image.src) return;
    const currentX = e.clientX || e.pageX;
    const currentY = e.clientY || e.pageY;
    this.offsetX += currentX - this.dragStartX;
    this.offsetY += currentY - this.dragStartY;
    this.dragStartX = currentX;
    this.dragStartY = currentY;
    this.draw();
  }

  endDrag() {
    this.isDragging = false;
  }

  draw() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    if (!this.image.src) return;

    this.ctx.save();
    this.ctx.translate(width / 2, height / 2);
    this.ctx.rotate((this.rotation * Math.PI) / 180);
    this.ctx.scale(this.zoom, this.zoom);
    this.ctx.translate(this.offsetX, this.offsetY);

    const scaleFactor = Math.min(width, height) / Math.max(this.image.width, this.image.height);
    const drawWidth = this.image.width * scaleFactor;
    const drawHeight = this.image.height * scaleFactor;

    this.ctx.drawImage(this.image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    this.ctx.restore();
  }

  cropImage() {
    this.imageData = this.canvas.toDataURL('image/jpeg', 0.95);
    this.updateImageData();
    alert('Image cropped and ready for order!');
  }

  resetImage() {
    this.zoom = 1;
    this.rotation = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.zoomSlider.value = 1;
    this.rotateSlider.value = 0;
    this.draw();
  }

  removeImage() {
    this.image.src = '';
    this.imageData = null;
    this.placeholder.style.display = 'flex';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.uploadInput.value = '';
    document.getElementById('customizedImageData').value = '';
  }

  updateImageData() {
    this.imageData = this.canvas.toDataURL('image/jpeg', 0.95);
    document.getElementById('customizedImageData').value = this.imageData;
  }
}

// Initialize customizer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ImageCustomizer();
  });
} else {
  new ImageCustomizer();
}
