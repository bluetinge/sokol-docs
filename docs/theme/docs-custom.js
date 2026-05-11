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
    const section = el("section", "docs-shortcuts__section");
    section.appendChild(el("div", "docs-shortcuts__label", "Header Guides"));
    const list = el("div", "docs-shortcuts__pillbar");
    guideLinks.forEach(([href, text]) => {
      const a = link(href, text, "docs-shortcuts__pill");
      if (href === currentGuideHref()) {
        a.classList.add("is-active");
      }
      list.appendChild(a);
    });
    section.appendChild(list);
    container.appendChild(section);
  }

  async function mountContextShortcuts(container) {
    const current = pageName();
    const guideHref = currentGuideHref();
    if (!guideHref) return;

    const section = el("section", "docs-shortcuts__section");
    section.appendChild(el("div", "docs-shortcuts__label", current === guideHref ? "Guide At A Glance" : "Key Entry Points"));

    try {
      const entries = await loadGuideEntries(guideHref);
      const list = el("ul", "docs-shortcuts__list");
      entries.slice(0, 14).forEach((item) => {
        const li = document.createElement("li");
        li.appendChild(link(item.href, item.text));
        if (item.summary) {
          li.appendChild(el("div", "docs-shortcuts__summary", item.summary));
        }
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
    const section = el("section", "docs-shortcuts__section");
    section.appendChild(el("div", "docs-shortcuts__label", "Browse"));
    const list = el("ul", "docs-shortcuts__list");
    [
      ["index.html", "Docs home"],
      ["guide_headers.html", "All guides"],
      ["md__r_e_a_d_m_e.html", "Project README"],
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
    const section = el("section", "docs-shortcuts__section");
    section.appendChild(el("div", "docs-shortcuts__label", "Start Here"));
    const list = el("ul", "docs-shortcuts__list");
    [
      ["guide_headers.html", "Browse all header guides", "Curated entry points by module."],
      ["md__r_e_a_d_m_e.html", "Read the project README", "Preserved upstream overview and examples."],
      ["files.html", "Open raw file reference", "Complete generated API listing by header."]
    ].forEach(([href, text, summary]) => {
      const li = document.createElement("li");
      li.appendChild(link(href, text));
      li.appendChild(el("div", "docs-shortcuts__summary", summary));
      list.appendChild(li);
    });
    section.appendChild(list);
    container.appendChild(section);
  }

  async function init() {
    const navContents = document.getElementById("nav-tree-contents");
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
