// src/components/docs/SpecTable.tsx
type Row = { label: string; value: string };
type Group = { title: string; rows: Row[] };
type Download = { label: string; href: string };

export default function SpecTable({
  groups = [],
  downloads = [],
}: {
  groups?: Group[];
  downloads?: Download[];
}) {
  if (!Array.isArray(groups) || groups.length === 0) {
    return (
      <div className="content">
        <article className="message is-light">
          <div className="message-body">Nessuna specifica disponibile.</div>
        </article>
      </div>
    );
  }

  return (
    <div className="content">
      {groups.map((g) => (
        <section className="box" key={g.title}>
          <h2 className="subtitle">{g.title}</h2>
          {Array.isArray(g.rows) && g.rows.length > 0 ? (
            <table className="table is-fullwidth">
              <tbody>
                {g.rows.map((r, i) => (
                  <tr key={i}>
                    <th style={{ width: "40%" }}>{r.label}</th>
                    <td>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="has-text-grey">—</p>
          )}
        </section>
      ))}

      {Array.isArray(downloads) && downloads.length > 0 ? (
        <section className="box">
          <h2 className="subtitle">Download</h2>
          <ul>
            {downloads.map((d) => (
              <li key={d.href}>
                <a href={d.href} target="_blank" rel="noreferrer">
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
