const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const previewSlides = Array.from(document.querySelectorAll(".preview-slide"));
const previewDots = Array.from(document.querySelectorAll(".preview-dot"));
const previewCount = document.querySelector(".preview-count");

function showPreview(index) {
  const activeIndex = (index + previewSlides.length) % previewSlides.length;

  previewSlides.forEach((slide, slideIndex) => {
    slide.hidden = slideIndex !== activeIndex;
  });

  previewDots.forEach((dot, dotIndex) => {
    dot.setAttribute("aria-pressed", String(dotIndex === activeIndex));
  });

  if (previewCount) {
    previewCount.textContent = `${activeIndex + 1} / ${previewSlides.length}`;
  }
}

if (previewSlides.length > 1 && previewDots.length === previewSlides.length) {
  document.querySelectorAll("[data-preview-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const activeIndex = previewSlides.findIndex((slide) => !slide.hidden);
      const step = Number(button.getAttribute("data-preview-step"));
      showPreview(activeIndex + step);
    });
  });

  previewDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showPreview(index));
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
const elementsToAnimate = document.querySelectorAll('.project-card, .about-content, .contact-section');
elementsToAnimate.forEach((el) => animateOnScroll.observe(el));

// Add smooth header behavior on scroll
let lastScroll = 0;
const header = document.querySelector('.site-header');

if (header && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.boxShadow = '0 1px 0 rgba(29, 77, 115, 0.03)';
    }

    lastScroll = currentScroll;
  }, { passive: true });
}
