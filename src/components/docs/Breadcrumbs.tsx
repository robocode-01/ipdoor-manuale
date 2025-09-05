import Link from "next/link";
import { useRouter } from "next/router";
import hwData from "@/data/hardware.json";

/** Tipo “elastico” per i prodotti nelle liste */
type Prod = {
  id?: string;          // slug preferito
  slug?: string;
  name?: string;
  href?: string;
  image?: string;
};

/** Appiattisce i sotto-array (doorStations, indoorStations, ecc.) in un unico array */
function flattenProducts(data: unknown): Prod[] {
  if (!data || typeof data !== "object") return [];
  const values = Object.values(data as Record<string, unknown>);
  const arrays = values.filter((v): v is Prod[] => Array.isArray(v));
  return arrays.flat();
}

/** Ricava uno slug da href se id/slug non sono presenti */
function slugFrom(item: Prod): string | undefined {
  if (item?.id) return item.id;
  if (item?.slug) return item.slug;
  if (item?.href) {
    const cleaned = item.href.split("?")[0].split("#")[0];
    const parts = cleaned.split("/").filter(Boolean);
    return parts[parts.length - 1];
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
      return seg.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase());
  }
}

export default function Breadcrumbs() {
  const { asPath, locale } = useRouter();
  const path = asPath.split("?")[0].split("#")[0];
  const parts = path.split("/").filter(Boolean);

  // Rimuovo prefisso locale se presente
  const isI18nPrefixed = locale ? parts[0] === locale : false;
  const segs = isI18nPrefixed ? parts.slice(1) : parts;
  const localePrefix = locale ? [locale] : [];

  // Lista prodotti per lookup
  const products = flattenProducts(hwData).map(p => ({ ...p, _slug: slugFrom(p) }));

  const last = segs[segs.length - 1];
  const categoryKeys = new Set(["docs", "hardware", "door-stations", "indoor-stations", "controller-reader", "software"]);
  const maybeProductSlug = last && !categoryKeys.has(last) ? last : undefined;
  const product = maybeProductSlug ? products.find(p => p._slug === maybeProductSlug) : undefined;

  const crumbs = segs.map((seg, i) => {
    const href = "/" + [...localePrefix, ...segs.slice(0, i + 1)].join("/");
    const isLast = i === segs.length - 1;
    const label = isLast && product?.name ? product.name : labelFor(seg);
    return { href, label, isLast };
  });

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
