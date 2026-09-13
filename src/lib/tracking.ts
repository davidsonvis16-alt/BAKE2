// Cookie consent + tracking (Google Analytics 4 and Meta Pixel).
// Nothing that sets a tracking cookie loads until the visitor opts in, as required by
// Kenya's Data Protection Act. IDs come from env vars so they can be set per deploy:
//   VITE_GA_ID="G-XXXXXXXXXX"      VITE_META_PIXEL_ID="123456789012345"

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type Consent = {
  v: 1;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = 'bakemart_cookie_consent';
const OPEN_EVENT = 'bm:cookie-settings';
const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim() || '';
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || '';

let gaLoaded = false;
let pixelLoaded = false;

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed?.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const previous = getConsent();
  const consent: Consent = { v: 1, ...choice, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }

  const revoked =
    (previous?.analytics && !consent.analytics && gaLoaded) || (previous?.marketing && !consent.marketing && pixelLoaded);
  if (revoked) {
    // Scripts can't be unloaded, so clear their cookies and start a clean page.
    clearTrackingCookies();
    window.location.reload();
    return consent;
  }

  applyConsent(consent);
  return consent;
}

/** Load whatever the stored consent allows. Safe to call more than once. */
export function applyConsent(consent: Consent | null = getConsent()) {
  if (!consent) return;
  const newlyLoaded = (consent.analytics && loadGoogleAnalytics()) || false;
  const pixelNew = (consent.marketing && loadMetaPixel()) || false;
  if (newlyLoaded || pixelNew) trackPageView(window.location.pathname);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

export function trackPageView(path: string) {
  if (gaLoaded && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  if (pixelLoaded && window.fbq) window.fbq('track', 'PageView');
}

type ItemEvent = { id: string; name: string; price: number; quantity?: number; category?: string };

export function trackAddToCart(item: ItemEvent) {
  const quantity = item.quantity ?? 1;
  if (gaLoaded && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'KES',
      value: item.price * quantity,
      items: [{ item_id: item.id, item_name: item.name, item_category: item.category, price: item.price, quantity }],
    });
  }
  if (pixelLoaded && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [item.id],
      content_name: item.name,
      content_type: 'product',
      currency: 'KES',
      value: item.price * quantity,
    });
  }
}

export function trackAddToWishlist(item: ItemEvent) {
  if (gaLoaded && window.gtag) {
    window.gtag('event', 'add_to_wishlist', {
      currency: 'KES',
      value: item.price,
      items: [{ item_id: item.id, item_name: item.name, item_category: item.category, price: item.price }],
    });
  }
  if (pixelLoaded && window.fbq) {
    window.fbq('track', 'AddToWishlist', { content_ids: [item.id], content_name: item.name, currency: 'KES', value: item.price });
  }
}

export function trackCheckout(order: { value: number; itemCount: number; method: string }) {
  if (gaLoaded && window.gtag) {
    window.gtag('event', 'begin_checkout', { currency: 'KES', value: order.value, items_count: order.itemCount, checkout_method: order.method });
  }
  if (pixelLoaded && window.fbq) {
    window.fbq('track', 'InitiateCheckout', { currency: 'KES', value: order.value, num_items: order.itemCount });
  }
}

export const trackingConfigured = { analytics: !!GA_ID, marketing: !!PIXEL_ID };

function loadScript(src: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGoogleAnalytics(): boolean {
  if (gaLoaded || !GA_ID) return false;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the raw arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('config', GA_ID, { send_page_view: false });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`);
  return true;
}

function loadMetaPixel(): boolean {
  if (pixelLoaded || !PIXEL_ID) return false;
  pixelLoaded = true;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
  }
  window.fbq('consent', 'grant');
  window.fbq('init', PIXEL_ID);
  return true;
}

function clearTrackingCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => /^(_ga|_gid|_gat|_fbp|_fbc)/.test(name));
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-3).join('.')}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}
