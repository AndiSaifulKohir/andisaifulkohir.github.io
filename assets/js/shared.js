(function () {
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");
  const themeScreenshots = Array.from(
    document.querySelectorAll("img[data-dark-src]")
  ).map((image) => ({
    image,
    lightSrc: image.getAttribute("src"),
    darkSrc: image.getAttribute("data-dark-src"),
  }));

  if (!themeToggle || !themeIcon) {
    return;
  }

  function isDarkMode() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function updateThemeButton(isDark) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  function updateThemeScreenshots(isDark) {
    themeScreenshots.forEach(({ image, lightSrc, darkSrc }) => {
      if (lightSrc && darkSrc) {
        image.setAttribute("src", isDark ? darkSrc : lightSrc);
      }
    });
  }

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeButton(isDark);
    updateThemeScreenshots(isDark);
  }

  const initialIsDark = isDarkMode();
  updateThemeButton(initialIsDark);
  updateThemeScreenshots(initialIsDark);

  themeToggle.addEventListener("click", () => {
    applyTheme(!isDarkMode());
  });
})();
