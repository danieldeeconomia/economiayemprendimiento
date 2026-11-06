(function () {
  var contenedor = document.getElementById("grafico");
  if (!contenedor) { return; }

  var inputDemanda = document.getElementById("demanda");
  var inputCostes = document.getElementById("costes");
  var lecturaPrecio = document.getElementById("lectura-precio");
  var lecturaCantidad = document.getElementById("lectura-cantidad");
  var explicacion = document.getElementById("explicacion");

  /* Modelo: demanda P = D - Q; oferta P = costes + 0,5 Q */
  var D0 = 100, C0 = 10, PENDIENTE = 0.5;
  var MAX = 140;
  var W = 520, H = 400, IZQ = 52, DER = 20, ARR = 20, ABA = 48;
  var AN = W - IZQ - DER, AL = H - ARR - ABA;

  function x(q) { return IZQ + (q / MAX) * AN; }
  function y(p) { return ARR + (1 - p / MAX) * AL; }

  function equilibrio(d, c) {
    var q = (d - c) / (1 + PENDIENTE);
    return { q: q, p: d - q };
  }

  var inicio = equilibrio(D0, C0);

  function cuadricula() {
    var s = "";
    for (var v = 0; v <= MAX; v += 20) {
      s += '<line x1="' + x(v) + '" y1="' + y(0) + '" x2="' + x(v) + '" y2="' + y(MAX) + '" stroke="#E3EAE7" stroke-width="1"/>';
      s += '<line x1="' + x(0) + '" y1="' + y(v) + '" x2="' + x(MAX) + '" y2="' + y(v) + '" stroke="#E3EAE7" stroke-width="1"/>';
    }
    return s;
  }

  function dibujar(d, c) {
    var e = equilibrio(d, c);
    var pe = Math.round(e.p), qe = Math.round(e.q);
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Gráfico de oferta y demanda. Precio de equilibrio ' + pe + " euros, " + qe + ' unidades vendidas.">';

    s += cuadricula();

    /* Ejes */
    s += '<line x1="' + x(0) + '" y1="' + y(0) + '" x2="' + x(MAX) + '" y2="' + y(0) + '" stroke="#17262B" stroke-width="2"/>';
    s += '<line x1="' + x(0) + '" y1="' + y(0) + '" x2="' + x(0) + '" y2="' + y(MAX) + '" stroke="#17262B" stroke-width="2"/>';
    s += '<text x="' + (IZQ + AN / 2) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="14" fill="#4A5B60">Cantidad (unidades)</text>';
    s += '<text transform="translate(16 ' + (ARR + AL / 2) + ') rotate(-90)" text-anchor="middle" font-size="14" fill="#4A5B60">Precio (€)</text>';

    /* Demanda: de (0, d) a (d, 0) */
    s += '<line x1="' + x(0) + '" y1="' + y(d) + '" x2="' + x(d) + '" y2="' + y(0) + '" stroke="#C23B2E" stroke-width="3.5" stroke-linecap="round"/>';
    s += '<text x="' + (x(d * 0.14) + 10) + '" y="' + (y(d * 0.86) - 8) + '" font-size="15" font-weight="700" fill="#C23B2E">Demanda</text>';

    /* Oferta: de (0, c) a (MAX, c + 0,5 MAX) */
    var fin = c + PENDIENTE * MAX;
    s += '<line x1="' + x(0) + '" y1="' + y(c) + '" x2="' + x(MAX) + '" y2="' + y(fin) + '" stroke="#1D5FB8" stroke-width="3.5" stroke-linecap="round"/>';
    s += '<text x="' + (x(MAX) - 4) + '" y="' + (y(fin) - 10) + '" text-anchor="end" font-size="15" font-weight="700" fill="#1D5FB8">Oferta</text>';

    /* Guías del equilibrio */
    s += '<line x1="' + x(e.q) + '" y1="' + y(e.p) + '" x2="' + x(e.q) + '" y2="' + y(0) + '" stroke="#17262B" stroke-width="1.5" stroke-dasharray="5 5"/>';
    s += '<line x1="' + x(e.q) + '" y1="' + y(e.p) + '" x2="' + x(0) + '" y2="' + y(e.p) + '" stroke="#17262B" stroke-width="1.5" stroke-dasharray="5 5"/>';
    s += '<text x="' + x(e.q) + '" y="' + (y(0) + 18) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#17262B">' + qe + "</text>";
    s += '<text x="' + (x(0) + 8) + '" y="' + (y(e.p) - 7) + '" font-size="13" font-weight="700" fill="#17262B">' + pe + " €</text>";

    /* Punto de equilibrio */
    s += '<circle cx="' + x(e.q) + '" cy="' + y(e.p) + '" r="8" fill="#F4C430" stroke="#17262B" stroke-width="2.5"/>';

    s += "</svg>";
    return s;
  }

  function texto(e) {
    var dp = e.p - inicio.p, dq = e.q - inicio.q;
    if (Math.abs(dp) < 0.5 && Math.abs(dq) < 0.5) {
      return "Punto de partida. Mueve los controles para ver qué pasa.";
    }
    var precio = dp > 0.5 ? "sube" : (dp < -0.5 ? "baja" : "casi no cambia");
    var cantidad = dq > 0.5 ? "se venden más unidades" : (dq < -0.5 ? "se venden menos unidades" : "se venden las mismas unidades");
    return "Respecto al punto de partida, el precio " + precio + " y " + cantidad + ".";
  }

  function actualizar() {
    var d = Number(inputDemanda.value);
    var c = Number(inputCostes.value);
    var e = equilibrio(d, c);
    contenedor.innerHTML = dibujar(d, c);
    lecturaPrecio.textContent = Math.round(e.p) + " €";
    lecturaCantidad.textContent = Math.round(e.q);
    explicacion.textContent = texto(e);
  }

  inputDemanda.addEventListener("input", actualizar);
  inputCostes.addEventListener("input", actualizar);
  actualizar();
})();
