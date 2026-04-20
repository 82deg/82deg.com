(() => {
  const root = document.documentElement;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ---- Footer year -----------------------------------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- Theme toggle ----------------------------------------------------
  const toggle = document.getElementById("themeToggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  const getEffectiveTheme = () => {
    const stored = root.getAttribute("data-theme");
    if (stored === "light" || stored === "dark") return stored;
    return systemDark.matches ? "dark" : "light";
  };

  const applyTheme = (theme, { persist = true } = {}) => {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try {
        if (theme === "auto") localStorage.removeItem("theme");
        else localStorage.setItem("theme", theme);
      } catch {}
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const effective = theme === "auto" ? (systemDark.matches ? "dark" : "light") : theme;
      meta.setAttribute("content", effective === "dark" ? "#0f0e0c" : "#f6f2ec");
    }
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = getEffectiveTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // React to system changes only if user hasn't chosen manually
  systemDark.addEventListener?.("change", () => {
    if (root.getAttribute("data-theme") === "auto") applyTheme("auto", { persist: false });
  });

  // ---- Nav scrolled state ---------------------------------------------
  const nav = document.getElementById("nav");
  const navSectionLinks = Array.from(
    document.querySelectorAll('.nav__links a[href^="#"]:not(.nav__cta)')
  );
  const navTargets = navSectionLinks
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return null;
      const section = document.getElementById(id);
      if (!section) return null;
      return { link, section };
    })
    .filter(Boolean);

  const setActiveNavLink = (activeLink) => {
    navSectionLinks.forEach((link) => {
      link.classList.toggle("is-active", link === activeLink);
    });
  };
  const updateActiveNavByViewport = () => {
    if (!navTargets.length) return;
    const viewportProbe = window.innerHeight * 0.38;
    let active = navTargets[0];

    for (const item of navTargets) {
      const rect = item.section.getBoundingClientRect();
      if (rect.top <= viewportProbe) active = item;
      else break;
    }

    setActiveNavLink(active?.link ?? null);
  };

  // ---- Scroll-driven scene shapes -------------------------------------
  let rafId = 0;
  let lastScroll = -1;

  const updateScroll = () => {
    rafId = 0;
    const y = window.scrollY || window.pageYOffset || 0;
    updateActiveNavByViewport();
    if (y === lastScroll) return;
    lastScroll = y;

    if (nav) nav.classList.toggle("is-scrolled", y > 8);

    if (prefersReduced.matches) return;

    root.style.setProperty("--scroll", String(y));
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, y / max));
    root.style.setProperty("--scroll-ratio", ratio.toFixed(4));
  };

  const onScroll = () => {
    if (!rafId) rafId = requestAnimationFrame(updateScroll);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("hashchange", updateActiveNavByViewport);
  navSectionLinks.forEach((link) => link.addEventListener("click", updateActiveNavByViewport));
  updateScroll();

  // ---- Reveal-on-scroll via IntersectionObserver ----------------------
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window && !prefersReduced.matches) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el, i) => {
        el.style.setProperty("--i", String(i % 6));
        io.observe(el);
      });
    } else {
      revealEls.forEach((el) => el.classList.add("is-in"));
    }
  }

})();
