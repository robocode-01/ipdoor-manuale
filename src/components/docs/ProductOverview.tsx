import Link from "next/link";

type Doc = { label: string; href: string; note?: string };
type Stat = { label: string; value: string };
type Feature = { icon?: string; title: string; desc: string };

export type ProductOverviewData = {
  id: string;                       // es: "spark-300"
  title: string;                    // es: "SPARK 300"
  subtitle?: string;                // breve payoff
  image?: { src: string; alt: string };
  stats?: Stat[];                   // 3-6 valori rapidi (PoE, IP rating, ecc.)
  features?: Feature[];             // elenco puntato con descrizioni
  officialDocs?: Doc[];             // link a risorse ufficiali
  cta?: {
    installHref: string;            // /docs/.../installazione
    specsHref: string;              // /docs/.../scheda-tecnica
    docsHref?: string;              // pagina risorse ufficiali esterne o ancora a fondo pagina
  };
};

export default function ProductOverview({ data }: { data: ProductOverviewData }) {
  return (
    <div className="content">
      {/* HERO */}
      <section className="box" style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          {data.image?.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.image.src} alt={data.image.alt} style={{ maxWidth: 260, borderRadius: 8 }} />
          )}
          <div style={{ minWidth: 280 }}>
            <h1 className="title" style={{ marginBottom: ".25rem" }}>{data.title}</h1>
            {data.subtitle && <p className="subtitle">{data.subtitle}</p>}

            {/* CTA grandi */}
            {data.cta && (
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginTop: ".5rem" }}>
                <Link href={data.cta.installHref} className="button is-link is-medium">
                  Guida installazione
                </Link>
                <Link href={data.cta.specsHref} className="button is-light is-medium">
                  Scheda tecnica
                </Link>
              
              </div>
            )}
          </div>
        </div>

        {/* STAT QUICK GRID */}
        {(data.stats?.length ?? 0) > 0 && (
          <div className="columns is-multiline" style={{ marginTop: ".5rem" }}>
            {data.stats!.map((s, i) => (
              <div className="column is-one-third" key={i}>
                <div className="box" style={{ height: "100%" }}>
                  <p className="has-text-grey is-size-7" style={{ marginBottom: ".25rem" }}>{s.label}</p>
                  <p className="is-size-5 has-text-weight-semibold">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURES */}
      {(data.features?.length ?? 0) > 0 && (
        <section className="box">
          <h2 className="subtitle">Punti chiave</h2>
          <div className="columns is-multiline">
            {data.features!.map((f, i) => (
              <div className="column is-half" key={i}>
                <div className="media">
                  {f.icon && <div className="media-left"><span className="icon">{f.icon}</span></div>}
                  <div className="media-content">
                    <p className="has-text-weight-semibold">{f.title}</p>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DOCUMENTI UFFICIALI */}
      {(data.officialDocs?.length ?? 0) > 0 && (
        <section className="box">
          <h2 className="subtitle">Documenti ufficiali</h2>
          <ul>
            {data.officialDocs!.map((d, i) => (
              <li key={i}>
                <a href={d.href} target="_blank" rel="noreferrer">
                  {d.label}
                </a>
                {d.note ? <span className="has-text-grey"> — {d.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
