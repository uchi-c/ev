/* EBM — brochure site interactions
   Kept intentionally light: mobile nav toggle + progressive-enhancement
   contact form. No external libraries. */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is tapped (mobile)
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && window.innerWidth <= 940) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Contact form ----
     No backend is assumed. To wire up real email delivery, set
     data-endpoint on the <form> to a form service URL (e.g. Formspree,
     Web3Forms) and this handler will POST to it. If no endpoint is set,
     it falls back to opening the visitor's email client with a
     pre-filled message so no lead is lost. */
  var form = document.querySelector("form.lead");
  if (form) {
    var status = form.querySelector(".form-status");
    var EMAIL = "evaregibuilding@gmail.com";

    form.addEventListener("submit", function (e) {
      var endpoint = form.getAttribute("data-endpoint");
      var data = new FormData(form);

      // Basic honeypot check
      if (data.get("company_website")) { e.preventDefault(); return; }

      if (endpoint && /^https?:\/\//.test(endpoint)) {
        // Let the browser POST natively if endpoint expects redirect,
        // but prefer fetch for inline confirmation.
        e.preventDefault();
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) { return r.ok ? r.json().catch(function(){return {};}) : Promise.reject(r); })
          .then(function () { showOk(); form.reset(); })
          .catch(function () { mailtoFallback(data); });
        return;
      }

      // No endpoint configured -> mailto fallback
      e.preventDefault();
      mailtoFallback(data);
    });

    function mailtoFallback(data) {
      var name = data.get("name") || "";
      var body =
        "Name: " + name + "\n" +
        "Phone: " + (data.get("phone") || "") + "\n" +
        "Email: " + (data.get("email") || "") + "\n" +
        "Interest: " + (data.get("interest") || "") + "\n\n" +
        (data.get("message") || "");
      var href = "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent("Website enquiry — " + name) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      showOk("Opening your email app to send this enquiry. If nothing happens, email us directly at " + EMAIL + ".");
    }

    function showOk(msg) {
      if (!status) return;
      status.textContent = msg || "Thank you — your enquiry has been sent. We will be in touch shortly.";
      status.classList.add("show", "ok");
      status.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---- Hero build sequence ----
     Crossfades four stages (prep -> install -> unit -> finished) on a loop,
     with a slow Ken Burns zoom on the active layer. No animation library.
     - Respects prefers-reduced-motion (shows final stage, static)
     - Freezes on the current frame once the hero scrolls out of view */
  var seq = document.getElementById("hero-seq");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (seq) {
    var stages = Array.prototype.slice.call(seq.querySelectorAll(".hero-stage"));
    var dashes = Array.prototype.slice.call(document.querySelectorAll("#hero-progress .dash"));
    var HOLD = 2400; // ms per stage (matches the Ken Burns duration)

    if (reduce || stages.length < 2) {
      // Static final state
      stages.forEach(function (s, i) { s.classList.toggle("is-active", i === stages.length - 1); });
      dashes.forEach(function (d, i) { d.classList.toggle("is-on", i === dashes.length - 1); });
    } else {
      var current = 0;
      var running = true;
      var timer = null;

      function show(i) {
        stages.forEach(function (s, k) {
          // Re-trigger the Ken Burns animation on the active layer
          if (k === i) { s.classList.remove("is-active"); void s.offsetWidth; s.classList.add("is-active"); }
          else { s.classList.remove("is-active"); }
        });
        dashes.forEach(function (d, k) { d.classList.toggle("is-on", k === i); });
      }

      function tick() {
        if (!running) return;
        current = (current + 1) % stages.length;
        show(current);
        timer = window.setTimeout(tick, HOLD);
      }

      show(0);
      timer = window.setTimeout(tick, HOLD);

      // Freeze when the hero leaves the viewport; resume if it returns
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          var visible = entries[0].isIntersecting;
          if (!visible && running) {
            running = false;
            if (timer) { window.clearTimeout(timer); timer = null; }
          } else if (visible && !running) {
            running = true;
            timer = window.setTimeout(tick, HOLD);
          }
        }, { threshold: 0.15 });
        io.observe(seq);
      }
    }
  }

  /* ---- "Container slide-in" reveals ----
     IntersectionObserver adds .is-visible so elements wipe in once. Elements
     opting in carry the .reveal class. Native CSS scroll-timeline handles the
     no-JS case where supported. */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add("is-visible"); });
    } else {
      var ro = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
        });
      }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
      Array.prototype.forEach.call(reveals, function (el) { ro.observe(el); });
    }
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
