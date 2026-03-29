# How To Edit This Portfolio

This site is currently split into two editing styles:

- `index.html` and `blog.html` still contain page-specific visible content
- `site-data.js`, `research-data/research-data.js`, `cv-data/cv-data.js`, and `blog-data/blog-data.js` still support the JS-driven secondary pages

This was done to keep the Home and Blog pages stable in simple preview environments.

## Quick answer

If you want to edit visible content right now, use:

- Shared name, role, tagline, affiliation, location, links, and Home About text: `site-data.js`
- Home page visible sections like focus areas: `index.html`
- Blog notes and note-article data: `blog-data/blog-data.js`
- CV page updates: `cv-data/cv-data.js`
- Blog landing page layout structure: `blog.html`
- Research page and project data: `research-data/research-data.js`
- CV page links: `cv-data/cv-data.js`
- Shared profile data for JS-driven pages: `site-data.js`
- Note article detail pages opened through `note.html?slug=...`: `blog-data/blog-data.js`

## 1. Edit the Home page

Edit:

- `index.html`

Sections are clearly marked with HTML comments:

- `<!-- EDIT: Sidebar profile card -->`
- `<!-- EDIT: Sidebar affiliation -->`
- `<!-- EDIT: Sidebar location -->`
- `<!-- EDIT: Sidebar links -->`
- `<!-- EDIT: About section -->`
- `<!-- EDIT: Focus areas -->`
- `<!-- EDIT: Homepage recent publications -->`
- `<!-- EDIT: Homepage featured projects -->`
- `<!-- EDIT: Homepage recent updates -->`

Use `site-data.js` to change:

- your avatar
- name
- role
- short tagline
- affiliation
- location
- links
- Home page About text

Use `index.html` to change:

- focus areas

Homepage publications are now selected from:

- `research-data/research-data.js`

Use `showOnHome: true` on the publications you want featured on the Home page.

The Home page shared profile card and `About` section now read from:

- `site-data.js` -> `profile.bio`
- `site-data.js` -> `profile.photo`
- `site-data.js` -> `profile.name`
- `site-data.js` -> `profile.role`
- `site-data.js` -> `profile.tagline`
- `site-data.js` -> `profile.affiliation`
- `site-data.js` -> `profile.location`
- `site-data.js` -> `profile.links`

Homepage project tiles are now selected from:

- `research-data/research-data.js`

Use `showOnHome: true` on the projects you want featured on the Home page.

## 2. Edit the Blog landing page

Edit:

- `blog.html`

Sections are clearly marked with HTML comments:

- `<!-- EDIT: Left jump card -->`
- `<!-- EDIT: Notes tile -->`
- `<!-- EDIT: Updates tile -->`

Use `blog.html` to change:

- the Blog page jump links

The Blog page header name and navigation now also read from:

- `site-data.js`

Use `blog-data/blog-data.js` to change:

- Notes shown on the Blog page
- note/article detail pages

## 3. What is `blog-data/blog-data.js` used for now?

Right now, `blog-data/blog-data.js` is used for:

- Blog page notes
- note/article detail pages

So if you click a note that opens an article-style page, that article content is controlled from:

- `blog-data/blog-data.js`

Example note entry:

```js
{
  slug: "dummy-notes-entry",
  title: "Dummy Notes Entry",
  meta: "Reading Notes",
  description: "Short description",
  markdown: "./blog-data/articles/dummy-notes-entry.md",
  actions: [
    {
      title: "Read Article",
      href: "./note.html?slug=dummy-notes-entry",
      background: "#dceddf",
      color: "#1f2b35"
    },
    {
      title: "Open PDF",
      href: "./blog-data/example.pdf",
      background: "#dce8f6",
      color: "#1f2b35"
    }
  ],
  article: {
    summary: "Short intro text"
  }
}
```

### Markdown article mode

The easiest way to write a rich article now is:

- create or edit a Markdown file in `blog-data/articles/`
- point the note to it using `markdown: "./blog-data/articles/your-file.md"`
- keep a `Read Article` button pointing to `./note.html?slug=your-slug`

If your preview environment does not load `.md` files reliably, you can instead use:

- `markdownContent: \`...\``

This keeps the note self-contained inside `blog-data/blog-data.js` and avoids the runtime file fetch.

Example:

```js
{
  slug: "koopman-notes",
  title: "Koopman Notes",
  meta: "Reading Notes",
  description: "Notes on Koopman operator methods.",
  markdown: "./blog-data/articles/koopman-notes.md",
  actions: [
    {
      title: "Read Article",
      href: "./note.html?slug=koopman-notes",
      background: "#dceddf",
      color: "#1f2b35"
    },
    {
      title: "Open PDF",
      href: "./blog-data/koopman-notes.pdf",
      background: "#dce8f6",
      color: "#1f2b35"
    }
  ],
  article: {
    summary: "Optional short intro shown near the top of the article page."
  }
}
```

