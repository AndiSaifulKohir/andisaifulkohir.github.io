(function () {
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");

  if (!themeToggle || !themeIcon) {
    return;
  }

  function updateThemeButton(isDark) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  const initialDarkMode =
    document.documentElement.getAttribute("data-theme") === "dark";

  updateThemeButton(initialDarkMode);

  themeToggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      updateThemeButton(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      updateThemeButton(true);
    }
  });
})();
