
// src/config.ts

export const PRODUCT_NAME = 'Aqua Vitae – XMAS & NYE Limited';
export const PRODUCT_DETAILS = '(500 ml, 44% vol.)';
export const PRICE_EUR = 49.90;
export const GIFT_WRAP_PRICE_EUR = 5.00;

// Countdown Deadline (Format: YYYY-MM-DDTHH:mm:ss)
// IMPORTANT: The backend uses UTC, but the frontend will display this in the user's local time.
export const DEADLINE = '2024-12-24T23:59:00'; 

// Stock simulation
export const TOTAL_STOCK = 500;
export const CURRENT_STOCK = 324; // This can be a dynamic value in a real app

// Engraving rules
export const ENGRAVING_MAX_LENGTH = 20;
export const ENGRAVING_VALID_REGEX = /^[a-zA-Z0-9\s&.\-ÄÖÜäöüß]*$/;
export const ENGRAVING_HINT = 'A–Z, 0–9, & . -';

// Shipping
export const SHIPPING_TEXT = 'Schneller Versand 2–3 Werktage';

// Social Media Links
// IMPORTANT: Replace with your actual social media URLs
export const INSTAGRAM_URL = 'https://instagram.com';
export const FACEBOOK_URL = 'https://facebook.com';

// Asset URLs
// IMPORTANT: Replace with your actual asset URLs, e.g., from a CDN or /public/assets
export const HERO_IMAGE_URL = 'https://picsum.photos/id/1060/1920/1280'; // A moody, atmospheric shot
export const GALLERY_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1627236560113-d8a14354e2a8?q=80&w=1974&auto=format&fit=crop', // Bottle on sand
  'https://images.unsplash.com/photo-1598214742493-5b33101d2d6b?q=80&w=1974&auto=format&fit=crop', // Cocktail with garnish
  'https://images.unsplash.com/photo-1618210369975-a86b3695e543?q=80&w=1964&auto=format&fit=crop', // Splash shot
  'https://images.unsplash.com/photo-1551538855-4d7a8d381c1c?q=80&w=1969&auto=format&fit=crop', // Distilling equipment scene
  'https://images.unsplash.com/photo-1551024709-8f237c2045b5?q=80&w=2070&auto=format&fit=crop', // Cocktail in a dark bar
  'https://images.unsplash.com/photo-1549931320-8b443da437a4?q=80&w=1935&auto=format&fit=crop', // Ingredients flat lay
  'https://images.unsplash.com/photo-1601042599805-3c4652425028?q=80&w=1974&auto=format&fit=crop', // Bottle with smoke
  'https://images.unsplash.com/photo-1608945235398-3f4a34b95b9a?q=80&w=1974&auto=format&fit=crop', // Pouring into glass
];
export const UGC_VIDEO_URL = '/assets/ugcVideo.mp4';
export const PRODUCT_VIDEO_URL = '/assets/productVideo.mp4';
export const VIDEO_POSTER_URL = 'https://picsum.photos/id/23/1280/720';

// Legal Pages
export const LEGAL_PAGES = [
  { path: '/impressum', label: 'Impressum', type: 'impressum' as const },
  { path: '/datenschutz', label: 'Datenschutz', type: 'datenschutz' as const },
  { path: '/agb', label: 'AGB', type: 'agb' as const },
  { path: '/widerruf', label: 'Widerruf', type: 'widerruf' as const },
];
