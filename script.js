/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

// Open / close mobile menu
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Change menu icon
    if (navMenu.classList.contains("active")) {
      menuToggle.innerHTML = "✕";
    } else {
      menuToggle.innerHTML = "☰";
    }
  });
}

/* =========================================================
   CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");

      menuToggle.innerHTML = "☰";
    }
  });
});

/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 8px 30px rgba(38, 51, 47, 0.08)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    const navigationLink = document.querySelector(
      `.nav-link[href="#${sectionId}"]`,
    );

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      if (navigationLink) {
        navigationLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);

/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
  ".section-header, " +
    ".about-text, " +
    ".skill-card, " +
    ".timeline-item, " +
    ".project-card, " +
    ".contact-content",
);

// Initial state
revealElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform = "translateY(25px)";

  element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";

      element.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* =========================================================
   STAGGER EFFECT FOR SKILLS
========================================================= */

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.08}s`;
});

/* =========================================================
   STAGGER EFFECT FOR PROJECTS
========================================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

/* =========================================================
   BACK TO TOP BUTTON
========================================================= */

// Create button
const backToTop = document.createElement("button");

backToTop.classList.add("back-to-top");

backToTop.innerHTML = "↑";

backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);

// Button style
backToTop.style.position = "fixed";

backToTop.style.right = "25px";

backToTop.style.bottom = "25px";

backToTop.style.width = "45px";

backToTop.style.height = "45px";

backToTop.style.borderRadius = "50%";

backToTop.style.border = "1px solid rgba(38, 51, 47, 0.1)";

backToTop.style.background = "rgba(255, 255, 255, 0.85)";

backToTop.style.backdropFilter = "blur(10px)";

backToTop.style.color = "#718d81";

backToTop.style.fontSize = "1.2rem";

backToTop.style.cursor = "pointer";

backToTop.style.boxShadow = "0 10px 30px rgba(38, 51, 47, 0.08)";

backToTop.style.opacity = "0";

backToTop.style.visibility = "hidden";

backToTop.style.transform = "translateY(10px)";

backToTop.style.transition = "0.3s ease";

backToTop.style.zIndex = "999";

/* Show button after scrolling */

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.style.opacity = "1";

    backToTop.style.visibility = "visible";

    backToTop.style.transform = "translateY(0)";
  } else {
    backToTop.style.opacity = "0";

    backToTop.style.visibility = "hidden";

    backToTop.style.transform = "translateY(10px)";
  }
});

/* Scroll to top */

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================================================
   PROJECT IMAGE FALLBACK
========================================================= */

const projectImages = document.querySelectorAll(".project-image img");

projectImages.forEach((image) => {
  image.addEventListener("error", () => {
    image.style.display = "none";

    image.parentElement.style.background =
      "linear-gradient(135deg, #e5ebe7, #f3eee6)";
  });
});

/* =========================================================
   PREVENT EMPTY LINKS FROM JUMPING TO TOP
========================================================= */

const emptyLinks = document.querySelectorAll('a[href="#"]');

emptyLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
