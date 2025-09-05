// Galleria di prodotti compatta: immagine + nome, tutta cliccabile
type Item = {
  name: string;
  href: string;     // link alla scheda prodotto
  image?: string;   // es: "/media/spark-300/hero.png"
};

export default function ProductGallery({ items }: { items: Item[] }) {
  return (
    <div className="product-gallery">
      {items.map((it) => (
        <a key={it.href} href={it.href} className="pg-card" aria-label={it.name}>
          <div className="pg-thumb" role="img" aria-label={it.name}>
            {it.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.image} alt={it.name} />
            ) : (
              <div className="pg-placeholder">{it.name}</div>
            )}
          </div>
          <div className="pg-name">{it.name}</div>
        </a>
      ))}
    </div>
  );
}
