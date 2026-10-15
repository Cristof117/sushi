const Motion = (() => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hasGsap = () => typeof gsap !== "undefined";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function animateHome() {
    if (reduced || !hasGsap()) return;
    const lead = document.querySelector(".home-gate__lead");
    const btns = document.querySelectorAll(".home-gate__btn");
    if (!lead && !btns.length) return;

    gsap.set([lead, ...btns].filter(Boolean), { opacity: 0, y: 28, scale: 0.96 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (lead) {
      tl.to(lead, { opacity: 1, y: 0, scale: 1, duration: 0.55 });
    }
    tl.to(
      btns,
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
      "-=0.25"
    );
  }

  function animateVistaIn(panel, nombre) {
    if (!panel) return;
    if (reduced || !hasGsap()) return;

    const targets = [];
    if (nombre === "home") {
      targets.push(
        ...panel.querySelectorAll(".home-gate__lead, .home-gate__btn")
      );
    } else if (nombre === "buffet") {
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
    openAccordionPanel,
    closeAccordionPanel,
    wireHomeHover,
  };
})();