Supported in note articles:

- Markdown headings and subheadings
- fenced code blocks with syntax highlighting
- inline math like `$x_{k+1} = Ax_k$`
- display math with `$$ ... $$`
- links and references
- images and GIFs
- inline HTML such as `<video>`, `<iframe>`, and custom embeds

Important preview note:

- Markdown article files are loaded with `fetch(...)`
- preview the site through a local server such as `python -m http.server 8000`
- opening `note.html` directly with `file://` may prevent the markdown file from loading
- if that happens, use `markdownContent` instead of `markdown`

## 4. Edit the Research page

Edit:

- `research-data/research-data.js`

Use it for:

- research focus topics
- publications
- projects
- project detail pages

### Publications

Each publication looks like:

```js
{
  id: "paper-id-2026",
  title: "Paper title",
  category: "journal",
  showOnHome: true,
  meta: "Venue - 2026",
  authors: "First Author, Yashwanth M, Collaborator",
  actions: [
    {
      title: "Paper",
      href: "https://example.com",
      background: "#f2d8dc",
      color: "#1f2b35"
    }
  ]
}
```

Notes:

- add a unique `id` for each publication
- use `category: "journal"`, `category: "conference"`, or `category: "patent"` to place it in the right Research-page group
- use that `id` when you want to reuse the same publication inside project pages
- set `showOnHome: true` on the publications you want on the Home page
- the Home page shows up to 2 publications with `showOnHome: true`
- if none are marked, it falls back to the first 2 publications in the list

### Projects

Each project looks like:

```js
{
  slug: "my-project",
  title: "My Project",
  meta: "Robotics",
  showOnHome: true,
  status: "Ongoing",
  tileMedia: "./my-preview.gif",
  description: "Longer summary",
  actions: [
    {
      title: "Open Project",
      href: "./project.html?slug=my-project",
      background: "#dce8f6",
      color: "#1f2b35"
    }
  ],
  detail: {
    summary: "Project intro",
    mediaLabel: "Replace with media later",
    links: [],
    sections: [
      { heading: "Overview", text: "Explain the project." }
    ],
    relatedPublications: ["paper-id-2026"]
  }
}
```

Notes:

- set `showOnHome: true` on the projects you want on the Home page
- the Home page shows up to 2 projects with `showOnHome: true`
- if none are marked, it falls back to the first 2 projects in the list
- `relatedPublications` can now reuse items from the main `publications` list by ID, including journals, conferences, and patents
- example:

```js
relatedPublications: [
  "paper-id-2026",
  "another-paper-id"
]
```

- you can also use:

```js
relatedPublications: [
  { publicationId: "paper-id-2026" }
]
```

## 5. Edit shared profile data for JS-driven pages

Edit:

- `site-data.js`

This controls shared content used by:

- `index.html`
- `blog.html`
- `research.html`
- `cv.html`
- `project.html`
- `note.html`

Example:

```js
profile: {
  photo: "./yash_avatar.jpg",
  name: "Yashwanth",
  highlightAuthorName: "Yashwanth M",
  role: "Research Scholar",
  tagline: "Short summary",
  affiliation: "Lab / Institute",
  location: "India",
  bio: "Biography text",
  links: [
    { label: "Email", href: "mailto:you@example.com" }
  ]
}
```

## 6. Edit the CV page

Edit:

- `cv-data/cv-data.js`

Example:

```js
window.cvData = {
  cvLinks: [
    {
      title: "Open CV PDF",
      href: "./cv-data/Yashwanth_Resume_2024.pdf",
      background: "#dce8f6",
      color: "#1f2b35"
    }
  ],
  updates: [
    {
      title: "Recent milestone",
      date: "March 2026",
      showOnHome: true
    }
  ]
};
```

## 7. Which files are currently most important?

For everyday editing, focus on:

- `index.html`
- `blog.html`
- `blog-data/blog-data.js`
- `research-data/research-data.js`
- `site-data.js`
- `cv-data/cv-data.js`

## 8. Why the older JS files are gone

The earlier Home and Blog rendering scripts were removed because they were causing preview instability.

So the site is now intentionally simpler:

- Home layout is written directly in `index.html`
- Blog layout is written directly in `blog.html`
- Blog content now comes from `blog-data/blog-data.js`
- secondary pages still use the structured data files

## 9. Preview locally

From PowerShell:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## 10. If you want, we can simplify further

The next clean step would be one of these:

1. Keep this stable static approach and continue editing `index.html` and `blog.html` directly.
2. Rebuild Home and Blog using a very small data-driven setup once you confirm your preview environment is stable.

Right now, option 1 is the safest and clearest workflow.
