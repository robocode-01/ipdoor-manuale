export type Term = { term: string; def: string };

export default function Glossary({ items }: { items: Term[] }) {
  return (
    <section aria-labelledby="glossary">
      <h2 id="glossary" className="subtitle">Glossario</h2>
      <dl className="content" style={{ marginTop: "0.5rem" }}>
        {items.map(({ term, def }) => (
          <div key={term} style={{ marginBottom: ".5rem" }}>
            <dt style={{ fontWeight: 600 }}>{term}</dt>
            <dd style={{ marginLeft: 0 }}>{def}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
