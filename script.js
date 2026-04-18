// 1. Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});
revealElements.forEach(el => revealObserver.observe(el));

// 2. Header & Announcement Scroll Effect
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 3. Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            // Đóng menu mobile nếu đang mở
            mobileToggle.classList.remove('active');
            linksIsland.classList.remove('active');
            
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: 'smooth'
            });
        }
    });
});

// 4. Secret Combo: Arabic Mode (Shift + A)
let arabicActive = false;
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 'a') {
        arabicActive = !arabicActive;
        toggleArabicMode(arabicActive);
    }
});

function toggleArabicMode(active) {
    const elements = document.querySelectorAll('[data-ar]');
    if (active) {
        document.body.classList.add('arabic-mode');
        document.documentElement.dir = "rtl";
        elements.forEach(el => {
            el.dataset.vn = el.innerText;
            el.innerText = el.dataset.ar;
        });
    } else {
        document.body.classList.remove('arabic-mode');
        document.documentElement.dir = "ltr";
        elements.forEach(el => {
            el.innerText = el.dataset.vn;
        });
    }
}

// 5. Mobile Toggle & Hamburger Animation
const mobileToggle = document.getElementById('mobile-toggle');
const linksIsland = document.getElementById('nav-links-mobile');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        linksIsland.classList.toggle('active');
    });
}

// 6. Autoplay Video Fix
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.video-main');
    if (video) {
        video.play().catch(() => {});
    }
});