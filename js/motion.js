const Motion = (() => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hasGsap = () => typeof gsap !== "undefined";

  let showcaseTimer = null;
  let showcaseIndex = 0;
  let showcaseBound = false;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function getSlides() {
    return [...document.querySelectorAll(".home-showcase__slide[data-slide]")];
  }

  function buildDots() {
    const dotsRoot = document.querySelector("[data-showcase-dots]");
    const slides = getSlides();
    if (!dotsRoot || !slides.length) return;
    dotsRoot.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "home-showcase__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Foto ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i, true));
      dotsRoot.appendChild(dot);
    });
  }

  function syncDots(index) {
    document.querySelectorAll(".home-showcase__dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  }

  function goToSlide(nextIndex, userTriggered) {
    const slides = getSlides();
    if (!slides.length) return;

    const next = ((nextIndex % slides.length) + slides.length) % slides.length;
    if (next === showcaseIndex && slides[next].classList.contains("is-active")) {
      if (userTriggered) restartShowcaseLoop();
      return;
    }

    const current = slides[showcaseIndex];
    const incoming = slides[next];

    if (reduced || !hasGsap()) {
      slides.forEach((s, i) => s.classList.toggle("is-active", i === next));
      showcaseIndex = next;
      syncDots(next);
      if (userTriggered) restartShowcaseLoop();
      return;
    }

    gsap.killTweensOf(slides);
    gsap.set(incoming, { opacity: 0, visibility: "visible", zIndex: 2 });
    gsap.set(current, { zIndex: 1 });

    const img = incoming.querySelector("img");
    if (img) gsap.set(img, { scale: 1.1 });

    gsap
      .timeline({
        onComplete: () => {
          slides.forEach((s, i) => s.classList.toggle("is-active", i === next));
          gsap.set(slides, { clearProps: "zIndex" });
          showcaseIndex = next;
          syncDots(next);
        },
      })
      .to(current, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(incoming, { opacity: 1, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(img, { scale: 1, duration: 3.8, ease: "power1.out" }, 0);

    if (userTriggered) restartShowcaseLoop();
  }

  function stopShowcaseLoop() {
    if (showcaseTimer) {
      clearInterval(showcaseTimer);
      showcaseTimer = null;
    }
  }

  function restartShowcaseLoop() {
    stopShowcaseLoop();
    if (reduced) return;
    showcaseTimer = setInterval(() => {
      if (document.body.dataset.vista !== "home") return;
      goToSlide(showcaseIndex + 1, false);
    }, 3200);
  }

  function wireSlideLinks() {
    getSlides().forEach((slide) => {
      slide.addEventListener("click", () => {
        const vista = slide.dataset.vista;
        const cat = slide.dataset.cat;
        if (!vista || typeof mostrarVista !== "function") return;
        stopShowcaseLoop();
        mostrarVista(vista);
        if (vista === "menu" && cat && typeof abrirCategoriaMenu === "function") {
          setTimeout(() => abrirCategoriaMenu(cat), 280);
        }
      });
    });
  }

  function initShowcase() {
    if (showcaseBound) return;
    const stage = document.querySelector(".home-showcase__stage");
    if (!stage) return;
    showcaseBound = true;
    buildDots();
    wireSlideLinks();
    const slides = getSlides();
    slides.forEach((s, i) => s.classList.toggle("is-active", i === 0));
    showcaseIndex = 0;
    syncDots(0);
    restartShowcaseLoop();
  }

  function animateShowcaseIntro() {
    const showcase = document.querySelector(".home-showcase");
    if (!showcase) return;
    if (reduced || !hasGsap()) {
      initShowcase();
      return;
    }

    gsap.fromTo(
      showcase,
      { opacity: 0, y: 24, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        onComplete: initShowcase,
      }
    );

    const firstImg = showcase.querySelector(".home-showcase__slide.is-active img");
    if (firstImg) {
      gsap.fromTo(
        firstImg,
        { scale: 1.12 },
        { scale: 1, duration: 4, ease: "power1.out" }
      );
    }
  }

  function animateHome() {
    initShowcase();
    restartShowcaseLoop();

    if (reduced || !hasGsap()) return;
    const showcase = document.querySelector(".home-showcase");
    const lead = document.querySelector(".home-gate__lead");
    const btns = document.querySelectorAll(".home-gate__btn");
    if (!lead && !btns.length) return;

    const intro = [showcase, lead, ...btns].filter(Boolean);
    gsap.set(intro, { opacity: 0, y: 18, scale: 0.98 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (showcase) {
      tl.to(showcase, { opacity: 1, y: 0, scale: 1, duration: 0.35 }, 0);
      const firstImg = showcase.querySelector(".home-showcase__slide.is-active img");
      if (firstImg) {
        tl.fromTo(
          firstImg,
          { scale: 1.08 },
          { scale: 1, duration: 2.8, ease: "power1.out" },
          0
        );
      }
    }
    if (lead) {
      tl.to(lead, { opacity: 1, y: 0, scale: 1, duration: 0.3 }, 0.08);
    }
    tl.to(
      btns,
      { opacity: 1, y: 0, scale: 1, duration: 0.32, stagger: 0.06 },
      0.12
    );
  }

  function animateVistaIn(panel, nombre) {
    if (!panel) return;

    if (nombre === "home") {
      animateHome();
      return;
    }

    stopShowcaseLoop();
    if (reduced || !hasGsap()) return;

    const targets = [];
    if (nombre === "buffet") {
      targets.push(
        ...panel.querySelectorAll(
          ".vista-volver, .buffet-intro, .inicio-promo-img, .inicio-info__lead, .inicio-info__lista li, .inicio-info__contacto, .inicio-info__legal, .buffet-rollos .rollos-intro, .buffet-rollos .chip, .buffet-rollos .menu-item, .buffet-rollos .menu-cat"
        )
      );
    } else if (nombre === "menu") {
      targets.push(
        ...panel.querySelectorAll(".vista-volver, .menu-intro, .carta-cat")
      );
    }

    if (!targets.length) {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      return;
    }

    gsap.set(targets, { opacity: 0, y: 20 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.06,
      ease: "power2.out",
      clearProps: "transform",
    });

    if (nombre === "buffet") {
      const img = panel.querySelector(".inicio-promo-img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.06 },
          { scale: 1, duration: 0.8, ease: "power2.out" }
        );
      }
    }
  }

  function openAccordionPanel(panel, onDone) {
    if (!panel) return;
    panel.hidden = false;

    if (reduced || !hasGsap()) {
      onDone?.();
      return;
    }

    const kids = panel.children;
    gsap.killTweensOf(panel);
    gsap.set(panel, { height: "auto", opacity: 1, overflow: "hidden" });
    const full = panel.offsetHeight;
    gsap.fromTo(
      panel,
      { height: 0, opacity: 0.4 },
      {
        height: full,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(panel, { height: "auto", overflow: "visible" });
          onDone?.();
        },
      }
    );

    if (kids.length) {
      gsap.fromTo(
        kids,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.08,
          clearProps: "transform",
        }
      );
    }
  }

  function closeAccordionPanel(panel, onDone) {
    if (!panel || panel.hidden) {
      onDone?.();
      return;
    }

    if (reduced || !hasGsap()) {
      panel.hidden = true;
      onDone?.();
      return;
    }

    gsap.killTweensOf(panel);
    gsap.set(panel, { overflow: "hidden", height: panel.offsetHeight });
    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        panel.hidden = true;
        gsap.set(panel, { clearProps: "height,opacity,overflow" });
        onDone?.();
      },
    });
  }

  function wireHomeHover() {
    if (reduced || !hasGsap()) return;
    document.querySelectorAll(".home-gate__btn").forEach((btn) => {
      btn.addEventListener("pointerenter", () => {
        gsap.to(btn, {
          y: -4,
          scale: 1.02,
          boxShadow: "0 18px 40px rgba(196, 30, 58, 0.35)",
          duration: 0.25,
          ease: "power2.out",
        });
      });
      btn.addEventListener("pointerleave", () => {
        gsap.to(btn, {
          y: 0,
          scale: 1,
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  return {
    reduced,
    ready,
    animateHome,
    animateVistaIn,
    animateShowcaseIntro,
    openAccordionPanel,
    closeAccordionPanel,
    wireHomeHover,
    stopShowcaseLoop,
  };
})();
