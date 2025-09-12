// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.gsap.ScrollTrigger

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initHeroAnimations()
  initScrollAnimations()
  initTypingAnimation()
  init3DProjectCards()
  initMobileMenu()
  initSmoothScrolling()
  initHowItAllWorks()
})

// Navigation functionality
function initNavigation() {
  const nav = document.querySelector(".nav")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }
  })
}

// Hero section animations
function initHeroAnimations() {
  const tl = gsap.timeline()

  // Animate hero content
  tl.from(".hero-greeting", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  })
    .from(
      ".hero-name",
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4",
    )
    .from(
      ".hero-description",
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4",
    )
    .from(
      ".scroll-indicator",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2",
    )
}

// Scroll-triggered animations
function initScrollAnimations() {
  // About section animations
  gsap.from(".about-title", {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-title",
      start: "top 80%",
    },
  })

  gsap.from(".about-description p", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-description",
      start: "top 80%",
    },
  })

  // Work section animations
  gsap.from(".work-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".work-title",
      start: "top 80%",
    },
  })

  gsap.from(".work-subtitle", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".work-subtitle",
      start: "top 80%",
    },
  })

  // Project cards animations
  gsap.utils.toArray(".project-card").forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })
  })

  // Footer animations
  gsap.from(".footer-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer-title",
      start: "top 80%",
    },
  })

  gsap.from(".footer-subtitle", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer-subtitle",
      start: "top 80%",
    },
  })

  gsap.from(".contact-item", {
    opacity: 0,
    x: 50,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 80%",
    },
  })

  gsap.from(".social-link", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".social-links",
      start: "top 80%",
    },
  })
}

// Typing animation
function initTypingAnimation() {
  const typingText = document.querySelector(".typed-text")
  const texts = [
    "I create beautiful web experiences",
    "I build responsive applications",
    "I write clean, maintainable code",
    "I love solving complex problems",
    "I'm passionate about user experience",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeText() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeText, typeSpeed)
  }

  // Start typing animation when section is visible
  ScrollTrigger.create({
    trigger: ".typing-container",
    start: "top 80%",
    onEnter: () => {
      typeText()
    },
    once: true,
  })
}

// 3D Project Cards Animation
function init3DProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card, index) => {
    const container = card.querySelector(".project-3d-container")

    // Mouse move effect for 3D tilt
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(container, {
        duration: 0.3,
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        ease: "power2.out",
      })
    })

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      gsap.to(container, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out",
      })
    })

    // Floating animation
    gsap.to(card, {
      y: -10,
      duration: 2 + index * 0.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })
  })
}

// Mobile menu functionality
function initMobileMenu() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link")
  const scrollIndicator = document.querySelector(".scroll-indicator")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerOffset = 100
        const elementPosition = targetSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll indicator click
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.querySelector("#about")
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  }
}

// Parallax effects
function initParallaxEffects() {
  // Parallax for hero elements
  gsap.to(".hero-name", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })

  // Parallax for project cards
  gsap.utils.toArray(".project-card").forEach((card) => {
    gsap.to(card, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  })
}

// Initialize parallax effects
initParallaxEffects()

// Intersection Observer for performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view")
    }
  })
}, observerOptions)

// Observe elements for performance
document.querySelectorAll(".project-card, .about-title, .work-title").forEach((el) => {
  observer.observe(el)
})

// Debounce function for performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Additional scroll-based animations can be added here
}, 16)

window.addEventListener("scroll", optimizedScrollHandler)

// Smooth page transitions
function initPageTransitions() {
  // Fade in page on load
  gsap.from("body", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  })
}

// Initialize page transitions
initPageTransitions()

// Custom cursor (desktop only)
function initCustomCursor() {
  if (window.innerWidth > 768) {
    const cursor = document.createElement("div")
    cursor.className = "custom-cursor"
    document.body.appendChild(cursor)

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    function updateCursor() {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY

      cursorX += dx * 0.1
      cursorY += dy * 0.1

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      requestAnimationFrame(updateCursor)
    }

    updateCursor()

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll("a, button, .project-card")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover")
      })

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover")
      })
    })
  }
}

// Initialize custom cursor
initCustomCursor()

// Add cursor styles
const cursorStyles = `
  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
  }
  
  .custom-cursor.cursor-hover {
    transform: scale(2);
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = cursorStyles
document.head.appendChild(styleSheet)

// Performance monitoring
function initPerformanceMonitoring() {
  // Monitor scroll performance
  let scrollTimeout
  window.addEventListener("scroll", () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null
        // Scroll performance optimizations can be added here
      }, 16)
    }
  })
}

// Initialize performance monitoring
initPerformanceMonitoring()

// Add mobile menu styles
const mobileMenuStyles = `
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      height: calc(100vh - 80px);
      background-color: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 40px;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    
    .nav-menu.active {
      display: flex;
      transform: translateX(0);
    }
    
    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`

const mobileStyleSheet = document.createElement("style")
mobileStyleSheet.textContent = mobileMenuStyles
document.head.appendChild(mobileStyleSheet)

// How It All Works Section: IntersectionObserver for swipe/scroll snap
(function() {
  const steps = document.querySelectorAll('.how-step');
  const counters = document.querySelectorAll('.how-counter');
  function setActiveStep(idx) {
    steps.forEach((el, i) => {
      if (i === idx) {
        el.classList.add('active');
        animateCounter(i+1);
      } else {
        el.classList.remove('active');
      }
    });
  }
  function animateCounter(num) {
    counters.forEach((el, idx) => {
      if (idx === num-1) {
        gsap.to(el, {text: String(num).padStart(2, '0'), scale: 1.15, opacity: 1, duration: 0.5, ease: 'power2.out', onComplete: () => {
          gsap.to(el, {scale: 1, duration: 0.3, ease: 'power2.out'});
        }});
      } else {
        el.textContent = String(idx+1).padStart(2, '0');
        gsap.set(el, {scale: 1, opacity: 0.7});
      }
    });
  }
  // IntersectionObserver to detect active step
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(steps).indexOf(entry.target);
        setActiveStep(idx);
      }
    });
  }, { threshold: 0.6 });
  steps.forEach(step => observer.observe(step));
  // Set initial active step
  setActiveStep(0);
})();










