// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

// Create menu overlay
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
body.appendChild(menuOverlay);

// Theme Management
function getPreferredTheme() {
  // Check if user has already chosen a theme
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  
  // Check if user prefers dark mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

// Initialize theme
setTheme(getPreferredTheme());

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || getPreferredTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Mobile Menu Functionality
function openMobileMenu() {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scrolling
}

// Device Detection
function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Add device-specific classes to the document
  if (/android/i.test(userAgent)) {
    document.documentElement.classList.add('android-device');
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.documentElement.classList.add('ios-device');
  } else if (/windows phone/i.test(userAgent)) {
    document.documentElement.classList.add('windows-device');
  } else if (/Macintosh/.test(userAgent)) {
    document.documentElement.classList.add('mac-device');
  } else if (/Windows/.test(userAgent)) {
    document.documentElement.classList.add('windows-device');
  } else if (/Linux/.test(userAgent)) {
    document.documentElement.classList.add('linux-device');
  }
  
  // Add screen size classes
  const width = window.innerWidth;
  document.documentElement.classList.remove('xs-screen', 'sm-screen', 'md-screen', 'lg-screen', 'xl-screen', '2xl-screen');
  
  if (width < 640) {
    document.documentElement.classList.add('xs-screen');
  } else if (width < 768) {
    document.documentElement.classList.add('sm-screen');
  } else if (width < 1024) {
    document.documentElement.classList.add('md-screen');
  } else if (width < 1280) {
    document.documentElement.classList.add('lg-screen');
  } else if (width < 1536) {
    document.documentElement.classList.add('xl-screen');
  } else {
    document.documentElement.classList.add('2xl-screen');
  }
  
  // Add high-DPI display detection
  if (window.devicePixelRatio >= 2) {
    document.documentElement.classList.add('retina-display');
  }
  
  // Add touch capability detection
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.documentElement.classList.add('touch-device');
  } else {
    document.documentElement.classList.add('no-touch-device');
  }
}

// Form Validation
function setupFormValidation() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    if (!email.value || !email.value.includes('@')) {
      email.style.borderColor = 'var(--destructive)';
      isValid = false;
    } else {
      email.style.borderColor = 'var(--border)';
    }
    
    if (!message.value) {
      message.style.borderColor = 'var(--destructive)';
      isValid = false;
    } else {
      message.style.borderColor = 'var(--border)';
    }
    
    if (isValid) {
      // In a real application, you would send the form data to a server
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    }
  });
}

// Event Listeners
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener('click', toggleTheme);
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', openMobileMenu);
}

if (closeMobileMenu) {
  closeMobileMenu.addEventListener('click', closeMobileMenu);
}

menuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Handle window resize
window.addEventListener('resize', function() {
  detectDevice();
  
  // Close mobile menu if window is resized to desktop size
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  detectDevice();
  setupFormValidation();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});