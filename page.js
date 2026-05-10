// Secondary page renderer
// Handles CV, Research, Blog, and project detail pages.

function getById(id) {
  return document.getElementById(id);
}

function getSiteData() {
  return window.siteData || globalThis.siteData || {};
}

function getResearchData() {
  return window.researchData || globalThis.researchData || {};
}

function getBlogData() {
  return window.blogData || globalThis.blogData || {};
}

function getCvData() {
  return window.cvData || globalThis.cvData || {};
}

function isFilled(value) {
  return Array.isArray(value)
    ? value.length > 0
    : Boolean(value && String(value).trim());
}

function isVideoFile(path) {
  return isFilled(path) && /\.(mp4|webm|ogg)$/i.test(String(path));
}

function setSectionVisible(sectionId, shouldShow) {
  const section = getById(sectionId);
  if (section) {
    section.hidden = !shouldShow;
  }
}

function setText(id, value) {
  const node = getById(id);
  if (node) {
    node.textContent = value || "";
  }
}

function getStoredThemePreference() {
  try {
    return localStorage.getItem("theme-preference");
  } catch (error) {
    return null;
  }
}

function getPreferredDefaultTheme() {
  return window.matchMedia("(max-width: 980px)").matches ? "dark" : "light";
}

function saveThemePreference(value) {
  try {
    localStorage.setItem("theme-preference", value);
  } catch (error) {
    // Ignore storage failures in restricted preview environments.
  }
}

function renderHighlightedAuthors(node, authorsText) {
  const site = getSiteData();
  const profile = site.profile || {};
  const highlightName = profile.highlightAuthorName || profile.name;

  node.textContent = "";
  if (!isFilled(authorsText)) {
    return;
  }

  if (!isFilled(highlightName) || !authorsText.includes(highlightName)) {
    node.textContent = authorsText;
    return;
  }

  const parts = authorsText.split(highlightName);
  parts.forEach((part, index) => {
    if (part) {
      node.appendChild(document.createTextNode(part));
    }

    if (index < parts.length - 1) {
      const strong = document.createElement("strong");
      strong.textContent = highlightName;
      node.appendChild(strong);
    }
  });
}

function applyStoredTheme() {
  const storedTheme = getStoredThemePreference();
  document.body.dataset.theme = storedTheme || getPreferredDefaultTheme();
}

function initializeMobileMenu() {
  const topbar = document.querySelector(".topbar");
  const button = getById("menu-toggle");
  const nav = getById("top-nav");

  if (!topbar || !button || !nav) {
    return;
  }

  function syncMenuState(isOpen) {
    topbar.classList.toggle("menu-open", isOpen);
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    button.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  }

  button.addEventListener("click", () => {
    syncMenuState(!topbar.classList.contains("menu-open"));
  });

  nav.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.tagName.toLowerCase() === "a"
    ) {
      syncMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 720px)").matches) {
      syncMenuState(false);
    }
  });
}

function renderBrandLink() {
  const brand = getById("brand-link");
  const profile = getSiteData().profile || {};
  if (!brand) {
    return;
  }

  brand.textContent = profile.name || "Home";
  brand.setAttribute("aria-label", `${profile.name || "Home"} home page`);
}

function appendThemeToggle(nav) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";

  function syncToggle() {
    const isDark = document.body.dataset.theme === "dark";
    button.textContent = isDark ? "Light" : "Dark";
    button.classList.toggle("is-active", isDark);
  }

  button.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;
    saveThemePreference(nextTheme);
    syncToggle();
  });

  syncToggle();
  nav.appendChild(button);
}

function createNav() {
  const nav = getById("top-nav");
  const navigation = getSiteData().navigation || [];
  if (!nav || !Array.isArray(navigation)) {
    return;
  }

  const currentPage = document.body.dataset.page;

  navigation.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    if (item.page === currentPage) {
      link.className = "is-active";
    }
    nav.appendChild(link);
  });

  appendThemeToggle(nav);
}

function createActionLink(action) {
  const link = document.createElement("a");
  link.className = "action-link";
  link.href = action.href;
  link.textContent = action.title;
  link.style.background = action.background || "var(--action-bg)";
  link.style.color = action.color || "var(--action-ink)";

  if (action.href.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }

  return link;
}

function appendActions(parent, actions) {
  const validActions = (actions || []).filter(
    (action) => isFilled(action.title) && isFilled(action.href),
  );
  if (!validActions.length) {
    return;
  }

  const group = document.createElement("div");
  group.className = "action-group";
  validActions.forEach((action) => group.appendChild(createActionLink(action)));
  parent.appendChild(group);
}

