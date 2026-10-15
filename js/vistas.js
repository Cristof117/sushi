function mostrarVista(nombre) {
  const vistas = ["home", "buffet", "menu"];
  if (!vistas.includes(nombre)) return;

  const actual = document.body.dataset.vista;
  if (actual === nombre) {
    const panel = document.querySelector(`[data-vista-panel="${nombre}"]`);
    if (panel && !panel.hidden) return;
  }

  document.querySelectorAll("[data-vista-panel]").forEach((panel) => {
    const activa = panel.dataset.vistaPanel === nombre;
    panel.classList.toggle("vista-activa", activa);
    panel.hidden = !activa;
  });

  document.querySelectorAll(".header-nav__btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.vista === nombre);
  });

  document.body.dataset.vista = nombre;

  const panel = document.querySelector(`[data-vista-panel="${nombre}"]`);
  if (typeof Motion !== "undefined") {
    if (nombre === "home") {
      Motion.animateHome();
    } else {
      Motion.animateVistaIn(panel, nombre);
    }
  }

  if (nombre !== "home") {
    const target = document.getElementById(nombre);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function initVistas() {
  document.querySelectorAll("[data-vista]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const vista = el.dataset.vista;
      if (!vista) return;
      e.preventDefault();
      mostrarVista(vista);
    });
  });

  if (typeof Motion !== "undefined") {
    Motion.wireHomeHover();
  }

  const hash = (location.hash || "").replace("#", "");
  if (hash === "buffet" || hash === "menu") {
    mostrarVista(hash);
  } else {
    mostrarVista("home");
  }
}

initVistas();
