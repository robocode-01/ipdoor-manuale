// src/components/docs/ProductTabs.tsx
import Link from "next/link";
import { useRouter } from "next/router";

type Tab = { label: string; href: string; match?: RegExp };

export default function ProductTabs({
  basePath,
  tabs,
}: {
  /** Es: /docs/hardware/door-stations/spark-300 */
  basePath: string;
  /** Se non passato, uso i tre tab standard */
  tabs?: Tab[];
}) {
  const { asPath, locale } = useRouter();

  const defaultTabs: Tab[] = [
    { label: "Panoramica", href: `${basePath}`, match: new RegExp(`${basePath}/?$`) },
    { label: "Installazione", href: `${basePath}/installazione` },
    { label: "Scheda tecnica", href: `${basePath}/scheda-tecnica` },
  ];

  const items = tabs ?? defaultTabs;

  const isActive = (t: Tab) => {
    if (t.match) return t.match.test(asPath);
    return asPath.startsWith(t.href);
  };

  return (
    <div className="tabs is-toggle is-small" style={{ marginBottom: "1rem" }}>
      <ul>
        {items.map((t) => (
          <li key={t.href} className={isActive(t) ? "is-active" : undefined}>
            <Link href={t.href} locale={locale}>{t.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
