import Link from "next/link";

type Card = { id:string; name:string; href:string; image?:string; blurb?:string };

export default function CardGrid({ items }:{ items: Card[] }){
  return (
    <div className="columns is-multiline">
      {items.map((c)=>(
        <div key={c.id} className="column is-half">
          <div className="box">
            {c.image ? <img src={c.image} alt={c.name} style={{maxWidth:'100%', height:'auto', marginBottom:'0.75rem'}}/> : null}
            <h3 className="subtitle">{c.name}</h3>
            {c.blurb ? <p className="content">{c.blurb}</p> : null}
            <Link className="button is-link is-light" href={c.href}>Apri scheda</Link>
          </div>
        </div>
      ))}
    </div>
  );
}