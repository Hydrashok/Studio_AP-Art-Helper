/* Studio_AP Art Helper — brand configuration.
   This is the ONLY file that differs between builds, alongside
   manifest.json, sw.js and the icons. index.html is identical
   everywhere: to ship an update, copy the new index.html into
   every build and leave this file alone. */

window.BRAND = {
  title:      "Studio_AP Art Helper",                              // browser tab
  shortName:  "Art Helper",                                        // install prompt
  heading:    '<span class="lockup">Studio_AP</span> Art Helper',  // header, HTML
  byline:     null,                                                // no second line
  accent:     "#4FA083",                                           // Xenia jade
  accentLit:  "#7ACFAC",
  accentDeep: "#1C3B33"
};
