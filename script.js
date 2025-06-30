// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === slideIndex) slide.classList.add('active');
    });
}

function autoSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

prevButton.addEventListener('click', () => {
    slideIndex--;
    showSlide(slideIndex);
});

nextButton.addEventListener('click', () => {
    slideIndex++;
    showSlide(slideIndex);
});

showSlide(slideIndex);
setInterval(autoSlide, 5000); // Auto-slide every 5 seconds
