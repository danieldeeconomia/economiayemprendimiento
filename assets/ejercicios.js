(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  if (tabs.length === 0) { return; }

  function panelDe(tab) { return document.getElementById(tab.getAttribute("aria-controls")); }

  function activar(tab, moverFoco) {
    tabs.forEach(function (t) {
      var activa = t === tab;
      t.setAttribute("aria-selected", activa ? "true" : "false");
      t.tabIndex = activa ? 0 : -1;
      panelDe(t).hidden = !activa;
    });
    if (moverFoco) { tab.focus(); }
  }

  function hashDe(tab) { return "#tema-" + tab.getAttribute("aria-controls"); }

  function desdeHash() {
    var id = window.location.hash.replace("#", "").replace("tema-", "");
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute("aria-controls") === id) { return tabs[i]; }
    }
    return tabs[0];
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () {
      activar(tab, false);
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", hashDe(tab));
      }
    });
    tab.addEventListener("keydown", function (e) {
      var destino = null;
      if (e.key === "ArrowRight") { destino = tabs[(i + 1) % tabs.length]; }
      if (e.key === "ArrowLeft") { destino = tabs[(i - 1 + tabs.length) % tabs.length]; }
      if (e.key === "Home") { destino = tabs[0]; }
      if (e.key === "End") { destino = tabs[tabs.length - 1]; }
      if (destino) {
        e.preventDefault();
        activar(destino, true);
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", hashDe(destino));
        }
      }
    });
  });

  window.addEventListener("hashchange", function () { activar(desdeHash(), false); });
  activar(desdeHash(), false);
})();
