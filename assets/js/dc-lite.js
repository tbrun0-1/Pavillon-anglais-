/* Pavillon Anglais : rendu des pages interactives (diagnostic, contact).
   Reprend les gabarits du site : {{valeur}}, <sc-if value>, <sc-for list as>, onClick, onChange. */
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var BOOLEENS = { disabled: 1, checked: 1, selected: 1, readonly: 1, required: 1, hidden: 1, open: 1, multiple: 1 };
  var SEUL = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/;
  var TOUS = /\{\{\s*([^{}]+?)\s*\}\}/g;
  var EVENEMENTS = ["click", "input", "change", "keydown", "submit"];

  function lire(chemin, portee) {
    chemin = chemin.trim();
    if (chemin === "true") { return true; }
    if (chemin === "false") { return false; }
    if (chemin === "null") { return null; }
    if (/^-?\d+(\.\d+)?$/.test(chemin)) { return parseFloat(chemin); }
    var morceaux = chemin.split("."), v = portee;
    for (var i = 0; i < morceaux.length; i++) {
      if (v === null || v === undefined) { return undefined; }
      v = v[morceaux[i]];
    }
    return v;
  }

  function remplir(texte, portee) {
    return texte.replace(TOUS, function (_, chemin) {
      var v = lire(chemin, portee);
      return (v === null || v === undefined || v === false) ? "" : String(v);
    });
  }

  function nomEvenement(attribut, el) {
    var n = attribut.slice(2).toLowerCase();
    if (n === "change" && /^(input|textarea|select)$/.test(el.localName)) { return "input"; }
    return n;
  }

  function poser(el, nom, v) {
    if (BOOLEENS[nom]) {
      if (v) { el.setAttribute(nom, ""); }
      return;
    }
    if (nom === "value" && /^(input|textarea|select)$/.test(el.localName)) {
      var s = (v === null || v === undefined) ? "" : String(v);
      el.__dcValeur = s;
      if (el.localName !== "textarea") { el.setAttribute("value", s); }
      el.value = s;
      return;
    }
    if (v === null || v === undefined) { return; }
    if (v === false && nom.indexOf("aria-") !== 0) { return; }
    el.setAttribute(nom, String(v));
  }

  function construire(source, portee, sortie) {
    var enfants = source.childNodes;
    for (var i = 0; i < enfants.length; i++) {
      var c = enfants[i];
      if (c.nodeType === 3) {
        var t = c.nodeValue;
        sortie.appendChild(document.createTextNode(t.indexOf("{{") < 0 ? t : remplir(t, portee)));
        continue;
      }
      if (c.nodeType !== 1) { continue; }
      var balise = c.localName;
      if (balise === "sc-if") {
        var condition = SEUL.exec(c.getAttribute("value") || "");
        if (condition && lire(condition[1], portee)) { construire(c, portee, sortie); }
        continue;
      }
      if (balise === "sc-for") {
        var source_liste = SEUL.exec(c.getAttribute("list") || "");
        var liste = source_liste ? lire(source_liste[1], portee) : null;
        var nom = c.getAttribute("as") || "item";
        if (liste && liste.length) {
          for (var k = 0; k < liste.length; k++) {
            var p = Object.create(portee);
            p[nom] = liste[k];
            construire(c, p, sortie);
          }
        }
        continue;
      }
      var el = c.namespaceURI === SVG_NS ? document.createElementNS(SVG_NS, balise) : document.createElement(balise);
      var attributs = c.attributes;
      for (var j = 0; j < attributs.length; j++) {
        var a = attributs[j], an = a.name, av = a.value;
        if (an.indexOf("hint-") === 0) { continue; }
        if (/^on/i.test(an)) {
          var cible = SEUL.exec(av);
          var fn = cible ? lire(cible[1], portee) : null;
          if (typeof fn === "function") { (el.__dcH || (el.__dcH = {}))[nomEvenement(an, el)] = fn; }
          continue;
        }
        var seul = SEUL.exec(av);
        if (seul) { poser(el, an, lire(seul[1], portee)); }
        else if (av.indexOf("{{") >= 0) { el.setAttribute(an, remplir(av, portee)); }
        else { el.setAttribute(an, av); }
      }
      construire(c, portee, el);
      sortie.appendChild(el);
    }
  }

  function memeNature(o, n) {
    return o.nodeType === n.nodeType && o.nodeName === n.nodeName && (o.nodeType !== 1 || o.namespaceURI === n.namespaceURI);
  }

  function accorder(o, n) {
    if (o.nodeType !== 1) {
      if (o.nodeValue !== n.nodeValue) { o.nodeValue = n.nodeValue; }
      return;
    }
    var i, a;
    for (i = o.attributes.length - 1; i >= 0; i--) {
      a = o.attributes[i];
      if (!n.hasAttribute(a.name)) { o.removeAttribute(a.name); }
    }
    for (i = 0; i < n.attributes.length; i++) {
      a = n.attributes[i];
      if (o.getAttribute(a.name) !== a.value) { o.setAttribute(a.name, a.value); }
    }
    o.__dcH = n.__dcH;
    if (n.__dcValeur !== undefined && o.value !== n.__dcValeur) { o.value = n.__dcValeur; }
    if (o.localName === "textarea") { return; }
    accorderEnfants(o, n);
  }

  function accorderEnfants(ancien, nouveau) {
    var anciens = Array.prototype.slice.call(ancien.childNodes);
    var nouveaux = Array.prototype.slice.call(nouveau.childNodes);
    var i;
    for (i = 0; i < nouveaux.length; i++) {
      var o = anciens[i], n = nouveaux[i];
      if (!o) { ancien.appendChild(n); }
      else if (memeNature(o, n)) { accorder(o, n); }
      else { ancien.replaceChild(n, o); }
    }
    for (; i < anciens.length; i++) { ancien.removeChild(anciens[i]); }
  }

  function deleguer(racine) {
    EVENEMENTS.forEach(function (type) {
      racine.addEventListener(type, function (e) {
        var t = e.target;
        while (t && t !== racine) {
          var h = t.__dcH && t.__dcH[type];
          if (h && !t.disabled) { h.call(null, e); }
          t = t.parentNode;
        }
      });
    });
  }

  function DCLogic(props) {
    this.props = props || {};
    this.state = null;
  }
  DCLogic.prototype.setState = function (modif) {
    var avant = this.state || {};
    var apres = typeof modif === "function" ? modif(avant, this.props) : modif;
    this.state = Object.assign({}, avant, apres || {});
    if (this.__majour) { this.__majour(); }
  };
  DCLogic.prototype.renderVals = function () { return {}; };

  function monter(Composant, racine, gabarit, props) {
    var c = new Composant(props || {});
    var occupe = false, encore = false;
    c.__majour = function () {
      if (occupe) { encore = true; return; }
      occupe = true;
      try {
        do {
          encore = false;
          var tampon = document.createElement("div");
          construire(gabarit.content, c.renderVals(), tampon);
          accorderEnfants(racine, tampon);
        } while (encore);
      } finally {
        occupe = false;
      }
    };
    deleguer(racine);
    c.__majour();
    return c;
  }

  window.DCLogic = DCLogic;
  window.DC = { monter: monter };
})();
