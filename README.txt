V27 Configurator - iCAUR (concept build)
==========================================

This is a static site: index.html, style.css, script.js. No build step needed - deploy as-is to Vercel.

ADDING YOUR OWN VEHICLE PHOTOS
-------------------------------
The page currently shows a placeholder illustration of the V27 that recolors itself
based on the selected swatch. To swap in real photography once you have the images:

1. Create a folder named "images" next to index.html.
2. Add one photo per colour, named exactly like this (lowercase, hyphenated):

   images/v27-desert-bronze.jpg
   images/v27-moonstone-white.jpg
   images/v27-deep-emerald-green.jpg
   images/v27-obsidian-black.jpg
   images/v27-glacier-silver.jpg
   images/v27-auric-gold-yellow.jpg
   images/v27-basalt-grey.jpg

3. That's it - the script automatically checks for a matching file for whichever
   colour is selected. If a file exists it shows the real photo; if not, it falls
   back to the illustration automatically. No code changes required.

DEPLOYING TO VERCEL
--------------------
Option A: push this folder to a GitHub repo and "Import Project" in the Vercel dashboard.
Option B: install the Vercel CLI and run "vercel" from inside this folder, then follow the prompts.

SPEC SOURCE
-----------
Dimensions, weights, performance figures and cabin/cargo specs are taken from the
official iCAUR V27 model page (icaurglobal.com) as of this build. Vehicle photography
is not included - add your own licensed images using the steps above.
