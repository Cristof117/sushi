const MENU = [
  { categoria: "Camarón", tipo: "camaron", items: [
    { nombre: "California Roll", fuera: "Ajonjolí", dentro: "Aguacate, pepino y camarón" },
    { nombre: "Leyenda Roll", fuera: "Plátano frito", dentro: "Aguacate, camarón y queso crema" },
    { nombre: "Chilly Roll", fuera: "Aguacate", dentro: "Queso manchego, chiles toreados y camarón" },
    { nombre: "California Especial", fuera: "Masago y ajonjolí", dentro: "Aguacate, pepino y camarón" },
    { nombre: "Pinta Roll", fuera: "Queso crema y tampico", dentro: "Aguacate y camarón empanizado" },
  ]},
  { categoria: "Surimi", tipo: "surimi", items: [
    { nombre: "Crunchy Roll", fuera: "Ajonjolí y aguacate", dentro: "Surimi, queso crema, pepino y zanahoria" },
    { nombre: "Tampico Especial", fuera: "Alga", dentro: "Tampico, surimi y masago" },
  ]},
  { categoria: "Vegetales", tipo: "vegetal", items: [
    { nombre: "Pepino Roll", fuera: "Pepino", dentro: "Queso crema, aguacate, pepino y zanahoria" },
    { nombre: "Futo Maki", fuera: "Alga, salsa anguila y ajonjolí", dentro: "Queso crema, pepino y zanahoria" },
  ]},
  { categoria: "Frutas", tipo: "fruta", items: [
    { nombre: "Plátano Roll", fuera: "Plátano frito, salsa anguila y ajonjolí", dentro: "Queso crema, aguacate y zanahoria dulce" },
    { nombre: "Fresita Roll", fuera: "Fresa, queso crema y chile miguelito", dentro: "Zanahoria dulce, aguacate y queso crema" },
    { nombre: "Kiwi Roll", fuera: "Kiwi y queso crema", dentro: "Fresa, aguacate, zanahoria dulce y queso crema" },
    { nombre: "Mango Roll", fuera: "Mango", dentro: "Aguacate, queso crema y zanahoria dulce (temporada)" },
  ]},
  { categoria: "Combinados", tipo: "combinado", items: [
    { nombre: "Express Roll", fuera: "Surimi", dentro: "Aguacate, camarón y queso crema" },
    { nombre: "Miles Roll", fuera: "Queso crema", dentro: "Surimi, camarón, aguacate y pepino" },
    { nombre: "Bomba Roll", fuera: "Queso crema y masago", dentro: "Camarón, queso crema, pepino y atún ahumado" },
    { nombre: "Yeye Roll", fuera: "Aguacate, surimi, ajonjolí y tampico", dentro: "Camarón, queso crema y salmón ahumado" },
  ]},
  { categoria: "Res o Pollo", tipo: "carne", items: [
    { nombre: "Pepito Roll", fuera: "Alga", dentro: "Filete de res y aguacate" },
    { nombre: "Kid Roll", fuera: "Queso crema", dentro: "Filete marinado y aguacate" },
  ]},
  { categoria: "Salmón o Atún", tipo: "salmon", items: [
    { nombre: "Filadelfia Roll", fuera: "Ajonjolí", dentro: "Queso crema y salmón ahumado" },
    { nombre: "Filadelfia Especial", fuera: "Masago y ajonjolí", dentro: "Queso crema y salmón ahumado" },
    { nombre: "Paitilla Roll", fuera: "Ajonjolí y tampico", dentro: "Queso crema y salmón ahumado" },
  ]},
  { categoria: "Empanizados", tipo: "empanizado", items: [
    { nombre: "Mexican Roll", fuera: "Empanizado y salsa chipotle", dentro: "Queso manchego y aguacate" },
    { nombre: "Apanadito Roll", fuera: "Empanizado y tampico", dentro: "Queso crema, camarón empanizado y aguacate" },
    { nombre: "Dulcecito Roll", fuera: "Empanizado, salsa anguila y coco", dentro: "Zanahoria dulce, queso crema y aguacate" },
    { nombre: "Tuna Roll", fuera: "Empanizado y tampico", dentro: "Queso crema, atún empanizado y aguacate" },
    { nombre: "Surimi Roll", fuera: "Empanizado y tampico", dentro: "Queso crema, surimi y aguacate" },
    { nombre: "Mexican Chicken Roll", fuera: "Empanizado y salsa chipotle", dentro: "Pollo, queso manchego y aguacate" },
  ]},
];

const FOTO_CARPETA = {
  "Camarón": "CAMARON",
  "Surimi": "SURIMI",
  "Vegetales": "VEGETALES",
  "Frutas": "FRUTALES",
  "Combinados": "COMBINADOS",
  "Res o Pollo": "FILETE RES",
  "Salmón o Atún": "SALMON",
  "Empanizados": "EMPANIZADOS",
};

function fotoDeRollo(categoria, nombre) {
  const carpeta = FOTO_CARPETA[categoria];
  const archivo = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() + ".png";
  return `fotos/CATEGORIAS/${carpeta}/${archivo}`;
}

function fotoPdfDeRollo(categoria, nombre) {
  const carpeta = FOTO_CARPETA[categoria];
  const archivo = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() + ".png";
  return `fotos/pdf/${carpeta}/${archivo}`;
}

MENU.forEach((cat) => {
  cat.items.forEach((item) => {
    item.foto = fotoDeRollo(cat.categoria, item.nombre);
  });
});
