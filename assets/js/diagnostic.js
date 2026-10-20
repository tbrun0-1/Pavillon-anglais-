/* Diagnostic Pavillon Anglais : logique du composant. */
class Component extends DCLogic {
  questions() {
    return [
      { section: "ÉCOUTE", part: "PARTIE 2", partName: "Questions-réponses", type: "audio", accent: "ACCENT BRITANNIQUE",
        src: "assets/audio/q1.m4a",
        audio: [{ who: "QUESTION", text: "When does the next ferry leave for the island?" }],
        prompt: "Quelle est la meilleure réponse ?",
        options: ["From the main pier.", "In about twenty minutes.", "Yes, it left yesterday."],
        answer: 1,
        explain: "La question porte sur un moment (« when »). Seule la réponse B donne une indication de temps. « From the main pier » répondrait à « where »." },
      { section: "ÉCOUTE", part: "PARTIE 2", partName: "Questions-réponses", type: "audio", accent: "ACCENT AMÉRICAIN",
        src: "assets/audio/q2.m4a",
        audio: [{ who: "QUESTION", text: "Who's leading the safety briefing this morning?" }],
        prompt: "Quelle est la meilleure réponse ?",
        options: ["In the main hall.", "The new operations manager.", "Yes, it was very useful."],
        answer: 1,
        explain: "« Who » appelle une personne. La réponse A indique un lieu, la réponse C répond à une question fermée." },
      { section: "ÉCOUTE", part: "PARTIE 2", partName: "Questions-réponses", type: "audio", accent: "ACCENT AMÉRICAIN",
        src: "assets/audio/q3.m4a",
        audio: [{ who: "QUESTION", text: "Would you like me to send you the new shift schedule?" }],
        prompt: "Quelle est la meilleure réponse ?",
        options: ["It was a very long shift.", "Yes, by e-mail, please.", "I'll schedule it for Monday."],
        answer: 1,
        explain: "Les réponses A et C reprennent les mots « shift » et « schedule » sans répondre à la proposition. C'est un piège fréquent dans cette partie." },
      { section: "ÉCOUTE", part: "PARTIE 3", partName: "Conversations", type: "audio", accent: "DEUX ACCENTS",
        src: "assets/audio/q4.m4a",
        audio: [
          { who: "WOMAN", text: "Hi, I'm calling about the container that was supposed to arrive on Monday." },
          { who: "MAN", text: "Let me check. It's been delayed by the storm, so it should reach the port on Thursday." },
          { who: "WOMAN", text: "Thursday? Then I'll have to move the inspection to Friday." }
        ],
        prompt: "Why was the delivery delayed?",
        options: ["The weather was bad.", "Some documents were missing.", "The port was closed for a holiday.", "The inspection was cancelled."],
        answer: 0,
        explain: "L'audio parle de « storm », la réponse dit « the weather was bad ». Dans ce test, la bonne réponse reformule souvent ce qui est entendu." },
      { section: "ÉCOUTE", part: "PARTIE 4", partName: "Annonces", type: "audio", accent: "ACCENT BRITANNIQUE",
        src: "assets/audio/q5.m4a",
        audio: [{ who: "ANNOUNCER", text: "Attention, passengers. Because of strong winds, the three fifteen ferry to Porquerolles is cancelled. Passengers with tickets may take the four thirty departure, or ask for a full refund at the ticket office." }],
        prompt: "What can passengers do at the ticket office?",
        options: ["Change their seat.", "Get their money back.", "Buy a return ticket.", "Check the weather forecast."],
        answer: 1,
        explain: "« A full refund » est reformulé en « get their money back »." },
      { section: "LECTURE", part: "PARTIE 5", partName: "Phrases à compléter", type: "sentence",
        before: "The new safety procedures will be ", after: " to all crew members next week.",
        prompt: "Quel mot complète la phrase ?",
        options: ["explain", "explained", "explaining", "explanation"],
        answer: 1,
        explain: "Après « will be », on attend un participe passé, car la phrase est au passif." },
      { section: "LECTURE", part: "PARTIE 5", partName: "Phrases à compléter", type: "sentence",
        before: "Ms. Leclerc has worked in the logistics department ", after: " 2019.",
        prompt: "Quel mot complète la phrase ?",
        options: ["since", "for", "during", "from"],
        answer: 0,
        explain: "Avec le present perfect et un point de départ, on emploie « since ». « For » s'utilise avec une durée (for six years)." },
      { section: "LECTURE", part: "PARTIE 5", partName: "Phrases à compléter", type: "sentence",
        before: "The meeting has been postponed ", after: " the director is still at sea.",
        prompt: "Quel mot complète la phrase ?",
        options: ["because", "despite", "although", "due to"],
        answer: 0,
        explain: "On attend une conjonction de cause suivie d'une proposition complète, donc « because ». « Despite » et « due to » se construisent avec un nom." },
      { section: "LECTURE", part: "PARTIE 7", partName: "Lecture de documents", type: "doc",
        prompt: "What will happen to contractors without a badge?",
        options: ["They will pay a fine.", "They will be refused entry.", "They will be sent to Gate 3.", "They will get a temporary badge."],
        answer: 1,
        explain: "« Will not be allowed on site » est reformulé en « refused entry »." },
      { section: "LECTURE", part: "PARTIE 7", partName: "Lecture de documents", type: "doc",
        prompt: "When can contractors collect their badges?",
        options: ["On Monday afternoon only.", "At Gate 2.", "In the morning.", "After the inspection."],
        answer: 2,
        explain: "Les badges sont disponibles de 8 heures à midi, donc le matin. « Gate 2 » indique un lieu, pas un moment." }
    ];
  }

