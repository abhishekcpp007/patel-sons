import type { Metadata } from "next";
import { company } from "@/content/company";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://patelsons.in").replace(/\/$/, "");
export const CITY = "Ahmedabad";
export const GEO = { latitude: 23.0225, longitude: 72.5714 };

export const keywords = [
  "construction company Ahmedabad",
  "row house builders Ahmedabad",
  "residential building contractor Ahmedabad",
  "labour rate contract construction",
  "with material construction contract",
  "turnkey house construction Ahmedabad",
  "construction cost per sq ft Ahmedabad",
  "Patel Sons construction",
];

export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  keywords: extra = [],
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noindex?: boolean;
}): Metadata {
  // The root layout appends " | Patel Sons"; strip it if a caller included it.
  title = title.replace(/\s*\|\s*Patel Sons(\s*Blog)?\s*$/i, "");
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const og = image ?? `${SITE_URL}${path === "/" ? "" : path}/opengraph-image`;
  return {
    title,
    description,
    keywords: [...extra, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: company.name,
      locale: "en_IN",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "GeneralContractor", "LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    alternateName: "Patel Sons Construction Ahmedabad",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    image: `${SITE_URL}/opengraph-image`,
    description: company.description,
    slogan: company.tagline,
    foundingDate: String(company.founded),
    founder: company.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 12, Industrial Estate Road, Near City Mall",
      addressLocality: CITY,
      addressRegion: "Gujarat",
      postalCode: "380015",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", ...GEO },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(company.address)}`,
    areaServed: [{ "@type": "City", name: CITY }, { "@type": "State", name: "Gujarat" }],
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "19:00" }],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Bank transfer, Cheque, UPI",
    contactPoint: [{ "@type": "ContactPoint", telephone: company.phone, contactType: "sales", areaServed: "IN", availableLanguage: ["English", "Hindi", "Gujarati"] }],
    sameAs: [company.social.instagram.url, company.social.facebook.url, company.social.youtube.url],
    knowsAbout: ["Row house construction", "Apartment building construction", "Labour rate construction contracts", "Turnkey with-material construction", "RERA registered residential projects"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Row House Development", url: `${SITE_URL}/services/row-house-development` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Building Construction", url: `${SITE_URL}/services/residential-buildings` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Labour Rate Construction Contract", url: `${SITE_URL}/services/labour-rate-contract` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "With Material Turnkey Construction Contract", url: `${SITE_URL}/services/with-material-contract` } },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path === "/" ? "" : it.path}` })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceJsonLd(opts: { name: string; description: string; path: string; image?: string; area?: string; offers?: { name: string; price: number }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${opts.path}#service`,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    image: opts.image,
    serviceType: opts.name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: opts.area ?? CITY },
    ...(opts.offers
      ? { offers: opts.offers.map((o) => ({ "@type": "Offer", name: o.name, price: o.price, priceCurrency: "INR", priceSpecification: { "@type": "UnitPriceSpecification", price: o.price, priceCurrency: "INR", unitText: "per sq ft" } })) }
      : {}),
  };
}

export function articleJsonLd(opts: { title: string; description: string; path: string; image: string; date: string; updated?: string; keywords: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: [opts.image],
    datePublished: opts.date,
    dateModified: opts.updated ?? opts.date,
    keywords: opts.keywords.join(", "),
    author: { "@type": "Person", name: company.founders[0].name, jobTitle: company.founders[0].role, url: `${SITE_URL}/about` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${opts.path}` },
    inLanguage: "en-IN",
  };
}
