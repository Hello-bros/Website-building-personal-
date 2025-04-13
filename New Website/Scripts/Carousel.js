/**
 * Carousel functionality for hero banner and product sections
 * Includes auto-rotation, pause on hover, and keyboard navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  // Hero Carousel
  const heroCarousel = {
    slides: document.querySelectorAll('.carousel-slide'),
    indicators: document.querySelectorAll('.indicator'),
    prevBtn: document.querySelector('.carousel-prev'),
    nextBtn: document.querySelector('.carousel-next'),
    currentIndex: 0,
    interval: null,
    intervalTime: 5000,

    init: function() {
      this.setupEventListeners();
      this.startAutoRotation();
      this.updateSlidePosition();
    },

    setupEventListeners: function() {
      // Previous button
      this.prevBtn.addEventListener('click', () => {
        this.stopAutoRotation();
        this.prevSlide();
        this.startAutoRotation();
      });

      // Next button
      this.nextBtn.addEventListener('click', () => {
        this.stopAutoRotation();
        this.nextSlide();
        this.startAutoRotation();
      });

      // Indicators
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          this.stopAutoRotation();
          this.goToSlide(index);
          this.startAutoRotation();
        });
      });

      // Pause on hover
      const carouselContainer = document.querySelector('.carousel-container');
      carouselContainer.addEventListener('mouseenter', () => this.stopAutoRotation());
      carouselContainer.addEventListener('mouseleave', () => this.startAutoRotation());

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.stopAutoRotation();
          this.prevSlide();
          this.startAutoRotation();
        } else if (e.key === 'ArrowRight') {
          this.stopAutoRotation();
          this.nextSlide();
          this.startAutoRotation();
        }
      });
    },

    startAutoRotation: function() {
      this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
    },

    stopAutoRotation: function() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },

    nextSlide: function() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateSlidePosition();
    },

    prevSlide: function() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.updateSlidePosition();
    },

    goToSlide: function(index) {
      this.currentIndex = index;
      this.updateSlidePosition();
    },

    updateSlidePosition: function() {
      // Hide all slides
      this.slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
        this.indicators[index].classList.remove('active');
      });

      // Show current slide
      this.slides[this.currentIndex].classList.add('active');
      this.slides[this.currentIndex].setAttribute('aria-hidden', 'false');
      this.indicators[this.currentIndex].classList.add('active');
    }
  };

  // Initialize hero carousel
  heroCarousel.init();

  // Product Carousels
  const productCarousels = document.querySelectorAll('[data-carousel]');
  
  productCarousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
      carousel.style.scrollBehavior = 'auto';
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
      carousel.style.scrollBehavior = 'smooth';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.scrollBehavior = 'auto';
    });

    carousel.addEventListener('touchend', () => {
      isDown = false;
      carousel.style.scrollBehavior = 'smooth';
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });

  // Lazy loading for images
  const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach((img) => imageObserver.observe(img));
    }
  };

  lazyLoadImages();
});