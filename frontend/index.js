// DOM Elements
const resumeContainer = document.querySelector('.resume-container');
const resumeContent = document.querySelector('.resume-content');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const scrollToTopButton = document.createElement('button');
const darkModeToggle = document.createElement('button');
const navLinks = document.querySelectorAll('nav a');
const scrollThumb = document.querySelector('.scroll-thumb');
const progressIndicator = document.createElement('div');
let autoScrollInterval, highlightInterval, wordAnimationInterval;
let isPaused = false;

// Add Scroll-to-Top Button
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

// Add Dark Mode Toggle
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

// Dark Mode Toggle Functionality
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});

// Auto Scroll Functionality
function startAutoScroll() {
    if (autoScrollInterval) return;
    resumeContent.scrollTop = 0;
    autoScrollInterval = setInterval(() => {
        resumeContent.scrollTop += 1;
        if (resumeContent.scrollTop >= resumeContent.scrollHeight - resumeContent.offsetHeight) {
            clearInterval(autoScrollInterval);
        }
    }, 20);
}

function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    isPaused = true;
}

function resumeAutoScroll() {
    if (isPaused) {
        isPaused = false;
        startAutoScroll();
    }
}

// Highlight Words in Resume
function startHighlighting() {
    const words = resumeContent.innerText.split(' ');
    let index = 0;

    if (highlightInterval) return;

    highlightInterval = setInterval(() => {
        if (index >= words.length) {
            clearInterval(highlightInterval);
            return;
        }

        const content = words.map((word, i) =>
            i === index ? `<span class="highlight">${word}</span>` : word
        ).join(' ');

        resumeContent.innerHTML = content;
        index++;
    }, 200); // Adjust speed
}

function pauseHighlighting() {
    clearInterval(highlightInterval);
    highlightInterval = null;
    isPaused = true;
}

function resumeHighlighting() {
    if (isPaused) {
        isPaused = false;
        startHighlighting();
    }
}

// Progress Bar for Scrolling
progressIndicator.classList.add('progress-indicator');
document.body.appendChild(progressIndicator);

resumeContent.addEventListener('scroll', () => {
    const progress = (resumeContent.scrollTop / (resumeContent.scrollHeight - resumeContent.offsetHeight)) * 100;
    progressIndicator.style.width = `${progress}%`;
});

// Scroll-to-Top Button
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Responsive Adjustments
window.addEventListener('resize', () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (viewportWidth < 768) {
        resumeContainer.style.gridTemplateColumns = '1fr';
        resumeContent.style.height = `${viewportHeight * 0.6}px`;
    } else {
        resumeContainer.style.gridTemplateColumns = '1fr 3fr';
        resumeContent.style.height = `${viewportHeight * 0.8}px`;
    }
});

// Animate Resume Words
function animateResumeWords() {
    const words = resumeContent.innerText.split(' ');
    resumeContent.innerHTML = ''; // Clear content
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        span.style.animationDelay = `${index * 0.3}s`;
        span.classList.add('animated-word');
        resumeContent.appendChild(span);
    });

    // Keep words visible after animation
    setTimeout(() => {
        document.querySelectorAll('.animated-word').forEach(word => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        });
    }, words.length * 300); // Adjust delay based on word count
}

// Add Smooth Fade-In Animation for Sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s ease-in-out';

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    });
    observer.observe(section);
});

// Add Button Event Listeners
startButton.addEventListener('click', () => {
    resumeContent.scrollTop = 0;
    startAutoScroll();
    animateResumeWords();
});
pauseButton.addEventListener('click', () => {
    pauseAutoScroll();
});
resumeButton.addEventListener('click', () => {
    resumeAutoScroll();
});

// Button Hover Effects
document.querySelectorAll('.control-button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});




// DOM Elements
const bioSection = document.querySelector('.bio');
const learnMoreButton = document.getElementById('learn-more');

// Animate "Learn More" Button on Scroll
window.addEventListener('scroll', () => {
    const sectionPosition = bioSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (sectionPosition < screenPosition) {
        bioSection.style.animation = 'fadeInBio 2s ease forwards';
    }
});

// Add Button Click Interaction
learnMoreButton.addEventListener('click', () => {
    const targetSection = document.getElementById('about-me');
    targetSection.scrollIntoView({ behavior: 'smooth' });
});

// Floating Particles Animation (Optional, for more advanced UI)
const particleCanvas = document.createElement('canvas');
particleCanvas.id = 'particleCanvas';
particleCanvas.style.position = 'absolute';
particleCanvas.style.top = 0;
particleCanvas.style.left = 0;
particleCanvas.style.width = '100%';
particleCanvas.style.height = '100%';
particleCanvas.style.zIndex = '-1';
document.body.appendChild(particleCanvas);

const ctx = particleCanvas.getContext('2d');
let particlesArray = [];

// Create Particles
function createParticles() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 3,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
        });
    }
}

