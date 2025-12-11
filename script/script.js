const slideContainer = document.getElementById("slide-container");
const slides = document.querySelectorAll("#slide-container img");
const dotsContainer = document.getElementById("dots");

let index = 1;
let interval;
let slideWidth;

// Clone for infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

slideContainer.appendChild(firstClone);
slideContainer.insertBefore(lastClone, slides[0]);

let totalSlides = document.querySelectorAll("#slide-container img").length;

// ---- Create dots based on real slides (excluding clones) ----
let realSlidesCount = slides.length;
for (let i = 0; i < realSlidesCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";

    const fill = document.createElement("div");
    fill.className = "dot-fill";

    dot.appendChild(fill);
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

// ---- Set initial position ----
function updateSlideWidth() {
    slideWidth = slideContainer.clientWidth;
    slideContainer.style.transition = "none";
    slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
}
updateSlideWidth();

// ---- Update active dot ----
function updateDots() {
    dots.forEach(dot => {
        dot.classList.remove("active");
        dot.children[0].classList.remove("active");
        dot.children[0].style.width = "0%"; // reset instantly
    });

    let realIndex = index - 1;
    if (realIndex === -1) realIndex = realSlidesCount - 1;
    if (realIndex === realSlidesCount) realIndex = 0;

    const activeDot = dots[realIndex];

    // make pill shape
    activeDot.classList.add("active");

    // animate fill for 4 seconds
    const fill = activeDot.children[0];
    fill.classList.add("active");

    // trigger animation
    requestAnimationFrame(() => {
        fill.style.width = "100%";
    });
}

// ---- Auto-slide ----
function startAutoSlide() {
    updateDots();

    interval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

// ---- Slide movement ----
function nextSlide() {
    if (index >= totalSlides - 1) return;
    index++;
    slideContainer.style.transition = "transform 0.5s ease-in-out";
    slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;

    updateDots();
}

function prevSlide() {
    if (index <= 0) return;
    index--;
    slideContainer.style.transition = "transform 0.5s ease-in-out";
    slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;

    updateDots();
}

// ---- Infinite loop fix ----
slideContainer.addEventListener("transitionend", () => {
    const allSlides = document.querySelectorAll("#slide-container img");

    if (allSlides[index].src === firstClone.src) {
        slideContainer.style.transition = "none";
        index = 1;
        slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    if (allSlides[index].src === lastClone.src) {
        slideContainer.style.transition = "none";
        index = totalSlides - 2;
        slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    }
});

// ---- Buttons ----
document.getElementById("next-btn").addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

document.getElementById("prev-btn").addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

// ---- Resize fix ----
window.addEventListener("resize", updateSlideWidth);

// ---- Start slider ----
startAutoSlide();







document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('press-track');
    const prevBtn = document.getElementById('press-prev');
    const nextBtn = document.getElementById('press-next');
    
    let currentIndex = 0;
    const slides = track.children;
    const totalSlides = slides.length;
    function updateSlide() {
        // Translate the track by -100% * index
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides; // Loop back to start
        updateSlide();
    });
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop back to end
        updateSlide();
    });
    // Optional: Auto slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    }, 5000);
});



const shopContent = document.getElementById("shop-content");
const shopSb = document.getElementById("shop-subheading");
const shopIcon = document.getElementById("shop-icon");

shopSb.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        shopContent.classList.toggle("hidden");
        shopIcon.textContent = shopContent.classList.contains("hidden") ? "+" : "−";
    }
});

const helpContent = document.getElementById("help-content");
const helpSb = document.getElementById("help-subheading");
const helpIcon = document.getElementById("help-icon");

helpSb.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        helpContent.classList.toggle("hidden");
        helpIcon.textContent = helpContent.classList.contains("hidden") ? "+" : "−";
    }
});
const companyContent = document.getElementById("company-content");
const companySb = document.getElementById("company-subheading");
const companyIcon = document.getElementById("company-icon");

companySb.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        companyContent.classList.toggle("hidden");
        companyIcon.textContent = companyContent.classList.contains("hidden") ? "+" : "−";
    }
});



        