import Link from "next/link";
import { useRouter } from "next/router";
import hwData from "@/data/hardware.json";

/** Tipo “elastico” per i prodotti nelle liste */
type Prod = {
  id?: string;          // facoltativo (slug). Se manca, lo ricavo da href
  slug?: string;        // facoltativo
  name?: string;
  href?: string;
  image?: string;
};

/** Appiattisce i sotto-array (doorStations, indoorStations, ecc.) in un unico array */
function flattenProducts(data: any): Prod[] {
  if (!data || typeof data !== "object") return [];
  const arrays = Object.values(data).filter(Array.isArray) as Prod[][];
  return arrays.flat();
}

/** Ricava uno slug da href se id/slug non sono presenti */
function slugFrom(item: Prod): string | undefined {
  if (item?.id) return item.id;
  if (item?.slug) return item.slug;
  if (item?.href) {
    try {
      const cleaned = item.href.split("?")[0].split("#")[0];
      const parts = cleaned.split("/").filter(Boolean);
      return parts[parts.length - 1]; // ultimo segmento dell'href
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/** Label “umane” per i segmenti noti */
function labelFor(seg: string): string {
  switch (seg) {
    case "docs": return "Documentazione";
    case "hardware": return "Hardware";
    case "door-stations": return "Dispositivi esterni";
    case "indoor-stations": return "Dispositivi interni";
    case "controller-reader": return "Controller & Reader";
    case "software": return "Software";
    case "installazione": return "Installazione";
    case "scheda-tecnica": return "Scheda tecnica";
    default:
      // capitalizza in modo soft
      return seg.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase());
  }
}

export default function Breadcrumbs() {
  const { asPath, locale } = useRouter();

  // Rimuovo query/hash e splitto i segmenti
  const path = asPath.split("?")[0].split("#")[0];
  const parts = path.split("/").filter(Boolean); // es. ["it","docs","hardware","door-stations","spark-300"]

  // Rimuovo il prefisso locale se presente
  const localePrefix = locale ? [locale] : [];
  const isI18nPrefixed = parts[0] === locale;
  const segs = isI18nPrefixed ? parts.slice(1) : parts;

  // Costruisco una lista di prodotti per lookup
  const products = flattenProducts(hwData).map(p => ({
    ...p,
    _slug: slugFrom(p),
  }));

  // L’ultimo segmento della URL (senza locale)
  const last = segs[segs.length - 1];

  // Determino se è una pagina prodotto (non una categoria)
  const categoryKeys = new Set([
    "docs", "hardware", "door-stations", "indoor-stations", "controller-reader", "software"
  ]);
  const maybeProductSlug = last && !categoryKeys.has(last) ? last : undefined;

  // Trovo il prodotto, se lo slug sembra un prodotto
  const product = maybeProductSlug
    ? products.find(p => p._slug === maybeProductSlug)
    : undefined;

  // Genero le briciole (evito la locale nei link costruiti)
  const crumbs = segs.map((seg, i) => {
    const href = "/" + [...localePrefix, ...segs.slice(0, i + 1)].join("/");
    const isLast = i === segs.length - 1;
    const label = isLast && product?.name ? product.name : labelFor(seg);
    return { href, label, isLast };
  });

  // Se la prima voce non è “Documentazione”, la aggiungo come radice
  const root = { href: "/" + [...localePrefix, "docs"].join("/"), label: "Documentazione", isLast: crumbs.length === 0 };
  const items = segs[0] === "docs" ? crumbs : [root, ...crumbs];

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs" style={{ marginBottom: "0.75rem" }}>
      <ul>
        {items.map((c) => (
          <li key={c.href} className={c.isLast ? "is-active" : undefined} aria-current={c.isLast ? "page" : undefined}>
            {c.isLast ? (
              <span>{c.label}</span>
            ) : (
              <Link href={c.href} locale={locale}>{c.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
