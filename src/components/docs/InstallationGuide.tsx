import Link from "next/link";

type Step = string;
type Resource = { label: string; href: string };
type Relay = { name: string; usage: string; notes?: string };
type ImageRef = { alt: string; src: string };

export type InstallationData = {
  title: string;
  model: string;
  sku?: string;
  category: string;
  prerequisites?: Step[];
  tools?: Step[];
  safety?: Step[];
  mounting?: { type?: string; steps?: Step[] };
  wiring?: { power?: string; lan?: string; relays?: Relay[]; notes?: Step[] };
  network?: { default?: Step[]; static_ip?: Step[] };
  commissioning?: Step[];
  troubleshooting?: { symptom: string; fix: string }[];
  resources?: Resource[];
  images?: ImageRef[];
};

export default function InstallationGuide({ data }: { data: InstallationData }) {
  return (
    <div className="content">
      <article className="box">
        <h1 className="title">{data.title}</h1>
        <p className="subtitle">{data.model}{data.sku ? ` · ${data.sku}` : ""}</p>
      </article>

      {data.safety?.length ? (
        <article className="message is-warning">
          <div className="message-header"><p>Avvertenze di sicurezza</p></div>
          <div className="message-body">
            <ul>{data.safety.map((s,i)=><li key={i}>{s}</li>)}</ul>
          </div>
        </article>
      ) : null}

      <div className="columns is-multiline">
        {data.prerequisites?.length && (
          <div className="column is-half">
            <div className="box">
              <h2 className="subtitle">Prerequisiti</h2>
              <ul>{data.prerequisites.map((s,i)=><li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        )}
        {data.tools?.length && (
          <div className="column is-half">
            <div className="box">
              <h2 className="subtitle">Strumenti</h2>
              <ul>{data.tools.map((s,i)=><li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        )}
      </div>

      {data.mounting?.steps?.length ? (
        <section className="box">
          <h2 className="subtitle">Montaggio{data.mounting?.type ? ` (${data.mounting.type})` : ""}</h2>
          <ol>{data.mounting.steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </section>
      ) : null}

      {(data.wiring?.power || data.wiring?.lan || data.wiring?.relays?.length || data.wiring?.notes?.length) && (
        <section className="box">
          <h2 className="subtitle">Cablaggio</h2>
          <ul>
            {data.wiring?.power && <li><strong>Alimentazione:</strong> {data.wiring.power}</li>}
            {data.wiring?.lan && <li><strong>Rete:</strong> {data.wiring.lan}</li>}
          </ul>
          {data.wiring?.relays?.length ? (
            <>
              <h3 className="is-size-6 has-text-weight-semibold">Relè</h3>
              <ul>
                {data.wiring.relays.map((r,i)=>
                  <li key={i}><strong>{r.name}:</strong> {r.usage}{r.notes?` — ${r.notes}`:""}</li>
                )}
              </ul>
            </>
          ):null}
          {data.wiring?.notes?.length ? <ul>{data.wiring.notes.map((s,i)=><li key={i}>{s}</li>)}</ul> : null}
        </section>
      )}

      {(data.network?.default?.length || data.network?.static_ip?.length) && (
        <section className="box">
          <h2 className="subtitle">Rete</h2>
          {data.network?.default?.length && (<>
            <h3 className="is-size-6 has-text-weight-semibold">Impostazioni predefinite</h3>
            <ul>{data.network.default.map((s,i)=><li key={i}>{s}</li>)}</ul>
          </>)}
          {data.network?.static_ip?.length && (<>
            <h3 className="is-size-6 has-text-weight-semibold">IP statico</h3>
            <ul>{data.network.static_ip.map((s,i)=><li key={i}>{s}</li>)}</ul>
          </>)}
        </section>
      )}

      {data.commissioning?.length ? (
        <section className="box">
          <h2 className="subtitle">Messa in servizio (Commissioning)</h2>
          <ol>{data.commissioning.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </section>
      ) : null}

      {data.images?.length ? (
        <section className="box">
          <h2 className="subtitle">Schemi e immagini</h2>
          <div className="columns is-multiline">
            {data.images.map((img,i)=>(
              <div className="column is-half" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={img.alt} src={img.src} style={{maxWidth:"100%", borderRadius:8}} />
                <p className="has-text-grey is-size-7">{img.alt}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.troubleshooting?.length ? (
        <section className="box">
          <h2 className="subtitle">Risoluzione problemi</h2>
          <ul>
            {data.troubleshooting.map((t,i)=>(
              <li key={i}><strong>{t.symptom}:</strong> {t.fix}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.resources?.length ? (
        <section className="box">
          <h2 className="subtitle">Risorse</h2>
          <ul>
            {data.resources.map((r,i)=>(
              <li key={i}><Link href={r.href}>{r.label}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
