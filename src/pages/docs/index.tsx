import type { GetStaticProps } from "next";
import { i18nProps } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await i18nProps(locale)
});



import DocsLayout from "@/components/docs/DocsLayout";
import Link from "next/link";
import Glossary from "@/components/docs/Glossary";
import glossario from "@/data/glossary.json";

export default function DocsHome() {
  return (
    <DocsLayout title="Panoramica">
      <h1 className="title">Cos’è IpDoor</h1>
      <p className="content">
        IpDoor è un sistema IP per <strong>videocitofonia</strong> e <strong>controllo accessi</strong> che unisce dispositivi hardware,
        app e servizi cloud. L’elemento principale è la <strong>targa esterna (door station)</strong>, che effettua videochiamate e
        gestisce credenziali; l’ecosistema include <strong>monitor interni</strong>, <strong>reader/controller</strong>, l’<strong>app mobile</strong> e una
        <strong> console admin</strong> in cloud per configurazione e gestione remota.
      </p>

      <div className="columns is-multiline">
        <div className="column is-half">
          <div className="box">
            <h2 className="subtitle">Componenti principali</h2>
            <ul className="content">
              <li><strong>Door stations</strong> (SPARK, VERTEX): videocitofoni IP da esterno con PoE, rete e sensori.</li>
              <li><strong>Indoor stations</strong> (PLEATS, NEXT): monitor interni per ricevere chiamate e aprire varchi.</li>
              <li><strong>Reader & Controller</strong>: lettori credenziali (NFC/BLE/QR/PIN) e controllori I/O.</li>
              <li><strong>IpDoor Mobile</strong>: app iOS/Android per chiamate e comandi da remoto.</li>
              <li><strong>Console Admin (Cloud)</strong>: configurazione dispositivi, utenti, gruppi e permessi.</li>
              <li><strong>Licenze</strong>: abilitano funzioni extra (es. <em>Remote Call</em>).</li>
            </ul>
          </div>
        </div>

        <div className="column is-half">
          <div className="box">
            <h2 className="subtitle">Come funziona la comunicazione</h2>
            <ul className="content">
              <li><strong>In locale (LAN)</strong>: la targa chiama dispositivi registrati nella stessa rete.</li>
              <li><strong>Via Cloud</strong>: con licenza adeguata, la targa chiama utenti ovunque si trovino.</li>
              <li><strong>Gestione remota</strong>: la configurazione avviene dalla console admin in cloud.</li>
            </ul>
            <p className="content">
              Alimentazione tipica via <strong>PoE (802.3af)</strong>; rete <strong>DHCP</strong> all’avvio con possibilità di IP statico.
            </p>
          </div>
        </div>

        <div className="column is-half">
          <div className="box">
            <h2 className="subtitle">Funzioni di accesso</h2>
            <ul className="content">
              <li>Credenziali: badge NFC, mobile BLE, <em>QR</em>, <em>PIN</em>.</li>
              <li>Azioni e scenari: relè, luci, cancelli e uscite configurabili.</li>
              <li>Integrazioni: dispositivi/servizi esterni (assistenti vocali, streaming, ecc.).</li>
            </ul>
          </div>
        </div>

        <div className="column is-half">
          <div className="box">
            <h2 className="subtitle">Attori del sistema</h2>
            <ul className="content">
              <li><strong>Utenti</strong>: persone che ricevono chiamate e usano credenziali.</li>
              <li><strong>Gruppi</strong>: insieme di utenti con permessi e orari.</li>
              <li><strong>Dispositivi</strong>: targhe, monitor, reader e controller associati a un impianto.</li>
              <li><strong>Impianto</strong>: insieme di dispositivi, utenti e regole.</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="subtitle">Prossimi passi</h2>
      <ul className="content">
        <li><Link href="/docs/hardware/door-stations">Dispositivi esterni (Door stations)</Link></li>
        <li><Link href="/docs/hardware/indoor-stations">Dispositivi interni (Indoor stations)</Link></li>
        <li><Link href="/docs/hardware/controller-reader">Controller & Reader</Link></li>
        <li><Link href="/docs/licenses/remote-call">Licenze</Link></li>
      </ul>

      <article className="message is-info">
        <div className="message-header"><p>Suggerimento</p></div>
        <div className="message-body">
          Parti dalla <strong>door station</strong>: PoE, DHCP, test chiamata locale; poi abilita <em>Remote Call</em> per ricevere fuori dalla LAN.
        </div>
      </article>

      {/* Glossario dal JSON */}
      <Glossary items={glossario as any} />
    </DocsLayout>
  );
}
