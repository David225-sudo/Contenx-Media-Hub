document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".menu-toggle");
  const header = document.querySelector(".head-section");

  toggles.forEach((toggle) => {
    const menuId = toggle.getAttribute("aria-controls");
    const menu = menuId ? document.getElementById(menuId) : null;

    if (!menu) {
      return;
    }

    const closeMenu = () => {
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
      toggle.classList.add("is-active");
      toggle.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      menu.classList.add("is-open");
      document.body.classList.add("menu-open");
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = toggle.classList.contains("is-active");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!menu.contains(target) && !toggle.contains(target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  });

  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const headerOffset = header ? header.offsetHeight + 10 : 0;
      const targetTop =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      history.pushState(null, "", href);
    });
  });
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const statusEl = document.getElementById("form-status");
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!(submitBtn instanceof HTMLButtonElement)) {
        return;
      }

      const endpoint = contactForm.getAttribute("action") || "";
      if (!endpoint || endpoint.includes("your-form-id")) {
        if (statusEl) {
          statusEl.textContent =
            "Add your Formspree form ID in form.html to activate submissions.";
          statusEl.className = "form-status error";
        }
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending...";

      if (statusEl) {
        statusEl.textContent = "";
        statusEl.className = "form-status";
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.reset();
          if (statusEl) {
            statusEl.textContent = "Message sent successfully. We will get back to you soon.";
            statusEl.className = "form-status success";
          }
        } else {
          if (statusEl) {
            statusEl.textContent =
              "We could not send your message right now. Please try again.";
            statusEl.className = "form-status error";
          }
        }
      } catch {
        if (statusEl) {
          statusEl.textContent =
            "Network error. Please check your connection and try again.";
          statusEl.className = "form-status error";
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel || "Send Message";
      }
    });
  }
});
