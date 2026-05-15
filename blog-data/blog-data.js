// Blog data powers:
// - the Blog landing page in `blog.html`
// - the dedicated `note.html` article pages
//
// Current usage of this file:
// - `notes` render on the Blog page
// - note/article pages open through `note.html?slug=...`

window.blogData = {
  // Notes shown on the Blog page and optionally opened in `note.html`.
  notes: [
    {
      title: "State Estimation Notes",
      meta: "Technical Notes",
      description:
        "Notes from two sessions of lab colloquium aimed at building foundational intuition before diving into advanced estimators like the Kalman filter. Many thanks to Harishankar M for helping me prepare the notes, and to all our group members for their insightful questions during the colloquium.",
      showOnHome: true,
      actions: [
        {
          title: "Open PDF",
          href: "./blog-data/Yashwanth_state_estimation_notes.pdf",
          background: "#dce8f6",
          color: "#1f2b35",
        },
      ],
    },
    {
      title: "Notes on intro to SVD",
      meta: "Technical Notes",
      description:
        "Notes from the 8th colloquium of our lab. The session was aimed to building motivation and intuition for singular value decomposition through a more geometric approach. There will continuation of this building towards PCA, DMD and eventually Koopan Operators",
      showOnHome: true,
      actions: [
        {
          title: "Open PDF",
          href: "./blog-data/Yashwanth_Colloquium-8_Motivation_to_SVD.pdf",
          background: "#dce8f6",
          color: "#1f2b35",
        },
      ],
    },
    {
      slug: "dummy-notes-entry",
      title: "Dummy Notes Entry",
      meta: "Reading Notes",
      description:
        "This dummy note shows the article-reading mode. You can keep a proper web note, a PDF link, or both.",
      showOnHome: true,
      markdown: "./blog-data/articles/dummy-notes-entry.md",
      actions: [
        {
          title: "Read Article",
          href: "./note.html?slug=dummy-notes-entry",
          background: "#dceddf",
          color: "#1f2b35",
        },
        // {
        //   title: "Open PDF",
        //   href: "./blog-data/Yashwanth_IGM_Poster_Feb2026.pdf",
        //   background: "#dce8f6",
        //   color: "#1f2b35",
        // },
      ],
      // article: {
      //   summary:
      //     "This note is rendered from the separate Markdown file in blog-data/articles/.",
      // },
    },
  ],
};
