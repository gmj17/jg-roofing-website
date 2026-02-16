// ================= HELPERS =================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ================= FOOTER YEAR =================
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ================= MOBILE MENU =================
const toggleBtn = $("[data-mobile-toggle]");
const mobileMenu = $("[data-mobile-menu]");

function closeMobile() {
  if (!mobileMenu || !toggleBtn) return;
  mobileMenu.hidden = true;
  toggleBtn.setAttribute("aria-expanded", "false");
}

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    const open = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });

  $$("[data-mobile-close]").forEach(el =>
    el.addEventListener("click", closeMobile)
  );
}

// ================= MODAL (SIMPLE & RELIABLE) =================
const modals = $$("[data-modal]");

function openModal(name) {
  const modal = document.querySelector(`[data-modal="${name}"]`);
  if (!modal) return;

  modal.style.display = "grid";
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// open buttons
$$("[data-modal-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.modalOpen);
  });
});

// close buttons + overlay
$$("[data-modal-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

// ESC key
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;

  modals.forEach(modal => {
    if (modal.style.display === "grid") {
      closeModal(modal);
    }
  });
});

// ================= ACCORDIONS =================
$$("[data-accordion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.accordion;
    const panel = document.querySelector(`[data-accordion-panel="${key}"]`);
    if (!panel) return;

    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
});

// ================= TABS =================
$$("[data-tabs]").forEach(tabs => {
  const buttons = $$("[data-tab]", tabs);
  const panels = $$("[data-panel]", tabs);

  function activate(id) {
    buttons.forEach(b =>
      b.setAttribute("aria-selected", b.dataset.tab === id)
    );
    panels.forEach(p =>
      (p.hidden = p.dataset.panel !== id)
    );
  }

  buttons.forEach(btn =>
    btn.addEventListener("click", () => activate(btn.dataset.tab))
  );

  if (buttons[0]) activate(buttons[0].dataset.tab);
});
