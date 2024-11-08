// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#smooth-content'),
    smooth: true,
    lerp: 0.05,
    multiplier: 1.5,
});

// GSAP ScrollTrigger Integration
scroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#smooth-content', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector('#smooth-content').style.transform ? "transform" : "fixed"
});

// Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.style.transform = 'scale(0.8)');
document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');

// Hover effect for buttons and links
const hoverElements = document.querySelectorAll('a, button');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => cursor.style.transform = 'scale(1.5)');
    element.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// Particles Background
particlesJS('particles', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('[data-scroll]').forEach(elem => {
    gsap.from(elem, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scroller: "#smooth-content"
        }
    });
});

// Split Text Animation for Hero Title
const heroTitle = new SplitType('.hero-title', { types: 'words' });
gsap.from(heroTitle.words, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    stagger: 0.1
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode
        ? '<svg viewBox="0 0 24 24" class="icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>'
        : '<svg viewBox="0 0 24 24" class="icon"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
}

// Initialize theme icon
updateThemeIcon();

// Form Submission
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const response = await fetch('process_form.php', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        alert('Mensagem enviada com sucesso!');
        form.reset();
    } else {
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    }
});

// Update ScrollTrigger
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();