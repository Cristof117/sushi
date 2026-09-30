const menuCompletoEl = document.getElementById("menu-completo");

function crearItem(cat, item) {
  const li = document.createElement("li");
  li.className = "menu-item";
  const foto = fotoPdfDeRollo(cat.categoria, item.nombre);
  li.innerHTML = `
    <div class="menu-item__foto">
      <img src="${foto}" alt="${item.nombre}" />
    </div>
    <div class="menu-item__texto">
      <span class="menu-item__nombre">${item.nombre}</span>
      <span class="menu-item__fuera"><b>F:</b> ${item.fuera}</span>
      <span class="menu-item__dentro"><b>D:</b> ${item.dentro}</span>
    </div>
  `;
  return li;
}

function buildPdfMenu() {
  MENU.forEach((cat) => {
    const block = document.createElement("section");
    block.className = "menu-cat";

    const title = document.createElement("h3");
    title.className = "menu-cat__title";
    title.textContent = cat.categoria;
    block.appendChild(title);

    const list = document.createElement("ul");
    list.className = "menu-cat__list";

    cat.items.forEach((item) => {
      list.appendChild(crearItem(cat, item));
    });

    block.appendChild(list);
    menuCompletoEl.appendChild(block);
  });
}

buildPdfMenu();