  packs() {
    return {
      brevet: { name: "Pack Brevet", price: "320 € · 8 séances · 40 €/h", detail: "8 séances d'une heure et un test blanc corrigé, 320 €, soit 40 € de l'heure." },
      pls: { name: "Pack PLS 3333", price: "480 € · 12 séances · 40 €/h", detail: "12 séances d'une heure et deux tests blancs corrigés, 480 €, soit 40 € de l'heure." },
      groupe: { name: "Mini-groupe", price: "120 € par personne · 8 séances", detail: "8 séances d'une heure à 3 à 5 marins, 120 € par personne." },
      unite: { name: "Séance à l'unité", price: "45 € la séance d'une heure", detail: "45 € la séance d'une heure, pour travailler un point précis." }
    };
  }

  base() {
    var screen = this.props.screen || "intro";
    var demo = [1, 1, 0, 1, 1, 1, 0, 2, 1, 2];
    if (screen === "result") {
      return { step: "result", qi: 9, answers: demo, objective: "bs", horizon: "moyen", target: "750", formule: null };
    }
    if (screen === "question") {
      return { step: "question", qi: 3, answers: [1, 1, 1, 1, null, null, null, null, null, null], objective: "bs", horizon: "moyen", target: "750", formule: null };
    }
    return { step: "intro", qi: 0, answers: [null, null, null, null, null, null, null, null, null, null], objective: null, horizon: null, target: "", formule: null };
  }

  cur() {
    return Object.assign({}, this.base(), this.state || {});
  }

  stopAudio() {
    try {
      if (this._audio) { this._audio.pause(); this._audio = null; }
    } catch (e) {}
  }

  componentWillUnmount() {
    this.stopAudio();
  }

  playAudio() {
    var self = this;
    var c = this.cur();
    var startQi = c.qi;
    var q = this.questions()[startQi];
    var fail = function () {
      if (self.cur().qi === startQi) { self.setState({ speaking: false, audioError: true, showTranscript: true }); }
    };
    try {
      this.stopAudio();
      var a = new window.Audio(q.src);
      this._audio = a;
      a.onended = function () {
        if (self.cur().qi === startQi) { self.setState({ speaking: false, played: true }); }
      };
      a.onerror = fail;
      this.setState({ speaking: true, audioError: false });
      var p = a.play();
      if (p && typeof p.catch === "function") { p.catch(fail); }
    } catch (e) {
      fail();
    }
  }

  pick(i) {
    var c = this.cur();
    var current = c.answers[c.qi];
    if (current !== null && current !== undefined) { return; }
    var a = c.answers.slice();
    a[c.qi] = i;
    this.setState({ answers: a });
  }

  next() {
    var c = this.cur();
    this.stopAudio();
    if (c.qi >= 9) {
      this.setState({ step: "result", formule: null, speaking: false, played: false, audioError: false, showTranscript: false });
    } else {
      this.setState({ qi: c.qi + 1, speaking: false, played: false, audioError: false, showTranscript: false });
    }
  }

