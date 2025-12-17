// Package
class Carousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = document.querySelectorAll('.carousel-slide').length;
    this.slidesToShow = 3;
    this.slidesToScroll = 1;
    this.viewport = document.getElementById('carouselViewport');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.indicators = document.querySelectorAll('.indicator');

    this.init();
    this.updateResponsive();
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.previousSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    window.addEventListener('resize', () => this.updateResponsive());
    this.addTouchSupport();
  }

  updateResponsive() {
    if (window.innerWidth <= 768) {
      this.slidesToShow = 1;
    } else if (window.innerWidth <= 1024) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 3;
    }
    this.updateCarousel();
  }

  updateCarousel() {
    const slideWidth = 100 / this.slidesToShow;
    const translateX = -this.currentSlide * slideWidth;
    this.viewport.style.transform = `translateX(${translateX}%)`;

    const indicatorIndex = Math.floor(this.currentSlide / this.slidesToScroll);
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === indicatorIndex);
    });
  }

  nextSlide() {
    const maxSlide = this.totalSlides - this.slidesToShow;
    this.currentSlide = this.currentSlide < maxSlide ? this.currentSlide + this.slidesToScroll : 0;
    this.updateCarousel();
  }

  previousSlide() {
    this.currentSlide = this.currentSlide > 0
      ? this.currentSlide - this.slidesToScroll
      : this.totalSlides - this.slidesToShow;
    this.updateCarousel();
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex * this.slidesToScroll;
    this.updateCarousel();
  }

  addTouchSupport() {
    let startX = 0;
    let diffX = 0;
    this.viewport.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    this.viewport.addEventListener('touchmove', (e) => diffX = startX - e.touches[0].clientX);
    this.viewport.addEventListener('touchend', () => {
      if (Math.abs(diffX) > 50) diffX > 0 ? this.nextSlide() : this.previousSlide();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
});
// End Package

