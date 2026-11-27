(() => {
  if (!CSS.supports("color", "light-dark(white, black)")) return;

  const preferenceKey = "portfolio-theme";
  const root = document.documentElement;

  function applyTheme(preference) {
    if (preference === "light" || preference === "dark") {
      root.dataset.theme = preference;
    } else {
      delete root.dataset.theme;
    }
  }

  try {
    applyTheme(localStorage.getItem(preferenceKey));
  } catch {
    // The system theme remains available when storage is blocked.
  }

  document.addEventListener("DOMContentLoaded", () => {
    const picker = document.querySelector("[data-theme-picker]");
    picker.value = root.dataset.theme ?? "system";
    picker.closest("label").hidden = false;

    picker.addEventListener("change", () => {
      applyTheme(picker.value);

      try {
        if (root.dataset.theme) {
          localStorage.setItem(preferenceKey, root.dataset.theme);
        } else {
          localStorage.removeItem(preferenceKey);
        }
      } catch {
        // The selected theme still applies to the current page.
      }
    });
  });
})();