function renderProjectGrid() {
  const grid = getById("project-grid");
  const projects = (getResearchData().projects || []).filter(
    (project) => isFilled(project.title) && isFilled(project.slug),
  );
  const ongoing = projects.filter(
    (project) => (project.status || "").toLowerCase() === "ongoing",
  );
  const past = projects.filter(
    (project) => (project.status || "").toLowerCase() === "past",
  );

  setSectionVisible("research-projects-section", projects.length > 0);
  if (!grid) {
    return;
  }

  function createProjectTile(project) {
    const link = document.createElement("a");
    link.className = "project-tile";
    link.href = `./project.html?slug=${encodeURIComponent(project.slug)}`;

    if (isFilled(project.tileMedia)) {
      const media = document.createElement(
        isVideoFile(project.tileMedia) ? "video" : "img",
      );
      media.className = "project-tile-media";

      if (media.tagName.toLowerCase() === "video") {
        media.src = project.tileMedia;
        media.autoplay = true;
        media.loop = true;
        media.muted = true;
        media.playsInline = true;
        media.setAttribute("aria-label", `${project.title} preview`);
      } else {
        media.src = project.tileMedia;
        media.alt = `${project.title} preview`;
      }

      link.appendChild(media);
    }

    const head = document.createElement("div");
    head.className = "project-tile-head";

    const title = document.createElement("h3");
    title.textContent = project.title;

    head.appendChild(title);
    link.appendChild(head);

    return link;
  }

  function createProjectGroup(title, groupedProjects) {
    const group = document.createElement("section");
    group.className = "project-group";

    const heading = document.createElement("div");
    heading.className = "project-group-heading";

    const label = document.createElement("p");
    label.textContent = title;

    const divider = document.createElement("div");
    divider.className = "project-group-divider";

    heading.append(label, divider);
    group.appendChild(heading);

    const groupGrid = document.createElement("div");
    groupGrid.className = "project-grid";
    groupedProjects.forEach((project) => {
      groupGrid.appendChild(createProjectTile(project));
    });
    group.appendChild(groupGrid);

    return group;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "project-groups";

  if (ongoing.length) {
    wrapper.appendChild(createProjectGroup("Ongoing", ongoing));
  }

  if (past.length) {
    wrapper.appendChild(createProjectGroup("Past", past));
  }

  if (!ongoing.length && !past.length && projects.length) {
    wrapper.appendChild(createProjectGroup("Projects", projects));
  }

  grid.appendChild(wrapper);
}

function renderResearchPublicationTile() {
  const container = getById("research-publications-tile");
  const publications = (getResearchData().publications || []).filter((item) =>
    isFilled(item.title),
  );
  const journals = publications.filter(
    (item) => (item.category || "").toLowerCase() === "journal",
  );
  const conferences = publications.filter(
    (item) => (item.category || "").toLowerCase() === "conference",
  );
  const patents = publications.filter(
    (item) => (item.category || "").toLowerCase() === "patent",
  );
  const uncategorized = publications.filter((item) => !isFilled(item.category));

  setSectionVisible(
    "research-publications-tile-section",
    publications.length > 0,
  );
  if (!container) {
    return;
  }

  function createPublicationItem(item, index) {
    const article = document.createElement("article");
    article.className = "publication-item";

    const number = document.createElement("span");
    number.className = "publication-index";
    number.textContent = `${index}.`;

    const content = document.createElement("div");
    content.className = "publication-content";

    const title = document.createElement("h3");
    title.textContent = item.title || "";

    const authors = document.createElement("p");
    authors.className = "item-authors";
    renderHighlightedAuthors(authors, item.authors || "");
    authors.hidden = !isFilled(item.authors);

    const meta = document.createElement("p");
    meta.className = "item-meta";
    meta.textContent = item.meta || "";
    meta.hidden = !isFilled(item.meta);

    content.append(title, authors, meta);
    appendActions(content, item.actions);
    article.append(number, content);
    return article;
  }

  function createPublicationGroup(title, items) {
    const group = document.createElement("section");
    group.className = "project-group";

    const heading = document.createElement("div");
    heading.className = "project-group-heading";

    const label = document.createElement("p");
    label.textContent = title;

    const divider = document.createElement("div");
    divider.className = "project-group-divider";

    heading.append(label, divider);
    group.appendChild(heading);

    const list = document.createElement("div");
    list.className = "publication-list";
    items.forEach((item, index) => {
      list.appendChild(createPublicationItem(item, index + 1));
    });

    group.appendChild(list);
    return group;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "project-groups";

  if (journals.length) {
    wrapper.appendChild(createPublicationGroup("Journals", journals));
  }

  if (conferences.length) {
    wrapper.appendChild(createPublicationGroup("Conferences", conferences));
  }

  if (patents.length) {
    wrapper.appendChild(createPublicationGroup("Patents", patents));
  }

  if (uncategorized.length) {
    wrapper.appendChild(createPublicationGroup("Other", uncategorized));
  }

  container.appendChild(wrapper);
}

function renderUpdates(sectionId, containerId, items) {
  const container = getById(containerId);
  const validItems = (items || []).filter((item) => isFilled(item.title));

  setSectionVisible(sectionId, validItems.length > 0);
  if (!container) {
    return;
  }

  validItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "timeline-item";

    const date = document.createElement("span");
    date.className = "timeline-date";
    date.textContent = item.date || "";
    date.hidden = !isFilled(item.date);

    const title = document.createElement("h3");
    title.textContent = item.title;

    const copy = document.createElement("p");
    copy.textContent = item.description || "";
    copy.hidden = !isFilled(item.description);

    article.append(date, title, copy);
    appendActions(article, item.actions);
    container.appendChild(article);
  });
}

