(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    const isPlaceholderEndpoint = /your-form-id/.test(form.action);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.className = "form__status";
      status.textContent = "";

      if (form._gotcha && form._gotcha.value) return;

      if (isPlaceholderEndpoint) {
        status.className = "form__status is-error";
        status.textContent =
          "Form endpoint not configured yet. Set a Formspree URL in index.html (see README).";
        return;
      }

      const data = new FormData(form);
      status.textContent = "Sending...";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.reset();
          status.className = "form__status is-success";
          status.textContent = "Thanks — message sent. I'll be in touch shortly.";
        } else {
          const body = await res.json().catch(() => ({}));
          status.className = "form__status is-error";
          status.textContent =
            body.errors?.[0]?.message ||
            "Something went wrong. Please email hello@82deg.com.";
        }
      } catch {
        status.className = "form__status is-error";
        status.textContent =
          "Network error. Please try again or email hello@82deg.com.";
      }
    });
  }
})();
