const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const yearLabel = document.querySelector("[data-current-year]");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "portfolio-theme";

const setTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeColor.setAttribute("content", isDark ? "#111820" : "#ffffff");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.querySelector(".theme-toggle-label").textContent = isDark ? "Light" : "Dark";
  themeToggle.querySelector(".theme-toggle-icon").textContent = isDark ? "◑" : "◐";
};

yearLabel.textContent = new Date().getFullYear();
let savedTheme;
try {
  savedTheme = localStorage.getItem(themeStorageKey);
} catch (error) {
  console.warn("Could not read the saved theme preference.", error);
}
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    console.warn("Could not save the theme preference.", error);
  }
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
};

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