function renderRelatedProjectPublications(containerId, items) {
  const container = getById(containerId);
  const validItems = (items || []).filter((item) => isFilled(item.title));

  if (!container) {
    return;
  }

  validItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "timeline-item related-publication-item";

    const title = document.createElement("h3");
    title.textContent = item.title || "";

    const authors = document.createElement("p");
    authors.className = "item-authors";
    renderHighlightedAuthors(authors, item.authors || "");
    authors.hidden = !isFilled(item.authors);

    const meta = document.createElement("p");
    meta.className = "item-meta";
    meta.textContent = item.meta || "";
    meta.hidden = !isFilled(item.meta);

    article.append(title, authors, meta);
    appendActions(article, item.actions);
    container.appendChild(article);
  });
}

function buildPublicationLookup() {
  const publications = getResearchData().publications || [];
  const lookup = new Map();

  publications.forEach((publication) => {
    if (isFilled(publication.id)) {
      lookup.set(publication.id, publication);
    }
  });

  return lookup;
}

function resolveRelatedPublications(entries) {
  const lookup = buildPublicationLookup();

  return (entries || [])
    .map((entry) => {
      if (typeof entry === "string") {
        return lookup.get(entry) || null;
      }

      if (entry && typeof entry === "object" && isFilled(entry.publicationId)) {
        return lookup.get(entry.publicationId) || null;
      }

      if (entry && typeof entry === "object" && isFilled(entry.title)) {
        return entry;
      }

      return null;
    })
    .filter((item) => item && isFilled(item.title));
}

function getMarkdownDirectory(markdownPath) {
  if (!isFilled(markdownPath)) {
    return "./";
  }

  const normalized = String(markdownPath).replace(/\\/g, "/");
  const lastSlash = normalized.lastIndexOf("/");
  return lastSlash >= 0 ? normalized.slice(0, lastSlash + 1) : "./";
}

function resolveMarkdownAssetUrls(html, markdownPath) {
  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(
    `<div>${html}</div>`,
    "text/html",
  );
  const root = documentFragment.body.firstElementChild;
  const markdownDirectory = getMarkdownDirectory(markdownPath);
  const absoluteBase = new URL(markdownDirectory, window.location.href);

  if (!root) {
    return html;
  }

  root.querySelectorAll("img, video source, video, a").forEach((node) => {
    const attributeName = node.tagName.toLowerCase() === "a" ? "href" : "src";
    const currentValue = node.getAttribute(attributeName);

    if (!isFilled(currentValue)) {
      return;
    }

    const value = String(currentValue).trim();
    const isAbsolute =
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:") ||
      value.startsWith("#") ||
      value.startsWith("/");

    if (isAbsolute) {
      return;
    }

    node.setAttribute(attributeName, new URL(value, absoluteBase).toString());
  });

  return root.innerHTML;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInlineMarkdown(text) {
  let value = escapeHtml(text);

  value = value.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img alt="$1" src="$2" />',
  );
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return value;
}

