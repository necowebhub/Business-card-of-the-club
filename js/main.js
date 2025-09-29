const slidesContainer = document.getElementById("slides");
const slides = document.querySelectorAll("section");
const dotsContainer = document.getElementById("dots");

let current = 0;
let isScrolling = false;

const isMobile = window.innerWidth < 768;

if (!isMobile) {
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = 
        "w-3 h-3 rounded-full bg-white/50 hover:bg-white transition";
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        [...dotsContainer.children].forEach((dot, i) => {
        dot.classList.toggle("bg-white", i === current);
        dot.classList.toggle("bg-white/50", i !== current);
        });
    }

    function goToSlide(index) {
        current = index;
        slidesContainer.style.transform = `translateY(-${current * 100}vh)`;
        updateDots();
    }

    function nextSlide() {
        if (current < slides.length - 1) goToSlide(current + 1);
    }

    function prevSlide() {
        if (current > 0) goToSlide(current - 1);
    }

    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;
        isScrolling = true;

        if (e.deltaY > 0) nextSlide();
        else prevSlide();

        setTimeout(() => (isScrolling = false), 800);
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") nextSlide();
        if (e.key === "ArrowUp") prevSlide();
    });

    goToSlide(0);
} else {
    dotsContainer.style.display = "none";
    slidesContainer.style.transform = "none"; 
}

