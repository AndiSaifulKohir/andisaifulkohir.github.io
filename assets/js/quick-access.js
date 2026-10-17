(() => {
  const scriptUrl = document.currentScript?.src;
  if (!scriptUrl) {
    console.error("Quick access could not determine its shared asset URL.");
    return;
  }

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("../css/quick-access.css", scriptUrl).href;
  document.head.append(stylesheet);

  const toggleHost = document.querySelector(".nav-links, .header-top");
  if (!toggleHost) {
    console.error("Quick access could not find a navigation area for its toggle.");
    return;
  }

  const toggle = document.createElement("button");
  toggle.className = "quick-sidebar-toggle";
  toggle.id = "quick-sidebar-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-controls", "quick-sidebar");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open quick access");
  toggle.title = "Quick access";
  toggle.disabled = true;
  toggle.innerHTML = '<span aria-hidden="true">☰</span>';
  toggleHost.append(toggle);

  fetch(new URL("../quick-access.html", scriptUrl), { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Quick access request failed: ${response.status}`);
      }
      return response.text();
    })
    .then((markup) => {
      document.body.insertAdjacentHTML("beforeend", markup);
      const sidebar = document.querySelector("#quick-sidebar");
      const close = document.querySelector("#quick-sidebar-close");
      toggle.disabled = false;

      function setOpen(isOpen) {
        sidebar.hidden = !isOpen;
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute(
          "aria-label",
          isOpen ? "Close quick access" : "Open quick access"
        );
        (isOpen ? close : toggle).focus();
      }

      toggle.addEventListener("click", () => setOpen(sidebar.hidden));
      close.addEventListener("click", () => setOpen(false));
      sidebar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !sidebar.hidden) {
          setOpen(false);
        }
      });
    })
    .catch((error) => {
      console.error("Quick access could not be loaded.", error);
      toggle.remove();
    });
})();
