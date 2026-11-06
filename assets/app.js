(function () {
  var cursos = window.CURSOS || [];
  var artefactos = window.ARTEFACTOS || [];

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fecha(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) { return ""; }
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
  }

  function nombreCurso(id) {
    for (var i = 0; i < cursos.length; i++) {
      if (cursos[i].id === id) { return cursos[i].nombre; }
    }
    return "";
  }

  function tarjetaMaterial(a, mostrarCurso) {
    var meta = "";
    if (mostrarCurso && nombreCurso(a.curso)) { meta += "<span>" + esc(nombreCurso(a.curso)) + "</span>"; }
    if (a.tipo) { meta += "<span>" + esc(a.tipo) + "</span>"; }
    if (a.fecha && fecha(a.fecha)) { meta += "<span>" + esc(fecha(a.fecha)) + "</span>"; }
    return '<li><a class="material" href="artefactos/' + encodeURI(a.archivo) + '">' +
      '<span class="material-titulo">' + esc(a.titulo) + "</span>" +
      '<span class="material-desc">' + esc(a.descripcion || "") + "</span>" +
      '<span class="material-meta">' + meta + "</span>" +
      "</a></li>";
  }

  function ordenados() {
    return artefactos.slice().sort(function (a, b) {
      return String(b.fecha).localeCompare(String(a.fecha));
    });
  }

  /* Portada */
  var listaCursos = document.getElementById("lista-cursos");
  if (listaCursos) {
    listaCursos.innerHTML = cursos.map(function (c) {
      var n = artefactos.filter(function (a) { return a.curso === c.id; }).length;
      var cuenta = n === 0 ? "Próximamente" : (n === 1 ? "1 material" : n + " materiales");
      return '<li><a href="curso.html?curso=' + encodeURIComponent(c.id) + '">' +
        '<span class="curso-nombre">' + esc(c.nombre) + "</span>" +
        '<span class="curso-materia">' + esc(c.materia) + "</span>" +
        '<span class="curso-cuenta">' + cuenta + "</span>" +
        "</a></li>";
    }).join("");
  }

  var listaNuevos = document.getElementById("lista-nuevos");
  if (listaNuevos) {
    var recientes = ordenados().slice(0, 6);
    if (recientes.length === 0) {
      listaNuevos.outerHTML = '<p class="vacio">Aquí aparecerán los materiales nuevos.</p>';
    } else {
      listaNuevos.innerHTML = recientes.map(function (a) { return tarjetaMaterial(a, true); }).join("");
    }
  }

  /* Página de curso */
  var contenedorCurso = document.getElementById("contenido-curso");
  if (contenedorCurso) {
    var id = new URLSearchParams(window.location.search).get("curso");
    var curso = cursos.filter(function (c) { return c.id === id; })[0];

    if (!curso) {
      document.title = "Curso no encontrado | danieldeeconomia";
      contenedorCurso.innerHTML = '<div class="encabezado-curso"><h1>No encontramos ese curso</h1>' +
        '<p><a class="volver" href="index.html#cursos">Volver a los cursos</a></p></div>';
    } else {
      document.title = curso.nombre + " | danieldeeconomia";
      var delCurso = ordenados().filter(function (a) { return a.curso === curso.id; });
      var html = '<div class="encabezado-curso"><h1>' + esc(curso.nombre) + "</h1>" +
        "<p>" + esc(curso.materia) + "</p>" +
        '<a class="volver" href="index.html#cursos">Volver a los cursos</a></div>';

      if (delCurso.length === 0) {
        html += '<p class="vacio">Todavía no hay materiales en este curso.</p>';
      } else {
        var temas = [];
        delCurso.forEach(function (a) {
          var t = a.tema || "Otros materiales";
          if (temas.indexOf(t) === -1) { temas.push(t); }
        });
        temas.forEach(function (t) {
          var deTema = delCurso.filter(function (a) { return (a.tema || "Otros materiales") === t; });
          html += '<section class="grupo"><h2>' + esc(t) + '</h2><ul class="lista materiales">' +
            deTema.map(function (a) { return tarjetaMaterial(a, false); }).join("") +
            "</ul></section>";
        });
      }
      contenedorCurso.innerHTML = html;
    }
  }
})();
