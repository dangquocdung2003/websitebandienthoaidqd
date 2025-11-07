import { useEffect } from "react";

/**
 * Lightweight SEO head manager cho Vite + React 19
 * - <title>, meta description, canonical
 * - Open Graph, Twitter
 * - JSON-LD (structured data)
 */
export default function SEO({ title, description, canonical, ogImage, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;

    const ensure = (selector, create) => {
      let el = document.head.querySelector(selector);
      if (!el) { el = create(); document.head.appendChild(el); }
      return el;
    };

    if (description !== undefined) {
      const metaDesc = ensure('meta[name="description"]', () => {
        const m = document.createElement('meta'); m.setAttribute('name', 'description'); return m;
      });
      metaDesc.setAttribute('content', description || "");
    }

    if (canonical) {
      const linkCanonical = ensure('link[rel="canonical"]', () => {
        const l = document.createElement('link'); l.setAttribute('rel', 'canonical'); return l;
      });
      linkCanonical.setAttribute('href', canonical);
    }

    const ogTitle = ensure('meta[property="og:title"]', () => {
      const m = document.createElement('meta'); m.setAttribute('property', 'og:title'); return m;
    });
    ogTitle.setAttribute('content', title || "");

    const ogDesc = ensure('meta[property="og:description"]', () => {
      const m = document.createElement('meta'); m.setAttribute('property', 'og:description'); return m;
    });
    ogDesc.setAttribute('content', description || "");

    if (ogImage) {
      const ogImg = ensure('meta[property="og:image"]', () => {
        const m = document.createElement('meta'); m.setAttribute('property', 'og:image'); return m;
      });
      ogImg.setAttribute('content', ogImage);
    }

    const twTitle = ensure('meta[name="twitter:title"]', () => {
      const m = document.createElement('meta'); m.setAttribute('name', 'twitter:title'); return m;
    });
    twTitle.setAttribute('content', title || "");

    const twDesc = ensure('meta[name="twitter:description"]', () => {
      const m = document.createElement('meta'); m.setAttribute('name', 'twitter:description'); return m;
    });
    twDesc.setAttribute('content', description || "");

    if (ogImage) {
      const twImg = ensure('meta[name="twitter:image"]', () => {
        const m = document.createElement('meta'); m.setAttribute('name', 'twitter:image'); return m;
      });
      twImg.setAttribute('content', ogImage);
    }

    // JSON-LD
    const ldSel = 'script[type="application/ld+json"][data-auto="1"]';
    let ld = document.head.querySelector(ldSel);
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.setAttribute('data-auto', '1');
      document.head.appendChild(ld);
    }
    ld.textContent = jsonLd ? JSON.stringify(jsonLd) : "";

    return () => {
      const s = document.head.querySelector(ldSel);
      if (s) s.remove();
    };
  }, [title, description, canonical, ogImage, jsonLd]);

  return null;
}
