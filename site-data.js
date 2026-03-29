// Shared data used across the site.
// Current usage:
// - `index.html` for shared profile + navigation
// - `blog.html` for shared navigation
// - `research.html`
// - `cv.html`
// - `project.html`
// - `note.html`

window.siteData = {
  // Top navigation used across the pages.
  navigation: [
    { label: "Home", href: "./index.html", page: "home" },
    { label: "Research", href: "./research.html", page: "research" },
    { label: "CV", href: "./cv.html", page: "cv" },
    { label: "Blog", href: "./blog.html", page: "blog" },
  ],

  // Shared profile fields.
  profile: {
    photo: "./yash_avatar.jpg",
    name: "Yashwanth",
    highlightAuthorName: "Yashwanth M",
    role: "Research Scholar",
    tagline:
      "I work in the intersection of dynamical systems, optimal control, aerial robots, and data-driven learning",
    affiliation: "Dynamical systems and Control (DysCo) Lab, IIT-Hyderabad",
    location:
      "Room number 617, Academic C-block, Indian Institute of Technology Hyderabad, Telangana, India",
    bio: "I am research scholar at Dynamical systems and Control Laboratory at IIT Hyderabad since July 2024, working with Dr. Vishnu R. Unni's group. My PhD research focuses on different methodologies for data-driven control of aerial robots, it's experimental validations, as well as theoretical extensions. In addition I work on different dynamical systems in the lab using complex-systems approach.",
    links: [
      { label: "Email", href: "mailto:yashwanth.contact@gmail.com" },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=YtHC5_kAAAAJ&hl=en",
      },
      { label: "GitHub", href: "https://github.com/yashwanthprofile" },
      { label: "CV", href: "./cv-data/Yashwanth_Resume_2024.pdf" },
    ],
  },

  // Shared short intro text used by secondary pages.
  // pageContent: {
  //   cvIntro:
  //     "Use this page as a compact landing area for your CV PDF, external profiles, and any quick-download materials you want to keep prominent.",
  // },
};