  reset() {
    this.stopAudio();
    this.setState({ step: "intro", qi: 0, answers: [null, null, null, null, null, null, null, null, null, null], objective: null, horizon: null, target: "", formule: null, speaking: false, played: false, audioError: false, showTranscript: false });
  }

  onTarget(e) {
    var v = (e && e.target && e.target.value) || "";
    v = String(v).replace(/[^0-9]/g, "").slice(0, 3);
    this.setState({ target: v });
  }

  renderVals() {
    var self = this;
    var c = this.cur();
    var Q = this.questions();
    var P = this.packs();
    var NAVY = "#0D1F3C", ORANGE = "#FF5A1F", BLUE = "#1A47B8", RED = "#C8202F", WHITE = "#FFFFFF", PAPER = "#F3F4F0", TINT = "#FFE4D9";
    var qi = Math.max(0, Math.min(9, c.qi || 0));
    var q = Q[qi];
    var ans = c.answers[qi];
    var answered = ans !== null && ans !== undefined;
    var correct = answered && ans === q.answer;

    var chip = function (on) {
      return { bg: on ? TINT : WHITE, shadow: on ? "none" : "3px 3px 0 " + NAVY, shift: on ? "translate(3px, 3px)" : "none" };
    };

    var objDefs = [
      { key: "bat", label: "Valider mon BAT" },
      { key: "bs", label: "Préparer le BS" },
      { key: "pls", label: "Obtenir le PLS 3333" },
      { key: "autre", label: "Autre objectif" }
    ];
    var objectives = objDefs.map(function (o) {
      var on = c.objective === o.key, s = chip(on);
      return { label: o.label, pressed: on, bg: s.bg, shadow: s.shadow, shift: s.shift, dot: on ? ORANGE : WHITE,
        pick: function () { self.setState({ objective: o.key }); } };
    });

    var horDefs = [
      { key: "court", label: "Moins d'1 mois" },
      { key: "moyen", label: "1 à 3 mois" },
      { key: "long", label: "Plus de 3 mois" }
    ];
    var horizons = horDefs.map(function (h) {
      var on = c.horizon === h.key, s = chip(on);
      return { label: h.label, pressed: on, bg: s.bg, shadow: s.shadow, shift: s.shift,
        pick: function () { self.setState({ horizon: h.key }); } };
    });

    var noObjective = !c.objective;

    var segs = Q.map(function (qq, i) {
      var done = c.answers[i] !== null && c.answers[i] !== undefined;
      return { bg: i === qi ? ORANGE : (done ? NAVY : WHITE) };
    });

    var LOOK = {
      idle: { bg: WHITE, border: NAVY, letterBg: PAPER, letterFg: NAVY, fg: NAVY, shadow: "3px 3px 0 " + NAVY, markColor: NAVY },
      correct: { bg: "#E4EBFA", border: BLUE, letterBg: BLUE, letterFg: WHITE, fg: NAVY, shadow: "3px 3px 0 " + BLUE, markColor: BLUE },
      wrong: { bg: "#FBE3E5", border: RED, letterBg: RED, letterFg: WHITE, fg: NAVY, shadow: "3px 3px 0 " + RED, markColor: RED },
      dim: { bg: WHITE, border: "#A9B1BF", letterBg: PAPER, letterFg: "#5A6478", fg: "#4A5568", shadow: "none", markColor: NAVY }
    };
    var letters = ["A", "B", "C", "D"];
    var options = q.options.map(function (t, i) {
      var st = "idle";
      if (answered) {
        if (i === q.answer) { st = "correct"; } else if (i === ans) { st = "wrong"; } else { st = "dim"; }
      }
      var look = LOOK[st];
      var mark = st === "correct" ? "BONNE RÉPONSE" : (st === "wrong" ? "TON CHOIX" : "");
      return {
        letter: letters[i], text: t, mark: mark, locked: answered,
        bg: look.bg, border: look.border, letterBg: look.letterBg, letterFg: look.letterFg, fg: look.fg, shadow: look.shadow, markColor: look.markColor,
        pick: function () { self.pick(i); }
      };
    });

    var transcript = (q.audio || []).map(function (line) { return { who: line.who, text: line.text }; });

    var corr = function (i) { return c.answers[i] !== null && c.answers[i] !== undefined && c.answers[i] === Q[i].answer; };
    var L = [0, 1, 2, 3, 4].filter(corr).length;
    var R = [5, 6, 7, 8, 9].filter(corr).length;
    var SEC = [40, 120, 205, 290, 380, 465];
    var ls = SEC[L], rs = SEC[R], total = ls + rs;
    var r5 = function (n) { return Math.round(n / 5) * 5; };
    var lo = Math.max(10, r5(total - 60)), hi = Math.min(990, r5(total + 60));
    var tgt = parseInt(c.target, 10);
    var hasTarget = !isNaN(tgt) && tgt >= 10 && tgt <= 990;
    var gap = hasTarget ? tgt - total : 0;
    var X = function (s) { return Math.round(((s - 10) / 980) * 340 * 10) / 10; };
    var flagX = hasTarget ? X(tgt) : 0;
    var flipFlag = flagX > 312;

    var objNames = { bat: "Valider le BAT", bs: "Préparer le BS", pls: "Obtenir le PLS 3333", autre: "Autre objectif" };
    var objLabel = objNames[c.objective] || "À définir";

    var PARTS = [
      { name: "Questions-réponses", part: "ÉCOUTE · PARTIE 2", idx: [0, 1, 2] },
      { name: "Conversations", part: "ÉCOUTE · PARTIE 3", idx: [3] },
      { name: "Annonces", part: "ÉCOUTE · PARTIE 4", idx: [4] },
      { name: "Phrases à compléter", part: "LECTURE · PARTIE 5", idx: [5, 6, 7] },
      { name: "Lecture de documents", part: "LECTURE · PARTIE 7", idx: [8, 9] }
    ];
    var weak = [], strong = [];
    PARTS.forEach(function (p) {
      var ok = p.idx.filter(corr).length;
      var item = { name: p.name, part: p.part, score: ok + "/" + p.idx.length };
      if (ok < p.idx.length) { weak.push(item); } else { strong.push(item); }
    });

    var suggested;
    if (hasTarget && gap <= 0) {
      suggested = "unite";
    } else if (c.objective === "pls" || (hasTarget && gap > 150)) {
      suggested = "pls";
    } else {
      suggested = "brevet";
    }
    var chosen = c.formule && P[c.formule] ? c.formule : suggested;
    var formules = ["brevet", "pls", "groupe", "unite"].map(function (k) {
      var on = k === chosen, s = chip(on);
      return { name: P[k].name, price: P[k].price, tag: k === suggested ? "SUGGÉRÉE" : "", checked: on ? "true" : "false",
        bg: s.bg, shadow: s.shadow, shift: s.shift, dot: on ? ORANGE : WHITE,
        pick: function () { self.setState({ formule: k }); } };
    });
    var rhythms = { court: "Rythme conseillé : 2 à 3 séances par semaine.", moyen: "Rythme conseillé : 2 séances par semaine.", long: "Rythme conseillé : 1 séance par semaine." };

    var weakNames = weak.map(function (w) { return w.name.toLowerCase(); });
    var summaryLine = "Score estimé " + total + " (" + lo + " à " + hi + "), objectif : " + objLabel + (hasTarget ? " à " + tgt : "") + "." + (weakNames.length ? " À travailler : " + weakNames.join(", ") + "." : "") + " Formule envisagée : " + P[chosen].name + ".";
    var calObj = { bat: "Valider mon BAT", bs: "Préparer le BS", pls: "Obtenir le PLS 3333", autre: "Autre" };
    var horText = { court: "Dans moins d'1 mois", moyen: "Dans 1 à 3 mois", long: "Dans plus de 3 mois" };
    var params = [];
    if (calObj[c.objective]) { params.push("objectif=" + encodeURIComponent(calObj[c.objective])); }
    if (horText[c.horizon]) { params.push("date-test=" + encodeURIComponent(horText[c.horizon])); }
    params.push("diagnostic=" + encodeURIComponent(summaryLine));
    var calUrl = "https://cal.com/tristan-bruno/bilangratuit?" + params.join("&");
    var mailBody = "Bonjour Tristan,\n\nVoici mon résultat au diagnostic :\n" + summaryLine + (horText[c.horizon] ? "\nMon test a lieu " + horText[c.horizon].toLowerCase() + "." : "") + "\n\nPrénom :\n";
    var mailto = "mailto:tristanbrunoedu@gmail.com?subject=" + encodeURIComponent("Mon résultat au diagnostic") + "&body=" + encodeURIComponent(mailBody);

    var step = c.step;
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var labels = { intro: "DIAGNOSTIC", objectif: "OBJECTIF", result: "RÉSULTAT" };
    var topRight = step === "question" ? pad(qi + 1) + " / 10" : (labels[step] || "DIAGNOSTIC");
    var speaking = !!c.speaking;

    return {
      topRight: topRight,
      isIntro: step === "intro",
      isObjectif: step === "objectif",
      isQuestion: step === "question",
      isResult: step === "result",

      goObjectif: function () { self.setState({ step: "objectif" }); },
      goIntro: function () { self.setState({ step: "intro" }); },
      startQuestions: function () { if (c.objective) { self.setState({ step: "question", qi: 0, speaking: false, played: false, audioError: false, showTranscript: false }); } },
      objectives: objectives,
      horizons: horizons,
      target: c.target || "",
      onTarget: function (e) { self.onTarget(e); },
      noObjective: noObjective,
      startBg: noObjective ? "#E2E5EA" : ORANGE,
      startColor: noObjective ? "#5A6478" : NAVY,
      startBorder: noObjective ? "#A9B1BF" : NAVY,
      startShadow: noObjective ? "none" : "4px 4px 0 " + NAVY,

      segs: segs,
      q: q,
      counter: pad(qi + 1) + "/10",
      isListening: q.type === "audio",
      isSentence: q.type === "sentence",
      isDoc: q.type === "doc",
      playAudio: function () { self.playAudio(); },
      audioTitle: speaking ? "Lecture en cours…" : (c.played ? "Réécouter l'audio" : "Écouter l'audio"),
      audioError: !!c.audioError,
      showTranscript: !!c.showTranscript,
      transcriptLabel: c.showTranscript ? "MASQUER LA TRANSCRIPTION" : "AFFICHER LA TRANSCRIPTION",
      toggleTranscript: function () { self.setState({ showTranscript: !self.cur().showTranscript }); },
      transcript: transcript,
      blankText: answered ? q.options[q.answer] : " ",
      blankColor: answered ? BLUE : NAVY,
      options: options,
      answered: answered,
      notAnswered: !answered,
      fbBg: correct ? "#E4EBFA" : "#FBE3E5",
      fbColor: correct ? BLUE : RED,
      fbTitle: correct ? "Bonne réponse." : "Pas tout à fait.",
      nextLabel: qi >= 9 ? "Voir le résultat" : "Question suivante",
      next: function () { self.next(); },

      objLabelUpper: objLabel.toUpperCase(),
      total: total,
      bandLabel: "entre " + lo + " et " + hi,
      capValue: hasTarget ? String(tgt) : "?",
      capLabel: hasTarget ? "indiqué au départ" : "à définir au bilan",
      rulerAria: "Échelle du test de 10 à 990 : score estimé entre " + lo + " et " + hi + (hasTarget ? ", objectif à " + tgt : ""),
      bandX: X(lo),
      bandW: Math.max(2, X(hi) - X(lo)),
      posX: X(total),
      flagOpacity: hasTarget ? 1 : 0,
      flagX: flagX,
      flagRectX: flipFlag ? flagX - 25 : flagX + 1,
      flagInnerX: flipFlag ? flagX - 17 : flagX + 9,
      listenScore: ls,
      readScore: rs,
      listenCount: L + "/5 BONNES RÉPONSES",
      readCount: R + "/5 BONNES RÉPONSES",
      gapTitle: hasTarget ? (gap > 0 ? "Écart avec l'objectif" : "Objectif dans ta fourchette") : "Objectif",
      gapValue: hasTarget ? (gap > 0 ? "environ " + r5(gap) + " points" : "à consolider") : "à définir au bilan",
      weak: weak,
      strong: strong,
      noWeak: weak.length === 0,
      noStrong: strong.length === 0,
      packName: P[suggested].name,
      packDetail: P[suggested].detail,
      rhythm: rhythms[c.horizon] || "On fixera le rythme ensemble au bilan.",
      formules: formules,
      mailto: mailto,
      calUrl: calUrl,
      reset: function () { self.reset(); }
    };
  }
}

DC.monter(Component, document.getElementById("dc-root"), document.getElementById("dc-gabarit"));
