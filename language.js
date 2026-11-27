(() => {
  const preferenceKey = "portfolio-language";

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-language]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;

    try {
      localStorage.setItem(preferenceKey, link.dataset.language);
    } catch {
      // The link still works when storage is unavailable.
    }
  });

  const url = new URL(location.href);
  if (
    url.pathname !== "/" ||
    url.hash ||
    url.searchParams.get("lang") === "pt-BR"
  )
    return;

  let preference;
  try {
    preference = localStorage.getItem(preferenceKey);
  } catch {
    // Use the browser languages when storage is unavailable.
  }

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const detected = languages
    .map((language) => language?.toLowerCase().split("-")[0])
    .find((language) => language === "pt" || language === "en");

  if (preference === "en" || (preference !== "pt-BR" && detected === "en")) {
    location.replace("/en/" + url.search);
  }
})();
