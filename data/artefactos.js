/*
  Aquí se registra todo lo que aparece en la web.

  CURSOS: los cursos que se muestran en la portada.
  ARTEFACTOS: un material por línea. Para añadir uno nuevo:
    1. Guarda su archivo .html en la carpeta "artefactos/".
    2. Copia una de las entradas de abajo y cambia sus datos.
  El campo "archivo" es el nombre exacto del .html, y "curso" debe coincidir
  con el "id" de uno de los cursos.
*/

window.CURSOS = [
  { id: "4eso", nombre: "4.º ESO", materia: "Economía y Emprendimiento" },
  { id: "bachillerato", nombre: "Bachillerato", materia: "Economía" }
];

window.ARTEFACTOS = [
  {
    titulo: "Umbral de rentabilidad",
    descripcion: "Calcula cuántas unidades hay que vender para empezar a ganar dinero y mira el punto exacto en el gráfico.",
    curso: "4eso",
    tema: "La empresa y sus costes",
    tipo: "Calculadora",
    fecha: "2026-11-06",
    archivo: "umbral-de-rentabilidad.html"
  }
];
