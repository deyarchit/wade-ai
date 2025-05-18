let carouselInterval;

function startCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const inner = carousel.querySelector('.carousel-inner');
    const items = Array.from(inner.children);
    let currentIndex = 0;
    const indicators = Array.from(carousel.querySelectorAll('.carousel-indicator'));
    const controls = carousel.querySelectorAll('.carousel-control-button');


    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function goToSlide(index) {
        if (index < 0) {
            index = items.length - 1;
        } else if (index >= items.length) {
            index = 0;
        }
        currentIndex = index;
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators(currentIndex);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    controls.forEach(control => {
        control.addEventListener('click', (event) => {
            event.stopPropagation();
            if (control.classList.contains('prev')) {
                prevSlide();
            } else {
                nextSlide();
            }
            clearInterval(carouselInterval);  // Clear interval on manual control
            startCarousel(carouselId);     // Restart interval
        });
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            clearInterval(carouselInterval);  // Clear interval on manual navigation
            startCarousel(carouselId);     // Restart interval
        });
    });

    // Initial setup
    goToSlide(currentIndex);

    // Autoplay
    carouselInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startCarousel(carouselId);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    startCarousel('myCarousel');
});