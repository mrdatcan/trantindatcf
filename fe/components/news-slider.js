let currentIndex = 0;
const slider = document.querySelector('.news-slider');
const items = document.querySelectorAll('.news-item');
const total = items.length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % total;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}, 5000);
                            