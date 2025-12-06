const pourPanels = document.querySelectorAll("[data-pour]");
pourPanels.forEach((panel) => {
  panel.addEventListener("pointermove", (event) => {
    const rect = panel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    panel.style.setProperty("--mx", `${x}%`);
    panel.style.setProperty("--my", `${y}%`);
  });
});

const sparkButtons = document.querySelectorAll("[data-spark]");
sparkButtons.forEach((button) => {
  const setSpark = (event) => {
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty("--spark-x", `${x}%`);
    button.style.setProperty("--spark-y", `${y}%`);
  };
  button.addEventListener("pointermove", setSpark);
  button.addEventListener("pointerdown", setSpark);
  button.addEventListener("pointerleave", () => {
    button.style.removeProperty("--spark-x");
    button.style.removeProperty("--spark-y");
  });
});

const nav = document.querySelector("[data-liquid-nav]");
if (nav) {
  const dots = [...nav.querySelectorAll(".liquid-nav__dot")];
  const trail = nav.querySelector(".liquid-nav__trail");

  const moveTrail = (target) => {
    if (!trail) return;
    const rect = nav.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset = targetRect.left - rect.left + targetRect.width / 2 - trail.offsetWidth / 2;
    nav.style.setProperty("--trail-x", `${offset}px`);
  };

  dots.forEach((dot) => {
    if (dot.hasAttribute("data-active")) {
      moveTrail(dot);
    }
    dot.addEventListener("click", () => {
      dots.forEach((d) => d.removeAttribute("data-active"));
      dot.setAttribute("data-active", "");
      moveTrail(dot);
    });
  });

  window.addEventListener("resize", () => {
    const active = dots.find((dot) => dot.hasAttribute("data-active"));
    if (active) {
      moveTrail(active);
    }
  });
}
