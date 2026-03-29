# Deploy Guide

This site is hosted from:

- `https://github.com/YashwanthProfile/yashwanthprofile.github.io`

and published at:

- `https://yashwanthprofile.github.io/`

## Main editing files

Use these files depending on what you want to update:

- `site-data.js`
  Shared profile details, navigation, About text, links, avatar path
- `research-data/research-data.js`
  Publications, patents, projects, homepage featured publications/projects
- `blog-data/blog-data.js`
  Blog notes and note metadata
- `blog-data/articles/*.md`
  Full article-style note content
- `cv-data/cv-data.js`
  CV links and Recent Updates shown on the CV page and homepage
- `styles.css`
  Site-wide styling

## Local preview

From this folder, run:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Check these pages before pushing:

- `index.html`
- `research.html`
- `cv.html`
- `blog.html`
- any changed `project.html?slug=...`
- any changed `note.html?slug=...`

## Normal update workflow

After making changes:

```powershell
git status
git add .
git commit -m "update website content"
git push origin main
```

GitHub Pages should usually refresh in 1 to 3 minutes.

## Recommended commit styles

Use short messages such as:

- `update publications`
- `add new project`
- `update cv links`
- `add new note article`
- `refine homepage styling`

## Content tips

- Add all publications, conferences, journals, and patents only once in `research-data/research-data.js`
- Use `showOnHome: true` to choose homepage publications and projects
- Reuse publications inside projects through `relatedPublications`
- Add full note articles as separate Markdown files in `blog-data/articles/`
- Keep updates in `cv-data/cv-data.js`

## If the website does not refresh

1. Confirm your push succeeded:

```powershell
git status
git log --oneline -n 3
```

2. Confirm the GitHub Pages repo is the same one:

```powershell
git remote -v
```

3. Make sure GitHub Pages is set to:

- branch: `main`
- folder: `/ (root)`

4. If needed, trigger a rebuild with an empty commit:

```powershell
git commit --allow-empty -m "trigger pages rebuild"
git push origin main
```

## Notes about media

- project tiles and project detail pages support images and videos
- article notes support Markdown and media from `blog-data/articles/*.md`
- if a file path is wrong, the page may render without the media, so double-check relative paths