// Draw Particles
function drawParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particlesArray.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
        ctx.fill();
        ctx.closePath();
    });
}

// Move Particles
function moveParticles() {
    particlesArray.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;
    });
}

// Animate Particles
function animateParticles() {
    drawParticles();
    moveParticles();
    requestAnimationFrame(animateParticles);
}

// Initialize Particles
window.addEventListener('load', () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    createParticles();
    animateParticles();
});

window.addEventListener('resize', () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    particlesArray = [];
    createParticles();
});





// Scroll Animations
window.addEventListener('scroll', () => {
    document.querySelectorAll('.interest-item, .book-item').forEach(item => {
        const position = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight) {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }
    });
});

// Read More Click Events
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', event => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});




// JavaScript for Book Carousel
const bookItems = document.querySelectorAll('.book-item');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

// Update active book
function updateCarousel() {
    bookItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Show next book
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % bookItems.length;
    updateCarousel();
});

// Show previous book
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + bookItems.length) % bookItems.length;
    updateCarousel();
});

// Auto-scroll carousel every 5 seconds
let autoScroll = setInterval(() => {
    currentIndex = (currentIndex + 1) % bookItems.length;
    updateCarousel();
}, 5000);

// Pause auto-scroll on hover
document.querySelector('.book-carousel').addEventListener('mouseenter', () => {
    clearInterval(autoScroll);
});

// Resume auto-scroll on mouse leave
document.querySelector('.book-carousel').addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % bookItems.length;
        updateCarousel();
    }, 5000);
});

// Initialize carousel
updateCarousel();



// FinTech Carousel Auto-Scroll
const fintechCarousel = document.querySelector('.fintech-carousel');
const fintechImages = fintechCarousel.querySelectorAll('img');
let carouselIndex = 0;

function updateCarousel() {
    fintechImages.forEach((img, index) => {
        img.style.transform = `translateX(${(index - carouselIndex) * 100}%)`;
    });
}

// Auto-scroll every 5 seconds
setInterval(() => {
    carouselIndex = (carouselIndex + 1) % fintechImages.length;
    updateCarousel();
}, 5000);

// Ensure initial positioning
updateCarousel();

// Scroll Animations for Sections
const sections = document.querySelectorAll('.interactive-section');

function animateOnScroll() {
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Trigger animations on scroll
window.addEventListener('scroll', animateOnScroll);

// Initial check on page load
animateOnScroll();





// Contact Form Submission Handler
const form = document.getElementById('contact-form');
const thankYouPopup = document.getElementById('thank-you-popup');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Send email using EmailJS (or replace with your backend API)
    try {
        await sendEmail(name, email, message); // Mock function to send email
        showThankYouPopup();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred while sending your message. Please try again.');
    }
});

