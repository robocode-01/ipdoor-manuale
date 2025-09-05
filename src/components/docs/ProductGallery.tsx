// Galleria compatta: immagine ottimizzata + nome, card cliccabile
import Image from "next/image";

type Item = {
  name: string;
  href: string;      // link alla scheda prodotto
  image?: string;    // es: "/media/spark-300/hero.png"
};

export default function ProductGallery({ items }: { items: Item[] }) {
  return (
    <div className="product-gallery">
      {items.map((it) => (
        <a key={it.href} href={it.href} className="pg-card" aria-label={it.name}>
          <div className="pg-thumb" aria-label={it.name}>
            {it.image ? (
              <Image
                src={it.image}
                alt={it.name}
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 15vw"
                priority={false}
              />
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
