function buildCarta() {
  const root = document.getElementById("carta-acordeon");
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

  function cerrarTodas(excepto) {
    root.querySelectorAll(".carta-cat").forEach((cat) => {
      if (cat === excepto) return;
      cat.classList.remove("carta-cat--open");
      const btn = cat.querySelector(".carta-cat__toggle");
      const panel = cat.querySelector(".carta-cat__panel");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (panel) panel.hidden = true;
    });
  }

  CARTA.forEach((cat) => {
    const section = document.createElement("section");
    section.className = "carta-cat";
    section.dataset.cat = cat.id;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "carta-cat__toggle";
    toggle.id = `carta-toggle-${cat.id}`;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", `carta-panel-${cat.id}`);
    toggle.innerHTML = `
      <span class="carta-cat__titulo">${cat.nombre}</span>
      <span class="carta-cat__chevron" aria-hidden="true">▾</span>
    `;

    const panel = document.createElement("div");
    panel.className = "carta-cat__panel";
    panel.id = `carta-panel-${cat.id}`;
    panel.hidden = true;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", `carta-toggle-${cat.id}`);

    const fotoBtn = document.createElement("button");
    fotoBtn.type = "button";
    fotoBtn.className = "carta-cat__foto";
    fotoBtn.setAttribute("aria-label", `Ver foto de ${cat.nombre}`);
    fotoBtn.innerHTML = `<img src="${cat.foto}" alt="${cat.nombre}" loading="lazy" />`;
    fotoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      abrirFoto(cat.foto, cat.nombre);
    });

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

    panel.appendChild(fotoBtn);
    panel.appendChild(list);

    if (cat.nota) {
      const nota = document.createElement("p");
      nota.className = "carta-cat__nota";
      nota.textContent = cat.nota;
      panel.appendChild(nota);
    }

    toggle.addEventListener("click", () => {
      const abierta = section.classList.contains("carta-cat--open");
      cerrarTodas();
      if (!abierta) {
        section.classList.add("carta-cat--open");
        toggle.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });

    section.appendChild(toggle);
    section.appendChild(panel);
    root.appendChild(section);
  });
}

buildCarta();