// Mock function to simulate email sending
async function sendEmail(name, email, message) {
    // Replace this with actual EmailJS or backend integration
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Email sent to: ${email}\nMessage: ${message}`);
            resolve();
        }, 1000);
    });
}

// Show Thank You Popup
function showThankYouPopup() {
    thankYouPopup.classList.remove('hidden');
    thankYouPopup.style.display = 'block';

    // Hide the popup after 5 seconds
    setTimeout(() => {
        thankYouPopup.style.display = 'none';
    }, 5000);
}





const carouselWrapper = document.querySelector('.carousel-wrapper');
const images = carouselWrapper.querySelectorAll('img');
let currentIndex = 0;

// Function to move carousel
function moveCarousel(direction) {
    const imageWidth = images[0].clientWidth + 20; // Image width + gap
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % images.length; // Loop to start
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop to end
    }
    carouselWrapper.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Auto-scroll every 3 seconds
setInterval(() => {
    moveCarousel('next');
}, 3000);

// Swipe functionality (optional for touch screens)
let startX = 0;

carouselWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselWrapper.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) moveCarousel('prev');
    else if (startX - endX > 50) moveCarousel('next');
});





// Add animation for icons on scroll
document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.social-icons .icon');

    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.boxShadow = '0 10px 20px rgba(255, 255, 255, 0.6)';
        });

        icon.addEventListener('mouseout', () => {
            icon.style.boxShadow = 'none';
        });
    });
});

// Smooth Scroll to Top Feature
const footer = document.getElementById('footer');
footer.addEventListener('dblclick', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});








//addional code


// ------------------ GLOBAL VARIABLES & INITIALIZATION ------------------

// Grab essential DOM elements
const header = document.querySelector('header');
const darkModeToggle = document.createElement('button');
const scrollToTopButton = document.createElement('button');
const particleCanvas = document.createElement('canvas');
const lazyImages = document.querySelectorAll('img[data-src]');
const fab = document.createElement('button');
let lastScrollY = window.scrollY;
let autoScrollTimeout;

// Initialize particle variables
const ctx = particleCanvas.getContext('2d');
let particlesArray = [];

// Constants for animations
const EASE_IN_OUT_QUAD = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

// ------------------ AUTO-HIDE HEADER ------------------

function autoHideHeader() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
}

// ------------------ DARK MODE TOGGLE ------------------

function setupDarkModeToggle() {
    // Add Dark Mode Button to Header
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.classList.add('dark-mode-toggle');
    header.appendChild(darkModeToggle);

    // Set styles for the toggle button
    Object.assign(darkModeToggle.style, {
        position: 'absolute',
        right: '20px',
        top: '10px',
        padding: '10px',
        borderRadius: '50%',
        backgroundColor: '#1abc9c',
        color: '#fff',
        fontSize: '1.5rem',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    });

    darkModeToggle.addEventListener('mouseover', () => {
        darkModeToggle.style.transform = 'scale(1.1)';
        darkModeToggle.style.backgroundColor = '#16a085';
    });

    darkModeToggle.addEventListener('mouseout', () => {
        darkModeToggle.style.transform = 'scale(1)';
        darkModeToggle.style.backgroundColor = '#1abc9c';
    });

    // Handle Dark Mode State
    const darkModeState = localStorage.getItem('dark-mode');
    if (darkModeState === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isEnabled = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isEnabled
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
        localStorage.setItem('dark-mode', isEnabled ? 'enabled' : 'disabled');
    });
}

// ------------------ SMOOTH SCROLL ------------------

function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.scrollY;
    let startTime = null;

    function scrollAnimation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollY = EASE_IN_OUT_QUAD(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, scrollY);
        if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
    }

    requestAnimationFrame(scrollAnimation);
}

// Setup navigation smooth scroll
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            smoothScroll(target, 800);
        });
    });
}

// ------------------ LAZY LOADING ------------------

function setupLazyLoading() {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => lazyObserver.observe(img));
}

// ------------------ PARTICLE BACKGROUND ------------------

function createParticles() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 3,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particlesArray.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
        ctx.fill();
        ctx.closePath();
    });
}

function moveParticles() {
    particlesArray.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;
    });
}

function animateParticles() {
    drawParticles();
    moveParticles();
    requestAnimationFrame(animateParticles);
}

function setupParticleBackground() {
    Object.assign(particleCanvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
    });
    document.body.appendChild(particleCanvas);
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    createParticles();
    animateParticles();
}

// ------------------ FLOATING ACTION BUTTON (FAB) ------------------

function setupFloatingActionButton() {
    fab.innerHTML = '<i class="fas fa-bars"></i>';
    fab.classList.add('floating-action-button');
    document.body.appendChild(fab);

    Object.assign(fab.style, {
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        zIndex: '1000',
        padding: '15px',
        borderRadius: '50%',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        fontSize: '1.5rem',
    });

    fab.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('show-nav');
    });
}

// ------------------ INITIALIZATION ------------------

function initializeWebsite() {
    autoHideHeader();
    setupDarkModeToggle();
    setupSmoothScroll();
    setupLazyLoading();
    setupParticleBackground();
    setupFloatingActionButton();
}

document.addEventListener('DOMContentLoaded', initializeWebsite);



//mobile phone

// --- Auto-Hide Header on Scroll ---
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// --- Mobile Menu Toggle ---
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
header.appendChild(menuToggle);

const menu = document.querySelector('.menu');
menuToggle.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// --- Adjust Footer for Small Screens ---
const footer = document.querySelector('footer');
if (window.innerWidth < 768) {
    footer.style.fontSize = '0.7rem';
    footer.querySelectorAll('.social-icons i').forEach((icon) => {
        icon.style.fontSize = '1rem';
    });
}

// --- Accessibility Enhancements ---
document.querySelectorAll('a, button').forEach((el) => {
    el.setAttribute('tabindex', '0');
});

// --- Responsive Animation for Sections ---
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
// --- Advanced Dark Mode ---
const darkModeToggle = document.createElement('button');
darkModeToggle.classList.add('dark-mode-toggle');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.style.position = 'fixed';
darkModeToggle.style.bottom = '15px';
darkModeToggle.style.right = '15px';
darkModeToggle.style.zIndex = '1000';
darkModeToggle.style.padding = '10px';
darkModeToggle.style.borderRadius = '50%';
darkModeToggle.style.backgroundColor = '#1abc9c';
darkModeToggle.style.color = '#fff';
darkModeToggle.style.border = 'none';
darkModeToggle.style.cursor = 'pointer';
darkModeToggle.style.transition = 'transform 0.3s ease, background-color 0.3s ease';

darkModeToggle.addEventListener('mouseover', () => {
    darkModeToggle.style.transform = 'scale(1.1)';
    darkModeToggle.style.backgroundColor = '#16a085';
});

darkModeToggle.addEventListener('mouseout', () => {
    darkModeToggle.style.transform = 'scale(1)';
    darkModeToggle.style.backgroundColor = '#1abc9c';
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem(
        'dark-mode',
        document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
    );
});
