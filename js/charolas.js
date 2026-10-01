function buildCharolas() {
  const gridEl = document.getElementById("charolas-grid");
  const eventosEl = document.getElementById("charolas-eventos");
  if (!gridEl) return;

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

  CHAROLAS.forEach((item) => {
    const card = document.createElement("article");
    card.className = "charola-card" + (item.destacada ? " charola-card--fiestera" : "");

    const fotoBtn = document.createElement("button");
    fotoBtn.type = "button";
    fotoBtn.className = "charola-card__foto";
    fotoBtn.setAttribute("aria-label", `Ver foto de ${item.nombre}`);
    fotoBtn.innerHTML = `<img src="${item.foto}" alt="${item.nombre}" loading="lazy" />`;
    fotoBtn.addEventListener("click", () => abrirFoto(item.foto, item.nombre));

    const head = document.createElement("div");
    head.className = "charola-card__head";
    head.innerHTML = `
      <h3 class="charola-card__nombre">${item.nombre}</h3>
      <p class="charola-card__precio">${item.precio}</p>
    `;

    const list = document.createElement("ul");
    list.className = "charola-card__lista";
    item.items.forEach((ing) => {
      const li = document.createElement("li");
      li.textContent = ing;
      list.appendChild(li);
    });

    card.appendChild(fotoBtn);
    card.appendChild(head);
    card.appendChild(list);
    gridEl.appendChild(card);
  });

  if (!eventosEl) return;

  CHAROLAS_EVENTOS.forEach((pkg) => {
    const card = document.createElement("article");
    card.className = "charola-evento";

    card.innerHTML = `
      <div class="charola-evento__head">
        <h3 class="charola-evento__nombre">${pkg.nombre}</h3>
        <p class="charola-evento__precio">${pkg.precio}</p>
      </div>
    `;

    const list = document.createElement("ul");
    list.className = "charola-evento__lista";
    pkg.items.forEach((ing) => {
      const li = document.createElement("li");
      li.textContent = ing;
      list.appendChild(li);
    });
    card.appendChild(list);

    if (pkg.personas) {
      const p = document.createElement("p");
      p.className = "charola-evento__personas";
      p.textContent = pkg.personas;
      card.appendChild(p);
    }

    eventosEl.appendChild(card);
  });
}

buildCharolas();
