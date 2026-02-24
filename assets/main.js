// Mobile nav toggle
(function () {
  const btn = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });

  // Close menu when clicking a link (mobile)
  links.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a" && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();
// Sticky nav darker on scroll
const navBar = document.querySelector(".navBar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navBar.classList.add("is-scrolled");
  } else {
    navBar.classList.remove("is-scrolled");
  }
});
/*
  OPTIONAL THEME SWITCH:
  If you want to quickly test a different palette, run in console:
    document.body.dataset.theme = "alt"
  And remove it (back to default):
    delete document.body.dataset.theme
*/


// ============================
// PRODUCTS PAGE INTERACTIONS
// ============================
(function () {
  const grid = document.getElementById("pGrid");
  if (!grid) return; // only run on products page

  const cards = Array.from(grid.querySelectorAll(".pCard"));
  const searchInput = document.getElementById("pSearchInput");
  const sortSelect = document.getElementById("pSort");
  const countEl = document.getElementById("pCount");

  const menuBtn = document.getElementById("pMenuBtn");
  const drawer = document.getElementById("pDrawer");

  let activeCategory = "all";
  let activeStrain = "all";
  let query = "";

  // Mobile drawer
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      const open = drawer.classList.toggle("is-open");
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Chips
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;

    const filter = btn.dataset.filter;
    const value = btn.dataset.value;

    // deactivate chips within same filter group
    const group = document.querySelectorAll(`.chip[data-filter="${filter}"]`);
    group.forEach((c) => c.classList.remove("is-active"));
    btn.classList.add("is-active");

    if (filter === "category") activeCategory = value;
    if (filter === "strain") activeStrain = value;

    applyFilters();
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      query = (e.target.value || "").trim().toLowerCase();
      applyFilters();
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      applySort(sortSelect.value);
      applyFilters(); // keep count accurate
    });
  }

  function applySort(mode) {
    const sorted = [...cards];

    if (mode === "az") {
      sorted.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
    } else if (mode === "za") {
      sorted.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));
    } else {
      // featured (original DOM order) -> do nothing
      return;
    }

    sorted.forEach((c) => grid.appendChild(c));
  }

  function applyFilters() {
    let visible = 0;

    cards.forEach((card) => {
      const cat = card.dataset.category || "";
      const strain = card.dataset.strain || "";
      const title = getTitle(card);

      const matchCategory = activeCategory === "all" || cat === activeCategory;
      const matchStrain = activeStrain === "all" || strain === activeStrain;
      const matchQuery = !query || title.toLowerCase().includes(query);

      const show = matchCategory && matchStrain && matchQuery;

      card.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    if (countEl) countEl.textContent = `Showing ${visible} products`;
  }

  function getTitle(card) {
    return card.dataset.title || card.querySelector(".pCard__title")?.textContent?.trim() || "Product";
  }

  // initial
  applyFilters();
})();

// Contact/Products drawer toggle (shared)
(function () {
  const btn = document.getElementById("pMenuBtn");
  const drawer = document.getElementById("pDrawer");
  if (!btn || !drawer) return;

  btn.addEventListener("click", () => {
    const open = drawer.classList.toggle("is-open");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();