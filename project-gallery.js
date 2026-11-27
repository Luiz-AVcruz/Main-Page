document.querySelectorAll(".project-group").forEach((group) => {
  const track = group.querySelector(".project-track");
  const controls = group.querySelector(".project-controls");
  const [previous, next] = controls.querySelectorAll("a");
  const [firstCard, secondCard] = track.children;
  if (!secondCard) return;

  function updateControls() {
    const end = track.scrollWidth - track.clientWidth;
    previous.setAttribute("aria-disabled", track.scrollLeft <= 1);
    next.setAttribute("aria-disabled", track.scrollLeft >= end - 1);
  }

  controls.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (
      !link ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    if (link.getAttribute("aria-disabled") === "true") return;

    const step = secondCard.offsetLeft - firstCard.offsetLeft;
    track.scrollBy({ left: step * Number(link.dataset.direction) });
  });

  track.addEventListener("focusin", (event) => {
    const card = event.target.closest(".project-entry");
    if (!card) return;

    const frame = track.getBoundingClientRect();
    const position = card.getBoundingClientRect();
    if (position.left < frame.left || position.right > frame.right) {
      track.scrollBy({ left: position.left - frame.left, behavior: "instant" });
    }
  });

  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
});
