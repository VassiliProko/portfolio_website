console.log("main.js loaded");

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

window.addEventListener('DOMContentLoaded', function() {
    // VP rotation based on viewport width
    function updateVPRotation() {
        const minW = 320, maxW = 1400, minDeg = 0, maxDeg = -15;
        const vw = Math.max(minW, Math.min(window.innerWidth, maxW));
        const deg = ((vw - minW) / (maxW - minW)) * (maxDeg - minDeg) + minDeg;
        document.querySelector('.vp-bg').style.transform = `translateX(0) rotate(${deg}deg)`;
    }

    // Check for mobile devices or reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Select the element
    const vp = document.querySelector('.vp-bg');

    if (vp && !isMobile && !mediaQuery.matches) {
        updateVPRotation();
        vp.addEventListener('animationend', function(e) {
            if (e.animationName === 'vpFlyIn') {
                window.addEventListener('resize', updateVPRotation);
            }
        });
    } else {
        // Disable animation by setting transform directly
        if (vp) {
            vp.style.transform = "translateX(0) rotate(0deg)";
            vp.style.animation = "none";
        }
    }

    if (window.location.hash === "#main") {
        const main = document.getElementById('main');
        if (main) {
            setTimeout(() => {
                main.scrollIntoView({ behavior: "smooth" });
            }, 500); // Delay to ensure layout is ready
        }
    }

    // scroll to work section on click of "Work" link
    document.querySelectorAll('a[href="#main"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
                e.preventDefault();
                const main = document.querySelector('.main');
                if (main) {
                    // Instantly show main (disable transform effect)
                    main.classList.add('main-visible');
                    // Now scroll to it
                    main.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // index page loading animations
    setTimeout(function() {
        document.querySelectorAll('.main').forEach(main => {
            main.classList.add('main-visible');
        });
    }, 300);

    setTimeout(function() {
        document.querySelector('.hero-bg').classList.add('hero-bg-visible');
        document.querySelector('header').classList.add('header-visible');
    }, 50);

    document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.children;
    const prevBtn = carousel.querySelector('.carousel-arrow.left');
    const nextBtn = carousel.querySelector('.carousel-arrow.right');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    let currentSlide = 0;

    // Create dots
    [...slides].forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Optional auto-play
    let forward = true;
    setInterval(() => {
        currentSlide = forward ? 1 : 0;
        forward = !forward;
        updateCarousel();
    }, 5000);
    });

    // hamburger menu
    document.getElementById("menu-toggle").addEventListener("click", function () {
        document.getElementById("mobile-menu").classList.toggle("show");
        console.log("Menu toggle clicked!");
    });

});

const images = document.querySelector(".carousel-images");
const dots = document.querySelectorAll(".carousel-dots li");
const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

let currentIndex = 0;

function updateCarousel() {
    images.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
    });
}

leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    updateCarousel();
});

rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % dots.length;
    updateCarousel();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
    });
});

updateCarousel(); // initialize