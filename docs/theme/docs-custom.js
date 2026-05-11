(function () {
  const guideMap = {
    "sokol__app_8h.html": "guide_app.html",
    "sokol__gfx_8h.html": "guide_gfx.html",
    "sokol__audio_8h.html": "guide_audio.html",
    "sokol__fetch_8h.html": "guide_fetch.html",
    "sokol__args_8h.html": "guide_args.html",
    "sokol__time_8h.html": "guide_time.html",
    "sokol__glue_8h.html": "guide_glue_log.html",
    "sokol__log_8h.html": "guide_glue_log.html"
  };

  const guideLinks = [
    ["guide_app.html", "sokol_app.h"],
    ["guide_gfx.html", "sokol_gfx.h"],
    ["guide_audio.html", "sokol_audio.h"],
    ["guide_fetch.html", "sokol_fetch.h"],
    ["guide_args.html", "sokol_args.h"],
    ["guide_time.html", "sokol_time.h"],
    ["guide_glue_log.html", "glue/log"]
  ];
  const README_HREF = "md_README.html";

  function pageName() {
    const path = window.location.pathname.split("/");
    return path[path.length - 1] || "index.html";
  }

  function currentGuideHref() {
    const current = pageName();
    if (guideMap[current]) {
      return guideMap[current];
    }
    return guideLinks.find(([href]) => href === current)?.[0] || null;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function link(href, text, className) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    a.className = className || "docs-shortcuts__link";
    return a;
  }

  function detailsSection(label, open) {
    const details = document.createElement("details");
    details.className = "docs-shortcuts__details";
    if (open) {
      details.open = true;
    }
    const summary = document.createElement("summary");
    summary.className = "docs-shortcuts__label";
    summary.textContent = label;
    details.appendChild(summary);
    return details;
  }

  async function loadGuideEntries(guideHref) {
    const response = await fetch(guideHref);
    if (!response.ok) return [];
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll(".contents .textblock ul li"))
      .map((li) => {
        const a = li.querySelector("a");
        if (!a) return null;
        const fullText = li.textContent.replace(/\s+/g, " ").trim();
        const label = a.textContent.trim();
        const summary = fullText.startsWith(label)
          ? fullText.slice(label.length).replace(/^:\s*/, "").trim()
          : fullText;
        return {
          href: a.getAttribute("href"),
          text: label,
          summary
        };
      })
      .filter((item) => item && item.href && item.text);
  }

  function mountGlobalShortcuts(container) {
    const section = detailsSection("Header Guides", true);
    section.classList.add("docs-shortcuts__section");
    const list = el("ul", "docs-shortcuts__list docs-shortcuts__tree");
    guideLinks.forEach(([href, text]) => {
      const li = document.createElement("li");
      const a = link(href, text, "docs-shortcuts__link docs-shortcuts__tree-link");
      if (href === currentGuideHref()) {
        a.classList.add("is-active");
      }
      li.appendChild(a);
      list.appendChild(li);
    });
    section.appendChild(list);
    container.appendChild(section);
  }

  async function mountContextShortcuts(container) {
    const current = pageName();
    const guideHref = currentGuideHref();
    if (!guideHref) return;

    const section = detailsSection(current === guideHref ? "Guide At A Glance" : "Key Entry Points", true);
    section.classList.add("docs-shortcuts__section");

    try {
      const entries = await loadGuideEntries(guideHref);
      const list = el("ul", "docs-shortcuts__list docs-shortcuts__tree");
      entries.slice(0, 14).forEach((item) => {
        const li = document.createElement("li");
        li.appendChild(link(item.href, item.text, "docs-shortcuts__link docs-shortcuts__tree-link"));
        list.appendChild(li);
      });
      if (entries.length) {
        section.appendChild(list);
        const actions = el("div", "docs-shortcuts__actions");
        if (current !== guideHref) {
          actions.appendChild(link(guideHref, "Open full guide", "docs-shortcuts__link"));
        }
        const fileLink = Object.entries(guideMap).find(([, mappedGuide]) => mappedGuide === guideHref)?.[0];
        if (fileLink && current !== fileLink) {
          actions.appendChild(link(fileLink, "Open file reference", "docs-shortcuts__link"));
        }
        if (actions.childNodes.length) {
          section.appendChild(actions);
        }
      } else {
        section.appendChild(el("p", "docs-shortcuts__empty", "Guide entries unavailable."));
      }
    } catch (_err) {
      section.appendChild(el("p", "docs-shortcuts__empty", "Guide entries unavailable."));
    }

    container.appendChild(section);
  }

  function mountReferenceShortcuts(container) {
    const section = detailsSection("Browse", false);
    section.classList.add("docs-shortcuts__section");
    const list = el("ul", "docs-shortcuts__list");
    [
      ["index.html", "Docs home"],
      ["guide_headers.html", "All guides"],
      [README_HREF, "Project README"],
      ["files.html", "Reference files"]
    ].forEach(([href, text]) => {
      const li = document.createElement("li");
      li.appendChild(link(href, text));
      list.appendChild(li);
    });
    section.appendChild(list);
    container.appendChild(section);
  }

  function mountTopActions(container) {
    const section = detailsSection("Start Here", true);
    section.classList.add("docs-shortcuts__section");
    const list = el("ul", "docs-shortcuts__list");
    [
      ["guide_headers.html", "Browse all header guides"],
      [README_HREF, "Read the project README"],
      ["files.html", "Open raw file reference"]
    ].forEach(([href, text]) => {
      const li = document.createElement("li");
      li.appendChild(link(href, text));
      list.appendChild(li);
    });
    section.appendChild(list);
    container.appendChild(section);
  }

  function mountGuidesDropdown() {
    const mainNav = document.getElementById("main-nav");
    if (!mainNav) return;
    const guidesAnchor = Array.from(mainNav.querySelectorAll("a"))
      .find((a) => /pages\.html$/.test(a.getAttribute("href") || "") && a.textContent.trim() === "Guides");
    if (!guidesAnchor) return;

    const item = guidesAnchor.closest("li");
    if (!item || item.querySelector(".docs-guides-menu")) return;

    item.classList.add("docs-guides-nav");
    guidesAnchor.setAttribute("aria-haspopup", "true");

    const menu = el("ul", "docs-guides-menu");
    const allGuides = document.createElement("li");
    allGuides.appendChild(link("guide_headers.html", "All Guides", "docs-guides-menu__link"));
    menu.appendChild(allGuides);

    guideLinks.forEach(([href, text]) => {
      const li = document.createElement("li");
      const a = link(href, text, "docs-guides-menu__link");
      if (href === currentGuideHref()) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
      li.appendChild(a);
      menu.appendChild(li);
    });

    item.appendChild(menu);
  }

  async function init() {
    const navContents = document.getElementById("nav-tree-contents");
    mountGuidesDropdown();
    if (!navContents) return;

    const card = el("div", "docs-shortcuts");
    card.appendChild(el("div", "docs-shortcuts__title", "Quick Jump"));
    if (pageName() === "index.html" || pageName() === "guide_headers.html") {
      mountTopActions(card);
    }
    mountGlobalShortcuts(card);
    await mountContextShortcuts(card);
    mountReferenceShortcuts(card);

    navContents.prepend(card);
    document.body.classList.add("docs-has-shortcuts");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
