const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const open = navMenu.classList.contains("active");
    menuToggle.innerHTML = open ? "&#10005;" : "&#9776;";
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      if (menuToggle) menuToggle.innerHTML = "&#9776;";
    }
  });
});

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 50);
});

const sections = document.querySelectorAll("section[id]");
function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 150;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navigationLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navigationLink) navigationLink.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateActiveNavigation);

const revealElements = document.querySelectorAll(
  ".section-header, .about-text, .skill-card, .timeline-item, .project-card, .contact-content"
);
revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(12px)";
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

document.querySelectorAll(".skill-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.08}s`;
});
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

const backToTop = document.createElement("button");
backToTop.classList.add("back-to-top");
backToTop.innerHTML = "&#8593;";
backToTop.setAttribute("aria-label", "Back to top");
document.body.appendChild(backToTop);

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

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".project-image img").forEach((image) => {
  image.addEventListener("error", () => {
    image.style.display = "none";
    image.parentElement.style.background = "var(--surface)";
  });
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

window.addEventListener("load", () => document.body.classList.add("loaded"));
