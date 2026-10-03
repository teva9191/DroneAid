/**
 * Entry point. Loaded as an ES module, so it runs after the document is parsed
 * and needs no DOMContentLoaded wrapper. Each feature lives in its own module
 * and is a no-op on pages that lack its markup.
 *
 * Translations are baked into the HTML at build time (see scripts/build.mjs);
 * the few strings JavaScript needs at runtime are read from data-* attributes.
 */
import { initAnimations } from './animations.js';
import { initDonate } from './donate.js';
import { initContactForm } from './contact-form.js';

initAnimations();
initDonate();
initContactForm();
