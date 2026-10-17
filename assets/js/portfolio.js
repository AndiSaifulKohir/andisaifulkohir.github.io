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
