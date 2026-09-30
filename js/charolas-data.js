function fotoCharola(archivo) {
  return `fotos/charolas/${encodeURIComponent(archivo)}`;
}

const CHAROLAS_EVENTOS = [
  {
    id: "evento-1",
    nombre: "Paquete 1",
    precio: "$3,300.00",
    items: [
      "200 piezas de sushi (20 rollos de sushi, hasta 10 variedades a elegir)",
      "10 órdenes de yakimeshi de verduras y pollo",
      "20 piezas kushiague de queso",
    ],
    personas: "Aproximadamente 20–25 personas",
  },
  {
    id: "evento-2",
    nombre: "Paquete 2",
    precio: "$1,600.00",
    items: [
      "100 piezas de sushi (10 rollos de sushi, hasta 5 variedades a elegir)",
      "5 órdenes de yakimeshi de verduras y pollo",
      "10 piezas kushiague de queso",
    ],
    personas: null,
  },
];

const CHAROLAS = [
  {
    id: "1a",
    nombre: "Charola 1-A",
    precio: "$265.00",
    foto: fotoCharola("Recurso 11@300x.png"),
    items: [
      "Kushiagues de queso (4 pzas.)",
      "Yakimeshi",
      "Rollos clásicos de su elección",
    ],
  },
  {
    id: "1b",
    nombre: "Charola 1-B",
    precio: "$265.00",
    foto: fotoCharola("Recurso 3@300x.png"),
    items: [
      "Kushiagues de queso (4 pzas.)",
      "Yakimeshi",
      "Kushiagues de camarón (4 pzas.)",
    ],
  },
  {
    id: "2a",
    nombre: "Charola 2-A",
    precio: "$275.00",
    foto: fotoCharola("Recurso 4@300x.png"),
    items: [
      "California Roll",
      "Filadelfia Especial",
      "Rollos clásicos de su elección",
    ],
  },
  {
    id: "2b",
    nombre: "Charola 2-B",
    precio: "$275.00",
    foto: fotoCharola("Recurso 5@300x.png"),
    items: [
      "California Roll",
      "Filadelfia Especial",
      "Kushiagues de camarón (4 pzas.)",
    ],
  },
  {
    id: "3a",
    nombre: "Charola 3-A",
    precio: "$295.00",
    foto: fotoCharola("Recurso 6@300x.png"),
    items: [
      "Yakimeshi",
      "Media pechuga (con guarnición de ensalada)",
      "Rollos clásicos de su elección",
    ],
  },
  {
    id: "3b",
    nombre: "Charola 3-B",
    precio: "$295.00",
    foto: fotoCharola("Recurso 7@300x.png"),
    items: [
      "Yakimeshi",
      "Media pechuga (con guarnición de ensalada)",
      "Kushiagues de camarón (4 pzas.)",
    ],
  },
  {
    id: "4a",
    nombre: "Charola 4-A",
    precio: "$295.00",
    foto: fotoCharola("Recurso 8@300x.png"),
    items: [
      "Kushiagues de queso (4 pzas.)",
      "Media orden de camarones empanizados (5 pzas. acompañados de arroz y ensalada)",
      "Rollos clásicos de su elección",
    ],
  },
  {
    id: "4b",
    nombre: "Charola 4-B",
    precio: "$295.00",
    foto: fotoCharola("Recurso 9@300x.png"),
    items: [
      "Kushiagues de queso (4 pzas.)",
      "Media orden de camarones empanizados (5 pzas. acompañados de arroz y ensalada)",
      "Kushiagues de camarón (4 pzas.)",
    ],
  },
  {
    id: "5a",
    nombre: "Charola 5-A",
    precio: "$295.00",
    foto: fotoCharola("Recurso 10@300x.png"),
    items: [
      "Apanadito Roll",
      "Yakimeshi",
      "Rollos clásicos de su elección",
    ],
  },
  {
    id: "5b",
    nombre: "Charola 5-B",
    precio: "$295.00",
    foto: fotoCharola("Recurso 2@300x.png"),
    items: [
      "Apanadito Roll",
      "Yakimeshi",
      "Kushiagues de camarón (4 pzas.)",
    ],
  },
  {
    id: "fiestera",
    nombre: "Charola Fiestera",
    precio: "$425.00",
    foto: fotoCharola("Recurso 12@300x.png"),
    destacada: true,
    items: [
      "California Especial",
      "Filadelfia Roll",
      "Chilly Roll",
      "Express Roll",
      "Plátano Roll",
    ],
  },
];
