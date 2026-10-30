const lightbox = document.getElementById("foto-lightbox");
const lightboxImg = lightbox?.querySelector(".foto-lightbox__img");
const lightboxCaption = lightbox?.querySelector(".foto-lightbox__caption");
const lightboxCerrar = lightbox?.querySelector(".foto-lightbox__cerrar");

let tarjetaActiva = null;
let animTimer = null;

function crearDetalleHTML() {
  return `
    <div class="menu-item__detalle" hidden>
      <div class="detalle-rollo__row">
        <div class="detalle-rollo__foto" role="button" tabindex="0" aria-label="Ver foto ampliada">
          <img class="detalle-rollo__img" alt="" hidden />
          <span class="detalle-rollo__foto-ph">Imagen</span>
          <span class="detalle-rollo__foto-hint" aria-hidden="true">Toca para ampliar</span>
        </div>
        <div class="detalle-rollo__bottom">
          <div class="anillo-wrap" aria-hidden="true">
            <div class="anillo">
              <div class="anillo__capa anillo__capa--arroz"></div>
              <div class="anillo__capa anillo__capa--fuera"></div>
              <div class="anillo__capa anillo__capa--dentro"></div>
            </div>
          </div>
          <div class="detalle-rollo__info">
            <div class="vista-tabs vista-tabs--mini" role="tablist">
              <button type="button" class="vista-tab vista-tab--fuera active" data-vista="fuera">Fuera</button>
              <button type="button" class="vista-tab vista-tab--dentro" data-vista="dentro">Dentro</button>
            </div>
            <p class="ingredientes-box__titulo">Por fuera</p>
            <p class="ingredientes-box__lista"></p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function abrirLightbox(src, nombre) {
  if (!lightbox || !src) return;
  lightboxImg.src = src;
  lightboxImg.alt = nombre;
  lightboxCaption.textContent = nombre;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-abierto");
  lightboxCerrar.focus();
}

function cerrarLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  lightboxImg.removeAttribute("src");
  document.body.classList.remove("lightbox-abierto");
}

function wireFotoExpand(card, item) {
  const foto = card.querySelector(".detalle-rollo__foto");
  if (!foto || foto.dataset.wired) return;
  foto.dataset.wired = "1";

  const abrir = (e) => {
    e.stopPropagation();
    if (!item.foto) return;
    abrirLightbox(item.foto, item.nombre);
  };

  foto.addEventListener("click", abrir);
  foto.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrir(e);
    }
  });
}

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) cerrarLightbox();
});
lightboxCerrar?.addEventListener("click", cerrarLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && !lightbox.hidden) cerrarLightbox();
});

function setFotoEnTarjeta(card, item) {
  const img = card.querySelector(".detalle-rollo__img");
  const ph = card.querySelector(".detalle-rollo__foto-ph");
  if (item.foto) {
    img.src = item.foto;
    img.alt = item.nombre;
    img.hidden = false;
    ph.hidden = true;
  } else {
    img.removeAttribute("src");
    img.hidden = true;
    ph.hidden = false;
  }
}

function setVista(card, vista, item) {
  card.classList.remove("vista-fuera", "vista-dentro");
  card.classList.add(vista === "fuera" ? "vista-fuera" : "vista-dentro");

  card.querySelectorAll(".vista-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.vista === vista);
  });

  const titulo = card.querySelector(".ingredientes-box__titulo");
  const lista = card.querySelector(".ingredientes-box__lista");

  if (vista === "fuera") {
    titulo.textContent = "Por fuera";
    lista.textContent = item.fuera;
  } else {
    titulo.textContent = "Por dentro";
    lista.textContent = item.dentro;
  }
}

function playIntroAnim(card, item) {
  if (animTimer) clearTimeout(animTimer);
  setVista(card, "fuera", item);
  animTimer = setTimeout(() => {
    setVista(card, "dentro", item);
    animTimer = setTimeout(() => setVista(card, "fuera", item), 1800);
  }, 1800);
}

function cerrarTodasTarjetas() {
  document.querySelectorAll(".menu-item-card--open").forEach((c) => {
    c.classList.remove("menu-item-card--open", "vista-fuera", "vista-dentro");
    const detalle = c.querySelector(".menu-item__detalle");
    if (detalle) detalle.hidden = true;
  });
  tarjetaActiva = null;
  if (animTimer) clearTimeout(animTimer);
}

function toggleTarjeta(card, item) {
  const detalle = card.querySelector(".menu-item__detalle");
  const yaAbierta = card.classList.contains("menu-item-card--open");

  if (tarjetaActiva === card && yaAbierta) {
    cerrarTodasTarjetas();
    return;
  }

  cerrarTodasTarjetas();
  tarjetaActiva = card;
  card.classList.add("menu-item-card--open", "vista-fuera");
  detalle.hidden = false;
  setFotoEnTarjeta(card, item);
  wireFotoExpand(card, item);
  playIntroAnim(card, item);

  card.querySelectorAll(".vista-tab").forEach((tab) => {
    tab.onclick = (e) => {
      e.stopPropagation();
      if (animTimer) clearTimeout(animTimer);
      setVista(card, tab.dataset.vista, item);
    };
  });
}

function mountRollosMenu({ chipsId, menuId, idPrefix }) {
  const chipsEl = document.getElementById(chipsId);
  const menuCompletoEl = document.getElementById(menuId);
  if (!chipsEl || !menuCompletoEl || typeof MENU === "undefined") return;

  let categoriaPrioridad = null;

  function ordenarCategorias(categoria) {
    const indices = MENU.map((_, i) => i);
    if (categoria) {
      const pri = MENU.findIndex((c) => c.categoria === categoria);
      if (pri >= 0) {
        const resto = indices.filter((i) => i !== pri);
        indices.splice(0, indices.length, pri, ...resto);
      }
    }

    menuCompletoEl.querySelectorAll(".menu-cat").forEach((b) => {
      b.classList.remove("menu-cat--prioridad");
    });

    indices.forEach((i) => {
      const block = document.getElementById(`${idPrefix}-cat-${i}`);
      if (block) menuCompletoEl.appendChild(block);
      if (categoria && MENU[i].categoria === categoria) {
        block.classList.add("menu-cat--prioridad");
      }
    });
  }

  function setPrioridad(categoria) {
    categoriaPrioridad = categoria;
    chipsEl.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.cat === (categoria || ""));
    });
    ordenarCategorias(categoria);
  }

  const todos = document.createElement("button");
  todos.type = "button";
  todos.className = "chip active";
  todos.textContent = "Todas";
  todos.dataset.cat = "";
  todos.addEventListener("click", () => setPrioridad(null));
  chipsEl.appendChild(todos);

  MENU.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = cat.categoria;
    btn.dataset.cat = cat.categoria;
    btn.addEventListener("click", () => setPrioridad(cat.categoria));
    chipsEl.appendChild(btn);
  });

  MENU.forEach((cat, catIndex) => {
    const block = document.createElement("section");
    block.className = "menu-cat";
    block.dataset.categoria = cat.categoria;
    block.id = `${idPrefix}-cat-${catIndex}`;

    const title = document.createElement("h4");
    title.className = "menu-cat__title";
    title.textContent = cat.categoria;
    block.appendChild(title);

    const list = document.createElement("ul");
    list.className = "menu-cat__list";

    cat.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "menu-item-card";

      const head = document.createElement("button");
      head.type = "button";
      head.className = "menu-item__head";
      const precioHtml =
        typeof item.precio === "number"
          ? `<span class="menu-item__precio">$${item.precio}</span>`
          : "";
      head.innerHTML = `
        <span class="menu-item__top">
          <span class="menu-item__nombre">${item.nombre}</span>
          ${precioHtml}
        </span>
        <span class="menu-item__fuera"><b>Fuera:</b> ${item.fuera}</span>
        <span class="menu-item__dentro"><b>Dentro:</b> ${item.dentro}</span>
      `;
      head.addEventListener("click", () => toggleTarjeta(li, item));

      li.appendChild(head);
      li.insertAdjacentHTML("beforeend", crearDetalleHTML());
      list.appendChild(li);
    });

    block.appendChild(list);
    menuCompletoEl.appendChild(block);
  });
}

mountRollosMenu({
  chipsId: "categoria-chips",
  menuId: "menu-completo",
  idPrefix: "menu",
});

mountRollosMenu({
  chipsId: "categoria-chips-buffet",
  menuId: "menu-completo-buffet",
  idPrefix: "buffet",
});

mountRollosMenu({
  chipsId: "categoria-chips-promo",
  menuId: "menu-completo-promo",
  idPrefix: "promo-vista",
});

document.querySelectorAll(".promo-rollos__toggle").forEach((toggle) => {
  const panel = document.getElementById(toggle.getAttribute("aria-controls"));
  if (!panel) return;
  toggle.addEventListener("click", () => {
    const abierta = toggle.getAttribute("aria-expanded") === "true";
    if (abierta) {
      toggle.setAttribute("aria-expanded", "false");
      if (typeof Motion !== "undefined") {
        Motion.closeAccordionPanel(panel);
      } else {
        panel.hidden = true;
      }
      return;
    }
    toggle.setAttribute("aria-expanded", "true");
    if (typeof Motion !== "undefined") {
      Motion.openAccordionPanel(panel);
    } else {
      panel.hidden = false;
    }
  });
});
