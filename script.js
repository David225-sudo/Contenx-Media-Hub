document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".menu-toggle");
  const header = document.querySelector(".head-section");
  const pageLoader = document.querySelector(".page-loader");

  const showPageLoader = () => {
    if (!(pageLoader instanceof HTMLElement)) {
      return;
    }

    pageLoader.classList.remove("is-loaded");
    document.body.classList.add("page-loading");
  };

  const hidePageLoader = () => {
    if (!(pageLoader instanceof HTMLElement)) {
      return;
    }

    pageLoader.classList.add("is-loaded");
    document.body.classList.remove("page-loading");
  };

  window.setTimeout(() => {
    window.requestAnimationFrame(hidePageLoader);
  }, 420);

  window.addEventListener("pageshow", hidePageLoader);

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
        closeGalleryLightbox();
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

  const pageLinks = document.querySelectorAll("a[href]");
  pageLinks.forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) {
      return;
    }

    link.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") {
        return;
      }

      if (link.hasAttribute("download") || /^(mailto:|tel:|javascript:)/i.test(href)) {
        return;
      }

      const targetUrl = new URL(link.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (targetUrl.origin !== currentUrl.origin) {
        return;
      }

      if (
        targetUrl.pathname === currentUrl.pathname &&
        targetUrl.search === currentUrl.search &&
        targetUrl.hash === currentUrl.hash
      ) {
        return;
      }

      event.preventDefault();
      showPageLoader();

      window.setTimeout(() => {
        window.location.href = targetUrl.href;
      }, 700);
    });
  });

  const revealTargets = document.querySelectorAll(
    "section, .service-card, .feature-card, .card, .gallery-item, .pricing-card, .metrics-flex > *, .footer-content-top, .footer-content-bottom"
  );

  revealTargets.forEach((el, index) => {
    if (!(el instanceof HTMLElement)) {
      return;
    }
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`;
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  const galleryLightbox = document.getElementById("gallery-lightbox");
  const galleryLightboxImage = document.getElementById("gallery-lightbox-image");
  const galleryTriggers = document.querySelectorAll("[data-gallery-trigger]");
  const galleryCloseControls = document.querySelectorAll("[data-lightbox-close]");
  let activeGalleryTrigger = null;

  const closeGalleryLightbox = () => {
    if (
      !(galleryLightbox instanceof HTMLElement) ||
      !(galleryLightboxImage instanceof HTMLImageElement)
    ) {
      return;
    }

    galleryLightbox.hidden = true;
    galleryLightbox.setAttribute("aria-hidden", "true");
    galleryLightboxImage.src = "";
    galleryLightboxImage.alt = "";
    document.body.classList.remove("menu-open");

    if (activeGalleryTrigger instanceof HTMLElement) {
      activeGalleryTrigger.focus();
      activeGalleryTrigger = null;
    }
  };

  const openGalleryLightbox = (trigger) => {
    if (
      !(galleryLightbox instanceof HTMLElement) ||
      !(galleryLightboxImage instanceof HTMLImageElement)
    ) {
      return;
    }

    const src = trigger.getAttribute("data-image-src");
    const alt = trigger.getAttribute("data-image-alt") || "Recent work preview";

    if (!src) {
      return;
    }

    activeGalleryTrigger = trigger;
    galleryLightboxImage.src = src;
    galleryLightboxImage.alt = alt;
    galleryLightbox.hidden = false;
    galleryLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    const closeButton = galleryLightbox.querySelector(".gallery-lightbox__close");
    if (closeButton instanceof HTMLButtonElement) {
      closeButton.focus();
    }
  };

  galleryTriggers.forEach((trigger) => {
    if (!(trigger instanceof HTMLButtonElement)) {
      return;
    }

    trigger.addEventListener("click", () => {
      openGalleryLightbox(trigger);
    });
  });

  galleryCloseControls.forEach((control) => {
    if (!(control instanceof HTMLButtonElement)) {
      return;
    }

    control.addEventListener("click", closeGalleryLightbox);
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
            statusEl.textContent =
              "Message sent successfully. We will get back to you soon.";
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