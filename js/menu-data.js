const MENU = [
  { categoria: "Camarón", tipo: "camaron", items: [
    { nombre: "California Roll", fuera: "Ajonjolí", dentro: "Aguacate, pepino y camarón", precio: 105 },
    { nombre: "Leyenda Roll", fuera: "Plátano frito", dentro: "Aguacate, camarón y queso crema", precio: 125 },
    { nombre: "Chilly Roll", fuera: "Aguacate", dentro: "Queso manchego, chiles toreados y camarón", precio: 125 },
    { nombre: "California Especial", fuera: "Masago y ajonjolí", dentro: "Aguacate, pepino y camarón" },
    { nombre: "Pinta Roll", fuera: "Queso crema y tampico", dentro: "Aguacate y camarón empanizado", precio: 120 },
  ]},
  { categoria: "Surimi", tipo: "surimi", items: [
    { nombre: "Crunchy Roll", fuera: "Ajonjolí y aguacate", dentro: "Surimi, queso crema, pepino y zanahoria", precio: 120 },
    { nombre: "Tampico Especial", fuera: "Alga", dentro: "Tampico, surimi y masago", precio: 115 },
  ]},
  { categoria: "Vegetales", tipo: "vegetal", items: [
    { nombre: "Pepino Roll", fuera: "Pepino", dentro: "Queso crema, aguacate, pepino y zanahoria", precio: 115 },
    { nombre: "Futo Maki", fuera: "Alga, salsa anguila y ajonjolí", dentro: "Queso crema, pepino y zanahoria", precio: 115 },
  ]},
  { categoria: "Frutas", tipo: "fruta", items: [
    { nombre: "Plátano Roll", fuera: "Plátano frito, salsa anguila y ajonjolí", dentro: "Queso crema, aguacate y zanahoria dulce", precio: 115 },
    { nombre: "Fresita Roll", fuera: "Fresa, queso crema y chile miguelito", dentro: "Zanahoria dulce, aguacate y queso crema", precio: 115 },
    { nombre: "Kiwi Roll", fuera: "Kiwi y queso crema", dentro: "Fresa, aguacate, zanahoria dulce y queso crema", precio: 115 },
    { nombre: "Mango Roll", fuera: "Mango", dentro: "Aguacate, queso crema y zanahoria dulce (temporada)", precio: 120 },
  ]},
  { categoria: "Combinados", tipo: "combinado", items: [
    { nombre: "Express Roll", fuera: "Surimi", dentro: "Aguacate, camarón y queso crema", precio: 115 },
    { nombre: "Miles Roll", fuera: "Queso crema", dentro: "Surimi, camarón, aguacate y pepino", precio: 125 },
    { nombre: "Bomba Roll", fuera: "Queso crema y masago", dentro: "Camarón, queso crema, pepino y atún ahumado", precio: 125 },
    { nombre: "Yeye Roll", fuera: "Aguacate, surimi, ajonjolí y tampico", dentro: "Camarón, queso crema y salmón ahumado", precio: 135 },
  ]},
  { categoria: "Res o Pollo", tipo: "carne", items: [
    { nombre: "Pepito Roll", fuera: "Alga", dentro: "Filete de res y aguacate", precio: 120 },
    { nombre: "Kid Roll", fuera: "Queso crema", dentro: "Filete marinado y aguacate", precio: 120 },
  ]},
  { categoria: "Salmón o Atún", tipo: "salmon", items: [
    { nombre: "Filadelfia Roll", fuera: "Ajonjolí", dentro: "Queso crema y salmón ahumado", precio: 100 },
    { nombre: "Filadelfia Especial", fuera: "Masago y ajonjolí", dentro: "Queso crema y salmón ahumado", precio: 120 },
    { nombre: "Paitilla Roll", fuera: "Ajonjolí y tampico", dentro: "Queso crema y salmón ahumado", precio: 120 },
  ]},
  { categoria: "Empanizados", tipo: "empanizado", items: [
    { nombre: "Mexican Roll", fuera: "Empanizado y salsa chipotle", dentro: "Queso manchego y aguacate", precio: 125 },
    { nombre: "Apanadito Roll", fuera: "Empanizado y tampico", dentro: "Queso crema, camarón empanizado y aguacate", precio: 125 },
    { nombre: "Dulcecito Roll", fuera: "Empanizado, salsa anguila y coco", dentro: "Zanahoria dulce, queso crema y aguacate", precio: 125 },
    { nombre: "Tuna Roll", fuera: "Empanizado y tampico", dentro: "Queso crema, atún empanizado y aguacate", precio: 125 },
    { nombre: "Surimi Roll", fuera: "Empanizado y tampico", dentro: "Queso crema, surimi y aguacate", precio: 125 },
    { nombre: "Mexican Chicken Roll", fuera: "Empanizado y salsa chipotle", dentro: "Pollo, queso manchego y aguacate", precio: 125 },
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
