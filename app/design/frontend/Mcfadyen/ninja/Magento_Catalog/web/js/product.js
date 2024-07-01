define(['jquery'], function ($) {
    'use strict';
    function checkWindowSize() {
        const message = document.getElementById('resizeMessage');
        if (window.innerWidth < 767) {
            const galleryImages = document.querySelector('.gallery-images');
            const galleryImageCount = document.querySelectorAll('.gallery-image').length;
            const dotsContainer = document.querySelector('.dots-container');
            let currentIndex = 0;
            let startX = 0;
            let endX = 0;

            function showImage(index) {
                galleryImages.style.transform = `translateX(-${index * 100}%)`;
                updateDots();
            }
            function createDots() {
                for (let i = 0; i < galleryImageCount; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    dot.addEventListener('click', () => {
                        currentIndex = i;
                        showImage(currentIndex);
                    });
                    dotsContainer.appendChild(dot);
                }
            }

            function updateDots() {
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            galleryImages.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            galleryImages.addEventListener('touchmove', (e) => {
                endX = e.touches[0].clientX;
            });

            galleryImages.addEventListener('touchend', () => {
                if (startX > endX + 50 && currentIndex < galleryImageCount - 1) {
                    currentIndex++;
                } else if (startX < endX - 50 && currentIndex > 0) {
                    currentIndex--;
                }
                showImage(currentIndex);
            });
            createDots();
            showImage(currentIndex);
        } else {
            document.addEventListener('scroll', () => {
            const divP = document.querySelector('.main-item-container');
            const divA = document.querySelector('.list-container1');
            const divB = document.querySelector('.list-container2');
            const divC = document.querySelector('.list-container3');
                const divBRect = divB.getBoundingClientRect();
                if (divBRect.top <= 0 && divBRect.bottom > window.innerHeight) {
                    divP.classList.add('pos-sticky');
                    divA.classList.add('sticky');
                    divC.classList.add('sticky'); 
                } else {
                    divA.classList.remove('sticky');
                    divC.classList.remove('sticky');
                    divP.classList.remove('pos-sticky');
                }
            });
        }
    }
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
});
