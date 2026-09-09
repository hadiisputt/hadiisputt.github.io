/* =========================================================
   PORTFOLIO PERSONAL
   Hadi Saputra
   Main JavaScript
========================================================= */

"use strict";

/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const siteHeader = document.querySelector(".site-header");
const sections = document.querySelectorAll("main section[id]");

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

const currentYear = document.querySelector("#current-year");

/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function openMobileMenu() {
  if (!menuToggle || !navMenu) {
    return;
  }

  navMenu.classList.add("active");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Tutup menu navigasi");
}

function closeMobileMenu() {
  if (!menuToggle || !navMenu) {
    return;
  }

  navMenu.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

function toggleMobileMenu() {
  if (!menuToggle || !navMenu) {
    return;
  }

  const isOpen = navMenu.classList.contains("active");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileMenu);
}

/* =========================================================
   3. CLOSE MENU AFTER CLICKING NAVIGATION LINK
========================================================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

/* =========================================================
   4. CLOSE MENU WITH ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();

    if (menuToggle) {
      menuToggle.focus();
    }
  }
});

/* =========================================================
   5. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {
  if (!menuToggle || !navMenu) {
    return;
  }

  const clickedInsideMenu = navMenu.contains(event.target);

  const clickedMenuButton = menuToggle.contains(event.target);

  if (
    navMenu.classList.contains("active") &&
    !clickedInsideMenu &&
    !clickedMenuButton
  ) {
    closeMobileMenu();
  }
});

/* =========================================================
   6. HANDLE WINDOW RESIZE
========================================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

/* =========================================================
   7. HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {
  if (!siteHeader) {
    return;
  }

  if (window.scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader, {
  passive: true,
});

/* =========================================================
   8. ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {
  if (!sections.length || !navLinks.length) {
    return;
  }

  const scrollPosition = window.scrollY + 150;

  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href");

    const isActive = linkTarget === `#${currentSectionId}`;

    link.classList.toggle("active", isActive);
  });
}

/* =========================================================
   9. OPTIMIZED SCROLL HANDLER
========================================================= */

let scrollTicking = false;

window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateHeader();
        updateActiveNavigation();

        scrollTicking = false;
      });

      scrollTicking = true;
    }
  },
  {
    passive: true,
  },
);

/* =========================================================
   10. SCROLL ANIMATION
========================================================= */

const animatedElements = document.querySelectorAll(".animate-on-scroll");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (
  animatedElements.length &&
  !prefersReducedMotion &&
  "IntersectionObserver" in window
) {
  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animatedElements.forEach((element) => {
    animationObserver.observe(element);
  });
} else {
  /*
   * Jika browser tidak mendukung IntersectionObserver
   * atau user memilih reduced motion,
   * tampilkan elemen tanpa animasi.
   */

  animatedElements.forEach((element) => {
    element.classList.add("show");
  });
}

/* =========================================================
   11. CURRENT YEAR
========================================================= */

function updateCurrentYear() {
  if (!currentYear) {
    return;
  }

  currentYear.textContent = new Date().getFullYear();
}

updateCurrentYear();

/* =========================================================
   12. EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

/* =========================================================
   13. FORM STATUS
========================================================= */

function showFormStatus(message, type) {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;

  formStatus.className = form - status;
}

/* =========================================================
   14. CONTACT FORM VALIDATION
========================================================= */

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector("#name");

    const emailInput = contactForm.querySelector("#email");

    const subjectInput = contactForm.querySelector("#subject");

    const messageInput = contactForm.querySelector("#message");

    /* -------------------------
               Clear previous status
            ------------------------- */

    showFormStatus("", "");

    /* -------------------------
               Get values
            ------------------------- */

    const name = nameInput?.value.trim() || "";

    const email = emailInput?.value.trim() || "";

    const subject = subjectInput?.value.trim() || "";

    const message = messageInput?.value.trim() || "";

    /* -------------------------
               Validation
            ------------------------- */

    if (!name) {
      showFormStatus("Nama wajib diisi.", "error");

      nameInput?.focus();

      return;
    }

    if (name.length < 2) {
      showFormStatus("Nama harus memiliki minimal 2 karakter.", "error");

      nameInput?.focus();

      return;
    }

    if (!email) {
      showFormStatus("Email wajib diisi.", "error");

      emailInput?.focus();

      return;
    }

    if (!isValidEmail(email)) {
      showFormStatus("Masukkan alamat email yang valid.", "error");

      emailInput?.focus();

      return;
    }

    if (!subject) {
      showFormStatus("Subjek wajib diisi.", "error");

      subjectInput?.focus();

      return;
    }

    if (subject.length < 3) {
      showFormStatus("Subjek harus memiliki minimal 3 karakter.", "error");

      subjectInput?.focus();

      return;
    }

    if (!message) {
      showFormStatus("Pesan wajib diisi.", "error");

      messageInput?.focus();

      return;
    }

    if (message.length < 10) {
      showFormStatus("Pesan harus memiliki minimal 10 karakter.", "error");

      messageInput?.focus();

      return;
    }

    /* -------------------------
               Validation successful
            ------------------------- */

    showFormStatus(
      "Form berhasil divalidasi. Hubungkan form ke backend atau layanan form agar pesan dapat benar-benar dikirim.",
      "success",
    );
  });
}

/* =========================================================
   15. INITIAL STATE
========================================================= */

updateHeader();
updateActiveNavigation();
