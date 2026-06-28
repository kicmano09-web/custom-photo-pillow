/**
 * Gallery - Image gallery with lightbox functionality
 * Handles thumbnail selection and full-screen image viewing
 */

class Gallery {
  constructor() {
    this.thumbnails = document.querySelectorAll('.thumbnail');
    this.mainImage = document.getElementById('galleryImage');
    this.init();
  }

  init() {
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => this.selectImage(thumb, index));
    });
  }

  selectImage(thumb, index) {
    // Remove active class from all thumbnails
    this.thumbnails.forEach((t) => t.classList.remove('active'));
    // Add active class to clicked thumbnail
    thumb.classList.add('active');
    // Update main image
    const imageUrl = thumb.dataset.imageUrl;
    this.mainImage.src = imageUrl;
  }
}

// Initialize gallery
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.thumbnail')) {
      new Gallery();
    }
  });
} else {
  if (document.querySelector('.thumbnail')) {
    new Gallery();
  }
}
