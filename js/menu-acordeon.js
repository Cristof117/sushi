function buildMenuAcordeon() {
  const root = document.getElementById("menu-acordeon");
  if (!root || typeof CARTA === "undefined") return;

  const lightbox = document.getElementById("foto-lightbox");
  const lightboxImg = lightbox?.querySelector(".foto-lightbox__img");
  const lightboxCaption = lightbox?.querySelector(".foto-lightbox__caption");
  const lightboxCerrar = lightbox?.querySelector(".foto-lightbox__cerrar");

  function abrirFoto(src, nombre) {
    if (!lightbox || !src) return;
    lightboxImg.src = src;
    lightboxImg.alt = nombre;
    lightboxCaption.textContent = nombre;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-abierto");
    lightboxCerrar?.focus();
  }

  function cerrarTodas(excepto, onDone) {
    const abiertos = [...root.querySelectorAll(".carta-cat.carta-cat--open")].filter(
      (cat) => cat !== excepto
    );

    if (!abiertos.length) {
      onDone?.();
      return;
    }

    let pendientes = abiertos.length;
    abiertos.forEach((cat) => {
      cat.classList.remove("carta-cat--open");
      const btn = cat.querySelector(".carta-cat__toggle");
      const panel = cat.querySelector(".carta-cat__panel");
      if (btn) btn.setAttribute("aria-expanded", "false");
      const fin = () => {
        pendientes -= 1;
        if (pendientes <= 0) onDone?.();
      };
      if (panel && typeof Motion !== "undefined") {
        Motion.closeAccordionPanel(panel, fin);
      } else if (panel) {
        panel.hidden = true;
        fin();
      } else {
        fin();
      }
    });
  }

  function fotosDe(cat) {
    if (Array.isArray(cat.fotos) && cat.fotos.length) return cat.fotos;
    if (cat.foto) return [cat.foto];
    return [];
  }

  function crearPanel(id, titulo, fillPanel) {
    const section = document.createElement("section");
    section.className = "carta-cat";
    section.dataset.cat = id;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "carta-cat__toggle";
    toggle.id = `menu-toggle-${id}`;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", `menu-panel-${id}`);
    toggle.innerHTML = `
      <span class="carta-cat__titulo">${titulo}</span>
      <span class="carta-cat__chevron" aria-hidden="true">▾</span>
    `;

    const panel = document.createElement("div");
    panel.className = "carta-cat__panel";
    panel.id = `menu-panel-${id}`;
    panel.hidden = true;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", `menu-toggle-${id}`);

    fillPanel(panel);

    toggle.addEventListener("click", () => {
      const abierta = section.classList.contains("carta-cat--open");
      cerrarTodas(null, () => {
        if (abierta) return;
        abrirSeccion(section, toggle, panel);
      });
    });

    section.appendChild(toggle);
    section.appendChild(panel);
    root.appendChild(section);
  }

  function abrirSeccion(section, toggle, panel) {
    section.classList.add("carta-cat--open");
    toggle.setAttribute("aria-expanded", "true");
    if (typeof Motion !== "undefined") {
      Motion.openAccordionPanel(panel);
    } else {
      panel.hidden = false;
    }
  }

  window.abrirCategoriaMenu = function abrirCategoriaMenu(catId) {
    if (!catId) return;
    const section = root.querySelector(`.carta-cat[data-cat="${catId}"]`);
    if (!section) return;
    const toggle = section.querySelector(".carta-cat__toggle");
    const panel = section.querySelector(".carta-cat__panel");
    if (!toggle || !panel) return;

    const yaAbierta = section.classList.contains("carta-cat--open");
    cerrarTodas(yaAbierta ? section : null, () => {
      if (yaAbierta) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      abrirSeccion(section, toggle, panel);
      requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  function fillCartaCat(cat, panel) {
    const fotos = fotosDe(cat);
    if (fotos.length) {
      const gallery = document.createElement("div");
      gallery.className = "carta-cat__fotos";
      fotos.forEach((src, i) => {
        const fotoBtn = document.createElement("button");
        fotoBtn.type = "button";
        fotoBtn.className = "carta-cat__foto";
        fotoBtn.setAttribute("aria-label", `Ver foto de ${cat.nombre}`);
        fotoBtn.innerHTML = `<img src="${src}" alt="${cat.nombre}" loading="lazy" />`;
        fotoBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          abrirFoto(src, `${cat.nombre}${fotos.length > 1 ? ` (${i + 1})` : ""}`);
        });
        gallery.appendChild(fotoBtn);
      });
      panel.appendChild(gallery);
    }

    const list = document.createElement("ul");
    list.className = "carta-cat__lista";
    cat.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "carta-item";
      li.innerHTML = `
        <div class="carta-item__row">
          <span class="carta-item__nombre">${item.nombre}</span>
          <span class="carta-item__dots" aria-hidden="true"></span>
          <span class="carta-item__precio">${item.precio}</span>
        </div>
        ${item.detalle ? `<p class="carta-item__detalle">${item.detalle}</p>` : ""}
      `;
      list.appendChild(li);
    });
    panel.appendChild(list);

    if (cat.nota) {
      const nota = document.createElement("p");
      nota.className = "carta-cat__nota";
      nota.textContent = cat.nota;
      panel.appendChild(nota);
    }
  }

  function fillFromTemplate(templateId, panel) {
    const tpl = document.getElementById(templateId);
    if (!tpl) return;
    panel.appendChild(tpl.content.cloneNode(true));
  }

  const cartaOrder = ["entradas", "niguiris", "arroz", "teppanyaki", "especialidades"];
  cartaOrder.forEach((id) => {
    const cat = CARTA.find((c) => c.id === id);
    if (cat) crearPanel(cat.id, cat.nombre, (panel) => fillCartaCat(cat, panel));
  });

  crearPanel("rollos", "Rollos", (panel) => fillFromTemplate("tpl-rollos", panel));
  crearPanel("promociones", "Promociones", (panel) => fillFromTemplate("tpl-promociones", panel));
  crearPanel("paquetes-charolas", "Paquetes Charolas", (panel) => fillFromTemplate("tpl-paquetes-charolas", panel));
  crearPanel("charolas", "Charolas", (panel) => fillFromTemplate("tpl-charolas", panel));

  const extras = CARTA.find((c) => c.id === "extras");
  if (extras) crearPanel(extras.id, extras.nombre, (panel) => fillCartaCat(extras, panel));
}

buildMenuAcordeon();