function fallbackMarkdownToHtml(markdown) {
  const lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraphLines = [];
  let listItems = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLanguage = "";
  let inBlockquote = false;
  let blockquoteLines = [];

  function flushParagraph() {
    if (!paragraphLines.length) {
      return;
    }

    html.push(`<p>${renderInlineMarkdown(paragraphLines.join(" "))}</p>`);
    paragraphLines = [];
  }

  function flushList() {
    if (!listItems.length) {
      return;
    }

    html.push(
      `<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`,
    );
    listItems = [];
  }

  function flushBlockquote() {
    if (!blockquoteLines.length) {
      return;
    }

    html.push(
      `<blockquote><p>${renderInlineMarkdown(blockquoteLines.join(" "))}</p></blockquote>`,
    );
    blockquoteLines = [];
    inBlockquote = false;
  }

  lines.forEach((rawLine) => {
    const line = rawLine;

    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushList();
      flushBlockquote();

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3).trim();
        codeLines = [];
      } else {
        const languageClass = codeLanguage
          ? ` class="language-${escapeHtml(codeLanguage)}"`
          : "";
        html.push(
          `<pre><code${languageClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`,
        );
        inCodeBlock = false;
        codeLanguage = "";
        codeLines = [];
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushBlockquote();
      return;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      inBlockquote = true;
      blockquoteLines.push(line.slice(2).trim());
      return;
    }

    if (inBlockquote) {
      flushBlockquote();
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = Math.min(headingMatch[1].length, 6);
      html.push(
        `<h${level}>${renderInlineMarkdown(headingMatch[2].trim())}</h${level}>`,
      );
      return;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1].trim());
      return;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      flushList();
      html.push(`<p>${renderInlineMarkdown(line.trim())}</p>`);
      return;
    }

    paragraphLines.push(line.trim());
  });

  flushParagraph();
  flushList();
  flushBlockquote();

  return html.join("");
}

