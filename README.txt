V27 Configurator - iCAUR (concept build)
==========================================

This is a static site: index.html, style.css, script.js. No build step needed - deploy as-is to Vercel.

INCLUDED PHOTO
---------------
images/v27-auric-gold-yellow.webp is your supplied hero shot and is now wired up as the
real photo shown when the "Auric Gold Yellow" swatch is selected (also the default on load).
All other colours still fall back to the placeholder illustration until matching photos are added.

ADDING MORE VEHICLE PHOTOS
----------------------------
1. Keep photos inside the "images" folder next to index.html.
2. Name each file like this (lowercase, hyphenated), any of these extensions work
   (.jpg, .jpeg, .png, .webp) - the script checks all of them automatically:

   images/v27-desert-bronze.*
   images/v27-moonstone-white.*
   images/v27-deep-emerald-green.*
   images/v27-obsidian-black.*
   images/v27-glacier-silver.*
   images/v27-auric-gold-yellow.*   (already included)
   images/v27-basalt-grey.*

3. That's it - no code changes needed. If a file exists for the selected colour it is shown;
   otherwise the illustration is used automatically.

DEPLOYING TO VERCEL
--------------------
Option A: push this folder to a GitHub repo and "Import Project" in the Vercel dashboard.
Option B: install the Vercel CLI and run "vercel" from inside this folder, then follow the prompts.

SPEC SOURCE
-----------
Dimensions, weights, performance figures and cabin/cargo specs are taken from the
official iCAUR V27 model page (icaurglobal.com) as of this build.
