/* Formulaire de contact Pavillon Anglais : logique du composant. */
class Component extends DCLogic {
  renderVals() {
    var self = this;
    var s = this.state || {};
    var NAVY = "#0D1F3C", WHITE = "#FFFFFF";
    var name = s.name || "", email = s.email || "", message = s.message || "";
    var defs = [
      { key: "prepa", label: "La préparation" },
      { key: "tarifs", label: "Les tarifs" },
      { key: "groupe", label: "Un groupe d'unité" },
      { key: "autre", label: "Autre chose" }
    ];
    var topics = defs.map(function (d) {
      var on = s.topic === d.key;
      return { label: d.label, pressed: on, bg: on ? "#FFE4D9" : WHITE,
        shadow: on ? "none" : "3px 3px 0 " + NAVY, shift: on ? "translate(3px, 3px)" : "none",
        pick: function () { self.setState({ topic: d.key }); } };
    });
    var cantSend = !(name.trim() && /.+@.+\..+/.test(email) && message.trim());
    var picked = defs.filter(function (d) { return d.key === s.topic; })[0];
    var topicLabel = picked ? picked.label.toLowerCase() : "une question";
    var val = function (e) { return (e && e.target && e.target.value) || ""; };
    return {
      name: name, email: email, message: message, topics: topics,
      onName: function (e) { self.setState({ name: val(e) }); },
      onEmail: function (e) { self.setState({ email: val(e) }); },
      onMessage: function (e) { self.setState({ message: val(e) }); },
      cantSend: cantSend,
      canSend: !cantSend,
      mailto: "mailto:tristanbrunoedu@gmail.com?subject=" + encodeURIComponent("Pavillon Anglais : " + topicLabel) + "&body=" + encodeURIComponent(message + "\n\n" + name.trim() + "\n" + email),
      send: function () { if (!cantSend) { self.setState({ sent: true }); } },
      sent: !!s.sent,
      notSent: !s.sent,
      sentTitle: name.trim() ? "Merci " + name.trim() + ", c'est prêt." : "Merci, c'est prêt."
    };
  }
}

DC.monter(Component, document.getElementById("dc-root"), document.getElementById("dc-gabarit"));