function renderMarkdownContent(body, markdown, markdownPath, noteTitle) {
  const markedLibrary = window.marked;
  let renderedHtml = "";

  if (markedLibrary && typeof markedLibrary.parse === "function") {
    markedLibrary.setOptions({
      gfm: true,
      breaks: false,
    });
    renderedHtml = markedLibrary.parse(markdown);
  } else {
    renderedHtml = fallbackMarkdownToHtml(markdown);
  }

  body.innerHTML = resolveMarkdownAssetUrls(renderedHtml, markdownPath);

  const firstHeading = body.querySelector("h1");
  if (
    firstHeading &&
    isFilled(noteTitle) &&
    firstHeading.textContent.trim() === String(noteTitle).trim()
  ) {
    firstHeading.remove();
  }

  if (window.hljs) {
    body.querySelectorAll("pre code").forEach((block) => {
      window.hljs.highlightElement(block);
    });
  }

  if (typeof window.renderMathInElement === "function") {
    window.renderMathInElement(body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }
}

async function renderMarkdownNote(body, markdownPath, noteTitle) {
  const response = await fetch(markdownPath);

  if (!response.ok) {
    throw new Error(`Could not load markdown file: ${markdownPath}`);
  }

  const markdown = await response.text();
  renderMarkdownContent(body, markdown, markdownPath, noteTitle);
  return markdown;
}

function renderStructuredNote(body, sections) {
  sections.forEach((section) => {
    const block = document.createElement("section");
    block.className = "detail-section";

    const heading = document.createElement("h2");
    heading.textContent = section.heading || "";
    heading.hidden = !isFilled(section.heading);

    const copy = document.createElement("p");
    copy.textContent = section.text || "";
    copy.hidden = !isFilled(section.text);

    block.append(heading, copy);
    body.appendChild(block);
  });
}

function slugifyHeading(text, fallback) {
  const base = String(text || fallback || "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return base || fallback || "section";
}

function extractMarkdownOutline(markdown, noteTitle) {
  const outline = [];
  const usedIds = new Map();

  String(markdown || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .forEach((line) => {
      const match = line.match(/^(#{1,2})\s+(.*)$/);
      if (!match) {
        return;
      }

      const level = match[1].length;
      const title = match[2].trim();
      if (!isFilled(title)) {
        return;
      }

      const baseId = slugifyHeading(title, `section-${outline.length + 1}`);
      const seenCount = usedIds.get(baseId) || 0;
      usedIds.set(baseId, seenCount + 1);

      outline.push({
        level,
        title,
        id: seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`,
      });
    });

  return outline.filter((item) => {
    if (item.level !== 1) {
      return true;
    }

    return (
      !isFilled(noteTitle) || item.title.trim() !== String(noteTitle).trim()
    );
  });
}

function applyMarkdownHeadingAnchors(body, outline) {
  const h2Nodes = Array.from(body.querySelectorAll("h2"));
  const h2Outline = (outline || []).filter((item) => item.level === 2);

  h2Nodes.forEach((heading, index) => {
    const item = h2Outline[index];
    heading.id = item
      ? item.id
      : slugifyHeading(heading.textContent, `section-${index + 1}`);
  });
}

function renderNoteOutline(outline) {
  const nav = getById("note-outline-nav");
  const hasOutline = Array.isArray(outline) && outline.length > 0;

  setSectionVisible("note-outline-section", hasOutline);
  if (!nav) {
    return;
  }

  nav.innerHTML = "";
  if (!hasOutline) {
    return;
  }

  outline.forEach((item) => {
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.title;
    if (item.level === 2) {
      link.classList.add("is-h2");
    }
    nav.appendChild(link);
  });
}

function renderCvActions() {
  const container = getById("cv-actions");
  const items = (getCvData().cvLinks || []).filter(
    (item) => isFilled(item.title) && isFilled(item.href),
  );

  setSectionVisible("cv-actions-section", items.length > 0);
  if (!container) {
    return;
  }

  items.forEach((item) => container.appendChild(createActionLink(item)));
}

function renderCvUpdates() {
  const cv = getCvData();
  renderUpdates("cv-updates-section", "cv-updates-list", cv.updates || []);
}

async function renderNoteDetail() {
  if (document.body.dataset.page !== "note-detail") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("slug");
  const note = (getBlogData().notes || []).find(
    (entry) => entry.slug === requestedSlug,
  );

  if (!note) {
    setText("note-detail-title", "Note not found");
    setText(
      "note-detail-summary",
      "Add a matching note slug in blog-data/blog-data.js.",
    );
    return;
  }

  const article = note.article || {};
  const markdownPath = note.markdown || article.markdown || "";
  const markdownContent = note.markdownContent || article.markdownContent || "";
  const sections = (article.sections || []).filter(
    (section) => isFilled(section.heading) || isFilled(section.text),
  );
  const noteDetailHref = `./note.html?slug=${requestedSlug}`;
  const actions = (article.actions || note.actions || []).filter((action) => {
    if (!isFilled(action.title) || !isFilled(action.href)) {
      return false;
    }

    return action.href !== noteDetailHref && action.href !== requestedSlug;
  });

  document.title = `${note.title} | ${getSiteData().profile?.name || "Portfolio"}`;
  setText("note-detail-meta", note.meta || "Notes");
  setText("note-detail-title", note.title);
  setText(
    "note-detail-summary",
    isFilled(markdownPath) ? "" : article.summary || note.description,
  );

  const titleNode = getById("note-detail-title");
  const summaryNode = getById("note-detail-summary");
  if (titleNode) {
    titleNode.hidden = isFilled(markdownPath) || isFilled(markdownContent);
  }
  if (summaryNode) {
    summaryNode.hidden =
      isFilled(markdownPath) ||
      isFilled(markdownContent) ||
      !isFilled(summaryNode.textContent);
  }

  const actionsContainer = getById("note-detail-actions");
  if (actionsContainer) {
    actions.forEach((action) => {
      actionsContainer.appendChild(createActionLink(action));
    });
    actionsContainer.hidden = actions.length === 0;
  }

  const body = getById("note-detail-body");
  let outline = [];

  if (body) {
    if (isFilled(markdownPath)) {
      try {
        const fetchedMarkdown = await renderMarkdownNote(
          body,
          markdownPath,
          note.title,
        );
        outline = extractMarkdownOutline(fetchedMarkdown, note.title);
        applyMarkdownHeadingAnchors(body, outline);
      } catch (error) {
        body.innerHTML = "";

        if (sections.length) {
          renderStructuredNote(body, sections);
          setSectionVisible("note-outline-section", false);
          return;
        }

        const fallback = document.createElement("section");
        fallback.className = "detail-section";

        const heading = document.createElement("h2");
        heading.textContent = "Article could not be loaded";

        const copy = document.createElement("p");
        copy.textContent =
          "Check that the markdown file path is correct and preview the site through a local server such as `python -m http.server 8000`.";

        fallback.append(heading, copy);
        body.appendChild(fallback);
        setSectionVisible("note-outline-section", false);
      }
      renderNoteOutline(outline);
      return;
    }

    if (isFilled(markdownContent)) {
      try {
        renderMarkdownContent(body, markdownContent, markdownPath, note.title);
        outline = extractMarkdownOutline(markdownContent, note.title);
        applyMarkdownHeadingAnchors(body, outline);
      } catch (error) {
        body.innerHTML = "";
      }

      if (body.childNodes.length > 0) {
        renderNoteOutline(outline);
        return;
      }
    }

    renderStructuredNote(body, sections);
    setSectionVisible("note-outline-section", false);
  }
}

function renderProjectDetail() {
  if (document.body.dataset.page !== "project-detail") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("slug");
  const project = (getResearchData().projects || []).find(
    (entry) => entry.slug === requestedSlug,
  );

  if (!project) {
    setText("project-detail-title", "Project not found");
    setText(
      "project-detail-summary",
      "Add a matching project slug in research-data/research-data.js.",
    );
    setSectionVisible("project-detail-links-section", false);
    setSectionVisible("project-detail-publications-section", false);
    return;
  }

  const detail = project.detail || {};
  const detailSections = (detail.sections || []).filter(
    (section) => isFilled(section.heading) || isFilled(section.text),
  );
  const detailLinks = (detail.links || []).filter(
    (link) => isFilled(link.title) && isFilled(link.href),
  );
  const relatedPublications = resolveRelatedPublications(
    detail.relatedPublications || [],
  );

  document.title = `${project.title} | ${getSiteData().profile?.name || "Portfolio"}`;
  setText("project-detail-kicker", project.meta || project.status);
  setText("project-detail-title", project.title);
  setText("project-detail-summary", detail.summary || project.description);

  const media = getById("project-detail-media");
  if (media) {
    media.hidden = !isFilled(detail.mediaSrc) && !isFilled(detail.mediaLabel);
    media.classList.toggle("has-media", isFilled(detail.mediaSrc));

    if (isFilled(detail.mediaSrc)) {
      const mediaElement = document.createElement(
        isVideoFile(detail.mediaSrc) ? "video" : "img",
      );
      mediaElement.className = "detail-media-image";

      if (mediaElement.tagName.toLowerCase() === "video") {
        mediaElement.src = detail.mediaSrc;
        mediaElement.controls = true;
        mediaElement.loop = true;
        mediaElement.muted = true;
        mediaElement.playsInline = true;
        mediaElement.setAttribute(
          "aria-label",
          detail.mediaAlt || `${project.title} preview`,
        );
      } else {
        mediaElement.src = detail.mediaSrc;
        mediaElement.alt = detail.mediaAlt || `${project.title} preview`;
      }

      media.appendChild(mediaElement);
    }

    if (!isFilled(detail.mediaSrc) && isFilled(detail.mediaLabel)) {
      const mediaCaption = document.createElement("p");
      mediaCaption.className = "media-placeholder";
      mediaCaption.textContent = detail.mediaLabel;
      media.appendChild(mediaCaption);
    }
  }

  const body = getById("project-detail-body");
  if (body) {
    detailSections.forEach((section) => {
      const block = document.createElement("section");
      block.className = "detail-section";

      const heading = document.createElement("h2");
      heading.textContent = section.heading || "";
      heading.hidden = !isFilled(section.heading);

      const copy = document.createElement("p");
      copy.textContent = section.text || "";
      copy.hidden = !isFilled(section.text);

      block.append(heading, copy);
      body.appendChild(block);
    });
  }

  const links = getById("project-detail-links");
  if (links) {
    detailLinks.forEach((action) =>
      links.appendChild(createActionLink(action)),
    );
  }
  setSectionVisible("project-detail-links-section", detailLinks.length > 0);

  const publications = getById("project-detail-publications");
  if (publications) {
    renderRelatedProjectPublications(
      "project-detail-publications",
      relatedPublications,
    );
  }
  setSectionVisible(
    "project-detail-publications-section",
    relatedPublications.length > 0,
  );
}

function initializeSecondaryPages() {
  applyStoredTheme();
  renderBrandLink();
  createNav();
  initializeMobileMenu();

  setText("cv-page-intro", getSiteData().pageContent?.cvIntro);

  const currentPage = document.body.dataset.page;

  if (currentPage === "research") {
    renderProjectGrid();
    renderResearchPublicationTile();
  }

  if (currentPage === "cv") {
    renderCvActions();
    renderCvUpdates();
  }

  if (currentPage === "project-detail") {
    renderProjectDetail();
  }

  if (currentPage === "note-detail") {
    renderNoteDetail();
  }
}

initializeSecondaryPages();
