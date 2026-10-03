const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const yearLabel = document.querySelector("[data-current-year]");
const themeToggle = document.querySelector(".theme-toggle");
const themeStorageKey = "portfolio-theme";

const setTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.querySelector(".theme-toggle-label").textContent = isDark ? "Light" : "Dark";
  themeToggle.querySelector(".theme-toggle-icon").textContent = isDark ? "◑" : "◐";
};

yearLabel.textContent = new Date().getFullYear();
setTheme(localStorage.getItem(themeStorageKey) || "light");

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(themeStorageKey, nextTheme);
  setTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});
